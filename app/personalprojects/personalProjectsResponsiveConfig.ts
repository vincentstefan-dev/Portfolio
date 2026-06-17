// app/personalprojects/personalProjectsResponsiveConfig.ts

export const personalProjectsRc = {
  main: "relative min-h-screen overflow-hidden bg-black text-white",

  centerWrap:
    "flex min-h-screen items-center justify-center px-5 sm:px-6 md:px-8 lg:px-10",

  nav: "w-full max-w-7xl",

  grid:
    "grid w-full place-items-center gap-8 sm:grid-cols-2 sm:gap-10 md:gap-12 lg:grid-cols-4 lg:gap-16",

  link:
    "group flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/60",

  label:
    "mt-2 text-xs text-white/70 sm:text-sm md:text-base",

  backButtonWrap: "fixed bottom-6 right-6 z-50",

  backButton:
    "group flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition hover:bg-white/50",

  backIcon:
    "h-5 w-5 text-white transition-transform duration-100 group-hover:scale-110",

  imageWrap:
    "pointer-events-none absolute inset-0 z-0 flex items-center justify-center",

  image:
    "w-[260px] object-contain opacity-90 sm:w-[320px] md:w-[420px] lg:w-[480px]",

  textWrap:
    "pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center",

  textBlock:
    "mt-[210px] text-center sm:mt-[240px] md:mt-[300px] lg:mt-[340px]",

  phrase:
    "mt-3 text-center text-xs tracking-[0.2em] text-white/60 sm:text-sm md:text-base",
} as const;