// app/components/sections/Portfolio/portfolioResponsiveConfig.ts

export const portfolioRc = {
  page: {
    main:
      "relative min-h-screen overflow-x-hidden text-white",

    content:
      "relative z-10",

    backButtonWrap:
      "fixed bottom-6 right-6 z-50",

    backButton:
      "group flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition hover:bg-white/50",

    backIcon:
      "h-5 w-5 text-white transition-transform duration-100 group-hover:scale-110",
  },

neonHero: {
  section:
    "relative min-h-screen overflow-hidden px-6 py-6 text-white sm:px-10 sm:py-8 lg:min-h-[120vh] lg:px-14",

  background:
    "pointer-events-none absolute inset-0",

  grid:
    "absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.18]",

  glowDot:
    "absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,1),0_0_34px_rgba(37,99,235,0.95),0_0_70px_rgba(14,165,233,0.7)]",

  logoLink:
    "relative z-20 inline-block",

  logoImage:
    "h-16 w-auto object-contain sm:h-20 lg:h-22",

  main:
    "relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-start justify-center pt-10 sm:pt-16 md:items-center md:pt-0 lg:min-h-[calc(100vh-8rem)]",

  layout:
    "grid w-full items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16",

  textBlock:
    "w-full max-w-[760px] text-left",

  title:
    "neon-sign font-mono text-[58px] font-medium uppercase leading-[0.88] tracking-[-0.08em] text-cyan-300 sm:text-[100px] md:text-[118px] lg:text-[136px]",

  titleWordOne:
    "neon-word neon-word-1 block",

  titleWordTwo:
    "neon-word neon-word-2 block",

  titleWordThree:
    "neon-word neon-word-3 block",

  titleWordFour:
    "neon-word neon-word-4 block",

  introWrap:
    "mt-6 flex items-start gap-4 sm:mt-8 sm:gap-6",

  introLine:
    "relative mt-1 h-16 w-px bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,1)] sm:h-20",

  introStar:
    "absolute -left-2.5 -top-7 text-2xl text-cyan-200 drop-shadow-[0_0_12px_rgba(34,211,238,1)]",

  introText:
    "max-w-md text-base leading-7 text-white/85 sm:text-lg",

  ctaWrap:
    "mt-8 flex flex-col justify-start gap-4 sm:mt-9 sm:flex-row",

  primaryCta:
    "inline-flex h-14 w-full items-center justify-center gap-5 rounded-full border border-cyan-300 bg-cyan-300/5 px-7 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.85),inset_0_0_18px_rgba(34,211,238,0.12)] transition hover:bg-cyan-300/15 sm:w-auto sm:px-9 sm:text-sm",

  secondaryCta:
    "inline-flex h-14 w-full items-center justify-center gap-5 rounded-full border border-cyan-300/40 bg-cyan-300/0 px-7 text-xs font-bold uppercase tracking-[0.22em] text-white/90 shadow-[0_0_12px_rgba(34,211,238,0.18)] transition hover:border-cyan-300 hover:bg-cyan-300/10 hover:text-cyan-100 sm:w-auto sm:px-9 sm:text-sm",

  ctaIcon:
    "h-5 w-5",

  aboutIcon:
    "h-4 w-4 text-cyan-300",
},

  carousel: {
    desktopWrap:
      "relative hidden min-h-[620px] items-center justify-center lg:flex",

    navButton:
      "absolute top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300/5 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.25)] backdrop-blur-md transition hover:bg-cyan-300/15",

    navButtonLeft:
      "left-0",

    navButtonRight:
      "right-0",

    navIcon:
      "h-5 w-5",

    cardStage:
      "relative flex h-[540px] w-full items-center justify-center",

    cardBase:
      "absolute transition-all duration-500 ease-out",

    cardFeatured:
      "z-30 h-[500px] w-[360px] translate-x-0 scale-100 rotate-0 opacity-100",

    cardRight:
      "z-20 h-[390px] w-[250px] translate-x-[270px] scale-95 rotate-[5deg] opacity-70",

    cardLeft:
      "z-20 h-[390px] w-[250px] -translate-x-[270px] scale-95 rotate-[-5deg] opacity-70",

    dotsWrap:
      "absolute bottom-10 left-1/2 z-40 flex -translate-x-1/2 gap-3",

    dot:
      "h-2.5 w-2.5 rounded-full transition",

    dotActive:
      "bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,1)]",

    dotInactive:
      "bg-cyan-100/25 hover:bg-cyan-100/50",

    article:
      "group overflow-hidden rounded-[2rem] border border-cyan-300/45 bg-[#04172f]/55 p-6 shadow-[0_0_34px_rgba(34,211,238,0.22),inset_0_0_34px_rgba(34,211,238,0.08)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-200/80 hover:shadow-[0_0_54px_rgba(34,211,238,0.36)]",

    articleInner:
      "relative z-20 flex h-full flex-col",

    articleTop:
      "flex items-start justify-between gap-4",

    title:
      "font-mono uppercase tracking-[0.08em] text-cyan-100",

    titleFeatured:
      "text-2xl",

    titleNormal:
      "text-lg",

    subtitle:
      "mt-3 max-w-[14rem] text-sm leading-5 text-cyan-100/65",

    menuIcon:
      "mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200/80",

    imageWrap:
      "relative my-8 flex flex-1 items-center justify-center overflow-hidden rounded-[1.5rem] border border-cyan-300/20 bg-black/20 shadow-[inset_0_0_24px_rgba(34,211,238,0.12)]",

    image:
      "h-full w-full object-contain p-4 opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100",

    imageOverlay:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.18),transparent_48%),linear-gradient(to_bottom,transparent,rgba(4,23,47,0.42))]",

    bottomRow:
      "mt-auto flex items-center justify-between",

    tag:
      "text-[10px] uppercase tracking-[0.25em] text-cyan-100/40",

    value:
      "mt-1 font-mono text-xl text-cyan-200",

    link:
      "inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-100/80 transition hover:text-cyan-200",

    linkIcon:
      "h-4 w-4",

    articleOverlay:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.16),transparent_45%),linear-gradient(135deg,rgba(34,211,238,0.08),transparent_45%)]",
  },

  projectsHero: {
    section:
      "relative min-h-screen overflow-hidden bg-transparent text-white",

    background:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.13),transparent_40%),radial-gradient(circle_at_70%_35%,rgba(37,99,235,0.09),transparent_36%)]",

    topRailWrap:
      "pointer-events-none absolute left-8 top-8 z-20",

    topRail:
      "mt-5 h-16 border-l border-cyan-300/70 pl-4",

    topRailMainLine:
      "h-1 w-24 bg-cyan-300/70 shadow-[0_0_16px_rgba(34,211,238,0.65)]",

    topRailLineLong:
      "mt-3 h-px w-32 bg-white/10",

    topRailLineShort:
      "mt-2 h-px w-20 bg-white/10",

    floatingIconPositionBase:
      "pointer-events-none absolute z-20 hidden lg:flex",

    floatingIconBox:
      "flex h-24 w-24 items-center justify-center rounded-[1.6rem] border border-cyan-300/45 bg-[#05070A]/45 shadow-[0_0_28px_rgba(34,211,238,0.32),inset_0_0_18px_rgba(103,232,249,0.06)] backdrop-blur-md",

    floatingIcon:
      "h-10 w-10 text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.8)]",

    centerWrap:
      "relative z-10 flex min-h-screen items-center justify-center px-6 py-24",

    centerInner:
      "relative flex w-full max-w-6xl flex-col items-center",

    titleWrap:
      "relative flex min-h-[250px] w-full items-center justify-center",

    title:
      "flex w-full items-center justify-center text-center font-black leading-none tracking-[-0.1em]",

    titleText:
      "inline-flex w-full max-w-[900px] scale-x-[1.04] items-center justify-center gap-[0.035em] bg-gradient-to-b from-white via-cyan-100 to-blue-200 bg-clip-text text-[clamp(3.6rem,10vw,8.8rem)] leading-none text-transparent drop-shadow-[0_0_28px_rgba(34,211,238,0.72)] [text-shadow:0_0_42px_rgba(34,211,238,0.65)]",

    exclamation:
      "neon-word neon-word-2 block",

    titleGlow:
      "pointer-events-none absolute left-1/2 top-1/2 h-32 w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-[80px]",

    ctaWrap:
      "mt-14 flex flex-col items-center justify-center gap-5 md:flex-row",

    primaryCta:
      "group rounded-full border border-cyan-300/70 bg-cyan-300/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.35em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.35),inset_0_0_18px_rgba(103,232,249,0.08)] backdrop-blur-md transition hover:bg-cyan-300/12 hover:text-white",

    primaryCtaIcon:
      "ml-3 inline-block transition group-hover:translate-x-1",

    secondaryCta:
      "rounded-full border border-cyan-300/25 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-[0.35em] text-white/80 shadow-[0_0_16px_rgba(34,211,238,0.12)] backdrop-blur-md transition hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-cyan-100",

    bottomRailWrap:
      "pointer-events-none absolute bottom-8 left-8 z-20",

    bottomRail:
      "mt-4 flex items-center gap-3",

    bottomDotStrong:
      "h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]",

    bottomDotMedium:
      "h-1.5 w-1.5 rounded-full bg-cyan-300/70",

    bottomDotSoft:
      "h-1.5 w-1.5 rounded-full bg-cyan-300/40",

    bottomLine:
      "h-px w-28 bg-white/20",
  },

  identity: {
    section:
      "relative min-h-screen w-full overflow-hidden text-white",

    rail:
      "pointer-events-none absolute left-8 top-10 hidden h-[86vh] w-px bg-white/10 md:block",

    railDotTop:
      "absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(125,230,255,0.9)]",

    railDotBottom:
      "absolute -left-[5px] bottom-8 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(125,230,255,0.9)]",

    railDots:
      "absolute left-[-2px] top-[48%] flex flex-col gap-3",

    railDotOne:
      "h-1 w-1 rounded-full bg-blue-200/80",

    railDotTwo:
      "h-1 w-1 rounded-full bg-blue-200/60",

    railDotThree:
      "h-1 w-1 rounded-full bg-blue-200/40",

    railDotFour:
      "h-1 w-1 rounded-full bg-blue-200/30",

    inner:
      "relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] items-center px-8 py-24 md:px-16 lg:px-24",

    grid:
      "grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_0.85fr]",

    kicker:
      "mb-8 text-xs uppercase tracking-[0.55em] text-cyan-100/45",

    title:
      "max-w-[980px] overflow-visible text-left text-[clamp(2.45rem,calc(4vw-2px),4.65rem)] font-black leading-[1.22] tracking-[-0.055em]",

    titleLineOne:
      "block overflow-visible whitespace-nowrap py-[0.08em] drop-shadow-[0_0_24px_rgba(140,180,255,0.35)]",

    titleGradientOne:
      "bg-gradient-to-r from-white via-blue-100 to-violet-300 bg-clip-text text-transparent",

    rainbowWord:
      "inline-block overflow-visible animate-rainbow-text pb-[0.14em] font-semibold leading-[1.2]",

    titleLineTwo:
      "block overflow-visible bg-gradient-to-r from-white via-blue-100 to-slate-200 bg-clip-text py-[0.08em] text-transparent drop-shadow-[0_0_24px_rgba(140,180,255,0.28)]",

    titleLineThree:
      "block overflow-visible bg-gradient-to-r from-blue-200 via-white to-violet-300 bg-clip-text py-[0.08em] text-transparent drop-shadow-[0_0_28px_rgba(150,180,255,0.45)]",

    listWrap:
      "relative",

    listGlow:
      "absolute -inset-20 rounded-full bg-cyan-400/10 blur-[90px]",

    list:
      "relative ml-2 space-y-7 text-[clamp(1.25rem,1.65vw,2rem)] font-light tracking-[-0.04em] text-blue-50/90",

    listItem:
      "flex items-center gap-6",

    listDot:
      "h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(125,220,255,0.95)]",
  },

  rotatingLogo: {
    section:
      "relative flex min-h-[80vh] w-full items-center justify-center overflow-visible px-6 py-20 text-[#F3F8FF] sm:px-10 lg:px-14",

    grid:
      "relative grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]",

    textColumn:
      "relative z-10 max-w-xl text-left",

    leftDecorLine:
      "pointer-events-none absolute -left-8 top-0 hidden h-full w-px bg-[#67E8F9]/20 shadow-[0_0_18px_rgba(34,211,238,0.35)] md:block",

    leftDecorDotTop:
      "pointer-events-none absolute -left-[2.15rem] top-0 hidden h-2 w-2 rounded-full bg-[#67E8F9] shadow-[0_0_14px_rgba(34,211,238,0.85)] md:block",

    leftDecorDotMiddle:
      "pointer-events-none absolute -left-[2.15rem] top-[36%] hidden h-2 w-2 rounded-full bg-[#67E8F9]/70 shadow-[0_0_12px_rgba(34,211,238,0.65)] md:block",

    leftDecorDotBottom:
      "pointer-events-none absolute -left-[2.15rem] bottom-0 hidden h-2 w-2 rounded-full bg-[#67E8F9]/40 md:block",

    kickerRow:
      "mb-5 flex items-center gap-4",

    kicker:
      "font-mono text-xs font-bold uppercase tracking-[0.42em] text-[#67E8F9] drop-shadow-[0_0_14px_rgba(34,211,238,0.55)]",

    kickerLine:
      "hidden h-px w-20 bg-[#67E8F9]/35 shadow-[0_0_12px_rgba(34,211,238,0.35)] sm:block",

    title:
      "neon-sign neon-word neon-word-1 font-mono text-[64px] font-medium uppercase leading-none tracking-[-0.08em] text-cyan-300 sm:text-[82px] md:text-[96px] lg:text-[112px]",

    titleDivider:
      "mt-8 flex items-center gap-4",

    titleDividerLine:
      "h-px w-40 bg-[#67E8F9]/50 shadow-[0_0_18px_rgba(34,211,238,0.6)]",

    titleDividerDot:
      "h-1.5 w-1.5 rounded-full bg-[#67E8F9] shadow-[0_0_12px_rgba(34,211,238,0.85)]",

    tags:
      "mt-8 flex flex-wrap gap-2",

    miniTag:
      "rounded-full border border-[#FFFFFF]/25 bg-[#FFFFFF]/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#FFFFFF]/85 shadow-[0_0_14px_rgba(34,211,238,0.12)]",

    paragraph:
      "mt-8 text-base font-medium leading-7 text-[#F3F8FF]/80 sm:text-lg",

    paragraphSecond:
      "mt-5 text-base font-medium leading-7 text-[#F3F8FF]/80 sm:text-lg",

    coreBox:
      "mt-8 rounded-2xl border border-[#67E8F9]/20 bg-[#05070A]/35 p-5 shadow-[0_0_26px_rgba(34,211,238,0.12),inset_0_0_18px_rgba(103,232,249,0.04)] backdrop-blur-md",

    coreKicker:
      "mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.32em] text-[#67E8F9] drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]",

    coreText:
      "text-base font-medium leading-7 text-[#F3F8FF]/80 sm:text-lg",

    logoColumn:
      "relative z-10 flex w-full flex-col items-center justify-center text-center",

    logoFrame:
      "relative flex h-[34rem] w-full max-w-[48rem] shrink-0 items-center justify-center overflow-visible",

    logoImage:
      "block h-full w-full object-contain drop-shadow-[0_0_42px_rgba(34,211,238,0.75)]",

    wordmarkFrame:
      "mt-2 flex h-[20rem] w-full max-w-[72rem] shrink-0 items-center justify-center overflow-visible",

    wordmarkImage:
      "block h-full w-full scale-125 object-contain drop-shadow-[0_0_42px_rgba(34,211,238,0.75)]",
  },

  palette: {
    section:
      "relative min-h-screen overflow-hidden bg-transparent px-6 py-24 text-white sm:px-10 lg:px-14",

    background:
      "pointer-events-none absolute inset-0",

    backgroundGlow:
      "absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.12),transparent_38%),radial-gradient(circle_at_70%_55%,rgba(37,99,235,0.1),transparent_34%)]",

    backgroundGrid:
      "absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.045)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.12]",

    orbitOne:
      "absolute left-1/2 top-1/2 h-[520px] w-[1180px] -translate-x-1/2 -translate-y-1/2 rotate-[-10deg] rounded-[50%] border border-cyan-300/15",

    orbitTwo:
      "absolute left-[52%] top-[52%] h-[360px] w-[980px] -translate-x-1/2 -translate-y-1/2 rotate-[16deg] rounded-[50%] border border-blue-500/15",

    topMarkWrap:
      "pointer-events-none absolute left-8 top-8 z-20 hidden md:block",

    topMark:
      "h-16 border-l border-cyan-300/70 pl-4",

    topMarkMainLine:
      "h-1 w-24 bg-cyan-300/70 shadow-[0_0_16px_rgba(34,211,238,0.65)]",

    topMarkLineLong:
      "mt-3 h-px w-32 bg-white/10",

    topMarkLineShort:
      "mt-2 h-px w-20 bg-white/10",

    inner:
      "relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] max-w-7xl flex-col justify-center",

    header:
      "mb-16 max-w-3xl",

    kicker:
      "mb-5 font-mono text-xs uppercase tracking-[0.42em] text-white/80",

    title:
      "max-w-4xl text-[clamp(3rem,8vw,7.4rem)] font-black uppercase leading-[0.86] tracking-[-0.08em] text-[#F3F8FF] drop-shadow-[0_0_26px_rgba(34,211,238,0.36)]",

    shelf:
      "relative",

    shelfLine:
      "absolute -bottom-5 left-0 right-0 h-px bg-cyan-300/25 shadow-[0_0_24px_rgba(34,211,238,0.35)]",

    grid:
      "grid min-h-[430px] grid-cols-2 items-end gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0",

    article:
      "group relative flex min-h-[360px] cursor-default items-end [perspective:900px]",

    swatchBase:
      "relative flex h-[360px] w-full origin-bottom flex-col justify-between overflow-hidden border border-white/10 px-4 py-6 shadow-[0_18px_60px_rgba(0,0,0,0.42)] transition duration-500 ease-out group-hover:z-30 group-hover:-translate-y-10 group-hover:scale-[1.045] group-hover:rotate-[-1.5deg] group-hover:shadow-[0_0_34px_rgba(34,211,238,0.4),0_30px_80px_rgba(0,0,0,0.65)] sm:h-[390px] sm:px-5 lg:h-[430px] lg:px-5",

    swatchGlow:
      "pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100",

    swatchGlowLeft:
      "absolute inset-y-0 left-0 w-px bg-white/50",

    swatchGlowRight:
      "absolute inset-y-0 right-0 w-px bg-black/30",

    swatchGlowBlur:
      "absolute left-0 top-0 h-full w-16 bg-white/10 blur-2xl",

    swatchTop:
      "relative z-10 flex items-start justify-between gap-4",

    index:
      "font-mono text-[10px] uppercase tracking-[0.32em] opacity-70",

    hex:
      "origin-top-right rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.22em] opacity-70",

    swatchText:
      "relative z-10 min-w-0 overflow-hidden",

    colorName:
      "max-w-full text-[clamp(1rem,1.45vw,1.75rem)] font-black uppercase leading-[0.9] tracking-[-0.055em]",

    role:
      "mt-5 max-w-full whitespace-nowrap font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] opacity-70",

    bottomLine:
      "relative z-10 h-px w-full bg-current opacity-20",

    bottomMarkWrap:
      "pointer-events-none absolute bottom-8 left-8 z-20",

    bottomMark:
      "flex items-center gap-3",

    bottomDotStrong:
      "h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]",

    bottomDotMedium:
      "h-1.5 w-1.5 rounded-full bg-cyan-300/70",

    bottomDotSoft:
      "h-1.5 w-1.5 rounded-full bg-cyan-300/40",

    bottomMarkLine:
      "h-px w-28 bg-white/20",
  },

  description: {
    section:
      "relative min-h-screen overflow-hidden bg-transparent px-6 py-20 text-[#F3F8FF] sm:px-10 lg:px-16",

    inner:
      "relative z-10 mx-auto max-w-7xl",

    textContent:
      "relative z-20 max-w-3xl",

    infoBlock:
      "mb-7",

    infoTitle:
      "mb-3 text-3xl font-black uppercase tracking-[-0.04em] text-[#67E8F9] drop-shadow-[0_0_16px_rgba(34,211,238,0.35)] sm:text-4xl",

    infoBody:
      "max-w-3xl text-base font-medium leading-[1.18] text-[#F3F8FF]/85 sm:text-lg",

    tagWrap:
      "mt-4 flex flex-wrap gap-2",

    tag:
      "rounded-md bg-[#2563EB] px-3 py-1 text-sm font-black uppercase tracking-[-0.02em] text-[#F3F8FF] shadow-[0_0_18px_rgba(37,99,235,0.25)]",

    blogParagraph:
      "mt-5",

    blogLink:
      "inline-block hover:opacity-80",

    blogLinkText:
      "inline-block overflow-visible animate-rainbow-text pb-[0.14em] font-semibold leading-[1.2]",

    windowsWrap:
      "pointer-events-none relative z-10 mt-12 grid gap-6 sm:grid-cols-2 lg:absolute lg:inset-0 lg:mt-0 lg:block",

    xpWindow:
      "overflow-hidden rounded-[7px] border border-[#08348f] bg-[#ece9d8] shadow-[6px_8px_0_rgba(0,0,0,0.28),0_0_24px_rgba(103,232,249,0.18)] transition-transform duration-300 ease-out hover:scale-[1.03] lg:absolute lg:w-[230px]",

    xpTitleBar:
      "flex h-7 items-center justify-between bg-gradient-to-b from-[#3f8cff] via-[#1456d8] to-[#073b9f] px-2 text-white",

    xpTitleLeft:
      "flex min-w-0 items-center gap-1.5",

    xpFolderIcon:
      "h-3 w-3 shrink-0 rounded-sm bg-[#f7d24c] shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.28)]",

    xpTitleText:
      "truncate text-[11px] font-bold leading-none drop-shadow",

    xpControls:
      "flex shrink-0 items-center gap-1",

    xpControlBlue:
      "grid h-4 w-4 place-items-center rounded-sm bg-[#2f73e8] text-[10px] font-black leading-none shadow-[inset_1px_1px_0_rgba(255,255,255,0.45)]",

    xpControlBlueSmall:
      "grid h-4 w-4 place-items-center rounded-sm bg-[#2f73e8] text-[9px] font-black leading-none shadow-[inset_1px_1px_0_rgba(255,255,255,0.45)]",

    xpControlRed:
      "grid h-4 w-4 place-items-center rounded-sm bg-[#e54835] text-[10px] font-black leading-none shadow-[inset_1px_1px_0_rgba(255,255,255,0.45)]",

    xpBody:
      "border-x-2 border-b-2 border-[#1b55b9] bg-[#ece9d8] p-2",

    xpImageFrame:
      "relative aspect-[3/4] overflow-hidden border border-[#8a867a] bg-white",

    xpImage:
      "object-cover object-center",
  },

selectedProjects: {
  section:
    "relative overflow-hidden px-6 pb-16 pt-8 text-white sm:px-10 sm:pt-12 lg:min-h-screen lg:px-16 lg:py-24",

  background:
    "pointer-events-none absolute inset-0",

  glow:
    "absolute left-1/2 top-[35%] h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px] lg:top-[45%] lg:h-[760px] lg:w-[1050px] lg:blur-[150px]",

  starOne:
    "absolute left-[15%] top-[42%] h-1 w-1 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,1)]",

  starTwo:
    "absolute right-[20%] top-[31%] h-1 w-1 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,1)]",

  starThree:
    "absolute left-[52%] bottom-[23%] h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_22px_rgba(103,232,249,1)]",

  inner:
    "relative z-10 mx-auto flex max-w-7xl flex-col justify-start lg:min-h-[calc(100vh-12rem)] lg:-translate-y-[10px] lg:justify-center",

  header:
    "mx-auto mb-8 max-w-5xl text-center lg:mb-14",

  title:
    "text-4xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-cyan-100 drop-shadow-[0_0_30px_rgba(103,232,249,0.95)] sm:text-6xl lg:text-8xl",

  subtitle:
    "mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-100/80 sm:text-base lg:mt-5",

  cardsArea:
    "relative mx-auto w-full max-w-6xl",

  desktopArrow:
    "absolute top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/40 bg-[#07111f]/50 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.2)] backdrop-blur-md transition hover:border-cyan-200 hover:bg-cyan-300/10 lg:flex",

  desktopArrowLeft:
    "left-[-4.5rem]",

  desktopArrowRight:
    "right-[-4.5rem]",

  desktopArrowIcon:
    "h-6 w-6",

  mobileArrows:
    "mb-6 flex justify-center gap-4 lg:hidden",

  mobileArrow:
    "flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/40 bg-[#07111f]/60 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.2)] backdrop-blur-md transition hover:border-cyan-200 hover:bg-cyan-300/10",

  mobileArrowIcon:
    "h-5 w-5",

  mobileCarousel:
    "lg:hidden",

  mobileTrack:
    "flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",

  mobileSlide:
    "min-w-full snap-center px-1",

  grid:
    "hidden gap-7 lg:grid lg:grid-cols-3",

  cardBase:
    "group relative block h-[460px] overflow-hidden rounded-[1.65rem] border border-cyan-300/30 bg-[#07111f] shadow-[0_0_42px_rgba(34,211,238,0.18)] transition duration-300 hover:-translate-y-2 hover:border-cyan-200/70 hover:shadow-[0_0_70px_rgba(34,211,238,0.35)] sm:h-[500px] lg:h-[480px]",

  cardLeft:
    "lg:rotate-[-2.5deg]",

  cardCenter:
    "lg:-translate-y-3",

  cardRight:
    "lg:rotate-[2.5deg]",

  imageWrap:
    "absolute inset-0 flex items-center justify-center p-8",

  image:
    "object-contain opacity-95 transition duration-700 group-hover:scale-105 group-hover:opacity-100",

  overlayDarkTop:
    "absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/35 to-transparent",

  overlayDarkBottom:
    "absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80",

  overlayCyan:
    "absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(103,232,249,0.16),transparent_45%)]",

  cardBorder:
    "pointer-events-none absolute inset-0 rounded-[1.65rem] border border-cyan-200/20",

  number:
    "absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-100/25 bg-black/60 text-[0.65rem] font-black text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.55)]",

  content:
    "absolute bottom-0 left-0 right-0 p-7",

  cardTitle:
    "max-w-[16rem] text-3xl font-black leading-[0.92] tracking-[-0.06em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.4)] sm:text-4xl",

  category:
    "mt-4 text-xs font-medium text-slate-200/85",

  divider:
    "mt-7 h-px w-full bg-cyan-100/15",

  caseStudyRow:
    "mt-7 flex items-center justify-between",

  caseStudyText:
    "text-[0.68rem] font-black uppercase tracking-[0.42em] text-cyan-50",

  caseStudyIcon:
    "h-4 w-4 text-cyan-50 transition group-hover:translate-x-1",

  dots:
    "mt-8 flex justify-center gap-2 lg:mt-10",

  dot:
    "h-2 rounded-full transition",

  dotActive:
    "w-8 bg-cyan-200 shadow-[0_0_16px_rgba(103,232,249,0.9)]",

  dotInactive:
    "w-2 bg-cyan-200/30 hover:bg-cyan-200/60",
},
  iconNav: {
    nav:
      "relative flex min-h-[120vh] w-full items-center justify-center px-6 py-24 text-white",

    background:
      "pointer-events-none absolute inset-0",

    glow:
      "absolute left-1/2 top-[42%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[100px]",

    orbitOne:
      "absolute left-[22%] top-[30%] h-[32rem] w-[54rem] rotate-[-12deg] rounded-[50%] border border-cyan-300/10",

    orbitTwo:
      "absolute left-[30%] top-[42%] h-[28rem] w-[50rem] rotate-[10deg] rounded-[50%] border border-blue-300/10",

    grid:
      "absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.1]",

    visualArea:
      "relative z-10 flex min-h-[100vh] w-full max-w-7xl items-center justify-center",

    cluster:
      "flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-20",

    animatedItem:
      "will-change-transform will-change-opacity",

    link:
      "group block rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/60",

    item:
      "flex w-24 flex-col items-center justify-center gap-3 rounded-2xl px-2 py-3 text-center transition duration-300 hover:-translate-y-1",

    iconWrap:
      "relative flex h-12 w-12 items-center justify-center",

    image:
      "h-14 w-14 object-contain transition duration-300 group-hover:scale-110",

    lucideIcon:
      "h-12 w-12 text-white transition duration-300 group-hover:scale-110",

    glowOrb:
      "absolute inset-0 rounded-full bg-white/0 blur-xl transition duration-300",

    label:
      "text-sm font-light tracking-tight text-[#e9d5ff]/70 group-hover:text-[#e9d5ff]/70",
  },
} as const;