"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Sparkles, Zap, House } from "lucide-react";
import { Space_Mono } from "next/font/google";

import { useThemeMode } from "@/app/template/theme/ThemeProvider";
import ThemedBackground from "@/app/template/theme/ThemedBackground";
import AtomicPlayer from "@/app/components/media/atomicplayer";
import PageTransitionWrapper from "@/app/components/layout/PageTransitionWrapper";
import SiteSignature from "@/app/components/hero/SiteSignature";

import { useAtomicPlayerControls } from "@/app/components/layout/useAtomicPlayerControls";
import { usePageTransition } from "@/app/components/layout/usePageTransition";
import { useThemeGlow } from "@/app/components/layout/useThemeGlow";

import {
  backgroundThemes,
  type BackgroundTheme,
} from "@/app/template/theme/backgroundThemes";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

type ThemePreviewCardProps = {
  theme: BackgroundTheme;
  index: number;
  onOpenPreview: (theme: BackgroundTheme) => void;
};

type FilterKey =
  | "all"
  | "radical"
  | "blue-cyan"
  | "purple-violet"
  | "green-terminal"
  | "red-magenta"
  | "amber-orange"
  | "aero-retro"
  | "minimal"
  | "radical-light";

type ParticleProps = {
  left: string;
  top: string;
  size?: "sm" | "md" | "lg";
  color?: "white" | "cyan";
};

const filterMeta: Record<
  FilterKey,
  {
    label: string;
    eyebrow: string;
    description: string;
  }
> = {
  all: {
    label: "All",
    eyebrow: "Full Bank",
    description: "Every background system in the current KOYOTE theme bank.",
  },
  radical: {
    label: "Radical",
    eyebrow: "Experimental",
    description:
      "Themes that intentionally break away from the core dark neon identity.",
  },
  "blue-cyan": {
    label: "Blue Glass",
    eyebrow: "Core Identity",
    description:
      "Cool, polished, cyan-heavy systems for the main KOYOTE visual language.",
  },
  "purple-violet": {
    label: "Violet",
    eyebrow: "Synthetic Softness",
    description:
      "Purple, periwinkle, and violet systems with a softer digital atmosphere.",
  },
  "green-terminal": {
    label: "Terminal",
    eyebrow: "Matrix Logic",
    description:
      "Green, acid, and terminal-inspired systems with a sharper interface tone.",
  },
  "red-magenta": {
    label: "Noir Red",
    eyebrow: "Cinematic Heat",
    description:
      "Red, rose, and magenta systems with a darker, more dramatic mood.",
  },
  "amber-orange": {
    label: "Amber",
    eyebrow: "CRT Warmth",
    description:
      "Warm CRT, sand, and orange systems with a retro editorial character.",
  },
  "aero-retro": {
    label: "Aero",
    eyebrow: "Glass Nostalgia",
    description:
      "Soft glass and nostalgic interface-inspired systems with a lighter feel.",
  },
  minimal: {
    label: "Minimal",
    eyebrow: "Professional Mode",
    description:
      "Restrained dark systems for a cleaner, more serious presentation.",
  },
  "radical-light": {
    label: "Light",
    eyebrow: "Bright Variant",
    description:
      "Bright glass experiments outside the usual dark KOYOTE palette.",
  },
};

const themeFilters = Object.keys(filterMeta) as FilterKey[];

const quickExplorerItems: {
  filter: FilterKey;
  label: string;
  themeName: string;
}[] = [
  {
    filter: "blue-cyan",
    label: "Blue Glass",
    themeName: "black-ice-cyan",
  },
  {
    filter: "purple-violet",
    label: "Violet",
    themeName: "obsidian-purple",
  },
  {
    filter: "amber-orange",
    label: "Amber",
    themeName: "amber-crt",
  },
  {
    filter: "red-magenta",
    label: "Noir Red",
    themeName: "cyber-noir-red",
  },
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function ThemeParticle({
  left,
  top,
  size = "sm",
  color = "white",
}: ParticleProps) {
  const [particleStyle, setParticleStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    setParticleStyle({
      "--particle-x-a": `${randomBetween(-16, 16).toFixed(1)}px`,
      "--particle-y-a": `${randomBetween(-16, 16).toFixed(1)}px`,
      "--particle-x-b": `${randomBetween(-12, 12).toFixed(1)}px`,
      "--particle-y-b": `${randomBetween(-12, 12).toFixed(1)}px`,
      "--particle-scale-start": randomBetween(0.75, 1.1).toFixed(2),
      "--particle-scale-mid": randomBetween(1.15, 1.75).toFixed(2),
      "--particle-scale-end": randomBetween(0.9, 1.35).toFixed(2),
      "--particle-opacity-start": randomBetween(0.25, 0.55).toFixed(2),
      "--particle-opacity-mid": randomBetween(0.65, 1).toFixed(2),
      "--particle-opacity-end": randomBetween(0.35, 0.75).toFixed(2),
      "--particle-duration": `${randomBetween(4.8, 9.8).toFixed(1)}s`,
      "--particle-pulse-duration": `${randomBetween(2.4, 4.8).toFixed(1)}s`,
      "--particle-delay": `${randomBetween(-7, 0).toFixed(1)}s`,
    } as React.CSSProperties);
  }, []);

  const sizeClass =
    size === "lg" ? "h-2 w-2" : size === "md" ? "h-1.5 w-1.5" : "h-1 w-1";

  const colorClass =
    color === "cyan"
      ? "bg-cyan-100/60 shadow-[0_0_12px_rgba(165,243,252,0.8)]"
      : "bg-white/60 shadow-[0_0_10px_rgba(255,255,255,0.75)]";

  return (
    <span
      className={`theme-particle-random absolute rounded-full ${sizeClass} ${colorClass}`}
      style={{
        left,
        top,
        ...particleStyle,
      }}
    />
  );
}

function ThemePreviewCard({
  theme,
  index,
  onOpenPreview,
}: ThemePreviewCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpenPreview(theme)}
      className="group w-full overflow-hidden rounded-3xl border border-white/10 bg-black/35 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-cyan-200/40"
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-[#020714]" />
        <div className={`absolute inset-0 ${theme.base}`} />
        <div className={`absolute inset-0 ${theme.mainGradient}`} />

        <div className="absolute inset-0">
          <div
            className={`absolute left-0 top-0 h-24 w-full transition-opacity duration-500 group-hover:opacity-90 ${theme.topGlow}`}
          />

          <div
            className={`absolute left-0 top-[24%] h-16 w-full blur-2xl transition-opacity duration-500 group-hover:opacity-90 ${theme.midBand}`}
          />

          <div
            className={`absolute left-[-18%] top-[38%] h-28 w-[140%] rotate-[-4deg] blur-3xl transition-transform duration-700 group-hover:translate-x-5 group-hover:scale-110 ${theme.streakOne}`}
          />

          <div
            className={`absolute left-[-18%] top-[58%] h-28 w-[140%] rotate-[2deg] blur-3xl transition-transform duration-700 group-hover:-translate-x-5 group-hover:scale-110 ${theme.streakTwo}`}
          />
        </div>

        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute left-[-45%] top-[-30%] h-[170%] w-[45%] rotate-[22deg] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md transition-transform duration-700 group-hover:translate-x-[280%]" />
        </div>

        {/* Random independent particle field */}
        <div className="absolute inset-0 opacity-70">
          <ThemeParticle left="14%" top="34%" size="sm" color="white" />
          <ThemeParticle left="24%" top="18%" size="md" color="cyan" />
          <ThemeParticle left="34%" top="76%" size="sm" color="white" />
          <ThemeParticle left="46%" top="66%" size="sm" color="white" />
          <ThemeParticle left="56%" top="38%" size="lg" color="cyan" />
          <ThemeParticle left="64%" top="22%" size="md" color="cyan" />
          <ThemeParticle left="72%" top="54%" size="sm" color="white" />
          <ThemeParticle left="82%" top="70%" size="sm" color="white" />
          <ThemeParticle left="88%" top="30%" size="sm" color="cyan" />
        </div>

        <div className="absolute inset-4 rounded-2xl border border-white/10 opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0">
          <div className="absolute inset-x-4 top-4 flex items-center justify-between">
            <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
              KOYOTE
            </div>

            <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] text-white/70 backdrop-blur-sm">
              Preview
            </div>
          </div>

          <div className="absolute bottom-5 left-5 right-5">
            <div className="max-w-[75%]">
              <div className="mb-2 h-2 w-16 rounded-full bg-white/40 transition-all duration-500 group-hover:w-20" />
              <div className="h-4 w-40 rounded-full bg-white/70 transition-all duration-500 group-hover:w-48" />
              <div className="mt-2 h-3 w-28 rounded-full bg-white/35 transition-all duration-500 group-hover:w-36" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70" />

        {theme.radical && (
          <div className="absolute bottom-4 right-4 rounded-full border border-amber-200/25 bg-amber-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-amber-100 backdrop-blur-md">
            Radical
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="truncate text-sm font-semibold text-white transition group-hover:text-cyan-100">
            {theme.name}
          </h2>

          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/55">
            #{index + 1}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-cyan-200/10 bg-cyan-300/10 px-2 py-1 text-[10px] text-cyan-100/70">
            {theme.family}
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/55">
            {theme.mood}
          </span>
        </div>
      </div>
    </button>
  );
}

function QuickExplorerCard({
  theme,
  label,
  isActive,
  onClick,
}: {
  theme: BackgroundTheme;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group overflow-hidden rounded-2xl border bg-black/20 text-left transition duration-300 hover:-translate-y-1 ${
        isActive
          ? "border-cyan-300/45 shadow-[0_0_30px_rgba(34,211,238,0.22)]"
          : "border-white/10 hover:border-white/25"
      }`}
    >
      <div className="relative h-28 overflow-hidden">
        <div className="absolute inset-0 bg-[#020714]" />
        <div className={`absolute inset-0 ${theme.base}`} />
        <div className={`absolute inset-0 ${theme.mainGradient}`} />

        <div className="absolute inset-0">
          <div
            className={`absolute left-0 top-0 h-12 w-full ${theme.topGlow}`}
          />

          <div
            className={`absolute left-[-30%] top-[36%] h-20 w-[160%] rotate-[-10deg] blur-2xl transition-transform duration-700 group-hover:translate-x-4 group-hover:scale-110 ${theme.streakOne}`}
          />

          <div
            className={`absolute left-[-30%] top-[58%] h-20 w-[160%] rotate-[6deg] blur-2xl transition-transform duration-700 group-hover:-translate-x-4 group-hover:scale-110 ${theme.streakTwo}`}
          />

          <div
            className={`absolute left-0 top-[22%] h-10 w-full blur-2xl transition-opacity duration-500 group-hover:opacity-90 ${theme.midBand}`}
          />
        </div>

        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute left-[-40%] top-[-20%] h-[150%] w-1/2 rotate-[22deg] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-md transition-transform duration-700 group-hover:translate-x-[220%]" />
        </div>

        {/* Random independent mini particles */}
        <div className="absolute inset-0 opacity-70">
          <ThemeParticle left="18%" top="30%" size="sm" color="white" />
          <ThemeParticle left="36%" top="46%" size="sm" color="white" />
          <ThemeParticle left="52%" top="64%" size="sm" color="white" />
          <ThemeParticle left="62%" top="24%" size="md" color="cyan" />
          <ThemeParticle left="78%" top="68%" size="sm" color="white" />
        </div>

        <div className="absolute inset-3 rounded-xl border border-white/10 opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        {isActive && (
          <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_14px_rgba(165,243,252,0.9)]" />
        )}
      </div>

      <div className="px-3 py-3 text-center">
        <p className="text-sm font-semibold text-white/85 transition group-hover:text-cyan-100">
          {label}
        </p>
      </div>
    </button>
  );
}

function ThemeFullscreenPreview({
  theme,
  onClose,
}: {
  theme: BackgroundTheme;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 p-4 backdrop-blur-xl sm:p-6">
      <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/15 bg-black shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
        <div className="absolute inset-0 bg-[#020714]" />
        <div className={`absolute inset-0 ${theme.base}`} />
        <div className={`absolute inset-0 ${theme.mainGradient}`} />

        <div className="absolute inset-0">
          <div
            className={`absolute left-0 top-0 h-48 w-full ${theme.topGlow}`}
          />

          <div
            className={`absolute left-0 top-[23%] h-28 w-full blur-2xl ${theme.midBand}`}
          />

          <div
            className={`absolute left-[-10%] top-[34%] h-40 w-[130%] rotate-[-3deg] blur-3xl ${theme.streakOne}`}
          />

          <div
            className={`absolute left-[-10%] top-[55%] h-44 w-[130%] rotate-[1deg] blur-3xl ${theme.streakTwo}`}
          />
        </div>

        {/* Fullscreen preview particles */}
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-80">
          <ThemeParticle left="8%" top="22%" size="sm" color="white" />
          <ThemeParticle left="14%" top="64%" size="md" color="cyan" />
          <ThemeParticle left="22%" top="38%" size="sm" color="white" />
          <ThemeParticle left="34%" top="78%" size="sm" color="white" />
          <ThemeParticle left="42%" top="18%" size="lg" color="cyan" />
          <ThemeParticle left="56%" top="52%" size="sm" color="white" />
          <ThemeParticle left="68%" top="28%" size="md" color="cyan" />
          <ThemeParticle left="76%" top="72%" size="sm" color="white" />
          <ThemeParticle left="88%" top="40%" size="lg" color="cyan" />
          <ThemeParticle left="92%" top="82%" size="sm" color="white" />
        </div>

        <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between gap-4">
          <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/80 backdrop-blur-xl">
            Virtual Preview
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm text-white/70 backdrop-blur-xl transition hover:border-cyan-200/30 hover:bg-cyan-300/10 hover:text-cyan-100"
          >
            Close
          </button>
        </div>

        <div className="relative z-10 flex h-full items-center justify-center overflow-y-auto px-6 py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70 backdrop-blur-xl">
                KOYOTE
              </div>

              <h1 className="max-w-4xl text-[52px] font-semibold leading-[0.9] tracking-[-0.08em] text-white sm:text-[80px] md:text-[104px]">
                Strategy
                <br />
                Code
                <br />
                Brand
                <br />
                Systems
              </h1>

              <p className="mt-8 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
                Creative developer and strategist building digital experiences,
                brand systems, and expressive interfaces.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-cyan-200/25 bg-cyan-300/10 px-5 py-3 text-sm text-cyan-100 backdrop-blur-xl">
                  View Work
                </div>

                <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm text-white/70 backdrop-blur-xl">
                  About Me
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-100/50">
                    Active Theme
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-white">
                    {theme.name}
                  </h2>
                </div>

                {theme.radical && (
                  <span className="rounded-full border border-amber-200/25 bg-amber-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-amber-100">
                    Radical
                  </span>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-white/35">Family</p>
                  <p className="mt-1 text-white/80">{theme.family}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-white/35">Mood</p>
                  <p className="mt-1 text-white/80">{theme.mood}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-white/35">Use case</p>
                  <p className="mt-1 text-white/70">
                    Use this preview to judge whether the theme works as a real
                    homepage background, not only as a small card.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 right-5 z-20 flex justify-center">
          <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs text-white/45 backdrop-blur-xl">
            This is a virtual preview. It does not change your live default
            theme.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThemeLabPage() {
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

  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [selectedTheme, setSelectedTheme] = useState<BackgroundTheme | null>(
    null,
  );

  const filteredThemes = useMemo(() => {
    if (activeFilter === "all") return backgroundThemes;

    if (activeFilter === "radical") {
      return backgroundThemes.filter((theme) => theme.radical);
    }

    return backgroundThemes.filter((theme) => theme.family === activeFilter);
  }, [activeFilter]);

  const activeMeta = filterMeta[activeFilter];

  const quickExplorerThemes = useMemo(() => {
    return quickExplorerItems
      .map((item) => {
        const theme =
          backgroundThemes.find((entry) => entry.name === item.themeName) ??
          backgroundThemes.find((entry) => entry.family === item.filter);

        if (!theme) return null;

        return {
          ...item,
          theme,
        };
      })
      .filter(Boolean) as {
      filter: FilterKey;
      label: string;
      themeName: string;
      theme: BackgroundTheme;
    }[];
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <style>{`
        @keyframes themeParticleRandomDrift {
          0% {
            transform: translate3d(0, 0, 0) scale(var(--particle-scale-start, 1));
            opacity: var(--particle-opacity-start, 0.35);
          }

          35% {
            transform: translate3d(
                var(--particle-x-a, 8px),
                var(--particle-y-a, -10px),
                0
              )
              scale(var(--particle-scale-mid, 1.35));
            opacity: var(--particle-opacity-mid, 0.9);
          }

          70% {
            transform: translate3d(
                var(--particle-x-b, -6px),
                var(--particle-y-b, 8px),
                0
              )
              scale(var(--particle-scale-end, 1.1));
            opacity: var(--particle-opacity-end, 0.55);
          }

          100% {
            transform: translate3d(0, 0, 0) scale(var(--particle-scale-start, 1));
            opacity: var(--particle-opacity-start, 0.35);
          }
        }

        @keyframes themeParticlePulse {
          0%,
          100% {
            filter: brightness(0.85);
          }

          50% {
            filter: brightness(1.7);
          }
        }

        .theme-particle-random {
          animation:
            themeParticleRandomDrift var(--particle-duration, 6s) ease-in-out infinite,
            themeParticlePulse var(--particle-pulse-duration, 3s) ease-in-out infinite;
          animation-delay: var(--particle-delay, 0s);
          will-change: transform, opacity, filter;
        }
      `}</style>

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
        <div className="relative z-10 min-h-screen px-5 py-6 sm:px-8 lg:px-12">
          <header className="sticky top-5 z-30 mx-auto max-w-7xl rounded-3xl border border-white/10 bg-black/30 px-5 py-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/coolstuff"
                  className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:-translate-x-0.5 hover:border-cyan-200/30 hover:bg-cyan-300/10 hover:text-cyan-100"
                  aria-label="Back to cool stuff"
                >
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
                </Link>

                <div>
                  <p
                    className={`text-xs uppercase tracking-[0.28em] ${glow.text}`}
                  >
                    Theme Lab
                  </p>

                  <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                    KOYOTE Background Themes
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-md">
                  {filteredThemes.length} / {backgroundThemes.length} themes
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-md">
                  <Eye className="h-4 w-4 text-cyan-200/70" />
                  Preview mode
                </div>
              </div>
            </div>
          </header>

          <section className="mx-auto max-w-7xl pb-8 pt-10">
            <div className="grid gap-5 lg:grid-cols-[1.25fr_0.95fr]">
              <div className="rounded-[2rem] border border-white/10 bg-black/25 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-7">
                <div className="mb-4 flex items-center gap-2 text-sm text-cyan-100/70">
                  <Sparkles className="h-4 w-4" />
                  <span>Visual system preview</span>
                </div>

                <p className="max-w-4xl text-sm leading-7 text-white/65 sm:text-base">
                  Scroll through the full theme bank and compare how each
                  gradient, glow, and streak system behaves inside the same card
                  structure. Use this page to prune duplicates, keep the
                  strongest backgrounds, and test radical visual directions
                  without touching the main homepage.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-black/25 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-2 text-sm text-cyan-100/70">
                  <Zap className="h-4 w-4" />
                  <span>Quick theme explorer</span>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {quickExplorerThemes.map((item) => (
                    <QuickExplorerCard
                      key={item.filter}
                      theme={item.theme}
                      label={item.label}
                      isActive={activeFilter === item.filter}
                      onClick={() => setActiveFilter(item.filter)}
                    />
                  ))}
                </div>

                <div className="mt-5 flex justify-center gap-3">
                  {quickExplorerThemes.map((item) => (
                    <button
                      key={item.filter}
                      type="button"
                      onClick={() => setActiveFilter(item.filter)}
                      className={`h-2 w-2 rounded-full transition ${
                        activeFilter === item.filter
                          ? "bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]"
                          : "bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Select ${item.label}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl pb-8">
            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
              <div className="mb-3 flex items-center justify-between gap-4 px-2 pt-1">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-100/45">
                    Theme Range
                  </p>
                  <h2 className="mt-1 text-sm font-medium text-white/80">
                    {activeMeta.eyebrow}
                  </h2>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/45">
                  {filteredThemes.length} active
                </div>
              </div>

              <div className="flex gap-1 overflow-x-auto rounded-[1.45rem] border border-white/10 bg-white/[0.03] p-1.5">
                {themeFilters.map((filter) => {
                  const isActive = activeFilter === filter;
                  const meta = filterMeta[filter];

                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`relative shrink-0 rounded-[1.15rem] px-4 py-2.5 text-xs transition duration-300 ${
                        isActive
                          ? "border border-cyan-200/35 bg-cyan-300/15 text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.18)]"
                          : "border border-transparent text-white/45 hover:border-white/10 hover:bg-white/7 hover:text-white/75"
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(165,243,252,0.9)]" />
                        )}
                        {meta.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 rounded-[1.5rem] border border-white/10 bg-black/20 px-4 py-3">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                      Viewing
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-white">
                      {activeMeta.label}
                    </h3>
                  </div>

                  <p className="max-w-2xl text-sm leading-6 text-white/55">
                    {activeMeta.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl pb-24">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredThemes.map((theme) => {
                const originalIndex = backgroundThemes.findIndex(
                  (item) => item.name === theme.name,
                );

                return (
                  <ThemePreviewCard
                    key={theme.name}
                    theme={theme}
                    index={originalIndex}
                    onOpenPreview={setSelectedTheme}
                  />
                );
              })}
            </div>
          </section>
        </div>

        <SiteSignature fontClass={spaceMono.className} />
      </PageTransitionWrapper>
      

      {selectedTheme && (
        <ThemeFullscreenPreview
          theme={selectedTheme}
          onClose={() => setSelectedTheme(null)}
        />
        
      )}
      
        <Link
          href="/coolstuff"
          aria-label="Return to apps"
          className="fixed bottom-6 right-6 z-[9998] group flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0.1))] shadow-[0_8px_28px_rgba(120,205,255,0.22),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-white/20"
        >
          <House
            className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110"
            strokeWidth={1.5}
          />
        </Link>
    </main>
  );
}