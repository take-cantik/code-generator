"use client";

import { useMusicAnalysis } from "../hooks/useMusicAnalysis";
import RecordingForm from "./RecordingForm";
import AudioPlayer from "./AudioPlayer";
import ChordProgressionDisplay from "./ChordProgressionDisplay";

export default function MusicAnalyzer() {
  const {
    bpm,
    isRecording,
    isLoading,
    chordProgression,
    audioUrl,
    audioPlayerRef,
    register,
    handleSubmit,
    onSubmit,
    startRecording,
    stopRecording,
  } = useMusicAnalysis();

  return (
    <div className="space-y-6">
      <RecordingForm
        bpm={bpm}
        isRecording={isRecording}
        isLoading={isLoading}
        hasAudioData={!!audioUrl}
        register={register}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onSubmit={handleSubmit(onSubmit)}
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
