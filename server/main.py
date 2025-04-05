from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from scipy import signal
import io
import soundfile as sf
from pydub import AudioSegment

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

        # 処理済みの音声データをバイトデータに変換
        output_buffer = io.BytesIO()
        sf.write(output_buffer, denoised_audio, sample_rate, format='WAV')
        processed_audio = output_buffer.getvalue()

        return {
            "message": "ノイズ除去が完了しました",
            "bpm": bpm,
            "audio_size": len(processed_audio)
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
