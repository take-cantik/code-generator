import MusicAnalyzer from "./components/MusicAnalyzer";

export default function Home() {
  return (
    <main className="w-full max-h-screen px-8 py-16 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-screen-lg mx-auto">
        <div className="relative">
          <h1 className="text-4xl font-bold text-center mb-12 text-sky-700">
            MyUret
          </h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent"></div>
        </div>
        <MusicAnalyzer />
      </div>
    </main>
  );
}
