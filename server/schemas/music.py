from pydantic import BaseModel
from typing import List, Optional

class AudioFeatures(BaseModel):
    tempo: float
    average_pitch: Optional[float] = None
    pitch_std: Optional[float] = None
    spectral_centroid_mean: float
    rms_mean: float
    rms_std: float
    chroma_mean: List[float]
    mfccs_mean: List[float]
    spectral_rolloff_mean: float

class ChordProgression(BaseModel):
    capo: int
    chords: List[str]
    key: str
    explanation: str

class MusicAnalysisResponse(BaseModel):
    codeList: List[str]
    capo: int
    key: str
    explanation: str 