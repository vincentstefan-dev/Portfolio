// app/components/sections/about-me/aboutMeResponsiveConfig.ts

export const aboutMeRc = {
  // Main section wrapper: controls full section size, padding, overflow, and base text color.
  section:
    "relative min-h-screen w-full overflow-hidden px-5 py-24 text-white sm:px-8 md:px-10 lg:px-12 xl:px-16",

  // Background visual layer: grid texture and glowing radial gradients.
  background: {
    // Full absolute background container.
    wrapper: "pointer-events-none absolute inset-0 opacity-40",

    // Cyan grid pattern.
    grid: "absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:42px_42px]",

    // Soft ambient glow spots.
    glow: "absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_75%_45%,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(20,184,166,0.2),transparent_40%)]",
  },

  // Right vertical index rail, only visible on xl screens.
  rail: {
    wrapper:
      "pointer-events-none absolute right-8 top-1/2 z-[35] hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex",
    dotActive:
      "h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]",
    lineTop: "h-20 w-px bg-gradient-to-b from-cyan-300/60 to-transparent",
    text: "font-mono text-[10px] uppercase tracking-[0.3em] text-blue-100/40 [writing-mode:vertical-rl]",
    lineBottom:
      "h-20 w-px bg-gradient-to-b from-transparent to-cyan-300/60",
    dotInactive: "h-2 w-2 rounded-full border border-cyan-300/60",
  },

  // Large decorative background images shown only on desktop.
  decorativeImages: {
    // Rear decorative image.
    backWrapper:
      "pointer-events-none absolute right-[-25%] top-[100px] z-[12]",
    backImage:
      "h-[720px] w-auto object-contain opacity-50 mix-blend-luminosity drop-shadow-[0_0_30px_rgba(96,165,250,0.22)] xl:h-[860px]",

    // Front decorative image.
    frontWrapper:
      "pointer-events-none absolute right-[-20%] top-[-20px] z-[12] hidden lg:block",
    frontImage:
      "h-[1000px] w-auto object-contain opacity-55 mix-blend-luminosity drop-shadow-[0_0_45px_rgba(59,130,246,0.25)] xl:h-[1050px]",
  },

  // Main profile image setup, separated between desktop and mobile.
  profile: {
    // Desktop profile layer.
    desktopWrapper:
      "pointer-events-none absolute bottom-0 right-[-50px] z-10 hidden w-[76%] justify-center lg:flex",
    desktopInner: "relative h-[1100px] w-[1100px]",
    desktopGlow: "absolute inset-0 rounded-full bg-blue-500/10 blur-[80px]",
    desktopImage:
      "absolute bottom-[-20px] left-1/2 z-20 h-[720px] -translate-x-1/2 object-contain opacity-65 drop-shadow-[0_0_60px_rgba(59,130,246,0.35)]",

    // Mobile profile image shown under the text column.
    mobileWrapper:
      "pointer-events-none relative z-10 mt-10 flex justify-center lg:hidden",
    mobileImage:
      "h-[320px] object-contain opacity-75 drop-shadow-[0_0_45px_rgba(59,130,246,0.35)]",
  },

  // Floating draggable GIF fields, desktop only.
  floatingFields: {
    base: "pointer-events-none absolute z-[30] hidden overflow-visible lg:block",
    left: "left-[0%] top-[8%] h-[76%] w-[80%]",
    right: "right-[0%] top-[8%] h-[76%] w-[80%]",
  },

  // Main content layout.
  layout: {
    // Overall section grid: one column on mobile, two-column layout on desktop.
    grid: "relative z-40 mx-auto grid min-h-[calc(100vh-12rem)] w-full max-w-[1800px] grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(360px,500px)_1fr] lg:items-stretch",

    // Left column: headline, paragraph, CTA buttons, mobile profile image.
    leftColumn: "flex max-w-[520px] flex-col justify-start",

    // Right column: skill/project/contact cards.
    rightColumn:
      "relative z-50 flex min-h-[520px] flex-col justify-end lg:pl-8 xl:pl-14",
  },

  // Text styling for the main intro copy.
  text: {
    eyebrow: "mb-5 text-sm uppercase tracking-[0.42em] text-blue-200/60",
    title:
      "text-[44px] font-semibold leading-[0.95] tracking-[-0.04em] text-white min-[390px]:text-[48px] sm:text-[56px] lg:text-[58px] xl:text-[64px]",
    divider:
      "mt-7 h-[3px] w-28 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.9)]",
    subtitle: "mt-9 text-2xl font-semibold text-white",
    paragraph: "mt-5 text-base leading-8 text-white/70",
  },

  // CTA button layout and styles.
  cta: {
    row: "mt-8 flex flex-wrap items-center gap-5",
    primary:
      "inline-flex items-center gap-3 rounded-xl border border-blue-400/35 bg-blue-500/10 px-7 py-3 text-sm text-white/85 backdrop-blur-md transition hover:-translate-y-1 hover:bg-blue-400/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]",
    secondary:
      "inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-3 text-sm text-white/60 backdrop-blur-md transition hover:-translate-y-1 hover:border-blue-300/35 hover:bg-blue-300/10 hover:text-white hover:shadow-[0_0_22px_rgba(96,165,250,0.22)]",
  },

  // Bottom/right info cards.
  cards: {
    // Card grid: stacked on mobile, three columns from md upward.
    grid: "grid translate-y-12 grid-cols-1 gap-4 md:grid-cols-3",

    // Regular card.
    card: "rounded-2xl border border-blue-300/20 bg-blue-950/30 p-4 backdrop-blur-md xl:p-5",

    // Center-aligned card, used for the online links card.
    cardCentered:
      "rounded-2xl border border-blue-300/20 bg-blue-950/30 p-4 text-center backdrop-blur-md xl:p-5",

    icon: "mb-3 h-7 w-7 text-blue-300",
    iconCentered: "mx-auto mb-3 h-7 w-7 text-blue-300",
    title: "text-xl font-semibold",
    body: "mt-3 text-[15px] leading-6 text-white/60",
    smallBody: "mt-3 text-[14.6px] leading-6 text-white/60",
    flowerWrapper: "mt-4 flex justify-center",
  },
};

/* section 2 [service section]*/
// app/components/sections/about-me/servicesResponsiveConfig.ts

export const servicesRc = {
  // Main section wrapper: controls section size, padding, overflow, and base cyan text color.
  section:
    "relative min-h-screen w-full overflow-hidden px-5 py-16 text-cyan-300 sm:px-8 lg:px-4 lg:py-10",

  // Background visual layers.
  background: {
    // Soft cyan radial glow behind the section.
    glow: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,220,255,0.16),transparent_45%)]",

    // Cyan technical grid overlay.
    grid: "pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,220,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(0,220,255,0.16)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40",
  },

  // Inner max-width shell for both mobile and desktop layouts.
  shell: "relative z-10 mx-auto max-w-[1600px]",

  // Mobile and tablet layout, hidden from lg upward.
  mobile: {
    wrapper: "block space-y-5 lg:hidden",

    // Reusable mobile glass panel.
    panel:
      "rounded-[28px] border border-cyan-400/30 bg-cyan-950/20 p-5 font-mono shadow-[0_0_35px_rgba(0,220,255,0.12)] backdrop-blur-xl",

    eyebrow: "text-xs uppercase tracking-[0.22em] text-cyan-200",
    heading: "mt-6 text-2xl leading-snug text-cyan-300",

    // Mobile service card stack.
    cardGrid: "grid grid-cols-1 gap-4",

    // Mobile about-me mini block.
    aboutHeader: "mb-6 flex items-center justify-between gap-6",
    aboutImageWrapper:
      "relative h-24 w-32 shrink-0 overflow-hidden border border-cyan-400/40 bg-cyan-950/30 shadow-[0_0_24px_rgba(34,211,238,0.15)]",
    aboutImage: "h-full w-full object-cover object-center opacity-90",
    aboutImageOverlay: "absolute inset-0 bg-cyan-400/10",
    aboutLabel:
      "shrink-0 text-right text-sm uppercase tracking-[0.28em] text-cyan-200 drop-shadow-[0_0_10px_rgba(103,232,249,0.55)]",
    aboutText: "max-w-full text-sm leading-7 text-cyan-300/75",

    // Mobile Mishi image.
    mishiWrapper:
      "relative mt-6 max-h-[260px] w-full overflow-hidden rounded-2xl border border-cyan-400/20",
    mishiImage: "h-full w-full object-cover opacity-50",

    // Mobile side-panel stack.
    sidePanelGrid: "grid grid-cols-1 gap-4",
  },

  // Desktop layout, only visible from lg upward.
  desktop: {
    wrapper:
      "hidden min-h-[88vh] grid-cols-[260px_1fr_360px] gap-3 border border-cyan-400/35 p-8 shadow-[0_0_45px_rgba(0,220,255,0.16)] lg:grid",

    // Left desktop sidebar.
    leftAside: "border border-cyan-400/30 p-8 font-mono text-sm",
    leftEyebrow: "mb-6 text-cyan-200",
    leftTextStack: "space-y-4 text-cyan-300/80",

    // Desktop about-me block inside left sidebar.
    aboutBlock: "mt-10 border-t border-cyan-400/25 pt-8",
    aboutHeader: "mb-6 flex items-center justify-between gap-5",
    aboutImageWrapper:
      "relative h-20 w-24 shrink-0 overflow-hidden border border-cyan-400/40 bg-cyan-950/30 shadow-[0_0_24px_rgba(34,211,238,0.15)]",
    aboutImage: "h-full w-full object-cover object-center opacity-90",
    aboutImageOverlay: "absolute inset-0 bg-cyan-400/10",
    aboutLabel:
      "shrink-0 text-right text-cyan-200 drop-shadow-[0_0_10px_rgba(103,232,249,0.55)]",
    aboutText: "leading-6 text-cyan-300/70",
    mishiWrapper: "relative mt-6 w-full overflow-hidden",
    mishiImage: "h-[300px] w-full object-cover opacity-50",

    // Desktop center panel.
    mainPanel:
      "relative overflow-hidden border border-cyan-400/30 p-[60px] font-mono",
    mainGlow:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.08),transparent_55%)]",
    mainContent: "relative z-10",
    headline:
      "mx-auto max-w-3xl text-center text-xl leading-[1.6] tracking-[-0.02em] text-cyan-300/70 md:text-2xl",

    // Area where the absolute-positioned service cards sit.
    cardStage: "relative z-10 mt-8 h-[560px]",

    // Right desktop sidebar with three stacked panels.
    rightAside: "grid h-full grid-rows-3 gap-3 font-mono",
  },

  // CTA links.
  cta: {
    project:
      "rainbow-link-glow mt-6 inline-flex items-center justify-center border border-cyan-400/40 bg-cyan-300/10 px-5 py-3 text-sm text-cyan-100 transition hover:bg-cyan-300/20",
  },

  // Shared service card styling.
  serviceCard: {
    // Desktop cards are absolute-positioned inside the center panel.
    desktop:
      "absolute w-[260px] border border-cyan-300/35 bg-cyan-950/20 p-6 text-cyan-200 shadow-[inset_0_0_30px_rgba(34,211,238,0.06),0_0_24px_rgba(34,211,238,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/70 hover:bg-cyan-900/25 hover:shadow-[inset_0_0_35px_rgba(34,211,238,0.10),0_0_40px_rgba(34,211,238,0.22)]",

    // Mobile cards are regular stacked cards.
    mobile:
      "relative rounded-2xl border border-cyan-300/35 bg-cyan-950/20 p-6 font-mono text-cyan-200 shadow-[inset_0_0_30px_rgba(34,211,238,0.06),0_0_24px_rgba(34,211,238,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/70 hover:bg-cyan-900/25 hover:shadow-[inset_0_0_35px_rgba(34,211,238,0.10),0_0_40px_rgba(34,211,238,0.22)]",

    number: "text-xs tracking-[0.25em] text-cyan-400/80",
    title: "mt-5 text-xl font-bold text-cyan-100",
    text: "mt-5 text-sm leading-6 text-cyan-300/70",
  },

  // Desktop absolute positions for each service card.
  cardPositions: {
    build: "left-[5%] top-[0px]",
    design: "right-[5%] top-[3px]",
    strategy: "left-[30%] top-[200px]",
    brandLogic: "left-[2%] top-[400px]",
    experiment: "right-[3%] top-[400px]",
  },

  // Decorative corner lines for service cards.
  corners: {
    topLeft:
      "absolute left-[-1px] top-[-1px] h-4 w-4 border-l border-t border-cyan-200/80",
    topRight:
      "absolute right-[-1px] top-[-1px] h-4 w-4 border-r border-t border-cyan-200/80",
    bottomLeft:
      "absolute bottom-[-1px] left-[-1px] h-4 w-4 border-b border-l border-cyan-200/80",
    bottomRight:
      "absolute bottom-[-1px] right-[-1px] h-4 w-4 border-b border-r border-cyan-200/80",
  },

  // Side information panels used on both mobile and desktop.
  sidePanel: {
    base: "border border-cyan-400/30 font-mono",
    desktop: "h-full p-6",
    mobile: "rounded-2xl bg-cyan-950/20 p-5 backdrop-blur-md",
    title:
      "mb-5 text-xs uppercase tracking-[0.22em] text-cyan-200 lg:text-base lg:tracking-normal",
    items: "space-y-4 text-sm text-cyan-300/75",
  },
};

/* section 3 [process section]*/
export const processRc = {
  // Main process section wrapper.
  section:
    "relative min-h-screen w-full overflow-hidden border border-cyan-400/20 text-white",

  // Background visual layers.
  background: {
    // Main central cyan glow.
    mainGlow:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,220,255,0.16),transparent_42%)]",

    // Side cyan glow accents.
    sideGlow:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,220,255,0.16),transparent_25%),radial-gradient(circle_at_85%_35%,rgba(0,220,255,0.16),transparent_24%)]",

    // Technical grid overlay.
    grid: "pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70",
  },

  // Discount popup placement.
  discount: {
    desktop: "absolute left-4 top-4 z-30 hidden font-mono lg:block",
    mobile: "mx-auto mt-10 flex justify-center lg:hidden",
  },

  // Inner section shell.
  shell:
    "relative z-10 mx-auto max-w-[1450px] px-5 py-16 sm:px-8 md:px-10 md:py-24 lg:px-6",

  // Header block.
  header: {
    wrapper: "text-center",
    eyebrow: "font-mono text-xs text-blue-400 sm:text-sm",
    title:
      "mt-5 text-[50px] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[60px] md:text-[72px]",
    divider:
      "mx-auto mt-5 h-[3px] w-20 rounded-full bg-blue-400 shadow-[0_0_22px_rgba(96,165,250,0.9)]",
    text: "mx-auto mt-7 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8",
  },

  // Mobile card layout.
  mobile: {
    grid: "mt-12 grid grid-cols-1 gap-5 md:hidden",
    card: "relative overflow-hidden rounded-3xl border p-5 shadow-[inset_0_0_28px_rgba(59,130,246,0.06)] backdrop-blur-md",
    cardGlow:
      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.16),transparent_38%)]",
    contentRow: "relative flex items-start gap-4",
    iconBox:
      "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border bg-white/5 text-2xl backdrop-blur-xl",
    iconSvg: "h-8 w-8 translate-x-[1px] -translate-y-[1px]",
    content: "min-w-0",
    number: "font-mono text-sm",
    title: "mt-2 text-2xl font-semibold text-white",
    text: "mt-3 text-sm leading-7 text-white/60",
    chipBox:
      "relative mt-5 rounded-2xl border border-white/10 bg-black/10 p-3 backdrop-blur-md",
    chipGrid: "flex flex-wrap justify-center gap-2",
    chip: "rounded-full border px-3 py-1.5 text-[11px] font-medium leading-none tracking-wide",
  },

  // Desktop process timeline.
  desktop: {
    wrapper: "relative mt-24 hidden md:block",
    line: "absolute left-[7%] right-[7%] top-[90px] h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-300 shadow-[0_0_18px_rgba(59,130,246,0.7)]",
    grid: "grid grid-cols-4 gap-8 xl:gap-12",
    card: "relative",
    topRow: "mb-8 flex items-center gap-7",
    number: "font-mono text-2xl",
    iconBox:
      "relative flex h-24 w-24 items-center justify-center rounded-[28px] border bg-white/5 text-4xl backdrop-blur-xl",
    iconSvg: "h-10 w-10 translate-x-[1px] -translate-y-[2px]",
    dot: "absolute bottom-[-10px] left-1/2 h-5 w-5 -translate-x-1/2 rounded-full",
    title: "text-2xl font-semibold text-white",
    text: "mt-4 max-w-[260px] text-base leading-7 text-white/60",
    itemBox:
      "mt-8 w-full max-w-[260px] rounded-xl border border-blue-400/20 bg-blue-950/20 p-5 shadow-[inset_0_0_28px_rgba(59,130,246,0.06)] backdrop-blur-md",
    itemStack: "space-y-3 text-sm text-white/65",
  },

  // Bottom divider and final process note.
  footer: {
    divider:
      "mx-auto mt-14 flex max-w-3xl items-center gap-6 text-blue-500/50 md:mt-10 md:gap-8",
    line: "h-px flex-1 bg-blue-400/20",
    star: "text-2xl md:text-3xl",
    text: "mx-auto mt-8 max-w-2xl text-center text-sm leading-7 text-white/35 sm:text-base md:text-lg",
  },
};
/* section 4 goodbye */
export const goodbyeRc = {
  // Main goodbye section wrapper.
  section:
    "relative min-h-screen overflow-hidden border-t border-cyan-300/10 px-5 py-16 text-white sm:px-8 md:px-10 md:py-24 lg:px-16",

  // Inner max-width shell.
  shell: "relative z-10 mx-auto max-w-7xl",

  // Background grid, corner brackets, and decorative symbols.
  background: {
    gridWrapper: "pointer-events-none absolute inset-0 opacity-35 md:opacity-40",
    grid: "absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:42px_42px]",
    cornerTopLeft:
      "pointer-events-none absolute left-5 top-5 h-5 w-5 border-l border-t border-cyan-300/35 md:left-10 md:top-10 md:h-6 md:w-6",
    cornerTopRight:
      "pointer-events-none absolute right-5 top-5 h-5 w-5 border-r border-t border-cyan-300/35 md:right-10 md:top-10 md:h-6 md:w-6",
    cornerBottomLeft:
      "pointer-events-none absolute bottom-5 left-5 h-5 w-5 border-b border-l border-cyan-300/35 md:bottom-10 md:left-10 md:h-6 md:w-6",
    cornerBottomRight:
      "pointer-events-none absolute bottom-5 right-5 h-5 w-5 border-b border-r border-cyan-300/35 md:bottom-10 md:right-10 md:h-6 md:w-6",
    smallDot:
      "pointer-events-none absolute left-[6%] top-[32%] hidden h-2 w-2 rounded-full border border-cyan-300/50 md:block",
    star:
      "pointer-events-none absolute right-[12%] top-[9%] text-2xl text-cyan-300/60 md:right-[16%] md:top-[12%] md:text-3xl",
    sparkle:
      "pointer-events-none absolute left-[38%] top-[22%] hidden text-3xl text-cyan-200/60 md:block",
  },

  // Mobile layout: intro panel, contact panel, blob panel.
  mobile: {
    wrapper: "block space-y-6 lg:hidden",
    introPanel:
      "rounded-[1.75rem] border border-cyan-300/20 bg-cyan-950/15 p-5 shadow-[0_0_35px_rgba(34,211,238,0.12)] backdrop-blur-md sm:p-7",
    blobPanel:
      "rounded-[1.75rem] border border-cyan-300/15 bg-cyan-950/10 p-5 backdrop-blur-md",
  },

  // Desktop layout.
  desktop: {
    wrapper: "hidden items-center gap-16 lg:grid lg:grid-cols-[1.05fr_0.95fr]",
    blobWrapper: "hidden lg:block",
  },

  // Intro text/content styles.
  intro: {
    wrapper: "",
    eyebrow:
      "mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-cyan-100/70 sm:text-xs md:mb-8 md:tracking-[0.45em]",
    eyebrowDot:
      "h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]",
    title:
      "max-w-2xl text-[48px] font-black leading-[0.9] tracking-[-0.06em] text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.12)] min-[390px]:text-[56px] sm:text-7xl md:text-8xl lg:text-9xl",
    titleDot: "text-cyan-300",
    subtitle:
      "mt-8 max-w-2xl text-xl font-semibold leading-tight tracking-[-0.03em] text-cyan-300 sm:text-2xl md:mt-10 md:text-3xl",
    body:
      "mt-6 max-w-xl space-y-4 text-[15px] leading-7 text-white/75 sm:text-base md:mt-8 md:space-y-5 md:text-lg",
    ctaArea: "mt-8 flex flex-col items-center gap-4 md:mt-10",
    ctaRow: "flex flex-col items-center gap-4 sm:flex-row",
    whatsapp:
      "group flex h-14 items-center justify-center gap-3 rounded-2xl border border-cyan-300/40 bg-cyan-950/20 px-6 text-base font-semibold text-white backdrop-blur-md transition duration-300 hover:scale-[1.02] hover:border-cyan-300/80 hover:bg-cyan-300/10 sm:h-16 sm:gap-4 sm:px-8 sm:text-lg",
    whatsappIcon:
      "flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200 sm:h-11 sm:w-11",
    locationPill:
      "inline-flex max-w-full items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-950/20 px-4 py-3 text-xs text-white/65 backdrop-blur-md sm:gap-4 sm:px-6 sm:text-sm",
    locationIcon: "h-4 w-4 shrink-0 text-cyan-300",
    locationText: "truncate",
    locationDot:
      "h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]",
  },

  // Firework portal overlay.
  fireworks: {
    portal: "pointer-events-none fixed inset-0 z-[2147483647]",
  },

  // Contact panel and contact rows.
  contact: {
    wrapper: "relative",
    panel:
      "relative overflow-hidden rounded-[1.5rem] border border-cyan-300/25 bg-cyan-950/20 shadow-[0_0_45px_rgba(34,211,238,0.14)] backdrop-blur-xl sm:rounded-[2rem] md:border-cyan-300/35 md:shadow-[0_0_60px_rgba(34,211,238,0.18)]",
    glow:
      "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_45%)]",
    header:
      "relative flex items-center justify-between border-b border-cyan-300/10 p-4 sm:p-6 md:p-7",
    badge:
      "inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-950/40 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-cyan-100/70 sm:px-5 sm:text-xs sm:tracking-[0.25em]",
    badgeDot: "h-2 w-2 rounded-full bg-emerald-400",
    fireworkButton:
      "firework-trigger-debug group/firework relative z-20 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 text-cyan-100 transition duration-300 hover:scale-110 hover:border-cyan-200 hover:bg-cyan-300/20 active:scale-95 sm:h-12 sm:w-12",
    fireworkIcon:
      "relative z-10 h-5 w-5 transition duration-300 group-hover/firework:translate-x-0.5 group-hover/firework:-translate-y-0.5",
    rows: "relative divide-y divide-cyan-300/10",
    footer: "relative p-4 sm:p-6 md:p-7",
    footerBox:
      "flex items-center justify-between gap-4 rounded-2xl border border-cyan-300/15 bg-cyan-950/30 px-4 py-4 text-xs text-cyan-100/70 sm:px-5 sm:text-sm",
    footerContent: "flex min-w-0 items-center gap-3 sm:gap-4",
    footerIcon: "h-4 w-4 shrink-0 text-cyan-300",
    footerText: "leading-5",
    footerHeart: "h-5 w-5 shrink-0 object-contain opacity-90",
  },

  // Individual contact rows.
  contactRow: {
    link:
      "group flex items-center justify-between gap-4 p-4 transition duration-300 hover:bg-cyan-300/5 sm:p-6 md:p-7",
    left: "flex min-w-0 items-center gap-4 sm:gap-5",
    iconBox:
      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/10 bg-cyan-300/10 text-cyan-100 shadow-[inset_0_0_20px_rgba(34,211,238,0.08)] sm:h-14 sm:w-14",
    textBox: "min-w-0",
    label: "text-base font-semibold text-white sm:text-lg",
    value: "mt-1 truncate font-mono text-xs text-cyan-300 sm:text-sm",
    arrow:
      "h-5 w-5 shrink-0 text-white/70 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan-200",
  },

  // Bottom blob/status area.
  blob: {
    imageWrapper:
      "pointer-events-none relative z-10 mx-auto flex max-w-7xl justify-center lg:mt-16",
    image:
      "w-[210px] opacity-90 drop-shadow-[0_0_28px_rgba(34,211,238,0.45)] sm:w-[260px] md:w-[360px] md:opacity-95",
    status:
      "relative z-10 mx-auto mt-8 flex max-w-4xl flex-col items-center justify-center gap-4 text-center text-[10px] uppercase tracking-[0.28em] text-cyan-100/60 sm:flex-row sm:gap-8 sm:text-xs sm:tracking-[0.35em]",
    line: "hidden h-px w-40 items-center justify-center bg-cyan-300/30 sm:flex md:w-72",
    lineDot:
      "h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]",
    seeYou: "inline-flex items-center gap-2",
    mishiIcon: "h-5 w-5 object-contain",
  },
};