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

  const handleRecording = async () => {
    if (isRecording) {
      stopRecording();
      stopMetronome();
    } else {
      await startRecording();
      startMetronome();
    }
  };

  return (
    <div className="space-y-8">
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
              disabled={isLoading}
              className="px-6 py-2 text-white rounded-md bg-emerald-500 hover:bg-emerald-600 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "生成中..." : "生成"}
            </button>
          </div>
        </div>
      </form>

      {audioUrl && (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-blue-100">
          <h3 className="text-lg font-medium text-blue-800 mb-4">
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
        <div className="bg-white/80 backdrop-blur-sm p-6 pb-10 rounded-lg shadow-md overflow-y-scroll border border-blue-100">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-blue-800 mb-2">
              コード進行
            </h3>
            <p className="text-sm text-blue-600">
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
