"use client";

import { useEffect, useState } from "react";
import NeonStarIntro from "../components/NeonStarIntro";
import { NOT_FOUND_BANK } from "@/app/template/theme/notfoundwordbank.tsx";

export default function Page() {
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    setPhrase(NOT_FOUND_BANK[0]);

    const interval = window.setInterval(() => {
      setPhrase(NOT_FOUND_BANK[Math.floor(Math.random() * NOT_FOUND_BANK.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white">
      <NeonStarIntro />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold text-center">
          {phrase || "We are working on it!"}
        </h1>
      </div>
    </main>
  );
}