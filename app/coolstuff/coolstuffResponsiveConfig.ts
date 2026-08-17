// app/coolstuff/coolstuffResponsiveConfig.ts

export const coolstuffRc = {
  // Main page wrapper.
  main:
    "relative min-h-screen w-full overflow-x-hidden overflow-y-visible text-white",

  // Page-level controls.
  page: {
    // Fixed home button position.
    backButtonWrap:
      "fixed left-4 top-4 z-[100] sm:left-6 sm:top-6 md:left-8 md:top-8",

    // Home button appearance and interaction.
    backButton:
      "group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/75 shadow-[0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-white/40 hover:bg-white/10 hover:text-white hover:shadow-[0_0_26px_rgba(255,255,255,0.16)] focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-95 sm:h-12 sm:w-12",

    // House icon sizing.
    backIcon:
      "h-5 w-5 transition duration-300 group-hover:scale-110 sm:h-6 sm:w-6",
  },

  // Centers the original navigation content.
  centerWrap:
    "flex min-h-screen items-center justify-center px-5 sm:px-6 md:px-8 lg:px-10",

  // Navigation width constraint.
  nav: "w-full max-w-7xl",

  // Responsive navigation grid.
  grid:
    "grid w-full place-items-center gap-8 sm:grid-cols-2 sm:gap-10 md:gap-12 lg:grid-cols-4 lg:gap-16",

  // Individual navigation link.
  link:
    "group flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/60",

  // Navigation label.
  label:
    "mt-2 text-xs text-white/70 transition duration-300 group-hover:text-white sm:text-sm md:text-base",
};