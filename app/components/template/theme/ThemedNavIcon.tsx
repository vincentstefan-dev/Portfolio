"use client";

import { useEffect, useState } from "react";
import { useThemeMode } from "@/app/components/template/theme/ThemeProvider";

type GlowStyle = {
  text: string;
  shadow: string;
  bg: string;
};

type ThemedNavIconProps = {
  label: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  img?: string;
  gif: string;
  glow: GlowStyle;
};

export default function ThemedNavIcon({
  label,
  icon: Icon,
  img,
  gif,
  glow,
}: ThemedNavIconProps) {
  const { isRandomMode } = useThemeMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
    Prevent hydration mismatch.

    The server may not know the real theme/random mode state.
    So the server render and first client render must match.
    After hydration, mounted becomes true and the real icon can render safely.
  */
  if (!mounted) {
    return (
      <div className="relative flex h-12 w-12 items-center justify-center overflow-visible">
        <div className="h-12 w-12" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="relative flex h-12 w-12 items-center justify-center overflow-visible">
      {/* RANDOM MODE → GIF */}
      {isRandomMode && (
        <img
          src={gif}
          alt={label}
          className="h-12 w-12 object-contain transition duration-300 group-hover:scale-[4]"
        />
      )}

      {/* NORMAL MODE → CUSTOM IMAGE */}
      {!isRandomMode && img && (
        <>
          <div className="relative flex h-[12.5rem] w-[12.5rem] items-center justify-center">
            <img
              src={img}
              alt={label}
              className="h-[12.5rem] w-[12.5rem] object-contain transition duration-300 group-hover:scale-200 group-hover:-translate-y-1"
            />
          </div>

          {/* glow layer */}
          <div
            className={`absolute inset-0 rounded-full bg-white/0 blur-xl transition duration-300 ${glow.bg}`}
          />
        </>
      )}

      {/* NORMAL MODE → DEFAULT ICON */}
      {!isRandomMode && !img && Icon && (
        <>
          <Icon
            strokeWidth={1.8}
            className={`h-12 w-12 text-white transition duration-300 group-hover:scale-110 ${glow.text} ${glow.shadow}`}
          />

          {/* glow layer */}
          <div
            className={`absolute inset-0 rounded-full bg-white/0 blur-xl transition duration-300 ${glow.bg}`}
          />
        </>
      )}
    </div>
  );
}