"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useAnimationFrame } from "framer-motion";
import { Space_Mono } from "next/font/google";
import { House } from "lucide-react";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400"] });

// ============================
// TYPE DEFINITIONS
// ============================

type Ripple = {
  id: string;
  x: number;
  y: number;
};

type Star = {
  id: number;
  size: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
};

type FloatingWord = {
  id: number;
  text: string;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  driftX: number;
  driftY: number;
};

// ============================
// KEYWORD POOL
// ============================

const keywordPool = [
  "Embodiment",
  "Presence",
  "Freedom",
  "Intimacy",
  "Awareness",
  "Connection",
  "Touch",
  "Depth",
  "Peace",
  "Sacred",
  "Sensuality",
  "Love",
  "Softness",
  "Stillness",
  "Human",
  "Experience",
  "Healing",
  "Liberation",
  "Awakening",
  "Rediscovery",
  "Authenticity",
];

// ============================
// HELPERS
// ============================

function generateStars(): Star[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 2.2 + 0.6,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 10 + 12,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.28 + 0.08,
  }));
}

function generateFloatingWords(): FloatingWord[] {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i,
    text: keywordPool[Math.floor(Math.random() * keywordPool.length)],
    top: Math.random() * 78 + 10,
    left: Math.random() * 78 + 10,
    size: Math.random() * 20 + 12,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.12 + 0.04,
    driftX: Math.random() * 24 - 12,
    driftY: Math.random() * 20 - 10,
  }));
}

// ============================
// ORBITING INTRO STAR
// ============================

function OrbitingStar({ playIntro }: { playIntro: boolean }) {
  const [angle, setAngle] = useState(-1.4);
  const [elapsed, setElapsed] = useState(0);

  const duration = 5;
  const speed = 2.2;
  const radiusX = 150;
  const radiusY = 72;

  useAnimationFrame((_, delta) => {
    if (!playIntro) return;
    if (elapsed >= duration) return;

    const deltaSeconds = delta / 1000;
    setElapsed((prev) => prev + deltaSeconds);
    setAngle((prev) => prev + deltaSeconds * speed);
  });

  const x = Math.cos(angle) * radiusX;
  const y = Math.sin(angle * 1.08) * radiusY;

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-30"
      style={{
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        opacity: elapsed < duration ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 rounded-full bg-white/20 blur-3xl" />
        <div
          className="absolute h-10 w-10 rounded-full blur-2xl"
          style={{ background: "rgba(255, 231, 160, 0.75)" }}
        />
        <div
          className="absolute h-6 w-6 rounded-full blur-lg"
          style={{ background: "rgba(255,255,255,0.95)" }}
        />
        <div className="relative h-[6px] w-[6px] rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,1),0_0_36px_rgba(255,225,140,0.95)]" />
        <div className="absolute h-[18px] w-[1.5px] bg-white/90" />
        <div className="absolute h-[1.5px] w-[18px] bg-white/90" />
      </div>
    </div>
  );
}

export default function SheLandingHero() {
  // ============================
  // MOUNT STATE
  // ============================

  const [mounted, setMounted] = useState(false);

  // ============================
  // INTRO ANIMATION CONTROL
  // forced true for testing
  // ============================

  const [playIntro, setPlayIntro] = useState(true);

  // ============================
  // STAR + FLOATING WORD SYSTEM
  // ============================

  const [stars, setStars] = useState<Star[]>([]);
  const [floatingWords, setFloatingWords] = useState<FloatingWord[]>([]);

  useEffect(() => {
    setMounted(true);
    setPlayIntro(true);
    setStars(generateStars());
    setFloatingWords(generateFloatingWords());
  }, []);

  // ============================
  // RIPPLE + CURSOR SHIMMER SYSTEM
  // ============================

  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [lastRippleTime, setLastRippleTime] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursor({ x, y });

    const now = Date.now();
    if (now - lastRippleTime < 500) return;

    const id = `${now}-${Math.random()}`;
    setLastRippleTime(now);
    setRipples((prev) => [...prev.slice(-3), { id, x, y }]);

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 2600);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#e4d9c9] text-[#2d221b]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,162,65,0.42),transparent_34%),radial-gradient(circle_at_bottom,rgba(255,248,235,0.18),transparent_48%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.06)_28%,transparent_58%)] opacity-50" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_42%,rgba(0,0,0,0.10)_100%)]" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(211,172,67,0.42) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
      />

      <motion.div
        className="pointer-events-none absolute"
        animate={{
          x: cursor.x - 160,
          y: cursor.y - 160,
        }}
        transition={{ type: "spring", stiffness: 28, damping: 24, mass: 1.2 }}
        style={{
          width: 320,
          height: 320,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 22%, rgba(255,255,255,0.03) 42%, transparent 72%)",
          filter: "blur(22px)",
          mixBlendMode: "screen",
          opacity: 0.7,
        }}
      />

      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full border border-white/25 bg-white/8"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 42,
            height: 42,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 35px rgba(249, 199, 99, 0.84)",
            backdropFilter: "blur(3px)",
          }}
          initial={{ scale: 0.22, opacity: 0.26 }}
          animate={{ scale: 6.8, opacity: 0 }}
          transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {mounted &&
        stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.22)]"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 4, 0],
              opacity: [star.opacity * 0.7, star.opacity, star.opacity * 0.3],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          />
        ))}

      {mounted &&
        floatingWords.map((word) => (
          <motion.span
            key={word.id}
            className="pointer-events-none absolute select-none uppercase text-[#3c2d22]/40"
            style={{
              top: `${word.top}%`,
              left: `${word.left}%`,
              fontSize: `${word.size}px`,
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
              letterSpacing: "0.18em",
              transform: "translate(-50%, -50%)",
              whiteSpace: "nowrap",
              fontStyle: "italic",
            }}
            initial={
              playIntro
                ? {
                    opacity: 0,
                    scale: 0.92,
                    filter: "blur(8px)",
                  }
                : false
            }
            animate={{
              opacity: [0, word.opacity, word.opacity * 0.75, 0],
              scale: [0.92, 1, 1.04, 0.98],
              x: [0, word.driftX, word.driftX * 0.6, 0],
              y: [0, word.driftY, word.driftY * 0.5, 0],
              filter: ["blur(6px)", "blur(1px)", "blur(0px)", "blur(6px)"],
            }}
            transition={{
              duration: word.duration,
              delay: word.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 4 + 2,
              ease: "easeInOut",
            }}
          >
            {word.text}
          </motion.span>
        ))}

      <motion.div
        initial={
          playIntro ? { opacity: 0, filter: "blur(10px)", y: 18, scale: 0.985 } : true
        }
        animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        <div
          className="absolute left-1/2 top-[100%] -z-10 h-[240px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.08) 34%, transparent 72%)",
            filter: "blur(36px)",
          }}
        />

        <div className="relative flex items-center justify-center">
          <motion.h1
            initial={playIntro ? { letterSpacing: "0.48em", opacity: 0 } : true}
            animate={{ letterSpacing: "0.18em", opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="select-none text-center text-6xl font-light sm:text-7xl md:text-8xl"
            style={{
              fontFamily: "'Cinzel', serif",
            }}
          >
            SHE
          </motion.h1>

          <OrbitingStar playIntro={playIntro} />
        </div>

        <motion.div
          initial={playIntro ? { width: 0, opacity: 0 } : false}
          animate={{ width: 112, opacity: 0.9 }}
          transition={{ duration: 1.2, delay: 0.95, ease: "easeOut" }}
          className="mt-4 h-px bg-[#e9ddb0]"
        />

        <motion.h2
          initial={playIntro ? { letterSpacing: "0.34em", opacity: 0 } : true}
          animate={{ letterSpacing: "0.24em", opacity: 0.72 }}
          transition={{ duration: 1.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 select-none text-center text-[10px] font-light italic uppercase sm:text-xs md:text-sm"
          style={{
            fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          Sacred Human Experience
        </motion.h2>

        <motion.div
          initial={playIntro ? { opacity: 0, y: 10 } : true}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/portfolio/SHE/mainmenushe"
            className="mt-8 inline-flex rounded-full border border-white/30 bg-white/10 px-6 py-2 text-[11px] uppercase tracking-[0.24em] text-[#2d221b] backdrop-blur-md transition hover:bg-white/20"
            style={{
              fontFamily: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
            }}
          >
            Begin the Experience
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 right-6 z-30">
        <Link
          href="/portfolio"
          aria-label="Return to portfolio"
          className="group flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition hover:bg-white/50"
        >
          <House
            className="h-5 w-5 text-white transition-transform duration-100 group-hover:scale-110"
            strokeWidth={1.5}
          />
        </Link>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-2">
          <img
            src="/Gifs/mystar.gif"
            alt="Vincent Lambour logo"
            className="h-5 w-5 object-contain opacity-90"
          />
          <span
            className={`${spaceMono.className} select-none whitespace-nowrap text-[9px] leading-none tracking-[0.12em] text-black/30`}
          >
            Designed by Vincent Lambour
          </span>
        </div>
      </div>
    </main>
  );
}