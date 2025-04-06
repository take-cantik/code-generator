import io
import soundfile as sf
from pydub import AudioSegment
import numpy as np

async def convert_audio_to_wav(audio_file) -> tuple[np.ndarray, int]:
    """WebM形式のオーディオファイルをWAV形式に変換し、numpy配列として返します。"""
    # 音声ファイルの内容をメモリ上で読み込む
    content = await audio_file.read()

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

    return audio_data, sample_rate 