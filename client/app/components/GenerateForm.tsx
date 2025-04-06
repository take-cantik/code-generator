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
    chordProgression,
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
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        <div className="flex items-end gap-6">
          <label className="flex-1">
            <span className="block text-sm font-medium text-gray-700 mb-1">
              BPM
            </span>
            <input
              type="number"
              {...register("bpm", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="40"
              max="200"
            />
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleStartRecording}
              disabled={isRecording}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isRecording ? "録音中..." : "録音開始"}
            </button>
            <button
              type="button"
              onClick={handleStopRecording}
              disabled={!isRecording}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              録音停止
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "生成中..." : "生成"}
            </button>
          </div>
        </div>
      </form>

      {audioUrl && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            録音した音声
          </h3>
          <audio
            ref={audioPlayerRef}
            src={audioUrl}
            controls
            className="w-full"
          />
        </div>
      )}

      {chordProgression && (
        <div className="bg-white p-6 pb-10 rounded-lg shadow-md overflow-y-scroll">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              コード進行
            </h3>
            <p className="text-sm text-gray-600">
              カポの位置: {chordProgression.capo}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {chordProgression.codeList.map((code) => (
              <ChordChart key={code} chordName={code} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
