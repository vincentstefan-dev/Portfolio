"use client";

import React from "react";
import Link from "next/link";
import {
  House,
  LoaderPinwheel,
  FileScan,
  Eye,
} from "lucide-react";
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

import Introduction from "@/app/components/sections/Apps/Introduction";
import LabIntroSection from "@/app/components/sections/Apps/LabIntroSection";

import { coolstuffRc as rc } from "./coolstuffResponsiveConfig";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

type MenuItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
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
    label: "Theme Viewer",
    icon: Eye,
    href: "/coolstuff/theme-lab",
    gif: "/Gifs/themeviewer.gif",
  },
  {
    label: "JSON Thesis Dataset",
    icon: Eye,
    href: "/coolstuff/thesis-paper-dataset",
    gif: "/Gifs/sdcard.gif",
  },
  {
    label: "Astronaut",
    icon: Eye,
    href: "/coolstuff/Astronaut",
    gif: "/catridges/bronce.png",
  },
  {
    label: "Gameboy Portrait",
    icon: LoaderPinwheel,
    href: "/coolstuff/gameboyprinter",
    gif: "/catridges/bronce.png",
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
    <main
      className={`${rc.main} !relative !h-auto !min-h-screen !overflow-x-hidden !overflow-y-visible`}
    >
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
        <div className="relative z-10 flex w-full flex-col">
          {/* ========================================
              FIRST SECTION — COOL STUFF INTRODUCTION
          ======================================== */}
          <section className="relative w-full">
            <Introduction />
          </section>

          {/* ========================================
              SECOND SECTION — ABOUT THE LAB
          ======================================== */}
          <div
            id="lab-introduction"
            className="relative w-full scroll-mt-0"
          >
            <LabIntroSection />
          </div>

          {/* ========================================
              THIRD SECTION — APPLICATIONS AND BUILDS
          ======================================== */}
          <section
            id="lab-projects"
            aria-labelledby="apps-heading"
            className="
              relative flex min-h-screen w-full
              scroll-mt-0 flex-col justify-center
              px-4 py-20 sm:px-8
            "
          >
            <h2 id="apps-heading" className="sr-only">
              Applications and experimental builds
            </h2>

            <div
              className={`
                ${rc.centerWrap}
                !relative !inset-auto !h-auto !min-h-0
                !translate-x-0 !translate-y-0
              `}
            >
              <nav
                aria-label="Laboratory projects"
                className={rc.nav}
              >
                <div className={rc.grid}>
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={rc.link}
                    >
                      <ThemedNavIcon
                        label={item.label}
                        icon={item.icon}
                        gif={item.gif}
                        glow={glow}
                      />

                      <span className={rc.label}>
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </section>

          {/* ========================================
              FOOTER
          ======================================== */}
          <footer className="relative w-full">
            <SiteSignature fontClass={spaceMono.className} />
          </footer>
        </div>
      </PageTransitionWrapper>
    </main>
  );
}