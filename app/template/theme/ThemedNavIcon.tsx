//reacts to mode
"use client";

import { useThemeMode } from "@/app/template/theme/ThemeProvider";

type GlowStyle = {
  text: string;
  shadow: string;
  bg: string;
};

type ThemedNavIconProps = {
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gif: string;
  glow: GlowStyle;
};

export default function ThemedNavIcon({
  label,
  icon: Icon,
  gif,
  glow,
}: ThemedNavIconProps) {
  const { isRandomMode } = useThemeMode();

  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      {isRandomMode ? (
        <img
          src={gif}
          alt={label}
          className="h-12 w-12 object-contain transition duration-300 group-hover:scale-400"
        />
      ) : (
        <>
          <Icon
            strokeWidth={1.8}
            className={`h-12 w-12 text-white transition duration-300 group-hover:scale-110 ${glow.text} ${glow.shadow}`}
          />

          <div
            className={`absolute inset-0 rounded-full bg-white/0 blur-xl transition duration-300 ${glow.bg}`}
          />
        </>
      )}
    </div>
  );
}