"use client";

// --- THEME SYSTEM ---
import { useThemeMode, type SiteMode } from "@/app/template/theme/ThemeProvider";
import ThemeModal from "@/app/template/theme/ThemeModal";

// --- BACKGROUND + MEDIA ---
import ThemedBackground from "@/app/template/theme/ThemedBackground";
import AtomicPlayer from "@/app/components/media/atomicplayer";

// --- TYPOGRAPHY ---
import { Space_Mono } from "next/font/google";

// --- LOGO SYSTEM ---
import { LOGO_BANK } from "@/app/template/theme/LOGO_BANK";
import { pickWeightedLogo } from "@/app/template/theme/logoUtils";
import HeroLogo from "@/app/components/hero/HeroLogo";

// --- UI COMPONENTS ---
import UpdatePopup from "@/app/components/ui/UpdatePopup";
import HeroCTA from "@/app/components/hero/HeroCTA";
import NavGrid from "@/app/components/hero/NavGrid";
import SiteSignature from "@/app/components/hero/SiteSignature";

// --- LAYOUT + TRANSITIONS ---
import PageTransitionWrapper from "@/app/components/layout/PageTransitionWrapper";
import { usePageTransition } from "@/app/components/layout/usePageTransition";

// --- HOOKS ---
import { useRotatingCTA } from "@/app/components/layout/useRotatingCTA";
import { useAtomicPlayerControls } from "@/app/components/layout/useAtomicPlayerControls";
import { useEscapeClose } from "@/app/components/layout/useEscapeClose";
import { useThemeGlow } from "@/app/components/layout/useThemeGlow";

// --- REACT ---
import { useCallback, useEffect, useState } from "react";

// --- CONFIG (DATA LAYER) ---
import { menuItems } from "@/app/template/theme/homepageConfig";

// --- FONT INSTANCE ---
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

export default function HomepageVideoIconMenu() {
  // --- GLOBAL THEME STATE (from context) ---
  const { siteMode, setSiteMode } = useThemeMode();

  // --- YOUTUBE / AUDIO PLAYER STATE ---
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

  // --- THEME GLOW STATE ---
  const glow = useThemeGlow(siteMode);

  // --- LOCAL VISUAL STATE ---
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [activeLogo, setActiveLogo] = useState(LOGO_BANK[0]);

  // --- CTA ROTATION SYSTEM ---
  const cta = useRotatingCTA(10000);

  // --- PAGE TRANSITION STATE ---
  const isInitialBlur = usePageTransition(0);

  // --- ESCAPE KEY HANDLER (MODAL CLOSE) ---
  useEscapeClose({
    isOpen: isThemeMenuOpen,
    onClose: () => setIsThemeMenuOpen(false),
  });

  // --- INITIAL LOGO SELECTION (RUNS ONCE) ---
  useEffect(() => {
    setActiveLogo(pickWeightedLogo());
  }, []);

  // --- APPLY THEME MODE (BASIC vs RANDOM) ---
  const applyMode = useCallback(
    (mode: SiteMode) => {
      setSiteMode(mode);
    },
    [setSiteMode]
  );

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* --- BACKGROUND VIDEO SYSTEM --- */}
      <ThemedBackground onReady={handlePlayerReady} />

      {/* --- EARLY ACCESS POPUP --- */}
      <UpdatePopup
        id="early-access-warning :)"
        title="Koyote Systems"
        message="HI! sorry but the site is currently in early access and may contain bugs or unfinished features. Feel free to explore and report any issues you find. Thanks for your understanding! -vs"
      />

      {/* --- AUDIO / VIDEO CONTROLS OVERLAY --- */}
      <AtomicPlayer
        playerRef={playerRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        volume={volume}
        setVolume={setVolume}
      />

      {/* --- PAGE TRANSITION WRAPPER (BLUR IN EFFECT) --- */}
      <PageTransitionWrapper isBlurred={isInitialBlur}>
        {/* --- MAIN HERO SECTION --- */}
        <div className="flex min-h-screen flex-col items-center px-6 pb-24 pt-8 md:pb-20 md:pt-10">
          {/* LOGO */}
          <HeroLogo logo={activeLogo} />

          {/* CTA TEXT */}
          <HeroCTA cta={cta} fontClass={spaceMono.className} />

          {/* NAVIGATION GRID (ICONS) */}
          <NavGrid
            items={menuItems}
            glow={glow}
            onOpenTheme={() => setIsThemeMenuOpen(true)}
          />
        </div>

        {/* --- FOOTER SIGNATURE --- */}
        <SiteSignature fontClass={spaceMono.className} />
      </PageTransitionWrapper>

      {/* --- THEME MODAL --- */}
      <ThemeModal
        isOpen={isThemeMenuOpen}
        onClose={() => setIsThemeMenuOpen(false)}
        onApplyMode={applyMode}
        siteMode={siteMode}
      />
    </main>
  );
}