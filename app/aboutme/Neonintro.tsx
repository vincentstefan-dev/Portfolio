import NeonStarIntro from "../components/NeonStarIntro";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <NeonStarIntro />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">Main Content</h1>
      </div>
    </main>
  );
}