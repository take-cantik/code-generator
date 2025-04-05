"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  capo: number;
  bpm: number;
};

export default function GenerateForm() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      capo: 1,
      bpm: 120,
    },
  });

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
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          録音開始
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
      {result && <div className="mt-4 p-4 bg-gray-100 rounded">{result}</div>}
    </form>
  );
}
