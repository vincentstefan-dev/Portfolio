// UI to switch modes
"use client";

import { X, Sparkles, Shuffle } from "lucide-react";
import type { SiteMode } from "@/app/template/theme/ThemeProvider";

type ThemeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApplyMode: (mode: SiteMode) => void;
  siteMode: SiteMode;
};

type ThemeOption = {
  id: SiteMode;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const themeOptions: ThemeOption[] = [
  {
    id: "basic",
    label: "Basic",
    description: "Stable fixed skin",
    icon: Sparkles,
  },
  {
    id: "random",
    label: "Random",
    description: "Shuffle theme + glow",
    icon: Shuffle,
  },
];

export default function ThemeModal({
  isOpen,
  onClose,
  onApplyMode,
  siteMode,
}: ThemeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-6 backdrop-blur-lg"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-[36px] border border-white/25 bg-white/[0.13] p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gloss layers */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/50" />
        <div className="pointer-events-none absolute left-8 top-8 h-24 w-44 rounded-full bg-white/20 blur-2xl" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent" />
        <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-cyan-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl" />

        {/* Header */}
        <div className="relative z-10 mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/50">
              Theme engine
            </p>

            <h3 className="mt-2 text-2xl font-light tracking-tight text-white/95">
              Select a mode
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close theme selector"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/75 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-3xl transition hover:bg-white/20 hover:text-white"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Mode cards */}
        <div className="relative z-10 grid gap-4 md:grid-cols-2">
          {themeOptions.map((option) => {
            const OptionIcon = option.icon;
            const isActive = siteMode === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onApplyMode(option.id);
                  onClose();
                }}
                className={`flex min-h-[120px] w-full items-start gap-4 rounded-[30px] border px-5 py-5 text-left backdrop-blur-3xl transition ${
                  isActive
                    ? "rainbow-glow border-white/40 bg-white/20"
                    : "border-white/20 bg-white/[0.09] hover:bg-white/[0.16]"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/25 backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_10px_35px_rgba(0,0,0,0.25)] ${
                    isActive ? "bg-cyan-300/25" : "bg-white/10"
                  }`}
                >
                  <OptionIcon
                    className="h-7 w-7 text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.45)]"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0 pt-1">
                  <p className="text-lg font-medium text-white/95">
                    {option.label}
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-white/50">
                    {option.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active mode */}
        <div className="relative z-10 mt-6 border-t border-white/15 pt-5">
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">
            Active mode
          </p>

          <p className="mt-2 text-base text-cyan-100/90">
            {siteMode === "basic"
              ? "Basic — fixed visual profile"
              : "Random — shuffled visual profile"}
          </p>
        </div>
      </div>
    </div>
  );
}