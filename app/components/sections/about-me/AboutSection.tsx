"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Code2, Rocket, UserRound } from "lucide-react";
import OnlineFlowerFab from "@/app/components/ui/OnlineFlowerFab";
import { aboutMeRc as rc } from "./aboutMeResponsiveConfig";

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
    <div ref={containerRef} className={`${rc.floatingFields.base} ${className ?? ""}`}>
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
    <section className={rc.section}>
      <div className={rc.background.wrapper}>
        <div className={rc.background.grid} />
        <div className={rc.background.glow} />
      </div>

      <div className={rc.rail.wrapper}>
        <span className={rc.rail.dotActive} />
        <span className={rc.rail.lineTop} />
        <span className={rc.rail.text}>Im Vincent :)</span>
        <span className={rc.rail.lineBottom} />
        <span className={rc.rail.dotInactive} />
      </div>

      <div className={rc.decorativeImages.backWrapper}>
        <img src="/aboutme/about-me2.png" alt="" className={rc.decorativeImages.backImage} />
      </div>

      <div className={rc.decorativeImages.frontWrapper}>
        <img src="/aboutme/about-me.png" alt="" className={rc.decorativeImages.frontImage} />
      </div>

      <div className={rc.profile.desktopWrapper}>
        <div className={rc.profile.desktopInner}>
          <div className={rc.profile.desktopGlow} />

          <img
            src="/aboutme/about-profile.png"
            alt="Vincent profile"
            className={rc.profile.desktopImage}
          />
        </div>
      </div>

      <FloatingIconField
        items={orbitItems.slice(0, 8)}
        seedOffset={0}
        className={rc.floatingFields.left}
      />

      <FloatingIconField
        items={orbitItems.slice(8)}
        seedOffset={180}
        className={rc.floatingFields.right}
      />

      <div className={rc.layout.grid}>
        <div className={rc.layout.leftColumn}>
          <p className={rc.text.eyebrow}>This is me:</p>

          <h1 className={rc.text.title}>
            <span className="whitespace-nowrap">M.Sc. in Business,</span>{" "}
            <span>Marketing &</span> <span>Game Theory.</span>
            <br />
            I love to code &
            <br />
            to create.
          </h1>

          <div className={rc.text.divider} />

          <h2 className={rc.text.subtitle}>Hi, I&apos;m Vincent creator of  
          <span className="animate-rainbow-text font-semibold">
            Koyote
          </span> </h2>

          <p className={rc.text.paragraph}>
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

          <div className={rc.cta.row}>
            <Link href="/contact" className={rc.cta.primary}>
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
              className={rc.cta.secondary}
            >
              See how I think <span>↓</span>
            </button>
          </div>

          <div className={rc.profile.mobileWrapper}>
            <img
              src="/aboutme/about-profile.png"
              alt="Vincent profile"
              className={rc.profile.mobileImage}
            />
          </div>
        </div>

        <div className={rc.layout.rightColumn}>
          <div className={rc.cards.grid}>
            <div className={rc.cards.card}>
              <Code2 className={rc.cards.icon} />

              <h3 className={rc.cards.title}>Skills</h3>

              <p className={rc.cards.body}>
                Marketing strategy, business analysis, statistics, React,
                Python, R, Tailwind, and brand systems.
              </p>
            </div>

            <div className={rc.cards.card}>
              <Rocket className={rc.cards.icon} />

              <h3 className={rc.cards.title}>Currently working on</h3>

              <p className={rc.cards.body}>
                Koyote, Python-based apps, statistical data projects,
                client-facing design systems, brand concepts, and C++ console
                modding.
              </p>
            </div>

            <div className={rc.cards.cardCentered}>
              <UserRound className={rc.cards.iconCentered} />

              <h3 className={rc.cards.title}>Find me online</h3>

              <p className={rc.cards.smallBody}>
                Projects, code, experiments, and ways to reach me.
              </p>

              <div className={rc.cards.flowerWrapper}>
                <OnlineFlowerFab />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}