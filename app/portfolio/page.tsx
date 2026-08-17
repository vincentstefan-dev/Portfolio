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

import { coolstuffRc as rc } from "@/app/coolstuff/coolstuffResponsiveConfig";

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
        <div className="relative z-10 flex w-full flex-col">
          {/* ========================================
              HOME BUTTON
          ======================================== */}
          <div className={rc.page.backButtonWrap}>
            <Link
              href="/"
              aria-label="Return to home"
              className={rc.page.backButton}
            >
              <House
                aria-hidden="true"
                className={rc.page.backIcon}
                strokeWidth={1.5}
              />
            </Link>
          </div>

          {/* ========================================
              FIRST SECTION — COOL STUFF
          ======================================== */}
          <section aria-label="Cool Stuff" className="relative w-full">
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
          <section
            id="lab-projects"
            aria-label="Lab Projects"
            className="relative w-full"
          >
            <LabProjectsSection />
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