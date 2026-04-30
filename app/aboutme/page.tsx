"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { House, FileScan, Code2, Rocket, UserRound } from "lucide-react";

import { useThemeMode } from "@/app/template/theme/ThemeProvider";
import ThemedBackground from "@/app/template/theme/ThemedBackground";
import ThemedNavIcon from "@/app/template/theme/ThemedNavIcon";
import AtomicPlayer from "@/app/components/media/atomicplayer";
import PageTransitionWrapper from "@/app/components/layout/PageTransitionWrapper";
import SiteSignature from "@/app/components/hero/SiteSignature";

import { useAtomicPlayerControls } from "@/app/components/layout/useAtomicPlayerControls";
import { usePageTransition } from "@/app/components/layout/usePageTransition";
import { useThemeGlow } from "@/app/components/layout/useThemeGlow";

type MenuItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gif: string;
};

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

const menuItems: MenuItem[] = [
  { label: "Home", icon: House, href: "/", gif: "/Gifs/mystar.gif" },
  { label: "Blog", icon: FileScan, href: "/blog", gif: "/Gifs/portfolio.gif" },
];

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

      setParticles((current) => {
        const next = current.map((p) => {
          if (dragRef.current?.label === p.label) return p;

          return {
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
          };
        });

        for (const p of next) {
          if (dragRef.current?.label === p.label) continue;

          const labelHeight = 18;
          const fullHeight = p.size + labelHeight;

          if (p.x <= 0 || p.x + p.size >= width) {
            p.vx *= -1;
            p.x = Math.max(0, Math.min(p.x, width - p.size));
          }

          if (p.y <= 0 || p.y + fullHeight >= height) {
            p.vy *= -1;
            p.y = Math.max(0, Math.min(p.y, height - fullHeight));
          }
        }

        return next;
      });

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

        return {
          ...p,
          x: Math.max(
            0,
            Math.min(e.clientX - rect.left - drag.offsetX, rect.width - p.size)
          ),
          y: Math.max(
            0,
            Math.min(
              e.clientY - rect.top - drag.offsetY,
              rect.height - fullHeight
            )
          ),
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
      className={`pointer-events-auto absolute z-[5] overflow-hidden ${
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
            className="rounded-xl border border-white/15 bg-white/10 p-2 shadow-[0_0_22px_rgba(96,165,250,0.25)] backdrop-blur-md"
            style={{
              width: item.size,
              height: item.size,
            }}
          >
            <img
              src={item.img}
              alt={item.label}
              draggable={false}
              className="h-full w-full object-contain"
            />
          </div>

          <span className="whitespace-nowrap text-center text-[9px] uppercase tracking-[0.1em] text-white/50">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CleanPage() {
  const { siteMode } = useThemeMode();

  const {
    playerRef,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
    volume,
    setVolume,
    handlePlayerReady,
  } = useAtomicPlayerControls();

  const glow = useThemeGlow(siteMode);
  const isInitialBlur = usePageTransition(0);

  return (
    <main className="relative text-white">
      <ThemedBackground onReady={handlePlayerReady} />

      <AtomicPlayer
        playerRef={playerRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        volume={volume}
        setVolume={setVolume}
      />

      <PageTransitionWrapper isBlurred={isInitialBlur}>
        <nav className="absolute left-1/2 top-8 z-50 -translate-x-1/2">
          <div className="flex items-center justify-center gap-16">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center transition duration-300 hover:-translate-y-1"
              >
                <ThemedNavIcon
                  label={item.label}
                  icon={item.icon}
                  gif={item.gif}
                  glow={glow}
                />

                <span className="mt-2 text-sm text-white/70">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </nav>

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
              I build digital spaces where strategy, visuals, interaction, and
              weird little ideas become something usable. This site is part
              portfolio, part archive, part experiment.
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
                Koyote, portfolio systems, client pages, creative tools, and
                digital brand ideas.
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

        <section className="relative min-h-screen w-full overflow-hidden px-4 py-10 text-cyan-300">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,220,255,0.16),transparent_45%)]" />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />

          <div className="relative z-10 mx-auto grid min-h-[88vh] max-w-[1600px] grid-cols-[260px_1fr_360px] gap-3 border border-cyan-400/35 p-8 shadow-[0_0_45px_rgba(0,220,255,0.12)]">
            <aside className="border border-cyan-400/30 p-8 font-mono text-sm">
              <p className="mb-6 text-cyan-200">02 &gt; WHAT I DO</p>

              <div className="space-y-4 text-cyan-300/80">
                <p>
                  From strategy to interface, I help brands and products become
                  clear, functional and impactful.
                </p>

                <p className="border border-cyan-400/40 px-8 py-2 text-cyan-200">
                  ● Work with me :)
                </p>
              </div>

              <div className="mt-10 border-t border-cyan-400/25 pt-8">
                <p className="mb-4 text-cyan-200">ABOUT ME</p>

                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-cyan-400/30">
                    <img
                      src="/aboutme/about-me3.png"
                      alt="Vincent"
                      className="h-full w-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-cyan-400/10" />
                  </div>

                  <p className="leading-6 text-cyan-300/70">
                    I build, design and shape systems.
                  </p>
                </div>

                <div className="relative mt-6 w-full overflow-hidden">
                  <img
                    src="/Gifs/sillyhorse.gif"
                    alt="Creative work"
                    className="h-[360px] w-full object-cover opacity-100"
                  />
                </div>
              </div>
            </aside>

            <main className="relative overflow-hidden border border-cyan-400/30 p-[60px] font-mono">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.08),transparent_55%)]" />

              <div className="relative z-10">
                <h1 className="max-w-lg text-xl leading-relaxed text-cyan-300/70 md:text-2xl">
                  From strategy to interface, I help brands and products become
                  clear, functional and impactful.
                </h1>
              </div>

              <div className="relative z-10 mt-8 h-[560px]">
                {[
                  {
                    n: "01",
                    title: "BUILD",
                    text: "Websites, interfaces and systems that are fast, scalable and built with purpose.",
                    pos: "left-[5%] top-[0px]",
                  },
                  {
                    n: "02",
                    title: "DESIGN",
                    text: "Visual systems, UI design and brand direction that communicate clearly.",
                    pos: "right-[5%] top-[3px]",
                  },
                  {
                    n: "03",
                    title: "STRATEGY",
                    text: "Positioning, structure and systems thinking that move ideas forward.",
                    pos: "left-[30%] top-[200px]",
                  },
                  {
                    n: "04",
                    title: "BRAND LOGIC",
                    text: "Building brands with soul, structure and a story that sticks.",
                    pos: "left-[2%] top-[400px]",
                  },
                  {
                    n: "05",
                    title: "EXPERIMENTS",
                    text: "Creative development, weird UI and prototypes that explore new ideas.",
                    pos: "right-[3%] top-[400px]",
                  },
                ].map((item) => (
                  <div
                    key={item.n}
                    className={`absolute ${item.pos} w-[260px] border border-cyan-300/35 bg-cyan-950/20 p-6 text-cyan-200 backdrop-blur-xl shadow-[inset_0_0_30px_rgba(34,211,238,0.06),0_0_24px_rgba(34,211,238,0.10)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/70 hover:bg-cyan-900/25 hover:shadow-[inset_0_0_35px_rgba(34,211,238,0.10),0_0_40px_rgba(34,211,238,0.22)]`}
                  >
                    <span className="absolute left-[-1px] top-[-1px] h-4 w-4 border-l border-t border-cyan-200/80" />
                    <span className="absolute right-[-1px] top-[-1px] h-4 w-4 border-r border-t border-cyan-200/80" />
                    <span className="absolute bottom-[-1px] left-[-1px] h-4 w-4 border-b border-l border-cyan-200/80" />
                    <span className="absolute bottom-[-1px] right-[-1px] h-4 w-4 border-b border-r border-cyan-200/80" />

                    <p className="text-xs tracking-[0.25em] text-cyan-400/80">
                      [{item.n}]
                    </p>

                    <h3 className="mt-5 text-xl font-bold text-cyan-100">
                      {item.title}
                    </h3>

                    <p className="mt-5 text-sm leading-6 text-cyan-300/70">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </main>

            <aside className="grid h-full grid-rows-3 gap-3 font-mono">
              <div className="h-full border border-cyan-400/30 p-6">
                <p className="mb-5 text-cyan-200">CURRENT FOCUS</p>

                <div className="space-y-4 text-sm text-cyan-300/75">
                  <p>&gt; Portfolio systems</p>
                  <p>&gt; Brand identity work</p>
                  <p>&gt; Web interfaces</p>
                  <p>&gt; Experimental UI</p>
                </div>
              </div>

              <div className="h-full border border-cyan-400/30 p-6">
                <p className="mb-5 text-cyan-200">BEST FIT</p>

                <div className="space-y-4 text-sm text-cyan-300/75">
                  <p>&gt; Small brands and startups</p>
                  <p>&gt; Founders and solo builders</p>
                  <p>&gt; Creative projects</p>
                  <p>&gt; Digital products</p>
                </div>
              </div>

              <div className="h-full border border-cyan-400/30 p-6">
                <p className="mb-5 text-cyan-200">WHAT I VALUE</p>

                <div className="space-y-4 text-sm text-cyan-300/75">
                  <p>◎ CLARITY — clear outcomes</p>
                  <p>▣ SYSTEMS — structured thinking</p>
                  <p>ϟ IMPACT — useful work</p>
                  <p>☻ CURIOSITY — experiment often</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="relative min-h-screen w-full border border-cyan-400/20">
          {/* layer 3 */}
        </section>

        <SiteSignature />
      </PageTransitionWrapper>
    </main>
  );
}