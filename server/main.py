from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from .services.audio_converter import convert_audio_to_wav
from .services.audio_processor import denoise_audio, analyze_audio
from .services.chord_generator import generate_chord_progression

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
        # オーディオデータの変換
        audio_data, sample_rate = await convert_audio_to_wav(audio)

        # ノイズ除去を適用
        denoised_audio = denoise_audio(audio_data, sample_rate)

        # 音声特徴量の抽出
        audio_features = analyze_audio(denoised_audio, sample_rate)

        # コード進行の生成
        chord_progression = generate_chord_progression(audio_features)

        return chord_progression
    except Exception as e:
        return {"message": f"エラーが発生しました: {str(e)}"}
