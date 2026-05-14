"use client";

import { useThemeMode } from "@/app/components/template/theme/ThemeProvider";
import ThemedBackground from "@/app/components/template/theme/ThemedBackground";
import AtomicPlayer from "@/app/components/media/atomicplayer";
import PageTransitionWrapper from "@/app/components/template/layout/PageTransitionWrapper";
import SiteSignature from "@/app/components/hero/SiteSignature";

import PortfolioHeroSection from "@/app/components/sections/Portfolio/PortfolioHeroSection";
import PortfolioNavSection from "@/app/components/sections/Portfolio/PortfolioNavSection";
import PortfolioSideNav from "@/app/components/sections/Portfolio/PortfolioSideNav";

import { useAtomicPlayerControls } from "@/app/components/template/layout/useAtomicPlayerControls";
import { usePageTransition } from "@/app/components/template/layout/usePageTransition";

import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

export default function PortfolioPage() {
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
    <main className="relative min-h-screen overflow-hidden bg-[#020714] text-white">
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
       <PortfolioSideNav />

      <PageTransitionWrapper isBlurred={isInitialBlur}>
        <PortfolioHeroSection />

        <PortfolioNavSection siteMode={siteMode} />

        <SiteSignature fontClass={spaceMono.className} />
      </PageTransitionWrapper>
    </main>
  );
}