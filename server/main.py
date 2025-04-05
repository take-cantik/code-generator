from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware

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

        # ここで音声データとBPMを使用した処理を実装
        # 例: 音声データの解析やコード生成など

        return {
            "message": "コード生成が完了しました",
            "bpm": bpm,
            "audio_size": len(content)  # デバッグ用にファイルサイズを返す
        }
    except Exception as e:
        return {"message": f"エラーが発生しました: {str(e)}"}
