// reacts to mode
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useThemeMode } from "@/app/components/template/theme/ThemeProvider";

import {
  backgroundThemes,
  basicTheme,
  basicThemePool,
  basicVideos,
  randomVideos,
  pickRandom,
  type BackgroundTheme,
} from "@/app/components/template/theme/backgroundThemes";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type ThemedBackgroundProps = {
  onReady?: (player: any) => void;
};

const BASIC_THEME_SESSION_KEY = "koyote-basic-theme-name";

function findThemeByName(
  themes: BackgroundTheme[],
  themeName: string | null,
): BackgroundTheme | null {
  if (!themeName) return null;

  return themes.find((theme) => theme.name === themeName) ?? null;
}

function getOrCreateSessionTheme(
  key: string,
  pool: BackgroundTheme[],
): BackgroundTheme {
  const savedThemeName = window.sessionStorage.getItem(key);
  const savedTheme = findThemeByName(pool, savedThemeName);

  if (savedTheme) {
    return savedTheme;
  }

  const nextTheme = pickRandom(pool);
  window.sessionStorage.setItem(key, nextTheme.name);

  return nextTheme;
}

function getOrCreateSessionVideo(key: string, videos: string[]): string {
  const savedVideoId = window.sessionStorage.getItem(key);

  if (savedVideoId && videos.includes(savedVideoId)) {
    return savedVideoId;
  }

  const nextVideoId = pickRandom(videos);
  window.sessionStorage.setItem(key, nextVideoId);

  return nextVideoId;
}

export default function ThemedBackground({ onReady }: ThemedBackgroundProps) {
  const { siteMode } = useThemeMode();

  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);

  /*
    Stable hydration-safe fallback.
    Do not use pickRandom() here.
  */
  const [activeTheme, setActiveTheme] = useState<BackgroundTheme>(basicTheme);
  const [activeVideoId, setActiveVideoId] = useState<string>(basicVideos[0]);

  /*
    Theme selection happens only after hydration.
    Basic mode gets one selected random theme per browser session.
    Random mode also gets one selected random theme per browser session.
  */
    useEffect(() => {
      if (siteMode === "random") {
        setActiveTheme(pickRandom(backgroundThemes));
        setActiveVideoId(pickRandom(randomVideos));
        return;
      }

      const sessionTheme = getOrCreateSessionTheme(
        BASIC_THEME_SESSION_KEY,
        basicThemePool,
      );

      setActiveTheme(sessionTheme);
      setActiveVideoId(basicVideos[0]);
    }, [siteMode]);

  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !playerContainerRef.current || !window.YT?.Player) {
        return;
      }

      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      playerRef.current = new window.YT.Player(playerContainerRef.current, {
        videoId: activeVideoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          loop: 1,
          playlist: activeVideoId,
          playsinline: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: any) => {
            const ytPlayer = event.target;

            ytPlayer.mute();
            ytPlayer.setVolume(20);
            ytPlayer.playVideo();

            setTimeout(() => {
              const duration = ytPlayer.getDuration?.();

              if (duration && duration > 10) {
                const randomStart = Math.floor(Math.random() * (duration - 10));
                ytPlayer.seekTo(randomStart, true);
              }
            }, 800);

            onReady?.(ytPlayer);
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }

      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      cancelled = true;

      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [activeVideoId, onReady]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* YOUTUBE VIDEO LAYER */}
      <div className="absolute left-1/2 top-1/2 h-[120vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <div
          ref={playerContainerRef}
          className="absolute left-1/2 top-1/2 aspect-video h-auto min-h-[120vh] w-[213.34vh] min-w-[120vw] -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* BASE COLOR LAYER */}
      <div
        className={`pointer-events-none absolute inset-0 transition-all duration-700 ${activeTheme.base}`}
      />

      {/* MAIN GRADIENT LAYER */}
      <div
        className={`pointer-events-none absolute inset-0 transition-all duration-700 ${activeTheme.mainGradient}`}
      />

      {/* EXTRA GLOW / STREAK LAYERS */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute left-0 top-0 h-40 w-full transition-all duration-700 ${activeTheme.topGlow}`}
        />

        <div
          className={`absolute left-0 top-[23%] h-20 w-full blur-2xl transition-all duration-700 ${activeTheme.midBand}`}
        />

        <div
          className={`absolute left-[-10%] top-[34%] h-32 w-[130%] rotate-[-3deg] blur-3xl transition-all duration-700 ${activeTheme.streakOne}`}
        />

        <div
          className={`absolute left-[-10%] top-[55%] h-36 w-[130%] rotate-[1deg] blur-3xl transition-all duration-700 ${activeTheme.streakTwo}`}
        />
      </div>
    </div>
  );
}