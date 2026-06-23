"use client";

import { useEffect, useState } from "react";

const rotatingLogos = [
  {
    src: "/logos/8BIT.webp",
    alt: "Koyote 8-bit logo",
  },
  {
    src: "/logos/16BIT.webp",
    alt: "Koyote 16-bit logo",
  },
  {
    src: "/logos/alien.webp",
    alt: "Koyote alien logo",
  },
  {
    src: "/logos/bluecrt.webp",
    alt: "Koyote blue CRT logo",
  },
  {
    src: "/logos/default.webp",
    alt: "Koyote default logo",
  },
  {
    src: "/logos/frutigerclean.webp",
    alt: "Koyote frutigerclean logo",
  },
  {
    src: "/logos/gamecube.webp",
    alt: "Koyote GameCube logo",
  },
  {
    src: "/logos/IOS.webp",
    alt: "Koyote iOS logo",
  },
  {
    src: "/logos/LINES.webp",
    alt: "Koyote lines logo",
  },
  {
    src: "/logos/liquidmetal.webp",
    alt: "Koyote liquid metal logo",
  },
  {
    src: "/logos/Microsoft.webp",
    alt: "Koyote Microsoft logo",
  },
  {
    src: "/logos/minecraft.webp",
    alt: "Koyote Minecraft logo",
  },
  {
    src: "/logos/N64.webp",
    alt: "Koyote N64 logo",
  },
  {
    src: "/logos/plasma.webp",
    alt: "Koyote plasma logo",
  },
  {
    src: "/logos/polygon.webp",
    alt: "Koyote polygon logo",
  },
  {
    src: "/logos/purpleplasma.webp",
    alt: "Koyote purple plasma logo",
  },
  {
    src: "/logos/shineblue.webp",
    alt: "Koyote shine blue logo",
  },
  {
    src: "/logos/sleekps2.webp",
    alt: "Koyote sleek PS2 logo",
  },
  {
    src: "/logos/voxel.webp",
    alt: "Koyote voxel logo",
  },
  {
    src: "/logos/web2.0.webp",
    alt: "Koyote web 2.0 logo",
  },
  {
    src: "/logos/whitelines.webp",
    alt: "Koyote white lines logo",
  },
];

export default function RotatingLogoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % rotatingLogos.length;
      });
    }, 600);

    return () => window.clearInterval(interval);
  }, []);

  const activeLogo = rotatingLogos[activeIndex];

  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-visible px-6 py-20 text-[#F3F8FF] sm:px-10 lg:px-14">
      <div className="relative grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* LEFT DESCRIPTION */}
        <div className="relative z-10 max-w-xl text-left">
          {/* SMALL LEFT-SIDE DECOR */}
          <div className="pointer-events-none absolute -left-8 top-0 hidden h-full w-px bg-[#67E8F9]/20 shadow-[0_0_18px_rgba(34,211,238,0.35)] md:block" />

          <div className="pointer-events-none absolute -left-[2.15rem] top-0 hidden h-2 w-2 rounded-full bg-[#67E8F9] shadow-[0_0_14px_rgba(34,211,238,0.85)] md:block" />

          <div className="pointer-events-none absolute -left-[2.15rem] top-[36%] hidden h-2 w-2 rounded-full bg-[#67E8F9]/70 shadow-[0_0_12px_rgba(34,211,238,0.65)] md:block" />

          <div className="pointer-events-none absolute -left-[2.15rem] bottom-0 hidden h-2 w-2 rounded-full bg-[#67E8F9]/40 md:block" />

          <div className="mb-5 flex items-center gap-4">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.42em] text-[#67E8F9] drop-shadow-[0_0_14px_rgba(34,211,238,0.55)]">
              Logo Meaning
            </p>

            <div className="hidden h-px w-20 bg-[#67E8F9]/35 shadow-[0_0_12px_rgba(34,211,238,0.35)] sm:block" />
          </div>

          <h2 className="neon-sign neon-word neon-word-1 font-mono text-[64px] font-medium uppercase leading-none tracking-[-0.08em] text-cyan-300 sm:text-[82px] md:text-[96px] lg:text-[112px]">
            Logo
          </h2>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px w-40 bg-[#67E8F9]/50 shadow-[0_0_18px_rgba(34,211,238,0.6)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#67E8F9] shadow-[0_0_12px_rgba(34,211,238,0.85)]" />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <MiniTag>Help</MiniTag>
            <MiniTag>Growth</MiniTag>
            <MiniTag>Movement</MiniTag>
          </div>

          <p className="mt-8 text-base font-medium leading-7 text-[#F3F8FF]/80 sm:text-lg">
            The KOYOTE logo represents help as the foundation of growth. Its
            three human silhouettes show a person moving forward through
            different phases of development. Each step symbolizes progress,
            transformation, and evolution.
          </p>

          <p className="mt-5 text-base font-medium leading-7 text-[#F3F8FF]/80 sm:text-lg">
            The core idea is that growth does not happen alone. We move forward
            by helping others, and through helping others, we also help
            ourselves.
          </p>

          {/* CORE MESSAGE */}
          <div className="mt-8 rounded-2xl border border-[#67E8F9]/20 bg-[#05070A]/35 p-5 shadow-[0_0_26px_rgba(34,211,238,0.12),inset_0_0_18px_rgba(103,232,249,0.04)] backdrop-blur-md">
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-[#67E8F9] drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              Core Message
            </p>

            <p className="text-base font-medium leading-7 text-[#F3F8FF]/80 sm:text-lg">
              KOYOTE stands for the belief that goals are achieved collectively,
              not individually. Each silhouette marks a phase of movement,
              showing that personal and creative growth is a process. The final
              message is simple: we grow when we help, and we help because
              growth is shared.
            </p>
          </div>
        </div>

        {/* RIGHT ROTATING LOGO */}
        <div className="relative z-10 flex w-full flex-col items-center justify-center text-center">
          {/* FIXED ROTATING LOGO FRAME */}
          <div className="relative flex h-[34rem] w-full max-w-[48rem] shrink-0 items-center justify-center overflow-visible">
            <img
              key={activeLogo.src}
              src={activeLogo.src}
              alt={activeLogo.alt}
              className="block h-full w-full object-contain drop-shadow-[0_0_42px_rgba(34,211,238,0.75)]"
              onError={() => {
                console.error("Logo failed to load:", activeLogo.src);
              }}
            />
          </div>

          {/* FIXED WORDMARK FRAME - BIGGER */}
          <div className="mt-2 flex h-[20rem] w-full max-w-[72rem] shrink-0 items-center justify-center overflow-visible">
            <img
              src="/OSnames/16bit.webp"
              alt="Koyote 16-bit wordmark"
              className="block h-full w-full scale-125 object-contain drop-shadow-[0_0_42px_rgba(34,211,238,0.75)]"
              onError={() => {
                console.error("Wordmark failed to load: /OSnames/16bit.webp");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[#FFFFFF]/25 bg-[#FFFFFF]/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#FFFFFF]/85 shadow-[0_0_14px_rgba(34,211,238,0.12)]">
      {children}
    </span>
  );
}