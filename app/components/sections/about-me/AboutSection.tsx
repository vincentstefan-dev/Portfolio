"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Code2, Rocket, UserRound } from "lucide-react";
import OnlineFlowerFab from "@/app/components/ui/OnlineFlowerFab";

type OrbitItem = {
  label: string;
  img: string;
};

type Particle = OrbitItem & {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

const orbitItems: OrbitItem[] = [
  { label: "Brand systems", img: "/Gifs/purpleheart.gif" },
  { label: "Web builds", img: "/Gifs/diamond.gif" },
  { label: "Strategy", img: "/Gifs/btl.gif" },
  { label: "Content", img: "/Gifs/prismastar.gif" },
  { label: "UI direction", img: "/Gifs/cubeprisma.gif" },
  { label: "Visual identity", img: "/Gifs/bloby.gif" },
  { label: "Creative dev", img: "/Gifs/prismacurve.gif" },
  { label: "Motion systems", img: "/Gifs/toast.gif" },
  { label: "Concept design", img: "/Gifs/diamondshiny.gif" },
  { label: "Digital products", img: "/Gifs/octagon.gif" },
  { label: "Interaction", img: "/Gifs/fush.gif" },
  { label: "Frontend", img: "/Gifs/gummybears.gif" },
  { label: "Experiments", img: "/Gifs/hamburgesita.gif" },
  { label: "Systems thinking", img: "/Gifs/prsimducky.gif" },
  { label: "Narratives", img: "/Gifs/rainbowgummy.gif" },
  { label: "Brand energy", img: "/Gifs/sdcard.gif" },
];

function FloatingIconField({
  items,
  className,
  seedOffset = 0,
}: {
  items: OrbitItem[];
  className?: string;
  seedOffset?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const dragRef = useRef<{
    label: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const [particles, setParticles] = useState<Particle[]>(
    items.map((item, index) => ({
      ...item,
      x: 40 + ((index * 86 + seedOffset) % 360),
      y: 28 + ((index * 64 + seedOffset) % 210),
      vx: (index % 2 === 0 ? 1 : -1) * (0.28 + (index % 3) * 0.08),
      vy: (index % 3 === 0 ? 1 : -1) * (0.22 + (index % 4) * 0.06),
      size: index % 3 === 0 ? 58 : 50,
    }))
  );

  useEffect(() => {
    let frameId: number;

    const animate = () => {
      const container = containerRef.current;

      if (!container) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      const width = container.offsetWidth;
      const height = container.offsetHeight;

      setParticles((current) =>
        current.map((p) => {
          if (dragRef.current?.label === p.label) return p;

          const labelHeight = 18;
          const fullHeight = p.size + labelHeight;

          let nextX = p.x + p.vx;
          let nextY = p.y + p.vy;
          let nextVx = p.vx;
          let nextVy = p.vy;

          if (nextX <= 0 || nextX + p.size >= width) {
            nextVx *= -1;
            nextX = Math.max(0, Math.min(nextX, width - p.size));
          }

          if (nextY <= 0 || nextY + fullHeight >= height) {
            nextVy *= -1;
            nextY = Math.max(0, Math.min(nextY, height - fullHeight));
          }

          return {
            ...p,
            x: nextX,
            y: nextY,
            vx: nextVx,
            vy: nextVy,
          };
        })
      );

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    item: Particle
  ) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    dragRef.current = {
      label: item.label,
      offsetX: e.clientX - rect.left - item.x,
      offsetY: e.clientY - rect.top - item.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const container = containerRef.current;

    if (!drag || !container) return;

    const rect = container.getBoundingClientRect();

    setParticles((current) =>
      current.map((p) => {
        if (p.label !== drag.label) return p;

        const labelHeight = 18;
        const fullHeight = p.size + labelHeight;

        const nextX = e.clientX - rect.left - drag.offsetX;
        const nextY = e.clientY - rect.top - drag.offsetY;

        return {
          ...p,
          x: Math.max(0, Math.min(nextX, rect.width - p.size)),
          y: Math.max(0, Math.min(nextY, rect.height - fullHeight)),
        };
      })
    );
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute z-[30] hidden overflow-visible lg:block ${
        className ?? ""
      }`}
    >
      {particles.map((item) => (
        <div
          key={item.label}
          onPointerDown={(e) => handlePointerDown(e, item)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="pointer-events-auto absolute flex cursor-grab touch-none select-none flex-col items-center gap-1 active:cursor-grabbing"
          style={{
            width: item.size,
            transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
          }}
        >
          <div
            className="rounded-xl border border-white/15 bg-white/10 p-2 shadow-[0_0_22px_rgba(96,165,250,0.25)] backdrop-blur-md transition hover:scale-110"
            style={{
              width: item.size,
              height: item.size,
            }}
          >
            <img
              src={item.img}
              alt={item.label}
              draggable={false}
              className="pointer-events-none h-full w-full object-contain"
            />
          </div>

          <span className="pointer-events-none whitespace-nowrap text-center text-[9px] uppercase tracking-[0.1em] text-white/50">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden px-5 py-24 text-white sm:px-8 md:px-10 lg:px-12 xl:px-16">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_75%_45%,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(20,184,166,0.2),transparent_40%)]" />
      </div>

      {/* Right index rail */}
      <div className="pointer-events-none absolute right-8 top-1/2 z-[35] hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex">
        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
        <span className="h-20 w-px bg-gradient-to-b from-cyan-300/60 to-transparent" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-100/40 [writing-mode:vertical-rl]">
          Im Vincent :)
        </span>
        <span className="h-20 w-px bg-gradient-to-b from-transparent to-cyan-300/60" />
        <span className="h-2 w-2 rounded-full border border-cyan-300/60" />
      </div>

      {/* Decorative image layer */}
      <div className="pointer-events-none absolute right-[-25%] top--20 z-[12] hidden lg:block">
        <img
          src="/aboutme/about-me2.png"
          alt=""
          className="h-[720px] w-auto object-contain opacity-50 mix-blend-luminosity drop-shadow-[0_0_30px_rgba(96,165,250,0.22)] xl:h-[860px]"
        />
      </div>

      <div className="pointer-events-none absolute right-[-20%] top--20 z-[12] hidden lg:block">
        <img
          src="/aboutme/about-me.png"
          alt=""
        className="h-[1000px] w-auto object-contain opacity-55 mix-blend-luminosity drop-shadow-[0_0_45px_rgba(59,130,246,0.25)] xl:h-[1050px]"        />
      </div>

          {/* Desktop profile image */}
          <div className="pointer-events-none absolute bottom-0 right-[-50] z-10 hidden w-[76%] justify-center lg:flex">
            <div className="relative h-[1100px] w-[1100px]">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-[80px]" />

              <img
                src="/aboutme/about-profile.png"
                alt="Vincent profile"
                className="absolute bottom-[-20] left-1/2 z-20 h-[720px] -translate-x-1/2 object-contain opacity-65 drop-shadow-[0_0_60px_rgba(59,130,246,0.35)]"
              />
            </div>
          </div>

      {/* Floating draggable icon fields */}
      <FloatingIconField
        items={orbitItems.slice(0, 8)}
        seedOffset={0}
        className="left-[0%] top-[8%] h-[76%] w-[80%]"
      />

      <FloatingIconField
        items={orbitItems.slice(8)}
        seedOffset={180}
        className="right-[0%] top-[8%] h-[76%] w-[80%]"
      />

      {/* Actual stable layout */}
      <div className="relative z-40 mx-auto grid min-h-[calc(100vh-12rem)] w-full max-w-[1800px] grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(360px,500px)_1fr] lg:items-stretch">
        {/* Left text content */}
        <div className="flex max-w-[520px] flex-col justify-start">
          <p className="mb-5 text-sm uppercase tracking-[0.42em] text-blue-200/60">
            This is me:
          </p>

          <h1 className="text-[40px] font-semibold leading-[0.95] tracking-[-0.04em] text-white min-[390px]:text-[44px] sm:text-[56px] lg:text-[58px] xl:text-[64px]">
            <span className="whitespace-nowrap">M.Sc. in Business,</span>{" "}
            <span>Marketing &</span> <span>Game Theory.</span>
            <br />
            I love to code &
            <br />
            to create.
          </h1>

          <div className="mt-7 h-[3px] w-28 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.9)]" />

          <h2 className="mt-9 text-2xl font-semibold text-white">
            Hi, I&apos;m Vincent [Koyote]
          </h2>

          <p className="mt-5 text-base leading-8 text-white/70">
            I help people and projects turn rough ideas into digital concepts
            that are clear, intentional, and ready to launch.
            <br />
            <br />
            My work combines marketing, business strategy, game theory,
            statistics, web design, and code to create websites{" "}
            <span className="animate-rainbow-text font-semibold">
              [apps coming soon!]
            </span>
            , prototypes, brand experiences, and proof-of-concepts that make
            ideas easier to understand, test, deploy, and sell.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-xl border border-blue-400/35 bg-blue-500/10 px-7 py-3 text-sm text-white/85 backdrop-blur-md transition hover:-translate-y-1 hover:bg-blue-400/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]"
            >
              Let&apos;s talk! <span>↗</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                window.scrollBy({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
              className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3 text-sm text-white/60 backdrop-blur-md transition hover:-translate-y-1 hover:border-blue-300/35 hover:bg-blue-300/10 hover:text-white hover:shadow-[0_0_22px_rgba(96,165,250,0.22)]"
            >
              See how I think <span>↓</span>
            </button>
          </div>

          {/* Mobile profile image */}
          <div className="pointer-events-none relative z-10 mt-10 flex justify-center lg:hidden">
            <img
              src="/aboutme/about-profile.png"
              alt="Vincent profile"
              className="h-[320px] object-contain opacity-75 drop-shadow-[0_0_45px_rgba(59,130,246,0.35)]"
            />
          </div>
        </div>

        {/* Right area: keeps cards in normal flow instead of absolute positioning */}
        <div className="relative z-50 flex min-h-[520px] flex-col justify-end lg:pl-8 xl:pl-14">
        <div className="grid translate-y-12 grid-cols-1 gap-4 md:grid-cols-3">            <div className="rounded-2xl border border-blue-300/20 bg-blue-950/30 p-4 backdrop-blur-md xl:p-5">
              <Code2 className="mb-3 h-7 w-7 text-blue-300" />

              <h3 className="text-xl font-semibold">Skills</h3>

              <p className="mt-3 text-[15px] leading-6 text-white/60">
                Marketing strategy, business analysis, statistics, React,
                Python, R, Tailwind, and brand systems.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-300/20 bg-blue-950/30 p-4 backdrop-blur-md xl:p-5">
              <Rocket className="mb-3 h-7 w-7 text-blue-300" />

              <h3 className="text-xl font-semibold">
                Currently working on
              </h3>

              <p className="mt-3 text-[15px] leading-6 text-white/60">
                Koyote, Python-based apps, statistical data projects,
                client-facing design systems, brand concepts, and C++ console
                modding.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-300/20 bg-blue-950/30 p-4 text-center backdrop-blur-md xl:p-5">
              <UserRound className="mx-auto mb-3 h-7 w-7 text-blue-300" />

              <h3 className="text-xl font-semibold">Find me online</h3>

              <p className="mt-3 text-[14.6px] leading-6 text-white/60">
                Projects, code, experiments, and ways to reach me.
              </p>

              <div className="mt-4 flex justify-center">
                <OnlineFlowerFab />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}