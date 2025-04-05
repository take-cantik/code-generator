"use client";

import { useGenerateForm } from "../hooks/useGenerateForm";
import { useMetronome } from "../hooks/useMetronome";
import ChordChart from "./ChordChart";

export default function GenerateForm() {
  const {
    register,
    handleSubmit,
    onSubmit,
    startRecording,
    stopRecording,
    isRecording,
    isLoading,
    result,
    audioUrl,
    audioPlayerRef,
    bpm,
  } = useGenerateForm();

  const { start: startMetronome, stop: stopMetronome } = useMetronome(bpm);

  const handleStartRecording = async () => {
    await startRecording();
    startMetronome();
  };

  const handleStopRecording = () => {
    stopRecording();
    stopMetronome();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">
            BPM
            <input
              type="number"
              {...register("bpm", { valueAsNumber: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </label>
        </div>
        <div className="space-x-2">
          <button
            type="button"
            onClick={handleStartRecording}
            disabled={isRecording}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isRecording ? "録音中..." : "録音開始"}
          </button>
          <button
            type="button"
            onClick={handleStopRecording}
            disabled={!isRecording}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
          >
            録音停止
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {isLoading ? "生成中..." : "生成"}
          </button>
        </div>
      </form>
      <div>
        {audioUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">録音した音声</h3>
            <audio
              ref={audioPlayerRef}
              src={audioUrl}
              controls
              className="w-full"
            />
          </div>
        )}
        {result && <div className="mt-4 p-4 bg-gray-100 rounded">{result}</div>}
      </div>
    </>
  );
}
