"use client";

import { useMusicAnalysis } from "../hooks/useMusicAnalysis";
import RecordingForm from "./RecordingForm";
import AudioPlayer from "./AudioPlayer";
import ChordProgressionDisplay from "./ChordProgressionDisplay";

export default function MusicAnalyzer() {
  const {
    startRecording,
    stopRecording,
    isRecording,
    isLoading,
    chordProgression,
    audioUrl,
    audioPlayerRef,
    onSubmit,
  } = useMusicAnalysis();

  return (
    <div className="space-y-8">
      <RecordingForm
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        isRecording={isRecording}
        onSubmit={onSubmit}
        isLoading={isLoading}
        hasAudioData={!!audioUrl}
      />

      {audioUrl && (
        <AudioPlayer audioUrl={audioUrl} audioPlayerRef={audioPlayerRef} />
      )}

      {chordProgression && (
        <ChordProgressionDisplay chordProgression={chordProgression} />
      )}
    </div>
  );
}
