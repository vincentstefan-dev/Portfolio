"use client";

import { useThemeMode } from "@/app/template/theme/ThemeProvider";
import ThemedBackground from "@/app/template/theme/ThemedBackground";
import ThemedNavIcon from "@/app/template/theme/ThemedNavIcon";
import AtomicPlayer from "@/app/components/media/atomicplayer";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, LoaderPinwheel, FileScan } from "lucide-react";
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
  { label: "Home", icon: House, href: "/", gif: "/Gifs/mystar.gif" },
  {
    label: "Background Remover",
    icon: FileScan,
    href: "/coolstuff/background_remover",
    gif: "/Gifs/portfolio.gif",
  },
  {
    label: "Pixelate",
    icon: LoaderPinwheel,
    href: "/coolstuff/pixelate",
    gif: "/Gifs/final.gif",
  },
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
        window.setTimeout(() => {
          setIsInitialBlur(false);
        }, 50);
      });
    });
  }, []);

  useEffect(() => {
    setGlow(siteMode === "random" ? pickRandomGlow() : basicGlow);
  }, [siteMode]);

  useEffect(() => {
    playBlurIntro();
  }, [pathname, playBlurIntro]);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) playBlurIntro();
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [playBlurIntro]);

  const handlePlayerReady = useCallback((player: any) => {
    playerRef.current = player;
    setIsPlaying(true);
    setIsMuted(true);
    setVolume(20);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
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

      <div
        className={`relative z-10 min-h-screen transition-all duration-[400ms] ease-out ${
          isInitialBlur ? "scale-[1.01] blur-sm" : "scale-100 blur-0"
        }`}
      >
        <div className="flex min-h-screen items-center justify-center px-6">
          <nav aria-label="Page navigation" className="w-full max-w-7xl">
            <div className="flex flex-wrap items-center justify-center gap-16">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/60"
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
        </div>

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