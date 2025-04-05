import { useRef, useEffect } from "react";

type MetronomeConfig = {
  frequency?: number;
  volume?: number;
  duration?: number;
};

export const useMetronome = (bpm: number, config: MetronomeConfig = {}) => {
  const {
    frequency = 880, // A5の音
    volume = 0.1,
    duration = 0.1,
  } = config;

  const metronomeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const playClick = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    // オシレーターとゲインノードの作成
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    // 音の設定
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;

    // 接続
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    // 音を鳴らす
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + duration);

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
  };

  const start = () => {
    if (metronomeIntervalRef.current) {
      clearInterval(metronomeIntervalRef.current);
    }

    const interval = (60 / bpm) * 1000; // BPMからミリ秒に変換
    metronomeIntervalRef.current = setInterval(playClick, interval);
  };

  const stop = () => {
    if (metronomeIntervalRef.current) {
      clearInterval(metronomeIntervalRef.current);
      metronomeIntervalRef.current = null;
    }

    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }

    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  // コンポーネントのアンマウント時にクリーンアップ
  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return {
    start,
    stop,
  };
};
