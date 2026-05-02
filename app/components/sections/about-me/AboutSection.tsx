"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Code2, Rocket, UserRound } from "lucide-react";

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
      className={`pointer-events-auto absolute z-[30] overflow-hidden ${
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
          className="absolute flex cursor-grab touch-none select-none flex-col items-center gap-1 active:cursor-grabbing"
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
    <section className="relative h-screen max-h-screen w-full overflow-hidden px-6 py-0">
      <div className="absolute left-[5%] top-[7%] z-40 w-full max-w-[390px]">
        <p className="mb-4 text-sm uppercase tracking-[0.42em] text-blue-200/60">
          About me
        </p>

        <h1 className="text-[64px] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
          Strategy,
          <br />
          code,
          <br />
          weird taste.
        </h1>

        <div className="mt-7 h-[3px] w-28 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.9)]" />

        <h2 className="mt-9 text-2xl font-semibold text-white">
          Hi, I&apos;m Vincent.
        </h2>

        <p className="mt-5 text-base leading-8 text-white/70">
          I build digital spaces where strategy, visuals, interaction, and weird
          little ideas become something usable. This site is part portfolio,
          part archive, part experiment.
        </p>

        <p className="mt-5 text-base leading-8 text-white/60">
          My work moves between brand systems, web interfaces, content
          structures, and tools that help ideas feel more alive online.
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-3 rounded-xl border border-blue-400/35 bg-blue-500/10 px-7 py-3 text-sm text-white/85 backdrop-blur-md transition hover:-translate-y-1 hover:bg-blue-400/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]"
        >
          Let&apos;s connect <span>↗</span>
        </Link>
      </div>

      <FloatingIconField
        items={orbitItems.slice(0, 8)}
        seedOffset={0}
        className="left-[0%] top-[10%] h-[90%] w-[80%]"
      />

      <FloatingIconField
        items={orbitItems.slice(8)}
        seedOffset={180}
        className="right-[0%] top-[8%] h-[90%] w-[80%]"
      />

      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[76%] items-center justify-center md:flex">
        <div className="relative h-[600px] w-[900px] translate-y-[-18px]">
          <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-[80px]" />

          <img
            src="/aboutme/about-profile.png"
            alt="Vincent profile"
            className="absolute bottom-[-80px] left-1/2 z-20 h-[560px] -translate-x-1/2 object-contain opacity-90 drop-shadow-[0_0_60px_rgba(59,130,246,0.35)]"
          />
        </div>
      </div>

      <div className="absolute bottom-[0px] left-[36%] right-6 z-50 grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-blue-300/20 bg-blue-950/30 p-5 backdrop-blur-md">
          <Code2 className="mb-3 h-7 w-7 text-blue-300" />

          <h3 className="text-xl font-semibold">Skills</h3>

          <p className="mt-3 text-[15px] leading-6 text-white/60">
            React, Next.js, Tailwind, brand systems, visual direction, and
            experimental UI.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-300/20 bg-blue-950/30 p-5 backdrop-blur-md">
          <Rocket className="mb-3 h-7 w-7 text-blue-300" />

          <h3 className="text-xl font-semibold">Currently working on</h3>

          <p className="mt-3 text-[15px] leading-6 text-white/60">
            Koyote, portfolio systems, client pages, creative tools, and digital
            brand ideas.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-300/20 bg-blue-950/30 p-5 backdrop-blur-md">
          <UserRound className="mb-3 h-7 w-7 text-blue-300" />

          <h3 className="text-xl font-semibold">Find me online</h3>

          <p className="mt-3 text-[15px] leading-6 text-white/60">
            A small portal into projects, thoughts, experiments, and ways to
            connect.
          </p>
        </div>
      </div>
    </section>
  );
}