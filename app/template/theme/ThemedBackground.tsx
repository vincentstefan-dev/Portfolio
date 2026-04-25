// reacts to mode
"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useThemeMode } from "@/app/template/theme/ThemeProvider";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type BackgroundTheme = {
  name: string;
  base: string;
  mainGradient: string;
  topGlow: string;
  midBand: string;
  streakOne: string;
  streakTwo: string;
};

type ThemedBackgroundProps = {
  onReady?: (player: any) => void;
};

const backgroundThemes: BackgroundTheme[] = [
  {
    name: "purple-cyan-Gameboy",
    base: "bg-[#18a9c9]/10",
    mainGradient:
      "bg-gradient-to-b from-[#2a0050]/95 via-[#6d28d9]/60 to-[#18a9c9]/30",
    topGlow: "bg-gradient-to-b from-[#18a9c9]/50 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#8fdcff]/10",
    streakTwo: "bg-[#9fe7ff]/10",
  },
  {
    name: "violet-pink-gameboy",
    base: "bg-[#4a15a3]/10",
    mainGradient:
      "bg-gradient-to-b from-[#4a15a3]/95 via-[#7c3aed]/60 to-[#4a15a3]/30",
    topGlow: "bg-gradient-to-b from-[#4a15a3]/40 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#e879f9]/10",
    streakTwo: "bg-[#f0abfc]/10",
  },
  {
    name: "indigo-blue-gameboy",
    base: "bg-[#2563eb]/10",
    mainGradient:
      "bg-gradient-to-b from-[#0f172a]/95 via-[#1e3a8a]/60 to-[#38bdf8]/25",
    topGlow: "bg-gradient-to-b from-[#38bdf8]/35 to-transparent",
    midBand: "bg-white/4",
    streakOne: "bg-[#60a5fa]/10",
    streakTwo: "bg-[#38bdf8]/10",
  },
  {
    name: "teal-aqua",
    base: "bg-[#aaf2de]/10",
    mainGradient:
      "bg-gradient-to-b from-[#022c22]/95 via-[#0f766e]/60 to-[#5eead4]/25",
    topGlow: "bg-gradient-to-b from-[#5eead4]/35 to-transparent",
    midBand: "bg-white/4",
    streakOne: "bg-[#aaf2de]/10",
    streakTwo: "bg-[#5eead4]/10",
  },
  {
    name: "dawn",
    base: "bg-[#33065c]/10",
    mainGradient:
      "bg-gradient-to-b from-[#3b0764]/95 via-[#c026d3]/60 to-[#77009e]/30",
    topGlow: "bg-gradient-to-b from-[#77009e]/35 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#33065c]/10",
    streakTwo: "bg-[#77009e]/10",
  },
  {
    name: "original-purple-cyan",
    base: "bg-[#18a9c9]/10",
    mainGradient:
      "bg-gradient-to-b from-[#2a0050]/99 via-[#6d28d9]/60 to-[#18a9c9]/30",
    topGlow: "bg-gradient-to-b from-[#18a9c9]/50 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#8fdcff]/10",
    streakTwo: "bg-[#9fe7ff]/10",
  },
  {
    name: "dark-minimal",
    base: "bg-[#1f2937]/20",
    mainGradient:
      "bg-gradient-to-b from-[#020617]/95 via-[#111827]/60 to-[#60a5fa]/20",
    topGlow: "bg-gradient-to-b from-[#60a5fa]/25 to-transparent",
    midBand: "bg-white/3",
    streakOne: "bg-[#3b82f6]/10",
    streakTwo: "bg-[#60a5fa]/10",
  },
  {
    name: "windows-vista-aero",
    base: "bg-[#7dd3fc]/10",
    mainGradient:
      "bg-gradient-to-b from-[#1e3a8a]/95 via-[#2563eb]/40 to-[#67e8f9]/18",
    topGlow: "bg-gradient-to-b from-[#bfdbfe]/40 to-transparent",
    midBand: "bg-white/12",
    streakOne: "bg-[#dbeafe]/14",
    streakTwo: "bg-[#a5f3fc]/12",
  },
  {
    name: "windows-xp-bliss",
    base: "bg-[#38bdf8]/10",
    mainGradient:
      "bg-gradient-to-b from-[#1e40af]/95 via-[#2563eb]/50 to-[#4ade80]/22",
    topGlow: "bg-gradient-to-b from-[#7dd3fc]/45 to-transparent",
    midBand: "bg-white/10",
    streakOne: "bg-[#93c5fd]/14",
    streakTwo: "bg-[#bbf7d0]/12",
  },
];

const basicTheme = backgroundThemes[2];
const basicVideos = ["z6_Qju7FJEA"];

const randomVideos = [
  "z6_Qju7FJEA",
  "_asoMC8oURI",
  "hC_xETkDqSU",
  "6IF5V6tv9LM",
];

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export default function ThemedBackground({ onReady }: ThemedBackgroundProps) {
  const { siteMode } = useThemeMode();

  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);

  const activeTheme = useMemo(() => {
    return siteMode === "random" ? pickRandom(backgroundThemes) : basicTheme;
  }, [siteMode]);

  const activeVideoId = useMemo(() => {
    return siteMode === "random" ? pickRandom(randomVideos) : pickRandom(basicVideos);
  }, [siteMode]);

  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !playerContainerRef.current || !window.YT?.Player) return;

      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        videoId: activeVideoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          loop: 1,
          playlist: activeVideoId,
          playsinline: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: any) => {
            const ytPlayer = event.target;

            ytPlayer.mute();
            ytPlayer.setVolume(20);
            ytPlayer.playVideo();

            setTimeout(() => {
              const duration = ytPlayer.getDuration?.();

              if (duration && duration > 10) {
                const randomStart = Math.floor(Math.random() * (duration - 10));
                ytPlayer.seekTo(randomStart, true);
              }
            }, 800);

            onReady?.(ytPlayer);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }

      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      cancelled = true;

      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [activeVideoId, onReady]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* YOUTUBE VIDEO LAYER */}
      <div className="absolute left-1/2 top-1/2 h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <div
          ref={playerContainerRef}
          className="absolute left-1/2 top-1/2 aspect-video h-auto min-h-[120vh] w-[213.34vh] min-w-[120vw] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div
        className={`pointer-events-none absolute inset-0 transition-all duration-700 ${activeTheme.base}`}
      />

      <div
        className={`pointer-events-none absolute inset-0 transition-all duration-700 ${activeTheme.mainGradient}`}
      />

      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute left-0 top-0 h-40 w-full transition-all duration-700 ${activeTheme.topGlow}`}
        />

        <div
          className={`absolute left-0 top-[23%] h-20 w-full blur-2xl transition-all duration-700 ${activeTheme.midBand}`}
        />

        <div
          className={`absolute left-[-10%] top-[34%] h-32 w-[130%] rotate-[-3deg] blur-3xl transition-all duration-700 ${activeTheme.streakOne}`}
        />

        <div
          className={`absolute left-[-10%] top-[55%] h-36 w-[130%] rotate-[1deg] blur-3xl transition-all duration-700 ${activeTheme.streakTwo}`}
        />
      </div>
    </div>
  );
}