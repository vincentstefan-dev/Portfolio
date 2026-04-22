//UI to switch modes
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-[30px] border border-white/15 bg-white/10 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-white/5 to-transparent" />
        <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-violet-300/10 blur-3xl" />

        <div className="relative z-10 mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/45">
              Theme engine
            </p>
            <h3 className="mt-2 text-2xl font-light tracking-tight text-white/95">
              Select a mode
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
              Choose how the site behaves visually. Basic stays fixed. Random
              shuffles the visual profile.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close theme selector"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        <div className="relative z-10 grid gap-3 md:grid-cols-2">
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
                className={`flex min-h-[120px] w-full items-start gap-4 rounded-[24px] border px-4 py-4 text-left transition ${
                  isActive
                    ? "border-cyan-200/35 bg-cyan-200/10 shadow-[0_0_24px_rgba(103,232,249,0.12)]"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    isActive ? "bg-cyan-200/15" : "bg-white/5"
                  }`}
                >
                  <OptionIcon
                    className="h-6 w-6 text-white/85"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-lg text-white/92">{option.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/45">
                    {option.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="relative z-10 mt-5 border-t border-white/10 pt-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">
            Active mode
          </p>
          <p className="mt-2 text-base text-cyan-100/85">
            {siteMode === "basic"
              ? "Basic — fixed visual profile"
              : "Random — shuffled visual profile"}
          </p>
        </div>
      </div>
    </div>
  );
}