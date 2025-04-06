"use client";

type AudioPlayerProps = {
  audioUrl: string;
  audioPlayerRef: React.RefObject<HTMLAudioElement | null>;
};

export default function AudioPlayer({
  audioUrl,
  audioPlayerRef,
}: AudioPlayerProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-sky-100">
      <h3 className="text-lg font-medium text-sky-700 mb-4">録音した音声</h3>
      <audio ref={audioPlayerRef} src={audioUrl} controls className="w-full" />
    </div>
  );
}
