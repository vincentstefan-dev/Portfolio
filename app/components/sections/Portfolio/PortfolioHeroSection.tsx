"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, UserRound } from "lucide-react";

import { LOGO_BANK } from "@/app/components/template/theme/LOGO_BANK";

export default function NeonHero() {
  const [activeLogo, setActiveLogo] = useState(LOGO_BANK[0]);

  useEffect(() => {
    const totalWeight = LOGO_BANK.reduce((sum, logo) => {
      return sum + (logo.weight ?? 1);
    }, 0);

    let random = Math.random() * totalWeight;

    for (const logo of LOGO_BANK) {
      random -= logo.weight ?? 1;

      if (random <= 0) {
        setActiveLogo(logo);
        return;
      }
    }

    setActiveLogo(LOGO_BANK[0]);
  }, []);

  return (
    <section className="relative min-h-[120vh] overflow-hidden px-6 py-8 text-white sm:px-10 lg:px-14">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.18]" />

        {/* ORBIT LINES */}
        <div className="absolute left-[27%] top-[18%] h-[48rem] w-[58rem] rotate-[-13deg] rounded-[50%] border border-cyan-400/20 shadow-[0_0_60px_rgba(37,99,235,0.15)]" />
        <div className="absolute left-[24%] top-[35%] h-[34rem] w-[58rem] rotate-[-9deg] rounded-[50%] border border-blue-500/20" />
        <div className="absolute left-[34%] top-[45%] h-[36rem] w-[55rem] rotate-[18deg] rounded-[50%] border border-cyan-500/10" />

        {/* GLOW POINTS */}
        <GlowDot className="left-[34%] top-[23%]" />
        <GlowDot className="left-[28%] top-[64%]" />
        <GlowDot className="right-[22%] top-[49%]" />
      </div>

      {/* LOGO */}
      <Link href="/portfolio" className="relative z-20 inline-block">
        <img
          src={activeLogo.src}
          alt={activeLogo.alt}
          className={`h-22 w-auto object-contain ${activeLogo.glow}`}
          style={{
            opacity: activeLogo.opacity,
          }}
        />
      </Link>

      {/* MAIN HERO */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl items-center justify-start pt-20 md:pt-0">
        {/* LEFT TEXT AREA */}
        <div className="w-full max-w-[620px] md:ml-[8%]">
          <h1 className="neon-sign font-mono text-[72px] font-medium uppercase leading-[0.88] tracking-[-0.08em] text-cyan-300 sm:text-[100px] md:text-[118px] lg:text-[136px]">
            <span className="neon-word neon-word-1 block">Strategy</span>
            <span className="neon-word neon-word-2 block">Code</span>
            <span className="neon-word neon-word-3 block">Brand</span>
            <span className="neon-word neon-word-4 block">Systems</span>
          </h1>

          <div className="mt-8 flex items-start gap-6">
            <div className="relative mt-1 h-20 w-px bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,1)]">
              <span className="absolute -left-2 -top-2 text-2xl text-cyan-200 drop-shadow-[0_0_12px_rgba(34,211,238,1)]">
                ✦
              </span>
            </div>

            <p className="max-w-md text-base leading-7 text-white/85 sm:text-lg">
              Creative developer and strategist building digital experiences,
              brand systems, and expressive interfaces.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#portfolio-index"
              className="inline-flex h-14 items-center justify-center gap-5 rounded-full border border-cyan-300 bg-cyan-300/5 px-9 text-sm font-bold uppercase tracking-[0.22em] text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.85),inset_0_0_18px_rgba(34,211,238,0.12)] transition hover:bg-cyan-300/15"
            >
              View Work
              <ArrowUpRight className="h-5 w-5" />
            </Link>

            <Link
              href="/about"
              className="inline-flex h-14 items-center justify-center gap-5 rounded-full border border-cyan-300/40 bg-cyan-300/0 px-9 text-sm font-bold uppercase tracking-[0.22em] text-white/90 shadow-[0_0_12px_rgba(34,211,238,0.18)] transition hover:border-cyan-300 hover:bg-cyan-300/10 hover:text-cyan-100"
            >
              About Me
              <UserRound className="h-4 w-4 text-cyan-300" />
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE FLOATING XP WINDOW STACK */}
        <div className="pointer-events-none absolute right-[4%] top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 lg:block">
          {/* Back window */}
          <div className="absolute right-2 top-10 h-[250px] w-[360px] rotate-[8deg] overflow-hidden rounded-[16px] border border-cyan-300/30 bg-cyan-950/20 shadow-[0_0_35px_rgba(34,211,238,0.22)] backdrop-blur-xl">
            <div className="flex h-9 items-center justify-between border-b border-white/20 bg-gradient-to-b from-[#5fb8ff]/70 via-[#246ee8]/70 to-[#083eb8]/70 px-3">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-gradient-to-b from-[#7eff9a] to-[#15803d] text-[10px] font-black text-white">
                  K
                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white drop-shadow">
                  brand.sys
                </span>
              </div>

              <div className="flex gap-1">
                <span className="h-4 w-4 rounded-sm border border-white/50 bg-blue-300/80" />
                <span className="h-4 w-4 rounded-sm border border-white/50 bg-blue-400/80" />
                <span className="h-4 w-4 rounded-sm border border-white/50 bg-red-400/90" />
              </div>
            </div>

            <div className="relative h-full bg-gradient-to-b from-white/15 via-cyan-950/25 to-black/30 p-5">
              <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:22px_22px]" />

              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-100/70">
                  Identity Layer
                </p>

                <div className="mt-5 space-y-3">
                  <div className="h-2 w-48 rounded-full bg-cyan-200/40" />
                  <div className="h-2 w-36 rounded-full bg-white/20" />
                  <div className="h-2 w-52 rounded-full bg-white/15" />
                </div>
              </div>
            </div>
          </div>

          {/* Middle window */}
          <div className="absolute right-28 top-40 h-[230px] w-[330px] rotate-[-7deg] overflow-hidden rounded-[16px] border border-cyan-300/35 bg-cyan-950/25 shadow-[0_0_40px_rgba(34,211,238,0.26)] backdrop-blur-xl">
            <div className="flex h-9 items-center justify-between border-b border-white/20 bg-gradient-to-b from-[#5fb8ff]/75 via-[#246ee8]/75 to-[#083eb8]/75 px-3">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-gradient-to-b from-[#7eff9a] to-[#15803d] text-[10px] font-black text-white">
                  K
                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white drop-shadow">
                  code.dll
                </span>
              </div>

              <div className="flex gap-1">
                <span className="h-4 w-4 rounded-sm border border-white/50 bg-blue-300/80" />
                <span className="h-4 w-4 rounded-sm border border-white/50 bg-blue-400/80" />
                <span className="h-4 w-4 rounded-sm border border-white/50 bg-red-400/90" />
              </div>
            </div>

            <div className="relative h-full bg-gradient-to-b from-white/12 via-cyan-950/25 to-black/35 p-5">
              <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:22px_22px]" />

              <div className="relative z-10 font-mono text-[11px] leading-6 text-cyan-100/80">
                <p>
                  <span className="text-[#b7ff5f]">const</span> system =
                  "online";
                </p>
                <p>
                  <span className="text-[#b7ff5f]">build</span>() → ready
                </p>
                <p>
                  <span className="text-[#b7ff5f]">deploy</span>() → active
                </p>
              </div>
            </div>
          </div>

          {/* Front window */}
          <div className="absolute right-8 top-64 h-[260px] w-[390px] rotate-[3deg] overflow-hidden rounded-[18px] border border-cyan-200/60 bg-cyan-950/30 shadow-[0_0_55px_rgba(34,211,238,0.35),inset_0_0_30px_rgba(255,255,255,0.06)] backdrop-blur-xl">
            <div className="flex h-10 items-center justify-between border-b border-white/25 bg-gradient-to-b from-[#6fc7ff] via-[#2877f0] to-[#0c44bf] px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-gradient-to-b from-[#7eff9a] to-[#15803d] text-[11px] font-black text-white shadow-[0_0_10px_rgba(74,222,128,0.7)]">
                  K
                </span>

                <span className="text-[11px] font-black uppercase tracking-[0.24em] text-white drop-shadow">
                  portfolio.exe
                </span>
              </div>

              <div className="flex gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-white/60 bg-gradient-to-b from-[#8ec7ff] to-[#2563eb] text-[10px] font-bold text-white">
                  _
                </span>

                <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-white/60 bg-gradient-to-b from-[#8ec7ff] to-[#2563eb] text-[9px] font-bold text-white">
                  □
                </span>

                <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-white/60 bg-gradient-to-b from-[#ff9b7a] to-[#d82020] text-[11px] font-black text-white">
                  ×
                </span>
              </div>
            </div>

            <div className="relative h-full bg-gradient-to-b from-white/18 via-cyan-950/30 to-black/40 p-6">
              <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:22px_22px]" />

              <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-[55px]" />

              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.38em] text-cyan-100/70">
                  Project Index
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-cyan-300/30 bg-white/10 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">
                      Websites
                    </p>

                    <p className="mt-2 text-xl font-black uppercase text-cyan-100">
                      04
                    </p>
                  </div>

                  <div className="rounded-lg border border-cyan-300/30 bg-white/10 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">
                      Systems
                    </p>

                    <p className="mt-2 text-xl font-black uppercase text-cyan-100">
                      09
                    </p>
                  </div>

                  <div className="col-span-2 rounded-lg border border-cyan-300/30 bg-white/10 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">
                      Signal
                    </p>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/30">
                      <div className="h-full w-[82%] rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small glow accents */}
          <span className="absolute left-10 top-24 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(34,211,238,1)]" />
          <span className="absolute bottom-12 right-4 h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(165,243,252,1)]" />
        </div>
      </main>
    </section>
  );
}

function GlowDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,1),0_0_34px_rgba(37,99,235,0.95),0_0_70px_rgba(14,165,233,0.7)] ${className}`}
    />
  );
}