"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, UserRound } from "lucide-react";

import { LOGO_BANK } from "@/app/components/template/theme/LOGO_BANK";
import ProjectCarousel from "@/app/components/sections/Portfolio/ProjectCarousel";

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
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl items-center justify-center pt-20 md:pt-0">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT TEXT BLOCK */}
          <div className="w-full max-w-[760px] text-left">
            <h1 className="neon-sign font-mono text-[72px] font-medium uppercase leading-[0.88] tracking-[-0.08em] text-cyan-300 sm:text-[100px] md:text-[118px] lg:text-[136px]">
              <span className="neon-word neon-word-1 block">Portfolio:</span>
              <span className="neon-word neon-word-2 block">Projects</span>
              <span className="neon-word neon-word-3 block">Brands</span>
              <span className="neon-word neon-word-4 block">Codes</span>
            </h1>

            <div className="mt-8 flex items-start gap-6">
              <div className="relative mt-1 h-20 w-px bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,1)]">
                <span className="absolute -left-2.5 -top-7 text-2xl text-cyan-200 drop-shadow-[0_0_12px_rgba(34,211,238,1)]">
                  ✦
                </span>
              </div>

              <p className="max-w-md text-base leading-7 text-white/85 sm:text-lg">
              Dive into my professional projects, see how they are built, exectured and updated. 
              Hopefully they can give you a good idea of what i´m capable of and the kind of work i do!
              </p>
            </div>

            <div className="mt-9 flex flex-col justify-start gap-4 sm:flex-row">
              <Link
                href="#portfolio-index"
                className="inline-flex h-14 items-center justify-center gap-5 rounded-full border border-cyan-300 bg-cyan-300/5 px-9 text-sm font-bold uppercase tracking-[0.22em] text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.85),inset_0_0_18px_rgba(34,211,238,0.12)] transition hover:bg-cyan-300/15"
              >
                View all projects
                <ArrowUpRight className="h-5 w-5" />
              </Link>

              <Link
                href="/aboutme"
                className="inline-flex h-14 items-center justify-center gap-5 rounded-full border border-cyan-300/40 bg-cyan-300/0 px-9 text-sm font-bold uppercase tracking-[0.22em] text-white/90 shadow-[0_0_12px_rgba(34,211,238,0.18)] transition hover:border-cyan-300 hover:bg-cyan-300/10 hover:text-cyan-100"
              >
                About Me
                <UserRound className="h-4 w-4 text-cyan-300" />
              </Link>
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <ProjectCarousel />
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