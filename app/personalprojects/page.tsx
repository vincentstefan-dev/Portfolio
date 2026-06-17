"use client";

import React from "react";
import Link from "next/link";
import { House, LoaderPinwheel, FileScan, Eye } from "lucide-react";
import { Space_Mono } from "next/font/google";

import { useThemeMode } from "@/app/components/template/theme/ThemeProvider";
import ThemedBackground from "@/app/components/template/theme/ThemedBackground";
import ThemedNavIcon from "@/app/components/template/theme/ThemedNavIcon";
import AtomicPlayer from "@/app/components/media/atomicplayer";
import SiteSignature from "@/app/components/hero/SiteSignature";

import { useAtomicPlayerControls } from "@/app/components/template/layout/useAtomicPlayerControls";
import { useThemeGlow } from "@/app/components/template/layout/useThemeGlow";

import KoyotePageTransition from "@/app/components/Animations/Koyotestars/page";

import { personalProjectsRc as rc } from "./personalProjectsResponsiveConfig";

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
    label: "The Concept of I",
    icon: Eye,
    href: "/personalprojects/blog",
    gif: "/Gifs/babyfinal.gif",
  },
  {
    label: "Astronaut",
    icon: Eye,
    href: "/coolstuff/Astronaut",
    gif: "/Images/Astronaut/main.png",
  },
];

export default function PersonalProjectsPage() {
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

      <KoyotePageTransition>
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
      </KoyotePageTransition>
    </main>
  );
}