"use client";

import Link from "next/link";
import {
  Code2,
  FolderKanban,
  ImageIcon,
  Layers3,
  PenTool,
  Play,
  Scan,
  Type,
} from "lucide-react";

const toolIcons = [
  {
    label: "Projects",
    icon: FolderKanban,
    className: "left-[8%] top-[20%] rotate-[-10deg]",
  },
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
      {/* BLUE / WHITE PALETTE EFFECT LAYERS */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.13),transparent_40%),radial-gradient(circle_at_70%_35%,rgba(37,99,235,0.09),transparent_36%)]" />


      <div className="pointer-events-none absolute left-8 top-8 z-20">
        <div className="mt-5 h-16 border-l border-cyan-300/70 pl-4">
          <div className="h-1 w-24 bg-cyan-300/70 shadow-[0_0_16px_rgba(34,211,238,0.65)]" />
          <div className="mt-3 h-px w-32 bg-white/10" />
          <div className="mt-2 h-px w-20 bg-white/10" />
        </div>
      </div>

      {toolIcons.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className={`pointer-events-none absolute z-20 hidden lg:flex ${item.className}`}
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-[1.6rem] border border-cyan-300/45 bg-[#05070A]/45 shadow-[0_0_28px_rgba(34,211,238,0.32),inset_0_0_18px_rgba(103,232,249,0.06)] backdrop-blur-md">
              <Icon className="h-10 w-10 text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
            </div>
          </div>
        );
      })}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
        <div className="relative flex w-full max-w-6xl flex-col items-center">
          {/* PROJECTS TEXT */}
          <div className="relative flex min-h-[250px] w-full items-center justify-center">
            <h2 className="flex w-full items-center justify-center text-center font-black leading-none tracking-[-0.1em]">
              <span className="inline-flex w-full max-w-[900px] scale-x-[1.04] items-center justify-center gap-[0.035em] bg-gradient-to-b from-white via-cyan-100 to-blue-200 bg-clip-text text-[clamp(3.6rem,10vw,8.8rem)] leading-none text-transparent drop-shadow-[0_0_28px_rgba(34,211,238,0.72)] [text-shadow:0_0_42px_rgba(34,211,238,0.65)]">
                PROJECTS

               <span className="neon-word neon-word-2 block">!</span>
              </span>
            </h2>

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-[80px]" />
          </div>

          <div className="mt-14 flex flex-col items-center justify-center gap-5 md:flex-row">
            <Link
              href="#portfolio-index"
              className="group rounded-full border border-cyan-300/70 bg-cyan-300/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.35),inset_0_0_18px_rgba(103,232,249,0.08)] backdrop-blur-md transition hover:bg-cyan-300/12 hover:text-white"
            >
              See all projects
              <span className="ml-3 inline-block transition group-hover:translate-x-1">
                ↗
              </span>
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-cyan-300/25 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.35em] text-white/80 shadow-[0_0_16px_rgba(34,211,238,0.12)] backdrop-blur-md transition hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-cyan-100"
            >
              Check starred projects!
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-8 z-20">
        <div className="mt-4 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/40" />
          <span className="h-px w-28 bg-white/20" />
        </div>
      </div>
    </section>
  );
}
