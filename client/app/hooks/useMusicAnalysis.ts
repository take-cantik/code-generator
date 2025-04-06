import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  bpm: number;
  audioData?: Blob;
};

type ChordProgression = {
  capo: number;
  codeList: string[];
};

export const useMusicAnalysis = () => {
  const [chordProgression, setCodeProgression] =
    useState<ChordProgression | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const audioBlobRef = useRef<Blob | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      bpm: 120,
    },
  });

  const bpm = watch("bpm");

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
        audioBlobRef.current = audioBlob;
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setValue("audioData", audioBlob);
      };

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
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("bpm", data.bpm.toString());

      if (!audioBlobRef.current) {
        alert("録音データがありません。録音を開始してください。");
        setIsLoading(false);
        return;
      }

      formData.append("audio", audioBlobRef.current, "recording.webm");

      const response = await fetch("http://localhost:8080/code", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      // レスポンスデータの検証
      if (
        responseData.codeList &&
        Array.isArray(responseData.codeList) &&
        responseData.codeList.length > 0
      ) {
        setCodeProgression({
          codeList: responseData.codeList,
          capo: responseData.capo || 0,
        });
      } else {
        setCodeProgression(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setCodeProgression(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};
