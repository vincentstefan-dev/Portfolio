// app/coolstuff/coolstuffResponsiveConfig.ts

export const coolstuffRc = {
  // ========================================
  // PAGE
  // ========================================

  main:
    "relative min-h-screen w-full overflow-x-hidden overflow-y-visible text-white",

  page: {
    backButtonWrap:
      "fixed left-4 top-4 z-[100] sm:left-6 sm:top-6 md:left-8 md:top-8",

    backButton:
      "group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/75 shadow-[0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-white/40 hover:bg-white/10 hover:text-white hover:shadow-[0_0_26px_rgba(255,255,255,0.16)] focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-95 sm:h-12 sm:w-12",

    backIcon:
      "h-5 w-5 transition duration-300 group-hover:scale-110 sm:h-6 sm:w-6",
  },

  // ========================================
  // SECTION 1 — COOL STUFF INTRODUCTION
  // ========================================

  introduction: {
    section:
      "relative z-10 flex min-h-[75svh] w-full items-center overflow-hidden bg-transparent py-10 sm:py-14 lg:py-16",

    contentRow:
      "flex w-full translate-y-[35px] items-center sm:translate-y-[45px] lg:translate-y-[55px]",

    leftColumn:
      "flex w-full items-center justify-start px-5 sm:px-6 md:px-8 lg:w-1/2 lg:px-5 lg:pr-6",

    leftContent:
      "w-full translate-x-0 sm:translate-x-[5%] lg:translate-x-[20%]",

    heroImage:
      "cool-stuff-float block h-auto w-full max-w-[760px] object-contain sm:max-w-[850px] lg:max-w-none",

    enterLink:
      "group mt-3 inline-flex items-center gap-3 text-[clamp(1.25rem,2.2vw,2.5rem)] no-underline transition-transform duration-200 hover:translate-x-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1265d8] sm:mt-5",

    enterTitle:
      "inline-flex items-end font-[Arial_Black] font-black leading-none tracking-[-0.065em]",

    enterSpace: "w-[0.34em] shrink-0",

    enterLetter: "relative inline-block",

    enterArrow:
      "inline-block text-[#1265d8] transition-transform duration-200 group-hover:translate-x-2",

    rightColumn:
      "relative hidden w-1/2 items-center justify-center px-5 lg:flex",

    assetStage:
      "relative min-h-[680px] w-full max-w-[650px]",

    assetImage:
      "cool-stuff-asset-image cool-stuff-asset-image--floating",

    assets: {
      starRainbow:
        "absolute left-[2%] top-[-4%] z-[1] w-[clamp(280px,25vw,420px)] rotate-[3deg]",

      books:
        "absolute right-[-3%] top-[2%] z-[2] w-[clamp(220px,19vw,320px)] rotate-[-7deg]",

      moon:
        "absolute left-[43%] top-[1%] z-[6] w-[clamp(68px,5.95vw,102px)] rotate-[-14deg]",

      paperAirplane:
        "absolute right-[20%] top-[10%] z-[4] w-[clamp(149px,13.6vw,225px)] rotate-[-8deg]",

      atom:
        "absolute left-[7%] top-[43%] z-[5] w-[clamp(80px,7vw,120px)] rotate-[12deg]",

      pc:
        "absolute right-[8%] top-[28%] z-[3] w-[clamp(280px,24vw,400px)] rotate-[5deg]",

      ufo:
        "absolute bottom-[-3%] left-[-2%] z-[2] w-[clamp(270px,25vw,410px)] rotate-[-4deg]",

      lab:
        "absolute bottom-[1%] right-[-3%] z-[4] w-[clamp(175px,16vw,265px)] rotate-[10deg]",
    },
  },

  // ========================================
  // SECTION 2 — ABOUT THE LAB
  // ========================================

  labIntro: {
    exploreLink:
      "group mt-8 inline-flex max-w-full items-center gap-3 no-underline transition-transform duration-200 hover:translate-x-1 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffdf22]",

    exploreTitle:
      "inline-flex max-w-full flex-wrap items-end font-[Arial_Black] text-[clamp(1.1rem,1.7vw,1.75rem)] font-black leading-[1.15] tracking-[-0.055em]",

    exploreSpace: "w-[0.38em] shrink-0",

    exploreLetter:
      "relative inline-block origin-bottom transition-transform duration-200 group-hover:-translate-y-0.5",

    exploreArrow:
      "inline-block shrink-0 font-[Arial_Black] text-[clamp(1.4rem,2vw,2rem)] font-black leading-none text-[#ff3ec2] transition-transform duration-200 group-hover:translate-x-2",

    assetImage:
      "lab-intro__asset-image lab-intro__asset-image--floating",
  },

  // ========================================
  // SECTION 3 — LAB PROJECTS
  // ========================================

  labProjects: {
    section: "lab-projects",

    background: {
      grid: "lab-projects__background-grid",

      word: "lab-projects__background-word",

      ambientOne:
        "lab-projects__ambient lab-projects__ambient--one",

      ambientTwo:
        "lab-projects__ambient lab-projects__ambient--two",
    },

    decorations: {
      wrapper: "lab-projects__decorations",

      usb:
        "lab-projects__decoration lab-projects__decoration--camera",

      hardDrive:
        "lab-projects__decoration lab-projects__decoration--globe",

      chip:
        "lab-projects__decoration lab-projects__decoration--pencils",

      document:
        "lab-projects__decoration lab-projects__decoration--document",

      cursor:
        "lab-projects__decoration lab-projects__decoration--cursor",

      image: "lab-projects__decoration-image",
    },

    inner: "lab-projects__inner",

    header: {
      wrapper: "lab-projects__header",

      headingGroup: "lab-projects__heading-group",

      eyebrow: "lab-projects__eyebrow",

      title:
        "lab-projects__title flex w-fit max-w-full flex-col flex-nowrap items-start",

      titleWord:
        "lab-projects__title-word flex w-fit max-w-full items-end whitespace-nowrap",

      titleWordLab: "text-[1em]",

      titleWordProjects:
        "lab-projects__title-word--projects mt-[0.06em] text-[0.82em]",

      titleLetter: "lab-projects__title-letter",

      underline: "lab-projects__underline",

      introduction: "lab-projects__introduction",

      process: "lab-projects__process",

      processBlue: "lab-projects__process--blue",

      processOrange: "lab-projects__process--orange",

      processPink: "lab-projects__process--pink",

      processGreen: "lab-projects__process--green",

      arrow: "lab-projects__header-arrow",

      arrowLine: "lab-projects__header-arrow-line",

      arrowHead: "lab-projects__header-arrow-head",
    },

    projects: {
      nav: "lab-projects__nav",

      grid: "lab-projects__grid",
    },

    card: {
      base: "lab-project-card",

      featured: "lab-project-card--featured",

      placeholder: "lab-project-card--placeholder",

      number: "lab-project-card__number",

      accent: "lab-project-card__accent",

      spark: "lab-project-card__spark",

      meta: "lab-project-card__meta",

      category: "lab-project-card__category",

      status: "lab-project-card__status",

      statusDot: "lab-project-card__status-dot",

      body: "lab-project-card__body",

      visual: "lab-project-card__visual",

      glow: "lab-project-card__glow",

      content: "lab-project-card__content",

      title: "lab-project-card__title",

      description: "lab-project-card__description",

      footer: "lab-project-card__footer",

      arrow: "lab-project-card__arrow",

      placeholderIcon:
        "relative z-[2] h-12 w-12 sm:h-14 sm:w-14 lg:h-[58px] lg:w-[58px]",
    },

    note: {
      wrapper: "lab-projects__note",

      icon: "lab-projects__note-icon",

      spark: "lab-projects__note-spark",
    },
  },

  // ========================================
  // ORIGINAL NAVIGATION
  // ========================================

  centerWrap:
    "flex min-h-screen items-center justify-center px-5 sm:px-6 md:px-8 lg:px-10",

  nav: "w-full max-w-7xl",

  grid:
    "grid w-full place-items-center gap-8 sm:grid-cols-2 sm:gap-10 md:gap-12 lg:grid-cols-4 lg:gap-16",

  link:
    "group flex flex-col items-center gap-2 rounded-2xl px-2 py-3 text-center transition duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/60",

  label:
    "mt-2 text-xs text-white/70 transition duration-300 group-hover:text-white sm:text-sm md:text-base",
} as const;