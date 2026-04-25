"use client";

import { useEffect, useState } from "react";
import NeonStarIntro from "../components/NeonStarIntro";
import { NOT_FOUND_BANK } from "@/app/template/theme/notfoundwordbank";

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
<main className="relative min-h-screen bg-black text-white overflow-hidden">
  {/* Background / atmosphere */}
  <NeonStarIntro />

  {/* CENTER 404 VISUAL */}
  <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
    <img
      src="/icons/404.png" // <- your transparent PNG
      alt="404 liquid"
      className="w-[280px] md:w-[420px] opacity-90 object-contain"
    />
  </div>

  {/* TEXT BELOW IMAGE */}
  <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
    
    <div className="mt-[220px] md:mt-[300px] text-center">
      <p className="mt-3 text-sm md:text-base text-white/60 tracking-[0.2em]">
        {phrase || "This page drifted away"}
      </p>
    </div>

  </div>
  </main>
  );
}