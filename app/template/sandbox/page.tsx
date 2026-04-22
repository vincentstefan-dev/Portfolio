// this is proof of concept code for a video background with a menu on top, it is not meant to be production ready or well structured, just a fun experiment to see if I can do it and how it would look like, the code is a bit messy and not well organized, but it works and looks cool, I might clean it up and make it more reusable in the future, but for now I just want to have fun with it and see what I can create with it, enjoy the weirdness!
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

type MenuItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gif?: string;
};

type BackgroundTheme = {
  name: string;
  base: string;
  mainGradient: string;
  topGlow: string;
  midBand: string;
  streakOne: string;
  streakTwo: string;
};

type GlowStyle = {
  text: string;
  shadow: string;
  bg: string;
};

const menuItems: MenuItem[] = [
  { label: "Home", gif: "/Gifs/Home.gif", href: "/weirdmode" },
  { label: "Porfolio", gif: "/Gifs/eyeballs.gif", href: "/portfolio" },
  { label: "About me", gif: "/Gifs/eyes.gif", href: "/aboutme" },
  { label: "Apps", gif: "/Gifs/coolwebsites.gif", href: "/coolstuff" },
  { label: "Moodboard", gif: "/Gifs/MUSIC.gif", href: "/bookimage" },
  { label: "Contact me", gif: "/Gifs/at.gif", href: "/contact" },
  { label: "", gif: "/Gifs/questionmark.gif", href: "/" },
];

const backgroundThemes: BackgroundTheme[] = [
  {
    name: "purple-cyan-Gameboy",
    base: "bg-[#18a9c9]/10",
    mainGradient:
      "bg-gradient-to-b from-[#2a0050]/95 via-[#6d28d9]/60 to-[#18a9c9]/30",
    topGlow: "bg-gradient-to-b from-[#18a9c9]/50 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#8fdcff]/10",
    streakTwo: "bg-[#9fe7ff]/10",
  },
  {
    name: "violet-pink-gameboy",
    base: "bg-[#4a15a3]/10",
    mainGradient:
      "bg-gradient-to-b from-[#4a15a3]/95 via-[#7c3aed]/60 to-[#4a15a3]/30",
    topGlow: "bg-gradient-to-b from-[#4a15a3]/40 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#e879f9]/10",
    streakTwo: "bg-[#f0abfc]/10",
  },
  {
    name: "indigo-blue-gameboy",
    base: "bg-[#2563eb]/10",
    mainGradient:
      "bg-gradient-to-b from-[#0f172a]/95 via-[#1e3a8a]/60 to-[#38bdf8]/25",
    topGlow: "bg-gradient-to-b from-[#38bdf8]/35 to-transparent",
    midBand: "bg-white/4",
    streakOne: "bg-[#60a5fa]/10",
    streakTwo: "bg-[#38bdf8]/10",
  },
  {
    name: "teal-aqua",
    base: "bg-[#aaf2de]/10",
    mainGradient:
      "bg-gradient-to-b from-[#022c22]/95 via-[#0f766e]/60 to-[#5eead4]/25",
    topGlow: "bg-gradient-to-b from-[#5eead4]/35 to-transparent",
    midBand: "bg-white/4",
    streakOne: "bg-[#aaf2de]/10",
    streakTwo: "bg-[#5eead4]/10",
  },
  {
    name: "dawn",
    base: "bg-[#33065c]/10",
    mainGradient:
      "bg-gradient-to-b from-[#3b0764]/95 via-[#c026d3]/60 to-[#77009e]/30",
    topGlow: "bg-gradient-to-b from-[#77009e]/35 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#33065c]/10",
    streakTwo: "bg-[#77009e]/10",
  },
  {
    name: "original-purple-cyan",
    base: "bg-[#18a9c9]/10",
    mainGradient:
      "bg-gradient-to-b from-[#2a0050]/99 via-[#6d28d9]/60 to-[#18a9c9]/30",
    topGlow: "bg-gradient-to-b from-[#18a9c9]/50 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#8fdcff]/10",
    streakTwo: "bg-[#9fe7ff]/10",
  },
  {
    name: "dark-minimal",
    base: "bg-[#1f2937]/20",
    mainGradient:
      "bg-gradient-to-b from-[#020617]/95 via-[#111827]/60 to-[#60a5fa]/20",
    topGlow: "bg-gradient-to-b from-[#60a5fa]/25 to-transparent",
    midBand: "bg-white/3",
    streakOne: "bg-[#3b82f6]/10",
    streakTwo: "bg-[#60a5fa]/10",
  },
  {
    name: "windows-vista-aero",
    base: "bg-[#7dd3fc]/10",
    mainGradient:
      "bg-gradient-to-b from-[#1e3a8a]/95 via-[#2563eb]/40 to-[#67e8f9]/18",
    topGlow: "bg-gradient-to-b from-[#bfdbfe]/40 to-transparent",
    midBand: "bg-white/12",
    streakOne: "bg-[#dbeafe]/14",
    streakTwo: "bg-[#a5f3fc]/12",
  },
  {
    name: "windows-xp-bliss",
    base: "bg-[#38bdf8]/10",
    mainGradient:
      "bg-gradient-to-b from-[#1e40af]/95 via-[#2563eb]/50 to-[#4ade80]/22",
    topGlow: "bg-gradient-to-b from-[#7dd3fc]/45 to-transparent",
    midBand: "bg-white/10",
    streakOne: "bg-[#93c5fd]/14",
    streakTwo: "bg-[#bbf7d0]/12",
  },
];

const glowStyles: GlowStyle[] = [
  {
    text: "group-hover:text-[#a5f3fc]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#67e8f9]",
    bg: "group-hover:bg-[#a5f3fc]/20",
  },
  {
    text: "group-hover:text-[#67e8f9]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#22d3ee]",
    bg: "group-hover:bg-[#67e8f9]/20",
  },
  {
    text: "group-hover:text-[#93c5fd]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#3b82f6]",
    bg: "group-hover:bg-[#93c5fd]/20",
  },
  {
    text: "group-hover:text-[#60a5fa]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#2563eb]",
    bg: "group-hover:bg-[#60a5fa]/20",
  },
  {
    text: "group-hover:text-[#c4b5fd]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#8b5cf6]",
    bg: "group-hover:bg-[#c4b5fd]/20",
  },
  {
    text: "group-hover:text-[#a78bfa]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#7c3aed]",
    bg: "group-hover:bg-[#a78bfa]/20",
  },
  {
    text: "group-hover:text-[#f0abfc]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#e879f9]",
    bg: "group-hover:bg-[#f0abfc]/20",
  },
  {
    text: "group-hover:text-[#f9a8d4]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#ec4899]",
    bg: "group-hover:bg-[#f9a8d4]/20",
  },
  {
    text: "group-hover:text-[#fca5a5]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#ef4444]",
    bg: "group-hover:bg-[#fca5a5]/20",
  },
  {
    text: "group-hover:text-[#fb7185]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#f43f5e]",
    bg: "group-hover:bg-[#fb7185]/20",
  },
  {
    text: "group-hover:text-[#fdba74]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#f97316]",
    bg: "group-hover:bg-[#fdba74]/20",
  },
  {
    text: "group-hover:text-[#fb923c]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#ea580c]",
    bg: "group-hover:bg-[#fb923c]/20",
  },
  {
    text: "group-hover:text-[#fde68a]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#facc15]",
    bg: "group-hover:bg-[#fde68a]/20",
  },
  {
    text: "group-hover:text-[#fef08a]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#eab308]",
    bg: "group-hover:bg-[#fef08a]/20",
  },
  {
    text: "group-hover:text-[#86efac]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#22c55e]",
    bg: "group-hover:bg-[#86efac]/20",
  },
  {
    text: "group-hover:text-[#4ade80]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#16a34a]",
    bg: "group-hover:bg-[#4ade80]/20",
  },
  {
    text: "group-hover:text-[#5eead4]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#14b8a6]",
    bg: "group-hover:bg-[#5eead4]/20",
  },
  {
    text: "group-hover:text-[#2dd4bf]",
    shadow: "group-hover:drop-shadow-[0_0_12px_#0d9488]",
    bg: "group-hover:bg-[#2dd4bf]/20",
  },
  {
    text: "group-hover:text-white",
    shadow: "group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]",
    bg: "group-hover:bg-white/20",
  },
  {
    text: "group-hover:text-[#e5e7eb]",
    shadow: "group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]",
    bg: "group-hover:bg-white/10",
  },
  {
    text: "group-hover:text-[#dbeafe]",
    shadow: "group-hover:drop-shadow-[0_0_10px_#93c5fd]",
    bg: "group-hover:bg-[#dbeafe]/20",
  },
  {
    text: "group-hover:text-[#cffafe]",
    shadow: "group-hover:drop-shadow-[0_0_10px_#67e8f9]",
    bg: "group-hover:bg-[#cffafe]/20",
  },
  {
    text: "group-hover:text-[#ecfeff]",
    shadow: "group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]",
    bg: "group-hover:bg-[#ecfeff]/25",
  },
];

function YouTubeBackgroundPlayer({
  onReady,
  theme,
}: {
  onReady: (player: any) => void;
  theme: BackgroundTheme;
}) {
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const videoIds = [
      "z6_Qju7FJEA",
      "_asoMC8oURI",
      "hC_xETkDqSU",
      "6IF5V6tv9LM",
      "uXsZz4bwEYQ",
      "A9UW7i6Pj3Q",
    ];
    const videoId = videoIds[Math.floor(Math.random() * videoIds.length)];

    let playerInstance: any = null;

    const createPlayer = () => {
      if (!playerContainerRef.current || !window.YT?.Player) return;

      playerInstance = new window.YT.Player(playerContainerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          loop: 1,
          playlist: videoId,
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
              const duration = ytPlayer.getDuration();
              if (duration && duration > 10) {
                const randomStart = Math.floor(Math.random() * (duration - 10));
                ytPlayer.seekTo(randomStart, true);
              }
            }, 800);

            onReady(ytPlayer);
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
        'script[src="https://www.youtube.com/iframe_api"]'
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);
      }

      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerInstance?.destroy) {
        playerInstance.destroy();
      }
    };
  }, [onReady]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 scale-125 md:scale-110">
        <div
          ref={playerContainerRef}
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div
        className={`pointer-events-none absolute inset-0 transition-all duration-700 ${theme.base}`}
      />
      <div
        className={`pointer-events-none absolute inset-0 transition-all duration-700 ${theme.mainGradient}`}
      />

      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute left-0 top-0 h-40 w-full transition-all duration-700 ${theme.topGlow}`}
        />
        <div
          className={`absolute left-0 top-[23%] h-20 w-full blur-2xl transition-all duration-700 ${theme.midBand}`}
        />
        <div
          className={`absolute left-[-10%] top-[34%] h-32 w-[130%] rotate-[-3deg] blur-3xl transition-all duration-700 ${theme.streakOne}`}
        />
        <div
          className={`absolute left-[-10%] top-[55%] h-36 w-[130%] rotate-[1deg] blur-3xl transition-all duration-700 ${theme.streakTwo}`}
        />
      </div>
    </div>
  );
}

export default function HomepageVideoIconMenu() {
  const playerRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(20);
  const [theme, setTheme] = useState<BackgroundTheme>(backgroundThemes[0]);
  const [glow, setGlow] = useState<GlowStyle>(glowStyles[0]);

  const textGifs = [
    "/Gifs/text-animation-generator 1.gif",
    "/Gifs/text-animation-generator 2.gif",
    "/Gifs/text-animation-generator 3.gif",
    "/Gifs/text-animation-generator 4.gif",
    "/Gifs/text-animation-generator 5.gif",
    "/Gifs/text-animation-generator 6.gif",
  ];

  const [randomTextGif, setRandomTextGif] = useState("");

  useEffect(() => {
    const random = textGifs[Math.floor(Math.random() * textGifs.length)];
    setRandomTextGif(random);
  }, []);

  useEffect(() => {
    const randomTheme =
      backgroundThemes[Math.floor(Math.random() * backgroundThemes.length)];
    setTheme(randomTheme);

    const randomGlow =
      glowStyles[Math.floor(Math.random() * glowStyles.length)];
    setGlow(randomGlow);
  }, []);

  const handlePlayerReady = useCallback((player: any) => {
    playerRef.current = player;
    setIsPlaying(true);
    setIsMuted(true);
    setVolume(20);
  }, []);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player || !window.YT) return;

    const state = player.getPlayerState();

    if (state === window.YT.PlayerState.PLAYING) {
      player.pauseVideo();
      setIsPlaying(false);
      return;
    }

    if (player.isMuted()) {
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

    if (player.isMuted()) {
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

    if (player.isMuted()) {
      player.unMute();
      setIsMuted(false);
    }

    player.setVolume(newVolume);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#032b9b] text-white">
      <YouTubeBackgroundPlayer onReady={handlePlayerReady} theme={theme} />

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

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <nav aria-label="Main navigation" className="w-full max-w-7xl">
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-20">
            {menuItems.map((item, index) => (
              <Link
                key={`${item.href}-${item.label || "gif"}-${index}`}
                href={item.href}
                className="group flex w-24 flex-col items-center justify-center gap-3 rounded-2xl px-2 py-3 text-center transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                <div className="relative flex h-12 w-12 items-center justify-center">
                  {item.icon ? (
                    <item.icon
                      strokeWidth={1.8}
                      className={`h-12 w-12 text-white transition duration-300 group-hover:scale-110 ${glow.text} ${glow.shadow}`}
                    />
                  ) : item.gif ? (
                    <img
                      src={item.gif}
                      alt={item.label || "menu gif"}
                      className="h-12 w-12 scale-125 object-contain transition duration-300 group-hover:scale-[5.00] group-hover:drop-shadow-[0_0_00px_#67e8f9]"
                    />
                  ) : null}

                  <div
                    className={`absolute inset-0 rounded-full bg-white/0 blur-xl transition duration-300 ${glow.bg}`}
                  />
                </div>

                {item.label ? (
                  <span className="text-sm font-light tracking-tight text-[#e9d5ff]/70 group-hover:text-[#e9d5ff]/70">
                    {item.label}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-2">
          {randomTextGif && (
            <img
              src={randomTextGif}
              alt="animated text"
              className="h-17 object-contain opacity-80"
            />
          )}
        </div>
      </div>
    </main>
  );
}