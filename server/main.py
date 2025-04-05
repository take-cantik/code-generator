from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from scipy import signal
import io
import soundfile as sf
from pydub import AudioSegment
import librosa
from openai import OpenAI
from dotenv import load_dotenv
import os

# 環境変数の読み込み
load_dotenv()

# OpenAIクライアントの初期化
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

origins = [
    "http://localhost:3000",
]

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "ok"}

@app.post("/code")
async def create_code(
    bpm: int = Form(...),
    audio: UploadFile = File(...)
):
    try:
        # 音声ファイルの内容をメモリ上で読み込む
        content = await audio.read()

        # WebMからWAVに変換
        audio_segment = AudioSegment.from_file(io.BytesIO(content), format="webm")
        wav_buffer = io.BytesIO()
        audio_segment.export(wav_buffer, format="wav")
        wav_buffer.seek(0)

        # WAVファイルを読み込む
        audio_data, sample_rate = sf.read(wav_buffer)

        # ステレオの場合はモノラルに変換
        if len(audio_data.shape) > 1:
            audio_data = np.mean(audio_data, axis=1)

        # ノイズ除去を適用
        denoised_audio = denoise_audio(audio_data, sample_rate)

        # 音声特徴量の抽出
        audio_features = analyze_audio(denoised_audio, sample_rate)

        # コード進行の生成
        chord_progression = generate_chord_progression(audio_features)

        # 処理済みの音声データをバイトデータに変換
        output_buffer = io.BytesIO()
        sf.write(output_buffer, denoised_audio, sample_rate, format='WAV')
        processed_audio = output_buffer.getvalue()

        return {
            "message": "音声解析とコード進行の生成が完了しました",
            "bpm": bpm,
            "audio_size": len(processed_audio),
            "audio_features": audio_features,
            "chord_progression": chord_progression
        }
    except Exception as e:
        return {"message": f"エラーが発生しました: {str(e)}"}

def denoise_audio(audio_data, sample_rate):
    # ノイズ除去のパラメータ
    frame_length = 2048
    hop_length = frame_length // 4

    # STFTを適用
    f, t, Zxx = signal.stft(audio_data, fs=sample_rate, nperseg=frame_length, noverlap=hop_length)

    # スペクトログラムの振幅を計算
    magnitude = np.abs(Zxx)

    # 各周波数帯域でのノイズフロアを推定
    noise_floor = np.mean(magnitude[:, :10], axis=1, keepdims=True)

    # スペクトラルサブトラクション
    gain = (magnitude - noise_floor) / magnitude
    gain = np.maximum(gain, 0.1)  # 最小ゲインを設定

    # ゲインを適用
    Zxx_denoised = Zxx * gain

    # 逆STFTを適用
    _, denoised_audio = signal.istft(Zxx_denoised, fs=sample_rate, nperseg=frame_length, noverlap=hop_length)

    return denoised_audio

def analyze_audio(audio_data, sample_rate):
    features = {}

    # テンポ推定
    onset_env = librosa.onset.onset_strength(y=audio_data, sr=sample_rate)
    tempo = librosa.beat.tempo(onset_envelope=onset_env, sr=sample_rate)[0]
    features['tempo'] = float(tempo)

    # ピッチ推定
    pitches, magnitudes = librosa.piptrack(y=audio_data, sr=sample_rate)
    pitches_flat = pitches[magnitudes > np.median(magnitudes)]
    if len(pitches_flat) > 0:
        features['average_pitch'] = float(np.mean(pitches_flat))
        features['pitch_std'] = float(np.std(pitches_flat))

    # スペクトル特徴量
    # スペクトル重心（音の明るさ）
    spectral_centroids = librosa.feature.spectral_centroid(y=audio_data, sr=sample_rate)[0]
    features['spectral_centroid_mean'] = float(np.mean(spectral_centroids))

    # スペクトルロールオフ（音の特性）
    spectral_rolloff = librosa.feature.spectral_rolloff(y=audio_data, sr=sample_rate)[0]
    features['spectral_rolloff_mean'] = float(np.mean(spectral_rolloff))

    # MFCCs（音色の特徴）
    mfccs = librosa.feature.mfcc(y=audio_data, sr=sample_rate, n_mfcc=13)
    features['mfccs_mean'] = [float(np.mean(mfcc)) for mfcc in mfccs]

    # クロマグラム（音階の分布）
    chromagram = librosa.feature.chroma_stft(y=audio_data, sr=sample_rate)
    features['chroma_mean'] = [float(np.mean(chroma)) for chroma in chromagram]

    # RMSエネルギー（音量の変化）
    rms = librosa.feature.rms(y=audio_data)[0]
    features['rms_mean'] = float(np.mean(rms))
    features['rms_std'] = float(np.std(rms))

    return features

def generate_chord_progression(features):
    # 音楽特徴量を文字列に変換
    musical_description = f"""
    テンポ: {features['tempo']}BPM
    平均ピッチ: {features.get('average_pitch', 'N/A')}Hz
    ピッチの変動: {features.get('pitch_std', 'N/A')}
    音の明るさ: {features['spectral_centroid_mean']}
    音量の平均: {features['rms_mean']}
    音量の変動: {features['rms_std']}

    クロマグラム（音階の分布）:
    C:{features['chroma_mean'][0]:.3f}, C#:{features['chroma_mean'][1]:.3f}, 
    D:{features['chroma_mean'][2]:.3f}, D#:{features['chroma_mean'][3]:.3f},
    E:{features['chroma_mean'][4]:.3f}, F:{features['chroma_mean'][5]:.3f},
    F#:{features['chroma_mean'][6]:.3f}, G:{features['chroma_mean'][7]:.3f},
    G#:{features['chroma_mean'][8]:.3f}, A:{features['chroma_mean'][9]:.3f},
    A#:{features['chroma_mean'][10]:.3f}, B:{features['chroma_mean'][11]:.3f}
    """

    # OpenAIにプロンプトを送信
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": """
                あなたは音楽理論の専門家です。与えられた音声の特徴量に基づいて、
                最適なギターのコード進行を提案してください。
                以下の点を考慮してください：
                - テンポに合った適切なリズム感
                - 主要な音階に基づいたキーの選択
                - 曲の雰囲気に合った進行
                - 8小節程度の進行を提案
                """
            },
            {
                "role": "user",
                "content": f"""
                以下の音声特徴量に基づいて、ギターのコード進行を提案してください：

                {musical_description}

                以下の形式で回答してください：
                1. 選択したキーとその理由
                2. コード進行（8小節）
                3. 進行の説明と演奏アドバイス
                """
            }
        ]
    )

    return response.choices[0].message.content
