"use client";

import { Space_Mono } from "next/font/google";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  House,
  Wallpaper,
  BrickWall,
  Paintbrush,
  Sprout,
  Route,
} from "lucide-react";

// ============================
// FONT SETUP
// ============================
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

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

type NavIcon = {
  id: string;
  name: string;
  href: string;
  iconType: "lucide";
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  delay: number;
};

// ============================
// ICON CONFIGURATION
// ============================

const navIcons: NavIcon[] = [
  {
    id: "home",
    name: "Home",
    href: "/",
    iconType: "lucide",
    Icon: House,
    delay: 0,
  },
  {
    id: "diagnosis-insight",
    name: "Diagnosis & Insight",
    href: "/portfolio/SHE/diagnosis",
    iconType: "lucide",
    Icon: Wallpaper,
    delay: 0.2,
  },
  {
    id: "strategic-architecture",
    name: "Strategic Architecture",
    href: "/coolstuff",
    iconType: "lucide",
    Icon: BrickWall,
    delay: 0.4,
  },
  {
    id: "expression-identity",
    name: "Expression & Identity",
    href: "/websites",
    iconType: "lucide",
    Icon: Paintbrush,
    delay: 0.6,
  },
  {
    id: "execution-growth-system",
    name: "Execution & Growth System",
    href: "/moodboard",
    iconType: "lucide",
    Icon: Sprout,
    delay: 0.8,
  },
  {
    id: "next-steps",
    name: "Next Steps",
    href: "/contact",
    iconType: "lucide",
    Icon: Route,
    delay: 1,
  },
];

// ============================
// HELPERS
// ============================

function generateStars(): Star[] {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i,
    size: Math.random() * 2.2 + 0.6,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 10 + 12,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.28 + 0.08,
  }));
}

export default function SheLandingHero() {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [lastRippleTime, setLastRippleTime] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    setStars(generateStars());
  }, []);

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
      className="relative min-h-screen overflow-hidden bg-[#e4d9c9]"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,162,65,0.42),transparent_34%),radial-gradient(circle_at_bottom,rgba(255,248,235,0.18),transparent_48%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.06)_28%,transparent_58%)] opacity-50" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_42%,rgba(0,0,0,0.10)_100%)]" />

      {/* LIGHT SWEEP */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(211,172,67,0.42) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
      />

      {/* CURSOR GLOW */}
      <motion.div
        className="pointer-events-none absolute"
        animate={{ x: cursor.x - 160, y: cursor.y - 160 }}
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

      {/* RIPPLE EFFECT */}
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
            boxShadow: "0 0 35px rgba(255,255,255,0.08)",
            backdropFilter: "blur(3px)",
          }}
          initial={{ scale: 0.22, opacity: 0.26 }}
          animate={{ scale: 6.8, opacity: 0 }}
          transition={{ duration: 2.6 }}
        />
      ))}

      {/* STARS */}
      {mounted &&
        stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: star.duration, repeat: Infinity }}
          />
        ))}

      {/* NAVIGATION */}
      <div className="absolute inset-x-0 top-[42%] z-20 -translate-y-1/2 px-8">
        <div className="mx-auto flex w-full max-w-7xl items-start justify-center">
          {navIcons.map(({ id, name, href, Icon, delay }) => (
            <motion.div
              key={id}
              className="flex-1"
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4.5, repeat: Infinity, delay }}
            >
              <Link
                href={href}
                className="group flex w-full flex-col items-center gap-3 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                  <Icon className="h-7 w-7 text-white" strokeWidth={1.8} />
                </div>
                <span className="text-sm text-white/80">{name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-2">
          <img
            src="/Gifs/mystar.gif"
            alt="Decorative star"
            className="h-5 w-5 opacity-90"
          />
          <span
            className={`${spaceMono.className} text-[9px] tracking-[0.12em] text-black/30`}
          >
            Designed by Vincent Lambour
          </span>
        </div>
      </div>

      {/* RETURN HOME */}
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
    </main>
  );
}