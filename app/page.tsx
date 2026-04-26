"use client";

import { useThemeMode, type SiteMode } from "@/app/template/theme/ThemeProvider";
import ThemeModal from "@/app/template/theme/ThemeModal";
import ThemedNavIcon from "@/app/template/theme/ThemedNavIcon";
import ThemedBackground from "@/app/template/theme/ThemedBackground";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
import { getCTA } from "@/app/template/theme/CTA_WORD_BANK";
import { LOGO_BANK } from "@/app/template/theme/LOGO_BANK";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

const pickWeightedLogo = () => {
  const total = LOGO_BANK.reduce((sum, logo) => sum + (logo.weight ?? 1), 0);
  let random = Math.random() * total;

  for (const logo of LOGO_BANK) {
    random -= logo.weight ?? 1;
    if (random <= 0) return logo;
  }

  return LOGO_BANK[0];
};

type NavIcon = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

type MenuItem = {
  label: string;
  href: string;
  img?: string;
  icon?: NavIcon;
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

  const [cta, setCta] = useState<{ value: string; type: "text" | "image" }>({
  value: "",
  type: "text",
  });

  const [activeLogo, setActiveLogo] = useState(LOGO_BANK[0]);

  useEffect(() => {
    setActiveLogo(pickWeightedLogo());
  }, []);

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
      setGlow(mode === "basic" ? basicGlow : pickRandomGlow());
    },
    [setSiteMode]
  );

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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsThemeMenuOpen(false);
    };

    if (isThemeMenuOpen) document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isThemeMenuOpen]);

useEffect(() => {
  setCta(getCTA());

  const interval = window.setInterval(() => {
    setCta(getCTA());
  }, 10000);

  return () => window.clearInterval(interval);
}, []);

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

      {/* ATOMIC PLAYER */}
      <div className="group absolute bottom-0 right-0 z-20 p-8">
        <div className="pointer-events-none w-[320px] translate-y-4 rounded-2xl border border-[#c084fc]/25 bg-[#3b1363]/45 p-4 text-white opacity-0 shadow-[0_0_30px_rgba(168,85,247,0.12)] backdrop-blur-md transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium tracking-wide text-[#e9d5ff]/70">
              Atomic Player
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

          <p className="mt-3 text-xs text-[#e9d5ff]/70">
            Hover here for controls.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className={`relative z-30 min-h-screen transition-all duration-[400ms] ease-out ${
          isInitialBlur ? "scale-[1.01] blur-sm" : "scale-100 blur-0"
        }`}
      >
        <div className="flex min-h-screen flex-col items-center px-6 pt-8 pb-24 md:pt-10 md:pb-20">
          {/* LOGO */}
          <div className="pointer-events-none z-20 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            >
              <img
                src={activeLogo.src}
                alt={activeLogo.alt}
                className={activeLogo.className ?? ""}
                style={{
                  filter: activeLogo.glow,
                  opacity: activeLogo.opacity ?? 1,
                  transform: `scale(${activeLogo.scale ?? 1})`,
                }}
              />
            </motion.div>
          </div>

          {/* CTA */}
          <div className="pointer-events-none z-20 -mt-8 mb-8 md:-mt-14 md:mb-10">
            <div className="flex min-h-[40px] flex-col items-center justify-center">
            <motion.div
              key={cta.value}
              initial={{ opacity: 0.35, y: 3 }}
              animate={{
                opacity: [0.45, 0.78, 0.55],
                y: [-1.4, 1.4, -1],
                x: [-0.6, 0.5, -0.3],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex items-center justify-center"
            >
                 {cta.type === "image" ? (
                <img
                  src={cta.value}
                  alt="cta"
                  className="h-25 w-25 md:h-25 md:w- object-contain pixelated opacity-80"
                />
              ) : (
                <span
                  className={`${spaceMono.className} select-none whitespace-nowrap text-center text-[11px] tracking-[0.24em] text-white/65 sm:text-[12px] md:text-[13px]`}
                  style={{
                    textShadow:
                      "0 0 10px rgba(190,220,255,0.18), 0 0 24px rgba(190,220,255,0.08)",
                  }}
                >
                  {cta.value}
                </span>
                  )}
                  </motion.div>
            </div>
          </div>

          {/* NAV ICONS */}
          <nav aria-label="Main navigation" className="w-full flex justify-center">
          <div
            className="
              grid w-full max-w-[420px] grid-cols-2 place-items-center gap-x-10 gap-y-12

              sm:max-w-[520px] sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14

              md:max-w-[760px] md:grid-cols-3 md:gap-x-14 md:gap-y-14

              lg:max-w-[980px] lg:grid-cols-4 lg:gap-x-16 lg:gap-y-16

              xl:max-w-[1200px] xl:grid-cols-7 xl:gap-x-18 xl:gap-y-16

              2xl:max-w-7xl 2xl:grid-cols-7 2xl:gap-x-20 2xl:gap-y-0
            "

            >
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex h-[82px] w-[90px] flex-col items-center justify-start text-center transition duration-300 hover:-translate-y-1 focus:outline-none"
                >
                  <ThemedNavIcon
                    label={item.label}
                    icon={item.icon}
                    img={item.img}
                    gif={item.gif}
                    glow={glow}
                  />

                  <span className="mt-2 text-sm text-white/70">
                    {item.label}
                  </span>
                </Link>
              ))}

              {/* THEMES BUTTON */}
              <button
                type="button"
                onClick={() => setIsThemeMenuOpen(true)}
                aria-label="Open theme selector"
                aria-expanded={isThemeMenuOpen}
                className="
                  group flex h-[82px] w-[90px] flex-col items-center justify-start text-center
                  transition duration-300 hover:-translate-y-1 focus:outline-none active:scale-95

                  col-span-2 justify-self-center   /* mobile */

                  md:col-span-1 md:col-start-2     /* <-- THIS is the fix */

                  lg:col-span-1
                  xl:col-span-1
                  2xl:col-span-1
                "
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl">
                  <img
                    src={themeButtonGif}
                    alt=""
                    className="pointer-events-none h-[50px] w-[50px] object-contain transition duration-300 md:group-hover:scale-[1.35]"
                  />
                </span>

                <span className="mt-2 text-sm text-white/70">
                  Themes
                </span>
              </button>
            </div>
          </nav>
        </div>

        {/* SIGNATURE */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 z-20 -translate-x-1/2 md:bottom-4">
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

      <ThemeModal
        isOpen={isThemeMenuOpen}
        onClose={() => setIsThemeMenuOpen(false)}
        onApplyMode={applyMode}
        siteMode={siteMode}
      />
    </main>
  );
}