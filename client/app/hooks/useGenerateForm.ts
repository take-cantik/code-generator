import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  bpm: number;
};

export const useGenerateForm = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const { register, handleSubmit, watch } = useForm<FormData>({
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
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
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

  return {
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
  };
};
