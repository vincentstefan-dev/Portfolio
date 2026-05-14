// app/contact/contactResponsiveConfig.ts

export const contactRc = {
  main: "relative h-screen overflow-hidden bg-black text-white",

  backButtonWrap: "fixed bottom-6 right-6 z-50",
  backButton:
    "group flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition hover:bg-white/50",
  backIcon:
    "h-5 w-5 text-white transition-transform duration-100 group-hover:scale-110",

  blueGlowWrap: "pointer-events-none absolute inset-0 z-[1]",
  blueGlow:
    "absolute left-1/2 top-[48%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 blur-[180px]",

  starsWrap: "pointer-events-none absolute inset-0 z-[2] overflow-hidden",
  noise:
    "noise pointer-events-none fixed inset-0 z-[3] opacity-25 mix-blend-overlay",
  colorWash:
    "pointer-events-none absolute inset-0 z-[4] bg-blue-900/10 mix-blend-color",

  section:
    "relative flex h-screen flex-col items-center justify-center px-6 py-0 md:py-10",

  header: "mb-3 flex flex-col items-center text-center md:mb-10",
  eyebrow: "mb-3 text-xs uppercase tracking-[0.45em] text-white/50",
  title:
    "text-center text-3xl font-semibold tracking-[0.12em] text-white md:text-5xl",
  subtitle:
    "mt-4 max-w-xl text-center text-sm leading-6 text-white/55 md:text-base",

  carousel:
    "relative flex h-[430px] w-full max-w-6xl touch-pan-y items-start justify-center overflow-visible md:h-[620px] md:items-center",

  cartridgeOuter:
    "absolute cursor-pointer transition-all duration-500 ease-out",
  cartridgeActive: "z-30 opacity-100",
  cartridgeInactive: "z-10 opacity-55 hover:opacity-80",

  cartridgeBody: "relative w-[390px] max-w-[86vw] md:w-[500px]",
  cartridgeImage:
    "block w-full select-none object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.65)] drop-shadow-[0_0_45px_rgba(120,180,255,0.25)]",

  icon:
    "pointer-events-none absolute left-[40%] top-[10%] z-20 flex h-14 w-14 items-center justify-center rounded-full border bg-black/20 text-2xl backdrop-blur-md md:left-1/2 md:top-[12%] md:h-20 md:w-20 md:-translate-x-1/2 md:text-4xl",
  iconInner: "drop-shadow-[0_0_12px_currentColor]",

  content:
    "absolute left-[17%] top-[34%] z-10 flex w-[60%] flex-col gap-2 md:left-[17%] md:top-[36%] md:w-[60%] md:gap-2.5",

  cardTitle:
    "w-full text-center text-[16px] font-semibold uppercase tracking-[0.14em] md:text-2xl md:tracking-[0.18em]",

  description: "mt-2 text-sm leading-6 text-white/60",

  formStack: "space-y-2",
  input:
    "w-full border border-white/30 bg-white/10 px-3 py-2 text-xs tracking-[0.08em] text-white outline-none backdrop-blur-md placeholder:text-white/45 focus:border-cyan-200 focus:shadow-[0_0_12px_rgba(120,180,255,0.4)]",
  textarea:
    "w-full resize-none border border-white/30 bg-white/10 px-3 py-2 text-xs tracking-[0.08em] text-white outline-none backdrop-blur-md placeholder:text-white/45 focus:border-cyan-200 focus:shadow-[0_0_12px_rgba(120,180,255,0.4)]",

  button:
    "relative flex w-full items-center justify-between px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-black backdrop-blur-sm transition hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 md:px-5 md:py-3 md:text-xs md:tracking-[0.25em]",
  inquiryButton: "mx-auto mt-2 w-[95%] md:mt-2",
  normalButton: "mt-2",
  buttonGlowLayer: "pointer-events-none absolute inset-0 opacity-30",
  buttonText: "relative z-10 flex w-full items-center justify-between",

  status:
    "text-center text-xs uppercase tracking-[0.2em] text-cyan-100/70",
};