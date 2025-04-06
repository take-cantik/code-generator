"use client";

import { UseFormRegister } from "react-hook-form";
import { FormData } from "../hooks/useMusicAnalysis";
import { useMetronome } from "../hooks/useMetronome";

type RecordingFormProps = {
  bpm: number;
  isRecording: boolean;
  isLoading: boolean;
  hasAudioData: boolean;
  register: UseFormRegister<FormData>;
  onStartRecording: () => Promise<void>;
  onStopRecording: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function RecordingForm({
  isRecording,
  isLoading,
  hasAudioData,
  register,
  onStartRecording,
  onStopRecording,
  onSubmit,
  bpm,
}: RecordingFormProps) {
  const { start: startMetronome, stop: stopMetronome } = useMetronome(bpm);

  const handleRecordingToggle = async () => {
    if (isRecording) {
      stopMetronome();
      onStopRecording();
    } else {
      startMetronome();
      await onStartRecording();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-sky-100">
      <h3 className="text-lg font-medium text-sky-700 mb-6">録音設定</h3>
      <form onSubmit={onSubmit} className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="text-sky-600 font-medium whitespace-nowrap">
            BPM:
          </label>
          <input
            type="number"
            {...register("bpm", { min: 40, max: 200 })}
            className="w-24 px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={handleRecordingToggle}
            className={`px-6 py-2.5 text-white rounded-lg transition-colors duration-200 ${
              isRecording
                ? "bg-rose-400 hover:bg-rose-500"
                : "bg-emerald-400 hover:bg-emerald-500"
            }`}
          >
            {isRecording ? "録音停止" : "録音開始"}
          </button>
          <button
            type="submit"
            disabled={isLoading || !hasAudioData}
            className="px-6 py-2.5 bg-sky-400 text-white rounded-lg hover:bg-sky-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? "分析中..." : "分析開始"}
          </button>
        </div>
      </form>
    </div>
  );
}
