"use client";

import { motion } from "framer-motion";

type Logo = {
  src: string;
  alt?: string;
  className?: string;
  glow?: string;
  opacity?: number;
  scale?: number;
};

type HeroLogoProps = {
  logo: Logo;
};

export default function HeroLogo({ logo }: HeroLogoProps) {
  return (
    <div className="pointer-events-none z-20 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <img
          src={logo.src}
          alt={logo.alt ?? "logo"}
          className={logo.className ?? ""}
          style={{
            filter: logo.glow,
            opacity: logo.opacity ?? 1,
            transform: `scale(${logo.scale ?? 1})`,
          }}
        />
      </motion.div>
    </div>
  );
}