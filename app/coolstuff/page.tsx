"use client";

import React from "react";
import Link from "next/link";
import { House, LoaderPinwheel, FileScan, Eye } from "lucide-react";
import { Space_Mono } from "next/font/google";

import { useThemeMode } from "@/app/components/template/theme/ThemeProvider";
import ThemedBackground from "@/app/components/template/theme/ThemedBackground";
import ThemedNavIcon from "@/app/components/template/theme/ThemedNavIcon";
import AtomicPlayer from "@/app/components/media/atomicplayer";
import PageTransitionWrapper from "@/app/components/template/layout/PageTransitionWrapper";
import SiteSignature from "@/app/components/hero/SiteSignature";

import { useAtomicPlayerControls } from "@/app/components/template/layout/useAtomicPlayerControls";
import { usePageTransition } from "@/app/components/template/layout/usePageTransition";
import { useThemeGlow } from "@/app/components/template/layout/useThemeGlow";

import { coolstuffRc as rc } from "./coolstuffResponsiveConfig";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

type MenuItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gif: string;
};

const menuItems: MenuItem[] = [
  {
    label: "Home",
    icon: House,
    href: "/",
    gif: "/Gifs/mystar.gif",
  },
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
  {
    label: "Theme viewer",
    icon: Eye,
    href: "/coolstuff/theme-lab",
    gif: "/Gifs/themeviewer.gif",
  },
];

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
    <main className={rc.main}>
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
        <div className={rc.centerWrap}>
          <nav aria-label="Page navigation" className={rc.nav}>
            <div className={rc.grid}>
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} className={rc.link}>
                  <ThemedNavIcon
                    label={item.label}
                    icon={item.icon}
                    gif={item.gif}
                    glow={glow}
                  />

                  <span className={rc.label}>{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <SiteSignature fontClass={spaceMono.className} />
      </PageTransitionWrapper>
    </main>
  );
}