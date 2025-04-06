from openai import OpenAI
import os
from dotenv import load_dotenv
from ..schemas.music import AudioFeatures, ChordProgression, MusicAnalysisResponse

# 環境変数の読み込み
load_dotenv()

# OpenAIクライアントの初期化
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_chord_progression(features: AudioFeatures) -> MusicAnalysisResponse:
    """音声特徴量からコード進行を生成します。"""
    # 音楽特徴量を文字列に変換
    musical_description = f"""
    テンポ: {features.tempo}BPM
    平均ピッチ: {features.average_pitch}Hz
    ピッチの変動: {features.pitch_std}
    音の明るさ: {features.spectral_centroid_mean}
    音量の平均: {features.rms_mean}
    音量の変動: {features.rms_std}

    クロマグラム（音階の分布）:
    C:{features.chroma_mean[0]:.3f}, C#:{features.chroma_mean[1]:.3f}, 
    D:{features.chroma_mean[2]:.3f}, D#:{features.chroma_mean[3]:.3f},
    E:{features.chroma_mean[4]:.3f}, F:{features.chroma_mean[5]:.3f},
    F#:{features.chroma_mean[6]:.3f}, G:{features.chroma_mean[7]:.3f},
    G#:{features.chroma_mean[8]:.3f}, A:{features.chroma_mean[9]:.3f},
    A#:{features.chroma_mean[10]:.3f}, B:{features.chroma_mean[11]:.3f}
    """

    # OpenAIにプロンプトを送信
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": """
                あなたは音楽理論の専門家で、特にギターのコード進行に精通しています。
                与えられた音声の特徴量に基づいて、最適なギターのコード進行とカポの位置を提案してください。

                以下の点を厳密に考慮してください：

                1. コード進行の基本原則
                - ダイアトニックコードの使用を基本とする
                - 機能和声（トニック、サブドミナント、ドミナント）の自然な流れを重視
                - セカンダリードミナントや借用和音は慎重に使用
                - コードの解決感を意識した進行

                2. テンポとリズム
                - テンポに応じた適切なコードチェンジのタイミング
                - 速いテンポではシンプルなコード進行を
                - 遅いテンポではより複雑な進行も可能
                - リズムパターンとの相性を考慮

                3. キーとスケール
                - クロマグラムの分析結果を重視
                - 主要な音階に基づいたキーの選択
                - モーダルインターチェンジの可能性
                - 転調の自然さ

                4. 曲の雰囲気
                - メジャー/マイナーの雰囲気の使い分け
                - テンションコードの効果的な使用
                - サスペンデッドコードによる緊張感の演出
                - セブンスコードによる色彩感の追加

                5. カポの位置
                - 0から5の範囲で、最も演奏しやすい位置を選択
                - キーとコードの関係を考慮
                - バレーコードの使用頻度を考慮
                - オープンコードの活用可能性

                6. 進行の長さと構成
                - 16小節を基本とし、必要に応じて調整
                - イントロ、Aメロ、Bメロ、サビなどの構成を意識
                - 繰り返しパターンの効果的な使用
                - クライマックスに向けた盛り上がり

                7. その他の考慮事項
                - コードの難易度バランス
                - ストロークパターンとの相性
                - フィンガーピッキングの可能性
                - アレンジの余地を残す

                提案するコード進行は、以下の形式でJSONとして出力してください：
                {
                    "capo": "カポの位置（0-5）",
                    "chords": ["コード1", "コード2", "コード3", ...],
                    "key": "キー",
                    "explanation": "コード進行の説明"
                }
                """
            },
            {
                "role": "user",
                "content": f"""
                以下の音声特徴量に基づいて、ギターのコード進行を提案してください：

                {musical_description}

                以下の形式でJSON形式で回答してください：
                {{
                    "capo": "カポの位置（0-5）",
                    "chords": ["コード1", "コード2", "コード3", ...],
                    "key": "キー",
                    "explanation": "コード進行の説明"
                }}

                使用可能なコード：
                メジャー: "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
                マイナー: "Cm", "C#m", "Dm", "D#m", "Em", "Fm", "F#m", "Gm", "G#m", "Am", "A#m", "Bm"
                メジャーセブンス: "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7"
                マイナーセブンス: "Cm7", "C#m7", "Dm7", "D#m7", "Em7", "Fm7", "F#m7", "Gm7", "G#m7", "Am7", "A#m7", "Bm7"
                マイナーメジャーセブンス: "CmM7", "C#mM7", "DmM7", "D#mM7", "EmM7", "FmM7", "F#mM7", "GmM7", "G#mM7", "AmM7", "A#mM7", "BmM7"
                サス4: "Csus4", "C#sus4", "Dsus4", "D#sus4", "Esus4", "Fsus4", "F#sus4", "Gsus4", "G#sus4", "Asus4", "A#sus4", "Bsus4"
                セブンスサス4: "C7sus4", "C#7sus4", "D7sus4", "D#7sus4", "E7sus4", "F7sus4", "F#7sus4", "G7sus4", "G#7sus4", "A7sus4", "A#7sus4", "B7sus4"
                """
            }
        ]
    )

    # レスポンスをJSONとしてパース
    result = response.choices[0].message.content
    chord_progression = ChordProgression.model_validate_json(result)

    # MusicAnalysisResponseに変換
    return MusicAnalysisResponse(
        codeList=chord_progression.chords,
        capo=chord_progression.capo,
        key=chord_progression.key,
        explanation=chord_progression.explanation
    ) 