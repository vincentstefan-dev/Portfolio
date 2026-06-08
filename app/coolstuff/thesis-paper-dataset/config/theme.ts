// app/coolstuff/thesis-paper-dataset/config/theme.ts

export function getTheme(isDark: boolean) {
  return {
    page: isDark
      ? "bg-neutral-950 text-neutral-100"
      : "bg-neutral-100 text-neutral-950",

    border: isDark ? "border-neutral-800" : "border-neutral-300",

    mutedText: isDark ? "text-neutral-400" : "text-neutral-600",

    smallText: isDark ? "text-neutral-500" : "text-neutral-500",

    card: isDark
      ? "border-neutral-800 bg-neutral-900/60"
      : "border-neutral-300 bg-white",

    primaryButton: isDark
      ? "bg-white text-black hover:opacity-80"
      : "bg-black text-white hover:opacity-80",

    secondaryButton: isDark
      ? "border-neutral-700 hover:bg-neutral-900"
      : "border-neutral-300 hover:bg-neutral-200",

    dangerButton: isDark
      ? "border-red-500/40 text-red-300 hover:bg-red-500/10"
      : "border-red-300 text-red-700 hover:bg-red-50",

    selectedPaper: isDark
      ? "border-white bg-white text-black"
      : "border-black bg-black text-white",

    unselectedPaper: isDark
      ? "border-neutral-800 bg-neutral-950 hover:bg-neutral-900"
      : "border-neutral-300 bg-white hover:bg-neutral-100",

    jsonPreview: isDark
      ? "bg-black text-neutral-300"
      : "bg-neutral-950 text-neutral-100",

    autosaveBadge: isDark
      ? "border-neutral-800 bg-neutral-900 text-neutral-400"
      : "border-neutral-300 bg-white text-neutral-600",
  };
}

export type Theme = ReturnType<typeof getTheme>;