"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  capo: number;
  bpm: number;
};

export default function GenerateForm() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const metronomeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      capo: 1,
      bpm: 120,
    },
  });

  const bpm = watch("bpm");

  const playMetronome = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    // オシレーターとゲインノードの作成
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    // 音の設定
    oscillator.type = "sine";
    oscillator.frequency.value = 880; // A5の音
    gainNode.gain.value = 0.1;

    // 接続
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    // 音を鳴らす
    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 0.1);

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
  };

  const startMetronome = () => {
    if (metronomeIntervalRef.current) {
      clearInterval(metronomeIntervalRef.current);
    }

    const interval = (60 / bpm) * 1000; // BPMからミリ秒に変換
    metronomeIntervalRef.current = setInterval(playMetronome, interval);
  };

  const stopMetronome = () => {
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

  useEffect(() => {
    return () => {
      stopMetronome();
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      // メトロノームを開始
      startMetronome();

      // 録音を開始
      mediaRecorder.start(100);
      setIsRecording(true);
    } catch (error) {
      console.error("録音の開始に失敗しました:", error);
      alert("マイクへのアクセスが拒否されました");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);

      // メトロノームを停止
      stopMetronome();
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setResult(responseData.message);
    } catch (error) {
      console.error("Error:", error);
      setResult("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">
          カポ位置
          <select
            {...register("capo", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
      </div>
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
          onClick={startRecording}
          disabled={isRecording}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isRecording ? "録音中..." : "録音開始"}
        </button>
        <button
          type="button"
          onClick={stopRecording}
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
    </form>
  );
}
