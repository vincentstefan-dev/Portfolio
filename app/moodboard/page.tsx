"use client";

import { useEffect, useState } from "react";
import NeonStarIntro from "../components/NeonStarIntro";
import { NOT_FOUND_BANK } from "@/app/template/theme/notfoundwordbank";
import { House} from "lucide-react";
import Link from "next/link";

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

          {/* BACK BUTTON */}
        <div className="fixed bottom-6 right-6 z-50">
          <Link
            href="/"
            aria-label="Return to portfolio"
            className="group flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition hover:bg-white/50"
          >
            <House
              className="h-5 w-5 text-white transition-transform duration-100 group-hover:scale-110"
              strokeWidth={1.5}
            />
          </Link>
        </div>
        

  {/* CENTER 404 VISUAL */}
  <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
    <img
      src="/Icons/404.png" // <- your transparent PNG
      alt="404 "
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