"use client";

import { useThemeMode, type SiteMode } from "@/app/template/theme/ThemeProvider";
import ThemeModal from "@/app/template/theme/ThemeModal";
import ThemedNavIcon from "@/app/template/theme/ThemedNavIcon";
import ThemedBackground from "@/app/template/theme/ThemedBackground";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  AtSign,
  BookImage,
  Bug,
  Dna,
  Cpu,
  Play,
  Pause,
  Volume2,
  VolumeX,
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

const menuItems: MenuItem[] = [
  { label: "Home", icon: House, href: "/", gif: "/Gifs/Home.gif" },
  { label: "Portfolio", icon: Dna, href: "/portfolio", gif: "/Gifs/portfolio.gif" },
  { label: "About me", icon: Bug, href: "/aboutme", gif: "/Gifs/eyes.gif" },
  { label: "Apps", icon: Cpu, href: "/coolstuff", gif: "/Gifs/MUSIC.gif" },
  { label: "Moodboard", icon: BookImage, href: "/moodboard", gif: "/Gifs/mariostar.gif" },
  { label: "Contact me", icon: AtSign, href: "/contact", gif: "/Gifs/at.gif" },
];

const themeButtonGif = "/Gifs/questionmark.gif";

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
  {
    text: "group-hover:text-[#f0abfc]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#e879f9]",
    bg: "group-hover:bg-[#f0abfc]/20",
  },
  {
    text: "group-hover:text-[#86efac]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#22c55e]",
    bg: "group-hover:bg-[#86efac]/20",
  },
];

const basicGlow = glowStyles[0];

function pickRandomGlow() {
  return glowStyles[Math.floor(Math.random() * glowStyles.length)];
}

export default function HomepageVideoIconMenu() {
  const { siteMode, setSiteMode } = useThemeMode();

  const pathname = usePathname();
  const playerRef = useRef<any>(null);

  const [glow, setGlow] = useState<GlowStyle>(basicGlow);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isInitialBlur, setIsInitialBlur] = useState(true);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(20);

  const playBlurIntro = useCallback(() => {
    setIsInitialBlur(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.setTimeout(() => {
          setIsInitialBlur(false);
        }, 50);
      });
    });
  }, []);

  const applyMode = useCallback(
    (mode: SiteMode) => {
      setSiteMode(mode);

      if (mode === "basic") {
        setGlow(basicGlow);
      } else {
        setGlow(pickRandomGlow());
      }
    },
    [setSiteMode]
  );

  useEffect(() => {
    if (siteMode === "random") {
      setGlow(pickRandomGlow());
    } else {
      setGlow(basicGlow);
    }
  }, [siteMode]);

  useEffect(() => {
    playBlurIntro();
  }, [pathname, playBlurIntro]);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        playBlurIntro();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [playBlurIntro]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsThemeMenuOpen(false);
      }
    };

    if (isThemeMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isThemeMenuOpen]);

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
    <main className="relative min-h-screen overflow-hidden text-white">
      <ThemedBackground onReady={handlePlayerReady} />

      <div className="group absolute bottom-0 right-0 z-20 p-8">
        <div className="pointer-events-none w-[320px] translate-y-4 rounded-2xl border border-[#c084fc]/25 bg-[#3b1363]/45 p-4 text-white opacity-0 shadow-[0_0_30px_rgba(168,85,247,0.12)] backdrop-blur-md transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium tracking-wide text-[#e9d5ff]/70">
              Atomic Player
            </span>
            <span className="text-xs text-[#e9d5ff]/70">
              {isPlaying ? "Playing" : "Paused"} • {isMuted ? "Muted" : `${volume}%`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c084fc]/20 bg-[#6d28d9]/18 transition hover:bg-[#8b5cf6]/28"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c084fc]/20 bg-[#6d28d9]/18 transition hover:bg-[#8b5cf6]/28"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>

            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full accent-[#c084fc]"
                aria-label="Volume"
              />
            </div>
          </div>

          <p className="mt-3 text-xs text-[#e9d5ff]/70">Hover here for controls.</p>
        </div>
      </div>

      <div
        className={`relative z-30 min-h-screen transition-all duration-[400ms] ease-out ${
          isInitialBlur ? "scale-[1.01] blur-sm" : "scale-100 blur-0"
        }`}
      >
        <div className="flex min-h-screen items-center justify-center px-6">
          <nav aria-label="Main navigation" className="w-full max-w-7xl">
            <div className="flex flex-wrap items-center justify-center gap-30">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col items-center text-center transition duration-300 hover:-translate-y-1 focus:outline-none"
                >
                  <ThemedNavIcon
                    label={item.label}
                    icon={item.icon}
                    gif={item.gif}
                    glow={glow}
                  />
                  <span className="mt-2 text-sm text-white/70">{item.label}</span>
                </Link>
              ))}

              <div className="group relative z-40 flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsThemeMenuOpen(true)}
                  aria-label="Open theme selector"
                  aria-expanded={isThemeMenuOpen}
                  className="relative z-40 flex h-14 w-14 items-center justify-center rounded-xl  transition duration-300 active:scale-95 md:hover:-translate-y-1"
                >
                  <img
                    src={themeButtonGif}
                    alt="Themes"
                    className="pointer-events-none h-50 w-50 object-contain transition duration-300 md:group-hover:scale-500"
                  />
                </button>

                <span className="mt-2 text-sm text-white/70">Themes</span>
              </div>
            </div>
          </nav>
        </div>

        <ThemeModal
          isOpen={isThemeMenuOpen}
          onClose={() => setIsThemeMenuOpen(false)}
          onApplyMode={applyMode}
          siteMode={siteMode}
        />

        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
          <div className="flex items-center gap-2">
            <img
              src="/Gifs/mystar.gif"
              alt="Vincent Lambour logo"
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