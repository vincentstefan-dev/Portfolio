"use client";

import { useThemeMode } from "@/app/template/theme/ThemeProvider";
import ThemedBackground from "@/app/template/theme/ThemedBackground";
import ThemedNavIcon from "@/app/template/theme/ThemedNavIcon";
import AtomicPlayer from "@/app/components/media/atomicplayer";
import PageTransitionWrapper from "@/app/components/layout/PageTransitionWrapper";
import SiteSignature from "@/app/components/hero/SiteSignature";

import { useAtomicPlayerControls } from "@/app/components/layout/useAtomicPlayerControls";
import { usePageTransition } from "@/app/components/layout/usePageTransition";
import { useThemeGlow } from "@/app/components/layout/useThemeGlow";

import React from "react";
import Link from "next/link";
import { House, LoaderPinwheel, FileScan } from "lucide-react";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

type MenuItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gif: string;
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

      <PageTransitionWrapper isBlurred={isInitialBlur}>
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

        <SiteSignature fontClass={spaceMono.className} />
      </PageTransitionWrapper>
    </main>
  );
}