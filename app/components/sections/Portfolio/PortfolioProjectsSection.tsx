"use client";

import Link from "next/link";
import {
  Code2,
  ImageIcon,
  Layers3,
  PenTool,
  Play,
  Scan,
  Type,
} from "lucide-react";

const toolIcons = [
  {
    label: "Vector",
    icon: PenTool,
    className: "left-[21%] top-[8%] rotate-[-7deg]",
  },
  {
    label: "Video",
    icon: Play,
    className: "right-[30%] top-[7%] rotate-[2deg]",
  },
  {
    label: "Layers",
    icon: Layers3,
    className: "right-[12%] top-[18%] rotate-[8deg]",
  },
  {
    label: "Type",
    icon: Type,
    className: "left-[8%] top-[52%] rotate-[-3deg]",
  },
  {
    label: "Code",
    icon: Code2,
    className: "left-[24%] bottom-[13%] rotate-[1deg]",
  },
  {
    label: "Motion",
    icon: Scan,
    className: "right-[28%] bottom-[13%] rotate-[-5deg]",
  },
  {
    label: "Image",
    icon: ImageIcon,
    className: "right-[9%] bottom-[25%] rotate-[4deg]",
  },
];

export default function PortfolioProjectsSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent text-white">
      {/* TRANSPARENT EFFECT LAYERS */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.13),transparent_40%),radial-gradient(circle_at_70%_35%,rgba(255,120,60,0.08),transparent_34%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:42px_42px]" />

      <Orbit className="left-1/2 top-1/2 h-[760px] w-[1180px] -translate-x-1/2 -translate-y-1/2 rotate-[-12deg]" />
      <Orbit className="left-[52%] top-[52%] h-[520px] w-[1320px] -translate-x-1/2 -translate-y-1/2 rotate-[16deg] opacity-50" />
      <Orbit className="left-[48%] top-[52%] h-[420px] w-[980px] -translate-x-1/2 -translate-y-1/2 rotate-[-28deg] opacity-40" />

      <div className="pointer-events-none absolute left-8 top-8 z-20">
        <p className="tracking-[0.42em] text-[#c69b76]">KOYOTE</p>

        <div className="mt-5 h-16 border-l border-cyan-300/70 pl-4">
          <div className="h-1 w-24 bg-cyan-300/70" />
          <div className="mt-3 h-px w-32 bg-white/10" />
          <div className="mt-2 h-px w-20 bg-white/10" />
        </div>
      </div>

      <div className="pointer-events-none absolute left-[8%] top-[20%] z-20 hidden rotate-[-10deg] lg:block">
        <TrashCan />
      </div>

      {toolIcons.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className={`pointer-events-none absolute z-20 hidden lg:flex ${item.className}`}
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-[1.6rem] border border-cyan-300/60 bg-cyan-950/20 shadow-[0_0_28px_rgba(34,211,238,0.35)] backdrop-blur-md">
              <Icon className="h-10 w-10 text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
            </div>
          </div>
        );
      })}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
        <div className="relative flex w-full max-w-6xl flex-col items-center">
          {/* WINDOWS XP / KOYOTE WINDOW */}
          <div className="relative w-full max-w-[980px] overflow-hidden rounded-[18px] border border-[#7dbbff]/70 bg-[#d7ecff]/10 shadow-[0_0_55px_rgba(34,211,238,0.35),inset_0_0_40px_rgba(255,255,255,0.08)] backdrop-blur-xl">
            {/* XP BLUE TITLE BAR */}
            <div className="relative flex h-12 items-center justify-between overflow-hidden border-b border-white/30 bg-gradient-to-b from-[#4bb3ff] via-[#236ee8] to-[#0b3fbd] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_0_28px_rgba(59,130,246,0.45)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-white/25" />

              <div className="relative z-10 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-gradient-to-b from-[#6df58f] to-[#16883a] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_0_10px_rgba(74,222,128,0.8)]">
                  <span className="text-[11px] font-black text-white drop-shadow">
                    K
                  </span>
                </div>

                <p className="text-sm font-bold tracking-[0.14em] text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                  KOYOTE PROJECTS.EXE
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-1.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-white/60 bg-gradient-to-b from-[#8ec7ff] to-[#2563eb] text-sm font-bold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                  _
                </span>

                <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-white/60 bg-gradient-to-b from-[#8ec7ff] to-[#2563eb] text-[11px] font-bold leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                  □
                </span>

                <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-white/60 bg-gradient-to-b from-[#ff9b7a] to-[#d82020] text-sm font-black leading-none text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_0_12px_rgba(248,113,113,0.7)]">
                  ×
                </span>
              </div>
            </div>

  <div className="relative z-10 flex min-h-[250px] flex-col items-center justify-center">
  <h2 className="flex w-full items-center justify-center text-center font-black leading-none tracking-[-0.1em]">
    <span className="inline-flex w-full max-w-[860px] scale-x-[1.04] items-center justify-center gap-[0.035em] text-[clamp(3.6rem,10vw,8.8rem)] leading-none">
      <span className="text-cyan-300 drop-shadow-[0_0_28px_rgba(34,211,238,1)] [text-shadow:0_0_38px_rgba(34,211,238,0.95)]">
        P
      </span>

      <span className="text-violet-300 drop-shadow-[0_0_22px_rgba(196,181,253,0.9)]">
        R
      </span>

      <span className="text-emerald-300 drop-shadow-[0_0_24px_rgba(110,231,183,0.9)]">
        O
      </span>

      <span className="text-blue-400 drop-shadow-[0_0_24px_rgba(96,165,250,1)]">
        J
      </span>

      <span className="text-cyan-200 drop-shadow-[0_0_24px_rgba(165,243,252,0.9)]">
        E
      </span>

      <span className="text-orange-300 drop-shadow-[0_0_24px_rgba(253,186,116,0.95)]">
        C
      </span>

      <span className="bg-gradient-to-b from-white via-zinc-300 to-zinc-700 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,255,255,0.8)]">
        T
      </span>

      <span className="bg-gradient-to-b from-white via-zinc-300 to-zinc-700 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,255,255,0.8)]">
        S
      </span>

      <span className="hidden bg-gradient-to-b from-white via-zinc-200 to-zinc-700 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(255,255,255,0.9)] md:inline">
        !
      </span>
    </span>
  </h2>

  <div className="mt-8 flex w-full max-w-[720px] items-center justify-between rounded-md border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.32em] text-cyan-100/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] backdrop-blur-md">
    <span>Creative Systems</span>
    <span className="hidden text-[#b7ff5f] md:inline">Status: Online</span>
  </div>
</div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-center gap-5 md:flex-row">
            <Link
              href="#portfolio-index"
              className="group rounded-full border border-cyan-300/70 bg-cyan-950/10 px-8 py-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.35)] backdrop-blur-md transition hover:bg-cyan-300/10"
            >
              See projects
              <span className="ml-3 inline-block transition group-hover:translate-x-1">
                ↗
              </span>
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.35em] text-white/80 backdrop-blur-md transition hover:border-cyan-300/60 hover:text-cyan-100"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-8 z-20">
        <p className="text-xs uppercase tracking-[0.45em] text-cyan-200">
          Creative Systems
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/40" />
          <span className="h-px w-28 bg-white/20" />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 right-8 z-20 hidden text-xs uppercase tracking-[0.45em] text-[#c69b76] md:block">
        Build · Design · Code
      </div>
    </section>
  );
}

function Orbit({ className }: { className: string }) {
  return (
    <div
      className={`pointer-events-none absolute z-[1] rounded-[50%] border border-cyan-300/20 ${className}`}
    >
      <span className="absolute left-[18%] top-[24%] h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
      <span className="absolute right-[12%] top-[54%] h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
      <span className="absolute bottom-[12%] left-[42%] h-2 w-2 rounded-full bg-cyan-300/80 shadow-[0_0_16px_rgba(34,211,238,0.8)]" />
    </div>
  );
}

function TrashCan() {
  return (
    <div className="relative h-32 w-24">
      <div className="absolute left-4 top-0 h-5 w-16 rounded-t-lg border border-cyan-200/50 bg-zinc-300/70 shadow-[0_0_18px_rgba(34,211,238,0.45)] backdrop-blur-md" />

      <div className="absolute left-1 top-4 h-28 w-[5.5rem] rounded-b-2xl rounded-t-md border border-cyan-200/40 bg-gradient-to-r from-zinc-700/50 via-zinc-200/60 to-zinc-600/50 shadow-[0_0_30px_rgba(34,211,238,0.35)] backdrop-blur-md">
        <div className="mx-auto mt-3 flex h-20 w-16 justify-between px-2">
          <span className="h-full w-1 rounded-full bg-white/35" />
          <span className="h-full w-1 rounded-full bg-white/35" />
          <span className="h-full w-1 rounded-full bg-white/35" />
        </div>
      </div>
    </div>
  );
}