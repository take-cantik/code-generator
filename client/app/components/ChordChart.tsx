"use client";

import { useEffect, useRef } from "react";
import { ChordBox } from "vexchords";
import { GUITAR_CHORDS } from "../constants/chords";

type ChordChartProps = {
  chordName: string;
  width?: number;
  height?: number;
};

export default function ChordChart({
  chordName,
  width = 120,
  height = 150,
}: ChordChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 既存のキャンバスをクリア
    containerRef.current.innerHTML = "";

    const chordData = GUITAR_CHORDS[chordName];
    if (!chordData) {
      console.warn(`Chord data not found for: ${chordName}`);
      return;
    }

    // VexChordsのフォーマットにデータを変換
    const chord = new ChordBox(containerRef.current, {
      width,
      height,
      numStrings: 6,
      numFrets: 5,
      showTuning: false,
      position: 1,
    });

    // コードを描画
    chord.draw({
      chord: chordData.positions,
      barres: chordData.barres || [],
    });
  }, [chordName, width, height]);

  const chordData = GUITAR_CHORDS[chordName];
  const position = chordData?.position;

  return (
    <div className="inline-block text-center w-[150px] h-[180px] p-4 relative">
      <div
        className="transform -rotate-90 w-full h-full flex items-center justify-center"
        ref={containerRef}
      />
      {position && (
        <div className="absolute bottom-8 left-[42px]">{position}</div>
      )}
      <div className="-mt-4 text-sm font-medium">{chordName}</div>
    </div>
  );
}
