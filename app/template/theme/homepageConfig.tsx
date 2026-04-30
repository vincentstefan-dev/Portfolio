import type React from "react";
import { House, AtSign, BookImage, Bug, Dna, Cpu } from "lucide-react";

export type NavIcon = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

export type MenuItem = {
  label: string;
  href: string;
  img?: string;
  icon?: NavIcon;
  gif: string;
};

export type GlowStyle = {
  text: string;
  shadow: string;
  bg: string;
};

export const menuItems: MenuItem[] = [
  { label: "Home", icon: House, href: "/", gif: "/Gifs/mystar.gif" },
  { label: "Portfolio", icon: Dna, href: "/portfolio", gif: "/Gifs/portfolio.gif" },
  { label: "About me", icon: Bug, href: "/aboutme", gif: "/Gifs/eyes.gif" },
  { label: "Apps", icon: Cpu, href: "/coolstuff", gif: "/Gifs/MUSIC.gif" },
  { label: "Moodboard", icon: BookImage, href: "/moodboard", gif: "/Gifs/mariostar.gif" },
  { label: "Contact me", icon: AtSign, href: "/contact", gif: "/Gifs/at.gif" },
];

export const glowStyles: GlowStyle[] = [
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

export const basicGlow = glowStyles[0];

export function pickRandomGlow() {
  return glowStyles[Math.floor(Math.random() * glowStyles.length)];
}