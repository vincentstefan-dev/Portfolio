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

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, TreeDeciduous } from "lucide-react";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

type MenuItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  image?: string;
  gif?: string;
};

type IconOffset = {
  x: number;
  y: number;
};

const menuItems: MenuItem[] = [
  { label: "Home", icon: House, href: "/", gif: "/Gifs/mystar.gif" },
  { label: "SHE", image: "/Icons/SHE.png", href: "/portfolio/SHE" },
  { label: "Antonia Website", icon: TreeDeciduous, href: "/portfolio/antonia" },
];

export default function PortfolioPage() {
  const { siteMode } = useThemeMode();
  const pathname = usePathname();

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

  const navClusterRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isInitialBlur = usePageTransition(0);

  const [iconOffsets, setIconOffsets] = useState<IconOffset[]>(
    menuItems.map(() => ({ x: 0, y: 0 }))
  );

  const [isIconIntroActive, setIsIconIntroActive] = useState(false);
  const [areIconOffsetsReady, setAreIconOffsetsReady] = useState(false);

  const measureIconOffsets = useCallback(() => {
    const navEl = navClusterRef.current;
    if (!navEl) return;

    const navRect = navEl.getBoundingClientRect();
    const navCenterX = navRect.left + navRect.width / 2;
    const navCenterY = navRect.top + navRect.height / 2;

    const nextOffsets = menuItems.map((_, index) => {
      const itemEl = itemRefs.current[index];
      if (!itemEl) return { x: 0, y: 0 };

      const itemRect = itemEl.getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2;
      const itemCenterY = itemRect.top + itemRect.height / 2;

      return {
        x: navCenterX - itemCenterX,
        y: navCenterY - itemCenterY,
      };
    });

    setIconOffsets(nextOffsets);
    setAreIconOffsetsReady(true);
  }, []);

  const playIconIntro = useCallback(() => {
    setIsIconIntroActive(false);

    requestAnimationFrame(() => {
      measureIconOffsets();

      requestAnimationFrame(() => {
        setIsIconIntroActive(true);
      });
    });
  }, [measureIconOffsets]);

  useLayoutEffect(() => {
    measureIconOffsets();
  }, [measureIconOffsets]);

  useEffect(() => {
    window.addEventListener("resize", measureIconOffsets);
    return () => window.removeEventListener("resize", measureIconOffsets);
  }, [measureIconOffsets]);

  useEffect(() => {
    playIconIntro();
  }, [pathname, playIconIntro]);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        playIconIntro();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [playIconIntro]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#032b9b] text-white">
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
          <nav aria-label="Portfolio navigation" className="w-full max-w-7xl">
            <div
              ref={navClusterRef}
              className="flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-20"
            >
              {menuItems.map((item, index) => {
                const offset = iconOffsets[index] ?? { x: 0, y: 0 };

                return (
                  <div
                    key={`${item.href}-${item.label}-${index}`}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    className="will-change-transform will-change-opacity"
                    style={{
                      opacity: areIconOffsetsReady
                        ? isIconIntroActive
                          ? 1
                          : 0.15
                        : 0,
                      transform: areIconOffsetsReady
                        ? isIconIntroActive
                          ? "translate3d(0, 0, 0) scale(1)"
                          : `translate3d(${offset.x}px, ${offset.y}px, 0) scale(0.35)`
                        : "translate3d(0, 0, 0) scale(0.35)",
                      transitionProperty: "transform, opacity, filter",
                      transitionDuration: "1100ms",
                      transitionTimingFunction:
                        "cubic-bezier(0.22, 1, 0.36, 1)",
                      transitionDelay: `${index * 70}ms`,
                      filter: isIconIntroActive ? "blur(0px)" : "blur(8px)",
                    }}
                  >
                    <Link
                      href={item.href}
                      className="group block rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/60"
                    >
                      <div className="flex w-24 flex-col items-center justify-center gap-3 rounded-2xl px-2 py-3 text-center transition duration-300 hover:-translate-y-1">
                        <div className="relative flex h-12 w-12 items-center justify-center">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.label}
                              className="h-14 w-14 object-contain transition duration-300 group-hover:scale-110"
                            />
                          ) : item.icon && item.gif ? (
                            <ThemedNavIcon
                              label={item.label}
                              icon={item.icon}
                              gif={item.gif}
                              glow={glow}
                            />
                          ) : item.icon ? (
                            <>
                              <item.icon
                                strokeWidth={1.8}
                                className={`h-12 w-12 text-white transition duration-300 group-hover:scale-110 ${glow.text} ${glow.shadow}`}
                              />
                              <div
                                className={`absolute inset-0 rounded-full bg-white/0 blur-xl transition duration-300 ${glow.bg}`}
                              />
                            </>
                          ) : null}
                        </div>

                        <span className="text-sm font-light tracking-tight text-[#e9d5ff]/70 group-hover:text-[#e9d5ff]/70">
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </nav>
        </div>

        <SiteSignature fontClass={spaceMono.className} />
      </PageTransitionWrapper>
    </main>
  );
}