"use client";

import { useThemeMode } from "@/app/template/theme/ThemeProvider";
import ThemedBackground from "@/app/template/theme/ThemedBackground";
import ThemedNavIcon from "@/app/template/theme/ThemedNavIcon";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Play,
  Pause,
  Volume2,
  VolumeX,
  TreeDeciduous,
} from "lucide-react";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

type MenuItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  image?: string;
  gif?: string;
};

type GlowStyle = {
  text: string;
  shadow: string;
  bg: string;
};

type IconOffset = {
  x: number;
  y: number;
};

const menuItems: MenuItem[] = [
  { label: "Home", icon: House, href: "/", gif: "/Gifs/Home.gif" },
  { label: "SHE", image: "/Icons/SHE.png", href: "/portfolio/SHE" },
  { label: "Antonia Website", icon: TreeDeciduous, href: "/portfolio/antonia" },
];

const glowStyles: GlowStyle[] = [
  {
    text: "group-hover:text-[#93c5fd]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#3b82f6]",
    bg: "group-hover:bg-[#93c5fd]/20",
  },
  {
    text: "group-hover:text-[#67e8f9]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#22d3ee]",
    bg: "group-hover:bg-[#67e8f9]/20",
  },
  {
    text: "group-hover:text-[#c4b5fd]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#8b5cf6]",
    bg: "group-hover:bg-[#c4b5fd]/20",
  },
  {
    text: "group-hover:text-[#f0abfc]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#e879f9]",
    bg: "group-hover:bg-[#f0abfc]/20",
  },
  {
    text: "group-hover:text-[#86efac]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#22c55e]",
    bg: "group-hover:bg-[#86efac]/20",
  },
];

const basicGlow = glowStyles[0];

function pickRandomGlow() {
  return glowStyles[Math.floor(Math.random() * glowStyles.length)];
}

export default function PortfolioPage() {
  const { siteMode } = useThemeMode();

  const playerRef = useRef<any>(null);
  const pathname = usePathname();

  const navClusterRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [glow, setGlow] = useState<GlowStyle>(basicGlow);
  const [isInitialBlur, setIsInitialBlur] = useState(true);

  const [iconOffsets, setIconOffsets] = useState<IconOffset[]>(
    menuItems.map(() => ({ x: 0, y: 0 }))
  );
  const [isIconIntroActive, setIsIconIntroActive] = useState(false);
  const [areIconOffsetsReady, setAreIconOffsetsReady] = useState(false);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(20);

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

  const playBlurIntro = useCallback(() => {
    setIsInitialBlur(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.setTimeout(() => {
          setIsInitialBlur(false);
        }, 50);
      });
    });
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

  useEffect(() => {
    if (siteMode === "random") {
      setGlow(pickRandomGlow());
    } else {
      setGlow(basicGlow);
    }
  }, [siteMode]);

  useLayoutEffect(() => {
    measureIconOffsets();
  }, [measureIconOffsets]);

  useEffect(() => {
    const handleResize = () => {
      measureIconOffsets();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measureIconOffsets]);

  useEffect(() => {
    playBlurIntro();
    playIconIntro();
  }, [pathname, playBlurIntro, playIconIntro]);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        playBlurIntro();
        playIconIntro();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [playBlurIntro, playIconIntro]);

  const handlePlayerReady = useCallback((player: any) => {
    playerRef.current = player;
    setIsPlaying(true);
    setIsMuted(true);
    setVolume(20);
  }, []);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player || !window.YT) return;

    const state = player.getPlayerState?.();

    if (state === window.YT.PlayerState.PLAYING) {
      player.pauseVideo();
      setIsPlaying(false);
      return;
    }

    if (player.isMuted?.()) {
      player.unMute();
      player.setVolume(volume);
      setIsMuted(false);
    }

    player.playVideo();
    setIsPlaying(true);
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;

    if (player.isMuted?.()) {
      player.unMute();
      player.setVolume(volume || 20);
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const player = playerRef.current;
    if (!player) return;

    const newVolume = Number(e.target.value);
    setVolume(newVolume);

    if (newVolume === 0) {
      player.mute();
      setIsMuted(true);
      return;
    }

    if (player.isMuted?.()) {
      player.unMute();
      setIsMuted(false);
    }

    player.setVolume(newVolume);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#032b9b] text-white">
      <ThemedBackground onReady={handlePlayerReady} />

      <div className="group absolute bottom-0 right-0 z-20 p-8">
        <div className="pointer-events-none w-[320px] translate-y-4 rounded-2xl border border-[#c084fc]/25 bg-[#3b1363]/45 p-4 text-white opacity-0 shadow-[0_0_30px_rgba(168,85,247,0.12)] backdrop-blur-md transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium tracking-wide text-[#e9d5ff]/70">
              Atomic Player
            </span>
            <span className="text-xs text-[#e9d5ff]/70">
              {isPlaying ? "Playing" : "Paused"} •{" "}
              {isMuted ? "Muted" : `${volume}%`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c084fc]/20 bg-[#6d28d9]/18 transition hover:bg-[#8b5cf6]/28"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c084fc]/20 bg-[#6d28d9]/18 transition hover:bg-[#8b5cf6]/28"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>

            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full accent-[#c084fc]"
                aria-label="Volume"
              />
            </div>
          </div>

          <p className="mt-3 text-xs text-[#e9d5ff]/70">
            Hover here for controls. The video starts at a random point each
            load.
          </p>
        </div>
      </div>

      <div
        className={`relative z-10 min-h-screen transition-all duration-[400ms] ease-out ${
          isInitialBlur ? "scale-[1.01] blur-sm" : "scale-100 blur-0"
        }`}
      >
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

        <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
          <div className="flex items-center gap-2">
            <img
              src="/Gifs/mystar.gif"
              alt="Vincent Lambour logo"
              className="h-5 w-5 object-contain opacity-90"
            />
            <span
              className={`${spaceMono.className} select-none whitespace-nowrap text-[9px] leading-none tracking-[0.12em] text-white/30`}
            >
              Designed by Vincent Lambour
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}