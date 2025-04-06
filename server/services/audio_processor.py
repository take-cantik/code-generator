import numpy as np
from scipy import signal
import librosa
from ..schemas.music import AudioFeatures

def denoise_audio(audio_data: np.ndarray, sample_rate: int) -> np.ndarray:
    """音声データからノイズを除去します。"""
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

def analyze_audio(audio_data: np.ndarray, sample_rate: int) -> AudioFeatures:
    """音声データから特徴量を抽出します。"""
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
    spectral_centroids = librosa.feature.spectral_centroid(y=audio_data, sr=sample_rate)[0]
    features['spectral_centroid_mean'] = float(np.mean(spectral_centroids))

    spectral_rolloff = librosa.feature.spectral_rolloff(y=audio_data, sr=sample_rate)[0]
    features['spectral_rolloff_mean'] = float(np.mean(spectral_rolloff))

    # MFCCs
    mfccs = librosa.feature.mfcc(y=audio_data, sr=sample_rate, n_mfcc=13)
    features['mfccs_mean'] = [float(np.mean(mfcc)) for mfcc in mfccs]

    # クロマグラム
    chromagram = librosa.feature.chroma_stft(y=audio_data, sr=sample_rate)
    features['chroma_mean'] = [float(np.mean(chroma)) for chroma in chromagram]

    # RMSエネルギー
    rms = librosa.feature.rms(y=audio_data)[0]
    features['rms_mean'] = float(np.mean(rms))
    features['rms_std'] = float(np.std(rms))

    return AudioFeatures(**features) 