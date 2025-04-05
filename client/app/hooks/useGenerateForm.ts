import { useState, useRef } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  bpm: number;
  audioData?: Blob;
};

export const useGenerateForm = () => {
  const [codeList, setCodeList] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

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
      if (data.audioData) {
        formData.append("audio", data.audioData, "recording.webm");
      }

      const response = await fetch("http://localhost:8080/code", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      setCodeList(responseData.code_list);
    } catch (error) {
      console.error("Error:", error);
      setCodeList(null);
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
    codeList,
    audioUrl,
    audioPlayerRef,
    bpm,
  };
};
