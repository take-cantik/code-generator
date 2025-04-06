import GenerateForm from "./components/GenerateForm";

export default function Home() {
  return (
    <main className="max-w-screen-lg w-full max-h-screen mx-auto px-8 py-16">
      <div className="relative">
        <h1 className="text-4xl font-bold text-center mb-8">MyUret</h1>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>
      <GenerateForm />
    </main>
  );
}
