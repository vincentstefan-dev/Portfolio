"use client";

import React from "react";
import Link from "next/link";
import { House } from "lucide-react";

import { useThemeMode } from "@/app/template/theme/ThemeProvider";
import ThemedBackground from "@/app/template/theme/ThemedBackground";
import AtomicPlayer from "@/app/components/media/atomicplayer";
import PageTransitionWrapper from "@/app/components/layout/PageTransitionWrapper";
import SiteSignature from "@/app/components/hero/SiteSignature";

import { useAtomicPlayerControls } from "@/app/components/layout/useAtomicPlayerControls";
import { usePageTransition } from "@/app/components/layout/usePageTransition";

import AboutSection from "@/app/components/sections/about-me/AboutSection";
import ServicesSection from "@/app/components/sections/about-me/ServicesSection";
import ProcessSection from "@/app/components/sections/about-me/ProcessSection";
import ProjectsSection from "@/app/components/sections/about-me/ProjectsSection";
import GoodbyeSection from "@/app/components/sections/about-me/GoodbyeSection";

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

  const isInitialBlur = usePageTransition(0);

  return (
    <main className="relative text-white">
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
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <ProjectsSection />
        <GoodbyeSection />
        <SiteSignature fontClass="" />
      </PageTransitionWrapper>

      {/* BACK BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/"
          aria-label="Return to portfolio"
          className="group flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition hover:bg-white/50"
        >
          <House
            className="h-5 w-5 text-white transition-transform duration-100 group-hover:scale-110"
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </main>
  );
}