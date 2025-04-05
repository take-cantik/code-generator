FROM python:3.12.3

SHELL ["/bin/bash", "-c"]

# FFmpegをインストール
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /work

# 依存関係をインストール
COPY ./server/requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]
