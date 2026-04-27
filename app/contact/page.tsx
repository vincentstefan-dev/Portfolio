"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NeonStarIntro from "../components/NeonStarIntro";
import ThemedBackground from "../template/theme/ThemedBackground";

const CONTACT_CARTRIDGES = [
  {
    id: "call",
    image: "/catridges/purple.png",
    eyebrow: "Route One",
    title: "Book a Call",
    description: "Schedule a short call to discuss the project direction.",
    button: "Book Slot",
  },
  {
    id: "inquiry",
    image: "/catridges/crystal.png",
    eyebrow: "Main Route",
    title: "Send Inquiry",
    description:
      "For projects, collaborations, websites, brand systems, or strategy work.",
    button: "Send Signal",
  },
  {
    id: "message",
    image: "/catridges/red.png",
    eyebrow: "Quick Route",
    title: "Quick Message",
    description: "Send a short message if you already know what you need.",
    button: "Message Me",
  },
];

export default function ContactPage() {
  const playerRef = useRef<any>(null);
  const [isInitialBlur, setIsInitialBlur] = useState(true);
  const [activeIndex, setActiveIndex] = useState(1);

  const playBlurIntro = useCallback(() => {
    setIsInitialBlur(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.setTimeout(() => {
          setIsInitialBlur(false);
        }, 50);
      });
    });
  }, []);

  useEffect(() => {
    playBlurIntro();
  }, [playBlurIntro]);

  const handlePlayerReady = useCallback((player: any) => {
    playerRef.current = player;
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <NeonStarIntro />

      <ThemedBackground onReady={handlePlayerReady} />

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-1/2 top-[48%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 blur-[180px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <div className="stars stars-far" />
        <div className="stars stars-mid" />
        <div className="stars stars-near" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[3] mix-blend-overlay opacity-20">
        <div className="noise" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[4] bg-blue-900/10 mix-blend-color" />

      <div
        className={`relative z-10 min-h-screen transition-all duration-[400ms] ease-out ${
          isInitialBlur ? "scale-[1.01] blur-sm" : "scale-100 blur-0"
        }`}
      >
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.45em] text-white/50">
              Contact Node
            </p>

            <h1 className="text-3xl font-semibold tracking-[0.12em] text-white md:text-5xl">
              Choose a Signal
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/55 md:text-base">
              Select the best way to start the conversation.
            </p>
          </div>

          <div className="relative flex h-[620px] w-full max-w-6xl items-center justify-center overflow-visible">
            {CONTACT_CARTRIDGES.map((item, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`absolute cursor-pointer border-0 bg-transparent p-0 text-left transition-all duration-500 ease-out ${
                    isActive
                      ? "z-30 opacity-100"
                      : "z-10 opacity-55 hover:opacity-80"
                  }`}
                  style={{
                    transform: `translateX(${offset * 270}px) scale(${
                      isActive ? 1 : 0.72
                    })`,
                  }}
                >
                  <div className="relative w-[500px] max-w-[85vw]">
                    <img
                      src={item.image}
                      alt={`${item.title} cartridge`}
                      className="block w-full select-none object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.65)] drop-shadow-[0_0_45px_rgba(120,180,255,0.25)]"
                    />

                    <div className="absolute left-[23%] top-[35%] z-10 flex h-[60%] w-[55%] flex-col">
                      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/45">
                        {item.eyebrow}
                      </p>

                      <h2 className="text-2xl font-semibold uppercase tracking-[0.18em] text-cyan-100">
                        {item.title}
                      </h2>

                      <p className="mt-5 text-sm leading-6 text-white/60">
                        {item.description}
                      </p>

                      <div className="mt-7 flex w-full items-center justify-between border border-white/25 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.25em] text-white/80 transition hover:bg-white/15">
                        {item.button}
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}