"use client";

import { useThemeMode } from "@/app/template/theme/ThemeProvider";
import ThemedBackground from "@/app/template/theme/ThemedBackground";
import ThemedNavIcon from "@/app/template/theme/ThemedNavIcon";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileScan,
  Code2,
  Rocket,
  UserRound,
} from "lucide-react";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

type MenuItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gif: string;
};

type GlowStyle = {
  text: string;
  shadow: string;
  bg: string;
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
  { label: "Home", icon: House, href: "/", gif: "/Gifs/Home.gif" },
  { label: "Blog", icon: FileScan, href: "/blog", gif: "/Gifs/portfolio.gif" },
];

const glowStyles: GlowStyle[] = [
  {
    text: "group-hover:text-[#93c5fd]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#3b82f6]",
    bg: "group-hover:bg-[#93c5fd]/20",
  },
  {
    text: "group-hover:text-[#67e8f9]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#22d3ee]",
    bg: "group-hover:bg-[#67e8f9]/20",
  },
  {
    text: "group-hover:text-[#c4b5fd]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#8b5cf6]",
    bg: "group-hover:bg-[#c4b5fd]/20",
  },
];

const basicGlow = glowStyles[0];

function pickRandomGlow() {
  return glowStyles[Math.floor(Math.random() * glowStyles.length)];
}

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
        const next = current.map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
        }));

        for (const p of next) {
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

        for (let i = 0; i < next.length; i++) {
          for (let j = i + 1; j < next.length; j++) {
            const a = next[i];
            const b = next[j];

            const ax = a.x + a.size / 2;
            const ay = a.y + a.size / 2;
            const bx = b.x + b.size / 2;
            const by = b.y + b.size / 2;

            const dx = bx - ax;
            const dy = by - ay;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (a.size + b.size) / 2 + 18;

            if (distance < minDistance && distance > 0) {
              const nx = dx / distance;
              const ny = dy / distance;
              const overlap = minDistance - distance;

              a.x -= nx * overlap * 0.5;
              a.y -= ny * overlap * 0.5;
              b.x += nx * overlap * 0.5;
              b.y += ny * overlap * 0.5;

              const avx = a.vx;
              const avy = a.vy;

              a.vx = b.vx;
              a.vy = b.vy;
              b.vx = avx;
              b.vy = avy;
            }
          }
        }

        return next;
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute z-[5] overflow-hidden ${className ?? ""}`}
    >
      {particles.map((item) => (
        <div
          key={item.label}
          className="absolute flex flex-col items-center gap-1"
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
  const pathname = usePathname();
  const playerRef = useRef<any>(null);

  const [glow, setGlow] = useState<GlowStyle>(basicGlow);
  const [isInitialBlur, setIsInitialBlur] = useState(true);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(20);

  const playBlurIntro = useCallback(() => {
    setIsInitialBlur(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.setTimeout(() => setIsInitialBlur(false), 50);
      });
    });
  }, []);

  useEffect(() => {
    setGlow(siteMode === "random" ? pickRandomGlow() : basicGlow);
  }, [siteMode]);

  useEffect(() => {
    playBlurIntro();
  }, [pathname, playBlurIntro]);

  const handlePlayerReady = useCallback((player: any) => {
    playerRef.current = player;
    setIsPlaying(true);
    setIsMuted(true);
    setVolume(20);
  }, []);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player || !window.YT) return;

    const state = player.getPlayerState?.();

    if (state === window.YT.PlayerState.PLAYING) {
      player.pauseVideo();
      setIsPlaying(false);
      return;
    }

    if (player.isMuted?.()) {
      player.unMute();
      player.setVolume(volume);
      setIsMuted(false);
    }

    player.playVideo();
    setIsPlaying(true);
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;

    if (player.isMuted?.()) {
      player.unMute();
      player.setVolume(volume || 20);
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const player = playerRef.current;
    if (!player) return;

    const newVolume = Number(e.target.value);
    setVolume(newVolume);

    if (newVolume === 0) {
      player.mute();
      setIsMuted(true);
      return;
    }

    if (player.isMuted?.()) {
      player.unMute();
      setIsMuted(false);
    }

    player.setVolume(newVolume);
  };

  return (
    <main className="relative text-white">
      <ThemedBackground onReady={handlePlayerReady} />

      {/* ATOMIC PLAYER */}
      <div className="group absolute bottom-0 right-0 z-50 p-8">
        <div className="pointer-events-none w-[320px] translate-y-4 rounded-2xl border border-[#c084fc]/25 bg-[#3b1363]/45 p-4 text-white opacity-0 shadow-[0_0_30px_rgba(168,85,247,0.12)] backdrop-blur-md transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium tracking-wide text-[#e9d5ff]/70">
              Atomic Player
            </span>
            <span className="text-xs text-[#e9d5ff]/70">
              {isPlaying ? "Playing" : "Paused"} •{" "}
              {isMuted ? "Muted" : `${volume}%`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c084fc]/20 bg-[#6d28d9]/18"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c084fc]/20 bg-[#6d28d9]/18"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full accent-[#c084fc]"
            />
          </div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div
        className={`relative z-10  transition-all duration-[400ms] ease-out ${
          isInitialBlur ? "scale-[1.01] blur-sm" : "scale-100 blur-0"
        }`}
      >
        {/* TOP NAV */}
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
          {/* LEFT COPY */}
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

          {/* FLOATING ICONS - TOP LEFT */}
          <FloatingIconField
            items={orbitItems.slice(0, 8)}
            seedOffset={0}
            className="left-[0%] top-[10%] h-[90%] w-[80%]"
          />

          {/* FLOATING ICONS - TOP RIGHT */}
          <FloatingIconField
            items={orbitItems.slice(8)}
            seedOffset={180}
            className="right-[0%] top-[8%] h-[90%] w-[80%]"
          />

          {/* CENTER VISUAL */}
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

          {/* BOTTOM CARTRIDGES */}
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
<section className="relative min-h-screen w-full overflow-hidden  px-4 py-10 text-cyan-300">
  {/* background */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,220,255,0.16),transparent_45%)]" />
  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />

  {/* main HUD frame */}
  <div className="relative z-10 mx-auto grid min-h-[88vh] max-w-[1600px] grid-cols-[260px_1fr_360px] gap-3 border border-cyan-400/35  p-8 shadow-[0_0_45px_rgba(0,220,255,0.12)]">

    {/* LEFT */}
    <aside className="border border-cyan-400/30 p-8 font-mono text-sm">
      <p className="mb-6 text-cyan-200">02 &gt; WHAT I DO</p>

      <div className="space-y-4 text-cyan-300/80">
        <p>From strategy to interface, I help brands and products become clear,
          functional and impactful.</p>

        <p className="border border-cyan-400/40 px-8 py-2 text-cyan-200">
          ● Work with me :)
        </p>
      </div>

          <div className="mt-10 border-t border-cyan-400/25 pt-8">
  <p className="mb-4 text-cyan-200">ABOUT ME</p>

  <div className="flex items-center gap-4">
    <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-cyan-400/30">
      <img
        src="/aboutme/about-profile.png"
        alt="Vincent"
        className="h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-cyan-400/10" />
    </div>

    <p className="leading-6 text-cyan-300/70">
      I build, design and shape systems.
    </p>
  </div>

  {/* SECOND ITEM BELOW */}
{/* FULL IMAGE BLOCK */}
<div className="mt-6 relative w-full overflow-hidden">
  <img
    src="/Gifs/sillyhorse.gif"
    alt="Creative work"
    className="w-full h-[360px] object-cover opacity-100"
  />

</div>
</div>
    </aside>

    {/* CENTER */}
    <main className="relative overflow-hidden border border-cyan-400/30 p-15 font-mono">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.08),transparent_55%)]" />

      <div className="relative z-10">

        <h1 className="max-w-hg text-xl md:text-2xl leading-relaxed text-cyan-300/70">
          From strategy to interface, I help brands and products become clear,
          functional and impactful.
        </h1>
      </div>

      {/* floating module cards */}
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
            className={`absolute ${item.pos} w-[260px] border border-cyan-300/35 bg-cyan-950/20 p-6 text-cyan-200 backdrop-blur-xl
            shadow-[inset_0_0_30px_rgba(34,211,238,0.06),0_0_24px_rgba(34,211,238,0.10)]
            transition duration-300 hover:-translate-y-1 hover:border-cyan-200/70 hover:bg-cyan-900/25 hover:shadow-[inset_0_0_35px_rgba(34,211,238,0.10),0_0_40px_rgba(34,211,238,0.22)]`}
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

          {/* RIGHT */}
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
<section> 
  {/* layer 3 */}
</section>
        {/* SIGNATURE */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-center gap-2">
            <img
              src="/Gifs/mystar.gif"
              alt=""
              className="h-5 w-5 object-contain opacity-90"
            />
            <span
              className={`${spaceMono.className} select-none whitespace-nowrap text-[9px] leading-none tracking-[0.12em] text-white/30`}
            >
              Designed by Vincent Lambour
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}