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
          <section className="relative min-h-screen w-full overflow-hidden bg-[#020914] px-6 py-24 text-white">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(37,99,235,0.22),transparent_42%)]" />
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.18),transparent_25%),radial-gradient(circle_at_85%_35%,rgba(34,211,238,0.14),transparent_24%)]" />

  <div className="pointer-events-none absolute left-[7%] top-[23%] font-mono text-3xl italic text-blue-400/60">
    ideas
    <br />
    &gt; systems
    <br />
    &gt; impact
  </div>

  <div className="pointer-events-none absolute right-[7%] top-[20%] rotate-3 border border-white/10 bg-white/20 px-8 py-6 text-center font-serif text-lg italic text-slate-900/80 backdrop-blur-sm">
    Simplicity
    <br />
    is not the
    <br />
    absence of
    <br />
    complexity
  </div>

  <div className="relative z-10 mx-auto max-w-[1450px]">
    <div className="text-center">
      <p className="font-mono text-sm text-blue-400">/ my process</p>

      <h2 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
        How I think &amp; build
      </h2>

      <div className="mx-auto mt-5 h-[3px] w-20 rounded-full bg-blue-400 shadow-[0_0_22px_rgba(96,165,250,0.9)]" />

      <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-white/55">
        A structured but flexible approach to creating meaningful digital
        experiences.
      </p>
    </div>

    <div className="relative mt-24">
      <div className="absolute left-[7%] right-[7%] top-[90px] h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-300 shadow-[0_0_18px_rgba(59,130,246,0.7)]" />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
        {[
          {
            n: "01",
            title: "Observe",
            icon: "◉",
            color: "blue",
            text: "I start by understanding the context, the user and the real problems behind the project.",
            items: ["Research", "User insights", "Market analysis"],
          },
          {
            n: "02",
            title: "Deconstruct",
            icon: "✣",
            color: "violet",
            text: "I break things down to the essentials. Finding patterns, opportunities and the core idea.",
            items: ["Information architecture", "Wireframing", "Concept development"],
          },
          {
            n: "03",
            title: "Build",
            icon: "</>",
            color: "blue",
            text: "I bring the idea to life with clean code and thoughtful design. Focused on performance, usability and details.",
            items: ["Development", "Design systems", "Prototyping"],
          },
          {
            n: "04",
            title: "Iterate",
            icon: "↻",
            color: "cyan",
            text: "I test, refine and improve. Every project is an ongoing evolution.",
            items: ["Testing", "Feedback", "Optimization"],
          },
        ].map((step) => (
          <div key={step.n} className="relative">
            <div className="mb-8 flex items-center gap-7">
              <p
                className={`font-mono text-2xl ${
                  step.color === "violet"
                    ? "text-violet-400"
                    : step.color === "cyan"
                    ? "text-cyan-300"
                    : "text-blue-400"
                }`}
              >
                {step.n}
              </p>

              <div
                className={`relative flex h-24 w-24 items-center justify-center rounded-[28px] border bg-white/5 text-4xl backdrop-blur-xl ${
                  step.color === "violet"
                    ? "border-violet-400/50 text-violet-300 shadow-[0_0_35px_rgba(168,85,247,0.35)]"
                    : step.color === "cyan"
                    ? "border-cyan-300/50 text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.35)]"
                    : "border-blue-400/50 text-blue-300 shadow-[0_0_35px_rgba(59,130,246,0.35)]"
                }`}
              >
                {step.icon}

                <span
                  className={`absolute bottom-[-10px] left-1/2 h-5 w-5 -translate-x-1/2 rounded-full ${
                    step.color === "violet"
                      ? "bg-violet-400 shadow-[0_0_18px_rgba(168,85,247,1)]"
                      : step.color === "cyan"
                      ? "bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,1)]"
                      : "bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,1)]"
                  }`}
                />
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-white">{step.title}</h3>

            <p className="mt-4 max-w-[260px] text-base leading-7 text-white/60">
              {step.text}
            </p>

            <div className="mt-8 w-full max-w-[260px] rounded-xl border border-blue-400/20 bg-blue-950/20 p-5 backdrop-blur-md shadow-[inset_0_0_28px_rgba(59,130,246,0.06)]">
              <div className="space-y-3 text-sm text-white/65">
                {step.items.map((item) => (
                  <p key={item}>↗ {item}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-blue-400/25 bg-blue-950/20 px-10 py-8 text-center shadow-[0_0_35px_rgba(59,130,246,0.12)] backdrop-blur-md">
      <p className="text-5xl text-blue-500/70">“</p>
      <p className="text-lg leading-8 text-white/70">
        Good design is not just what it looks like.
        <br />
        <span className="text-white">
          It&apos;s how it works and how it makes people feel.
        </span>
      </p>
    </div>

    <div className="mx-auto mt-10 flex max-w-3xl items-center gap-8 text-blue-500/50">
      <div className="h-px flex-1 bg-blue-400/20" />
      <span className="text-3xl">✶</span>
      <div className="h-px flex-1 bg-blue-400/20" />
    </div>

    <p className="mt-8 text-center text-lg text-white/35">
      A balance between creativity, logic and empathy.
    </p>
  </div>
</section>
        </section>
<section className="relative min-h-screen w-full overflow-hidden bg-[#020914] px-6 py-24 text-white">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,0.24),transparent_45%)]" />
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_82%,rgba(59,130,246,0.18),transparent_20%),radial-gradient(circle_at_88%_20%,rgba(59,130,246,0.18),transparent_22%)]" />

  <div className="relative z-10 mx-auto max-w-[1450px]">
    <div className="absolute left-0 top-8 max-w-[330px]">
      <p className="font-mono text-sm text-blue-400">/ selected work</p>

      <h2 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-white">
        Projects as nodes
      </h2>

      <div className="mt-5 h-[3px] w-20 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.9)]" />

      <p className="mt-8 text-lg leading-8 text-white/55">
        A selection of projects I&apos;ve worked on. Each one is a node —
        connected by curiosity, creativity and code.
      </p>

      <Link
        href="/portfolio"
        className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-blue-400/40 bg-blue-500/10 px-7 py-3 text-white/80 backdrop-blur-md transition hover:-translate-y-1 hover:bg-blue-500/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]"
      >
        View all projects <span>↗</span>
      </Link>
    </div>

    <div className="relative mx-auto h-[760px] max-w-[1150px]">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
        viewBox="0 0 1150 760"
        fill="none"
      >
        <path
          d="M160 430 C300 360, 320 500, 450 360 C560 250, 650 330, 760 250 C870 165, 930 230, 1000 150"
          stroke="rgba(59,130,246,0.55)"
          strokeWidth="2"
          strokeDasharray="6 10"
        />
        <path
          d="M570 335 C680 390, 750 360, 855 430"
          stroke="rgba(59,130,246,0.45)"
          strokeWidth="2"
          strokeDasharray="6 10"
        />
        <path
          d="M570 335 C600 455, 500 520, 420 590"
          stroke="rgba(59,130,246,0.4)"
          strokeWidth="2"
          strokeDasharray="6 10"
        />
        <path
          d="M570 335 C620 500, 710 510, 740 620"
          stroke="rgba(59,130,246,0.4)"
          strokeWidth="2"
          strokeDasharray="6 10"
        />
      </svg>

      {[
        {
          title: "Pierwszy Swag w Polsce",
          type: "WEB DESIGN",
          text: "E-commerce website for the first streetwear brand in Poland. Design, development and e-commerce integration.",
          img: "/portfolio/pierwszy-swag.png",
          pos: "left-[45%] top-[120px]",
          size: "featured",
          color: "violet",
        },
        {
          title: "Stage Visuals",
          type: "BRANDING",
          text: "Visual identity and art direction for live events and shows.",
          img: "/aboutme/about-me3.png",
          pos: "left-[25%] top-[210px]",
          size: "normal",
          color: "slate",
        },
        {
          title: "Trasa Konca Świata",
          type: "WEB DEVELOPMENT",
          text: "Promotional website and merch store for the tour.",
          img: "/portfolio/trasa-konca.png",
          pos: "right-[3%] top-[55px]",
          size: "normal",
          color: "orange",
        },
        {
          title: "Huta",
          type: "WEB DESIGN",
          text: "Modern website for a creative collective and studio.",
          img: "/portfolio/huta.png",
          pos: "left-[15%] top-[455px]",
          size: "normal",
          color: "blue",
        },
        {
          title: "Wine Bottle Label",
          type: "GRAPHIC DESIGN",
          text: "Concept label design for a limited edition.",
          img: "/portfolio/wine-label.png",
          pos: "left-[38%] top-[540px]",
          size: "normal",
          color: "pink",
        },
        {
          title: "Fantasmagorie",
          type: "EXPERIMENTAL",
          text: "Experimental website exploring storytelling and animations.",
          img: "/portfolio/fantasmagorie.png",
          pos: "right-[20%] top-[545px]",
          size: "normal",
          color: "slate",
        },
        {
          title: "Solar · Białas",
          type: "BRANDING",
          text: "Branding and visual identity for the album and merchandise.",
          img: "/portfolio/solar-bialas.png",
          pos: "right-[0%] top-[330px]",
          size: "normal",
          color: "blue",
        },
      ].map((project) => (
        <Link
          key={project.title}
          href="/portfolio"
          className={`group absolute ${project.pos} rounded-[28px] border bg-white/5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 ${
            project.size === "featured"
              ? "w-[260px] border-violet-400/50 p-8 shadow-[0_0_45px_rgba(168,85,247,0.35)]"
              : "w-[190px] border-white/10 p-6 shadow-[0_0_28px_rgba(59,130,246,0.16)]"
          }`}
        >
          <span
            className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 ${
              project.color === "violet"
                ? "bg-violet-500/40 shadow-[0_0_18px_rgba(168,85,247,0.7)]"
                : project.color === "pink"
                ? "bg-pink-500/40 shadow-[0_0_18px_rgba(236,72,153,0.7)]"
                : project.color === "orange"
                ? "bg-orange-500/40 shadow-[0_0_18px_rgba(249,115,22,0.7)]"
                : "bg-blue-500/35 shadow-[0_0_18px_rgba(59,130,246,0.7)]"
            }`}
          >
            ↗
          </span>

          <div
            className={`overflow-hidden rounded-xl ${
              project.size === "featured" ? "h-[150px]" : "h-[90px]"
            }`}
          >
            <img
              src={project.img}
              alt={project.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
          </div>

          <p
            className={`mt-6 text-xs font-bold uppercase tracking-[0.08em] ${
              project.color === "violet"
                ? "text-violet-400"
                : project.color === "pink"
                ? "text-pink-400"
                : project.color === "orange"
                ? "text-orange-400"
                : "text-blue-400"
            }`}
          >
            {project.type}
          </p>

          <h3
            className={`mt-3 font-semibold text-white ${
              project.size === "featured" ? "text-2xl" : "text-lg"
            }`}
          >
            {project.title}
          </h3>

          <p className="mt-4 text-sm leading-6 text-white/55">
            {project.text}
          </p>
        </Link>
      ))}
    </div>

    <div className="mx-auto mt-4 flex max-w-3xl items-center gap-8 text-blue-500/50">
      <div className="h-px flex-1 bg-blue-400/20" />
      <span className="text-3xl">✶</span>
      <div className="h-px flex-1 bg-blue-400/20" />
    </div>

    <p className="mt-6 text-center text-lg text-white/40">
      More projects, experiments and ideas
      <br />
      are always in the works.
    </p>
  </div>
</section>
<section className="relative min-h-screen w-full overflow-hidden bg-[#020914] px-6 py-24 text-white">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,0.22),transparent_45%)]" />
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(59,130,246,0.18),transparent_20%),radial-gradient(circle_at_86%_18%,rgba(59,130,246,0.18),transparent_20%)]" />

  <div className="pointer-events-none absolute left-[8%] top-[23%] -rotate-3 bg-white/10 px-9 py-7 font-serif text-2xl italic text-blue-300/70 backdrop-blur-sm">
    ideas
    <br />
    turn into
    <br />
    <span className="rounded-full border border-blue-400/50 px-3 text-blue-400">
      reality
    </span>
  </div>

  <div className="pointer-events-none absolute right-[12%] top-[18%] font-serif text-2xl italic leading-relaxed text-blue-400/65">
    let&apos;s build
    <br />
    something
    <br />
    that matters
    <div className="mt-2 h-px w-28 bg-blue-500/70" />
  </div>

  <div className="relative z-10 mx-auto max-w-[1450px]">
    <div className="text-center">
      <p className="font-mono text-sm text-blue-400">/ let&apos;s connect</p>

      <h2 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
        Let&apos;s create something great.
      </h2>

      <div className="mx-auto mt-5 h-[3px] w-24 rounded-full bg-blue-500 shadow-[0_0_22px_rgba(59,130,246,0.95)]" />

      <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-white/55">
        I&apos;m always open to new ideas, collaborations and meaningful
        projects.
      </p>
    </div>

    <div className="mt-20 grid grid-cols-1 gap-7 md:grid-cols-4">
      {[
        {
          title: "Email",
          text: "Best for project inquiries and detailed conversations.",
          button: "SEND AN EMAIL",
          icon: "✉",
          href: "mailto:Vincentstefan@icloud.com",
          color: "blue",
          n: "01",
        },
        {
          title: "Call",
          text: "Let&apos;s talk directly and turn ideas into action.",
          button: "SCHEDULE A CALL",
          icon: "☎",
          href: "https://calendly.com/YOUR-LINK",
          color: "violet",
          n: "02",
        },
        {
          title: "Message",
          text: "Quick questions or ideas? Send me a message.",
          button: "SEND A MESSAGE",
          icon: "☵",
          href: "https://api.whatsapp.com/send?phone=4915778786924",
          color: "cyan",
          n: "03",
        },
        {
          title: "Collab",
          text: "Interested in working together? Let&apos;s build something unique.",
          button: "START A COLLAB",
          icon: "➤",
          href: "/contact",
          color: "blue",
          n: "04",
        },
      ].map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={`group relative min-h-[360px] rounded-[28px] border bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 ${
            item.color === "violet"
              ? "border-violet-400/40 shadow-[0_0_35px_rgba(168,85,247,0.18)]"
              : item.color === "cyan"
              ? "border-cyan-300/40 shadow-[0_0_35px_rgba(34,211,238,0.18)]"
              : "border-blue-400/35 shadow-[0_0_35px_rgba(59,130,246,0.18)]"
          }`}
        >
          <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl text-white/70">
            ↗
          </span>

          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full border text-3xl ${
              item.color === "violet"
                ? "border-violet-400/60 bg-violet-500/15 text-violet-300 shadow-[0_0_28px_rgba(168,85,247,0.45)]"
                : item.color === "cyan"
                ? "border-cyan-300/60 bg-cyan-500/15 text-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.45)]"
                : "border-blue-400/60 bg-blue-500/15 text-blue-300 shadow-[0_0_28px_rgba(59,130,246,0.45)]"
            }`}
          >
            {item.icon}
          </div>

          <h3 className="mt-8 text-2xl font-semibold text-white">
            {item.title}
          </h3>

          <p className="mt-4 min-h-[64px] text-base leading-7 text-white/55">
            {item.text}
          </p>

          <div className="absolute bottom-8 left-8 right-8">
            <div className="relative h-[118px] overflow-hidden rounded-2xl border border-white/10 bg-black/70 p-4 shadow-[inset_0_0_22px_rgba(59,130,246,0.18)]">
              <div className="absolute inset-x-4 top-5 h-[64px] rounded-lg border border-blue-500/50 bg-black shadow-[0_0_20px_rgba(59,130,246,0.35)]">
                <p
                  className={`flex h-full items-center px-6 text-2xl font-bold leading-6 ${
                    item.color === "violet"
                      ? "text-violet-400"
                      : item.color === "cyan"
                      ? "text-cyan-300"
                      : "text-blue-400"
                  }`}
                >
                  {item.button}
                </p>

                <span
                  className={`absolute right-0 top-0 flex h-full w-12 items-center justify-center text-sm font-bold text-black ${
                    item.color === "violet"
                      ? "bg-violet-500"
                      : item.color === "cyan"
                      ? "bg-cyan-400"
                      : "bg-blue-500"
                  }`}
                >
                  {item.n}
                </span>
              </div>

              <div className="absolute bottom-2 left-1/2 h-6 w-16 -translate-x-1/2 rounded-b-xl border border-white/10 bg-black/80" />
            </div>
          </div>
        </Link>
      ))}
    </div>

    <div className="mx-auto mt-20 flex max-w-3xl items-center gap-8 text-blue-500/50">
      <div className="h-px flex-1 bg-blue-400/20" />
      <span className="text-3xl">✶</span>
      <div className="h-px flex-1 bg-blue-400/20" />
    </div>

    <p className="mt-8 text-center text-2xl text-white/50">
      I usually reply within <span className="text-blue-400">24 hours.</span>
    </p>

    <p className="mt-3 text-center text-base text-white/35">
      Based in Paris, working worldwide. ◎
    </p>
  </div>
</section>

        <SiteSignature fontClass="" />
      </PageTransitionWrapper>
    </main>
  );
}