export type BackgroundTheme = {
  name: string;
  family: string;
  mood: string;
  radical?: boolean;
  base: string;
  mainGradient: string;
  topGlow: string;
  midBand: string;
  streakOne: string;
  streakTwo: string;
};

export const backgroundThemes: BackgroundTheme[] = [
  {
    name: "indigo-blue-gameboy",
    family: "blue-cyan",
    mood: "core / digital / balanced",
    base: "bg-[#2563eb]/10",
    mainGradient:
      "bg-gradient-to-b from-[#0f172a]/95 via-[#1e3a8a]/60 to-[#38bdf8]/25",
    topGlow: "bg-gradient-to-b from-[#38bdf8]/35 to-transparent",
    midBand: "bg-white/4",
    streakOne: "bg-[#60a5fa]/10",
    streakTwo: "bg-[#38bdf8]/10",
  },
  {
    name: "original-purple-cyan",
    family: "purple-cyan",
    mood: "core / neon / expressive",
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
    family: "minimal",
    mood: "professional / dark / restrained",
    base: "bg-[#1f2937]/20",
    mainGradient:
      "bg-gradient-to-b from-[#020617]/95 via-[#111827]/60 to-[#60a5fa]/20",
    topGlow: "bg-gradient-to-b from-[#60a5fa]/25 to-transparent",
    midBand: "bg-white/3",
    streakOne: "bg-[#3b82f6]/10",
    streakTwo: "bg-[#60a5fa]/10",
  },
  {
    name: "windows-xp-bliss",
    family: "aero-retro",
    mood: "playful / nostalgic / bright",
    base: "bg-[#38bdf8]/10",
    mainGradient:
      "bg-gradient-to-b from-[#1e40af]/95 via-[#2563eb]/50 to-[#4ade80]/22",
    topGlow: "bg-gradient-to-b from-[#7dd3fc]/45 to-transparent",
    midBand: "bg-white/10",
    streakOne: "bg-[#93c5fd]/14",
    streakTwo: "bg-[#bbf7d0]/12",
  },
  {
    name: "n64-primary-glow",
    family: "retro-console",
    mood: "nintendo 64 / playful / primary / arcade",
    radical: true,
    base: "bg-[#1d4ed8]/14",
    mainGradient:
      "bg-gradient-to-b from-[#020617]/97 via-[#1d4ed8]/58 to-[#22c55e]/18",
    topGlow: "bg-gradient-to-b from-[#22c55e]/30 to-transparent",
    midBand: "bg-white/6",
    streakOne: "bg-[#ef4444]/12",
    streakTwo: "bg-[#3b82f6]/12",
  },
  {
    name: "n64-controller-pop",
    family: "retro-console",
    mood: "nintendo 64 / plastic / colorful / playful",
    radical: true,
    base: "bg-[#2563eb]/16",
    mainGradient:
      "bg-gradient-to-b from-[#050816]/96 via-[#2563eb]/52 to-[#16a34a]/22",
    topGlow: "bg-gradient-to-b from-[#4ade80]/34 to-transparent",
    midBand: "bg-white/7",
    streakOne: "bg-[#ef4444]/14",
    streakTwo: "bg-[#60a5fa]/14",
  },
  {
    name: "deep-ocean-glass",
    family: "blue-cyan",
    mood: "glass / deep / atmospheric",
    base: "bg-[#061826]/20",
    mainGradient:
      "bg-gradient-to-b from-[#020617]/95 via-[#0f3057]/65 to-[#00b4d8]/20",
    topGlow: "bg-gradient-to-b from-[#48cae4]/30 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#90e0ef]/10",
    streakTwo: "bg-[#0077b6]/12",
  },
  {
    name: "black-ice-cyan",
    family: "blue-cyan",
    mood: "sharp / cold / professional",
    base: "bg-[#020617]/30",
    mainGradient:
      "bg-gradient-to-b from-[#000814]/98 via-[#001d3d]/70 to-[#00f5d4]/16",
    topGlow: "bg-gradient-to-b from-[#00f5d4]/25 to-transparent",
    midBand: "bg-white/4",
    streakOne: "bg-[#64ffda]/10",
    streakTwo: "bg-[#38bdf8]/10",
  },
  {
    name: "blueprint-grid",
    family: "blue-cyan",
    mood: "technical / structured / clean",
    base: "bg-[#1d4ed8]/10",
    mainGradient:
      "bg-gradient-to-b from-[#020617]/96 via-[#1e40af]/60 to-[#93c5fd]/14",
    topGlow: "bg-gradient-to-b from-[#bfdbfe]/24 to-transparent",
    midBand: "bg-white/6",
    streakOne: "bg-[#60a5fa]/9",
    streakTwo: "bg-[#dbeafe]/8",
  },
  {
    name: "soft-aero-silver",
    family: "aero-retro",
    mood: "soft / glass / polished",
    base: "bg-[#e0f2fe]/8",
    mainGradient:
      "bg-gradient-to-b from-[#0f172a]/94 via-[#334155]/55 to-[#bae6fd]/18",
    topGlow: "bg-gradient-to-b from-[#e0f2fe]/28 to-transparent",
    midBand: "bg-white/8",
    streakOne: "bg-[#f8fafc]/10",
    streakTwo: "bg-[#bae6fd]/12",
  },
  {
    name: "neon-skyline",
    family: "blue-cyan",
    mood: "urban / neon / energetic",
    base: "bg-[#1d4ed8]/12",
    mainGradient:
      "bg-gradient-to-b from-[#030712]/97 via-[#2563eb]/55 to-[#22d3ee]/18",
    topGlow: "bg-gradient-to-b from-[#67e8f9]/24 to-transparent",
    midBand: "bg-white/6",
    streakOne: "bg-[#38bdf8]/10",
    streakTwo: "bg-[#22d3ee]/10",
  },
  {
    name: "midnight-violet",
    family: "purple-violet",
    mood: "deep / premium / calm",
    base: "bg-[#1e1b4b]/20",
    mainGradient:
      "bg-gradient-to-b from-[#020617]/95 via-[#312e81]/65 to-[#a855f7]/18",
    topGlow: "bg-gradient-to-b from-[#a78bfa]/28 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#c084fc]/10",
    streakTwo: "bg-[#818cf8]/10",
  },
  {
    name: "obsidian-purple",
    family: "purple-violet",
    mood: "dark / luxury / restrained",
    base: "bg-[#09090b]/30",
    mainGradient:
      "bg-gradient-to-b from-[#030014]/98 via-[#2e1065]/62 to-[#7e22ce]/16",
    topGlow: "bg-gradient-to-b from-[#9333ea]/24 to-transparent",
    midBand: "bg-white/4",
    streakOne: "bg-[#a855f7]/9",
    streakTwo: "bg-[#581c87]/12",
  },
  {
    name: "holographic-blue-pink",
    family: "holographic",
    mood: "playful / synthetic / bright",
    base: "bg-[#0ea5e9]/10",
    mainGradient:
      "bg-gradient-to-b from-[#020617]/95 via-[#4c1d95]/58 to-[#ec4899]/16",
    topGlow: "bg-gradient-to-b from-[#38bdf8]/28 to-transparent",
    midBand: "bg-white/6",
    streakOne: "bg-[#ec4899]/10",
    streakTwo: "bg-[#22d3ee]/10",
  },
  {
    name: "electric-grape",
    family: "purple-violet",
    mood: "loud / neon / arcade",
    base: "bg-[#581c87]/16",
    mainGradient:
      "bg-gradient-to-b from-[#10041a]/97 via-[#7e22ce]/58 to-[#f0abfc]/14",
    topGlow: "bg-gradient-to-b from-[#e879f9]/24 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#d946ef]/10",
    streakTwo: "bg-[#f5d0fe]/8",
  },
  {
    name: "soft-lavender-cloud",
    family: "purple-violet",
    mood: "soft / airy / dreamy",
    base: "bg-[#7c3aed]/10",
    mainGradient:
      "bg-gradient-to-b from-[#0f0a1a]/96 via-[#8b5cf6]/48 to-[#ddd6fe]/18",
    topGlow: "bg-gradient-to-b from-[#ddd6fe]/24 to-transparent",
    midBand: "bg-white/7",
    streakOne: "bg-[#c4b5fd]/10",
    streakTwo: "bg-[#ede9fe]/8",
  },
  {
    name: "steel-violet",
    family: "purple-violet",
    mood: "technical / muted / professional",
    base: "bg-[#312e81]/12",
    mainGradient:
      "bg-gradient-to-b from-[#020617]/97 via-[#4338ca]/50 to-[#94a3b8]/14",
    topGlow: "bg-gradient-to-b from-[#a5b4fc]/22 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#818cf8]/10",
    streakTwo: "bg-[#cbd5e1]/8",
  },
  {
    name: "moonlit-periwinkle",
    family: "purple-violet",
    mood: "moonlit / calm / polished",
    base: "bg-[#3730a3]/12",
    mainGradient:
      "bg-gradient-to-b from-[#050816]/97 via-[#4f46e5]/50 to-[#c7d2fe]/16",
    topGlow: "bg-gradient-to-b from-[#c7d2fe]/22 to-transparent",
    midBand: "bg-white/6",
    streakOne: "bg-[#818cf8]/10",
    streakTwo: "bg-[#e0e7ff]/8",
  },
  {
    name: "toxic-lime-terminal",
    family: "green-terminal",
    mood: "terminal / toxic / experimental",
    base: "bg-[#052e16]/18",
    mainGradient:
      "bg-gradient-to-b from-[#020617]/96 via-[#064e3b]/65 to-[#84cc16]/18",
    topGlow: "bg-gradient-to-b from-[#a3e635]/25 to-transparent",
    midBand: "bg-white/4",
    streakOne: "bg-[#bef264]/10",
    streakTwo: "bg-[#22c55e]/10",
  },
  {
    name: "acid-pop",
    family: "green-terminal",
    mood: "acid / bright / loud",
    base: "bg-[#365314]/14",
    mainGradient:
      "bg-gradient-to-b from-[#0a0f03]/97 via-[#65a30d]/60 to-[#bef264]/18",
    topGlow: "bg-gradient-to-b from-[#d9f99d]/24 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#a3e635]/10",
    streakTwo: "bg-[#ecfccb]/8",
  },
  {
    name: "matrix-forest",
    family: "green-terminal",
    mood: "forest / terminal / dark",
    base: "bg-[#022c22]/20",
    mainGradient:
      "bg-gradient-to-b from-[#010b07]/97 via-[#065f46]/58 to-[#10b981]/16",
    topGlow: "bg-gradient-to-b from-[#34d399]/24 to-transparent",
    midBand: "bg-white/4",
    streakOne: "bg-[#6ee7b7]/9",
    streakTwo: "bg-[#059669]/10",
  },
  {
    name: "glacier-green",
    family: "green-terminal",
    mood: "cool / soft / natural",
    base: "bg-[#164e63]/12",
    mainGradient:
      "bg-gradient-to-b from-[#031318]/97 via-[#0f766e]/52 to-[#a7f3d0]/16",
    topGlow: "bg-gradient-to-b from-[#a7f3d0]/22 to-transparent",
    midBand: "bg-white/6",
    streakOne: "bg-[#6ee7b7]/10",
    streakTwo: "bg-[#d1fae5]/8",
  },
  {
    name: "emerald-depth",
    family: "green-terminal",
    mood: "deep / emerald / restrained",
    base: "bg-[#064e3b]/14",
    mainGradient:
      "bg-gradient-to-b from-[#020c09]/97 via-[#047857]/56 to-[#6ee7b7]/16",
    topGlow: "bg-gradient-to-b from-[#6ee7b7]/22 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#34d399]/10",
    streakTwo: "bg-[#d1fae5]/8",
  },
  {
    name: "dawn",
    family: "red-magenta",
    mood: "magenta / saturated / expressive",
    base: "bg-[#33065c]/10",
    mainGradient:
      "bg-gradient-to-b from-[#3b0764]/95 via-[#c026d3]/60 to-[#77009e]/30",
    topGlow: "bg-gradient-to-b from-[#77009e]/35 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#33065c]/10",
    streakTwo: "bg-[#77009e]/10",
  },
  {
    name: "monochrome-graphite",
    family: "radical-neutral",
    mood: "minimal / editorial / graphite",
    radical: true,
    base: "bg-[#111111]/15",
    mainGradient:
      "bg-gradient-to-b from-[#050505]/98 via-[#1f1f1f]/70 to-[#6b7280]/16",
    topGlow: "bg-gradient-to-b from-[#d1d5db]/10 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#9ca3af]/7",
    streakTwo: "bg-[#e5e7eb]/6",
  },
  {
    name: "white-glass",
    family: "radical-light",
    mood: "clean / soft / glass",
    radical: true,
    base: "bg-white/35",
    mainGradient:
      "bg-gradient-to-b from-[#f8fafc]/96 via-[#e2e8f0]/70 to-[#cbd5e1]/35",
    topGlow: "bg-gradient-to-b from-white/60 to-transparent",
    midBand: "bg-white/30",
    streakOne: "bg-sky-100/25",
    streakTwo: "bg-slate-200/18",
  },
  {
    name: "warm-editorial-sand",
    family: "radical-editorial",
    mood: "paper / calm / premium",
    radical: true,
    base: "bg-[#d6c3a1]/14",
    mainGradient:
      "bg-gradient-to-b from-[#1c1712]/96 via-[#6b5a45]/45 to-[#d6c3a1]/28",
    topGlow: "bg-gradient-to-b from-[#f5e7cf]/18 to-transparent",
    midBand: "bg-white/7",
    streakOne: "bg-[#c9b28e]/10",
    streakTwo: "bg-[#efe1c7]/8",
  },
  {
    name: "brutalist-black-white",
    family: "radical-brutalist",
    mood: "graphic / stark / hard",
    radical: true,
    base: "bg-black/25",
    mainGradient:
      "bg-gradient-to-b from-[#000000]/100 via-[#111111]/82 to-[#f5f5f5]/12",
    topGlow: "bg-gradient-to-b from-white/8 to-transparent",
    midBand: "bg-white/10",
    streakOne: "bg-white/6",
    streakTwo: "bg-zinc-300/8",
  },
  {
    name: "espresso-bronze",
    family: "radical-luxury",
    mood: "rich / warm / premium",
    radical: true,
    base: "bg-[#3b2a22]/18",
    mainGradient:
      "bg-gradient-to-b from-[#120c08]/98 via-[#3b2a22]/65 to-[#b08d57]/20",
    topGlow: "bg-gradient-to-b from-[#d6b37a]/16 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-[#8b6a45]/10",
    streakTwo: "bg-[#d6b37a]/8",
  },
  {
    name: "pastel-vapor",
    family: "radical-pastel",
    mood: "dreamy / surreal / soft",
    radical: true,
    base: "bg-pink-200/12",
    mainGradient:
      "bg-gradient-to-b from-[#251828]/92 via-[#c084fc]/36 to-[#f9a8d4]/28",
    topGlow: "bg-gradient-to-b from-[#f5d0fe]/24 to-transparent",
    midBand: "bg-white/10",
    streakOne: "bg-sky-200/14",
    streakTwo: "bg-pink-200/14",
  },
  {
    name: "muted-corporate-slate",
    family: "radical-corporate",
    mood: "restrained / clean / serious",
    radical: true,
    base: "bg-slate-500/10",
    mainGradient:
      "bg-gradient-to-b from-[#0f172a]/96 via-[#334155]/58 to-[#94a3b8]/16",
    topGlow: "bg-gradient-to-b from-[#cbd5e1]/12 to-transparent",
    midBand: "bg-white/5",
    streakOne: "bg-slate-300/8",
    streakTwo: "bg-slate-200/6",
  },
  {
    name: "cloud-fog",
    family: "radical-soft",
    mood: "misty / atmospheric / airy",
    radical: true,
    base: "bg-slate-200/14",
    mainGradient:
      "bg-gradient-to-b from-[#111827]/88 via-[#94a3b8]/45 to-[#f8fafc]/30",
    topGlow: "bg-gradient-to-b from-white/20 to-transparent",
    midBand: "bg-white/14",
    streakOne: "bg-slate-100/12",
    streakTwo: "bg-zinc-200/10",
  },
];

const basicThemeNames = new Set([
  "indigo-blue-gameboy",
  "dark-minimal",
  "soft-aero-silver",
  "emerald-depth",
  "monochrome-graphite",
  "white-glass",
  "brutalist-black-white",
  "muted-corporate-slate",
  "cloud-fog",
]);

export const basicThemePool: BackgroundTheme[] = backgroundThemes.filter((theme) =>
  basicThemeNames.has(theme.name)
);

// Stable fallback only.
// Do not use pickRandom() here.
export const basicTheme = backgroundThemes.find(
  (theme) => theme.name === "indigo-blue-gameboy"
) ?? backgroundThemes[0];

export const basicVideos = ["z6_Qju7FJEA"];

export const randomVideos = ["z6_Qju7FJEA"];

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}