"use client";

import { useMusicAnalysis } from "../hooks/useMusicAnalysis";
import RecordingForm from "./RecordingForm";
import AudioPlayer from "./AudioPlayer";
import ChordProgressionDisplay from "./ChordProgressionDisplay";

export default function MusicAnalyzer() {
  const {
    register,
    handleSubmit,
    onSubmit,
    startRecording,
    stopRecording,
    isRecording,
    isLoading,
    chordProgression,
    audioUrl,
    audioPlayerRef,
    bpm,
    error,
  } = useMusicAnalysis();

  return (
    <div className="space-y-6">
      <RecordingForm
        isRecording={isRecording}
        isLoading={isLoading}
        hasAudioData={!!audioUrl}
        register={register}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onSubmit={handleSubmit(onSubmit)}
        bpm={bpm}
        error={error}
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
