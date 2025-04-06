"use client";

import { useForm } from "react-hook-form";
import { useMetronome } from "../hooks/useMetronome";

type RecordingFormProps = {
  onStartRecording: () => Promise<void>;
  onStopRecording: () => void;
  isRecording: boolean;
  onSubmit: (data: { bpm: number }) => void;
  isLoading: boolean;
  hasAudioData: boolean;
};

export default function RecordingForm({
  onStartRecording,
  onStopRecording,
  isRecording,
  onSubmit,
  isLoading,
  hasAudioData,
}: RecordingFormProps) {
  const { register, handleSubmit, watch } = useForm<{ bpm: number }>({
    defaultValues: {
      bpm: 120,
    },
  });

  const bpm = watch("bpm");
  const { start: startMetronome, stop: stopMetronome } = useMetronome(bpm);

  const handleRecording = async () => {
    if (isRecording) {
      onStopRecording();
      stopMetronome();
    } else {
      await onStartRecording();
      startMetronome();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md space-y-6 border border-blue-100"
    >
      <div className="flex items-end gap-6">
        <label className="flex-1">
          <span className="block text-sm font-medium text-blue-700 mb-1">
            BPM
          </span>
          <input
            type="number"
            {...register("bpm", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="40"
            max="200"
          />
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleRecording}
            className={`px-6 py-2 rounded-md text-white transition-colors ${
              isRecording
                ? "bg-rose-500 hover:bg-rose-600"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {isRecording ? "録音停止" : "録音開始"}
          </button>
          <button
            type="submit"
            disabled={isLoading || !hasAudioData}
            className={`px-6 py-2 text-white rounded-md transition-colors ${
              hasAudioData
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? "生成中..." : "生成"}
          </button>
        </div>
      </div>
    </form>
  );
}
