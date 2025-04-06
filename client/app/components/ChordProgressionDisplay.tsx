"use client";

import ChordChart from "./ChordChart";

type ChordProgressionDisplayProps = {
  chordProgression: {
    codeList: string[];
    capo: number;
  };
};

export default function ChordProgressionDisplay({
  chordProgression,
}: ChordProgressionDisplayProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 pb-10 rounded-lg shadow-md overflow-y-scroll border border-blue-100">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-blue-800 mb-2">コード進行</h3>
        <p className="text-sm text-blue-600">
          カポの位置: {chordProgression.capo}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {chordProgression.codeList.map((code, index) => (
          <ChordChart key={`${code}-${index}`} chordName={code} />
        ))}
      </div>
    </div>
  );
}
