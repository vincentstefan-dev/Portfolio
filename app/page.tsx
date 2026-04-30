"use client";

import { useThemeMode, type SiteMode } from "@/app/template/theme/ThemeProvider";
import ThemeModal from "@/app/template/theme/ThemeModal";
import ThemedBackground from "@/app/template/theme/ThemedBackground";
import { Space_Mono } from "next/font/google";
import { getCTA } from "@/app/template/theme/CTA_WORD_BANK";
import { LOGO_BANK } from "@/app/template/theme/LOGO_BANK";
import UpdatePopup from "@/app/components/ui/UpdatePopup";
import AtomicPlayer from "@/app/components/media/atomicplayer";
import HeroLogo from "@/app/components/hero/HeroLogo";
import HeroCTA from "@/app/components/hero/HeroCTA";
import NavGrid from "@/app/components/hero/NavGrid";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { House, AtSign, BookImage, Bug, Dna, Cpu } from "lucide-react";

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
  { label: "Home", icon: House, href: "/", gif: "/Gifs/mystar.gif" },
  { label: "Portfolio", icon: Dna, href: "/portfolio", gif: "/Gifs/portfolio.gif" },
  { label: "About me", icon: Bug, href: "/aboutme", gif: "/Gifs/eyes.gif" },
  { label: "Apps", icon: Cpu, href: "/coolstuff", gif: "/Gifs/MUSIC.gif" },
  { label: "Moodboard", icon: BookImage, href: "/moodboard", gif: "/Gifs/mariostar.gif" },
  { label: "Contact me", icon: AtSign, href: "/contact", gif: "/Gifs/at.gif" },
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

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <ThemedBackground onReady={handlePlayerReady} />

      <UpdatePopup
        id="early-access-warning :)"
        title="Koyote Systems"
        message="HI! sorry but the site is currently in early access and may contain bugs or unfinished features. Feel free to explore and report any issues you find. Thanks for your understanding! -vs"
      />

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
        className={`relative z-30 min-h-screen transition-all duration-[400ms] ease-out ${
          isInitialBlur ? "scale-[1.01] blur-sm" : "scale-100 blur-0"
        }`}
      >
        <div className="flex min-h-screen flex-col items-center px-6 pb-24 pt-8 md:pb-20 md:pt-10">
          <HeroLogo logo={activeLogo} />

          <HeroCTA cta={cta} fontClass={spaceMono.className} />

          <NavGrid
            items={menuItems}
            glow={glow}
            onOpenTheme={() => setIsThemeMenuOpen(true)}
          />
        </div>

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