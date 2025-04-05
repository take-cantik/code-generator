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
  width = 100,
  height = 120,
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
      position: chordData.position || 1,
    });

    // コードを描画
    chord.draw({
      chord: chordData.positions,
      barres: chordData.barres || [],
    });
  }, [chordName, width, height]);

  return (
    <div className="inline-block text-center">
      <div className="transform -rotate-90" ref={containerRef} />
      <div className="mt-2 text-sm font-medium">{chordName}</div>
    </div>
  );
}
