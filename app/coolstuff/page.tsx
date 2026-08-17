"use client";

import Link from "next/link";
import { Space_Mono } from "next/font/google";
import { House } from "lucide-react";

import AtomicPlayer from "@/app/components/media/atomicplayer";
import SiteSignature from "@/app/components/hero/SiteSignature";

import Introduction from "@/app/components/sections/Apps/Introduction";
import LabIntroSection from "@/app/components/sections/Apps/LabIntroSection";
import LabProjectsSection from "@/app/components/sections/Apps/LabProjectsSection";

import PageTransitionWrapper from "@/app/components/template/layout/PageTransitionWrapper";
import { useAtomicPlayerControls } from "@/app/components/template/layout/useAtomicPlayerControls";
import { usePageTransition } from "@/app/components/template/layout/usePageTransition";
import ThemedBackground from "@/app/components/template/theme/ThemedBackground";

import { coolstuffRc as rc } from "./coolstuffResponsiveConfig";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export default function CleanPage() {
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

{/* ========================================
    FIXED BACK BUTTON
    Stays bottom-right while scrolling
======================================== */}
<div className="fixed bottom-6 right-6 z-[200]">
  <Link
    href="/"
    aria-label="Return to portfolio"
    className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-md transition duration-200 hover:scale-110 hover:border-white/40 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-12 sm:w-12"
  >
    <House
      aria-hidden="true"
      className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 sm:h-6 sm:w-6"
      strokeWidth={1.5}
    />
  </Link>
</div>

      <PageTransitionWrapper isBlurred={isInitialBlur}>
        <div className="relative z-10 flex w-full flex-col">
          {/* ========================================
              FIRST SECTION — COOL STUFF
          ======================================== */}
          <section
            aria-label="Cool Stuff"
            className="relative w-full"
          >
            <Introduction />
          </section>

          {/* ========================================
              SECOND SECTION — ABOUT THE LAB
          ======================================== */}
          <section
            id="lab-introduction"
            aria-label="About the Lab"
            className="relative w-full scroll-mt-0"
          >
            <LabIntroSection />
          </section>

          {/* ========================================
              THIRD SECTION — LAB PROJECTS
          ======================================== */}
          <LabProjectsSection />

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