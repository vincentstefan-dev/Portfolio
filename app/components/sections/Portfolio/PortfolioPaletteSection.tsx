"use client";

import Image from "next/image";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";
import "./portfolio-palette-section.css";

const pixelFont =
  "font-mono uppercase tracking-[0.08em] [font-family:var(--font-pixel),var(--font-vt323),'Press_Start_2P','Courier_New',monospace]";

type DecorativePng = {
  id: string;
  src: string;
  positionClass: string;
  animationClass: string;
};

const decorativePngs: DecorativePng[] = [
  {
    id: "upper-left",
    src: "/website-icons/purpleglobe.png",
    positionClass:
      "left-[14%] top-[32%] w-[78px] lg:w-[100px] xl:w-[122px]",
    animationClass: "portfolio-palette-png--one",
  },
  {
    id: "upper-center",
    src: "/website-icons/paperairplane.png",
    positionClass:
      "left-[59%] top-[19%] w-[72px] lg:w-[94px] xl:w-[112px]",
    animationClass: "portfolio-palette-png--two",
  },
  {
    id: "upper-right",
    src: "/website-icons/paintdropper.png",
    positionClass:
      "right-[11%] top-[28%] w-[82px] lg:w-[108px] xl:w-[130px]",
    animationClass: "portfolio-palette-png--three",
  },
  {
    id: "lower-left",
    src: "/website-icons/paintbucket.png",
    positionClass:
      "bottom-[6%] left-[14.5%] w-[68px] lg:w-[88px] xl:w-[104px]",
    animationClass: "portfolio-palette-png--four",
  },
  {
    id: "lower-center",
    src: "/website-icons/paintspray.png",
    positionClass:
      "bottom-[-2%] left-[48%] w-[72px] lg:w-[94px] xl:w-[112px]",
    animationClass: "portfolio-palette-png--five",
  },
  {
    id: "lower-right",
    src: "/website-icons/windowcloud.png",
    positionClass:
      "bottom-[-1%] right-[13%] w-[76px] lg:w-[100px] xl:w-[118px]",
    animationClass: "portfolio-palette-png--six",
  },
];

const palette = [
  {
    name: "Black",
    displayName: "Black",
    hex: "#05070A",
    role: "Base background",
    className: "bg-[#05070A]",
    textClass: "text-white",
  },
  {
    name: "Charcoal",
    displayName: "Charcoal",
    hex: "#070A0D",
    role: "Depth layer",
    className: "bg-[#070A0D]",
    textClass: "text-white",
  },
  {
    name: "Ice White",
    displayName: "Ice White",
    hex: "#F3F8FF",
    role: "Main text",
    className: "bg-[#F3F8FF]",
    textClass: "text-black",
  },
  {
    name: "Cyan",
    displayName: "Cyan",
    hex: "#67E8F9",
    role: "Primary accent",
    className: "bg-[#67E8F9]",
    textClass: "text-black",
  },
  {
    name: "Cyan Glow",
    displayName: (
      <>
        Cyan
        <br />
        Glow
      </>
    ),
    hex: "#22D3EE",
    role: "Glow / active state",
    className: "bg-[#22D3EE]",
    textClass: "text-black",
  },
  {
    name: "Electric Blue",
    displayName: (
      <>
        Electric
        <br />
        Blue
      </>
    ),
    hex: "#2563EB",
    role: "Orbit shadow",
    className: "bg-[#2563EB]",
    textClass: "text-white",
  },
];

export default function PortfolioPaletteSection() {
  return (
    <section
      className={`${rc.palette.section} relative isolate overflow-hidden`}
    >
      {/* ========================================
          BACKGROUND
      ======================================== */}
      <div className={rc.palette.background}>
        <div className={rc.palette.backgroundGlow} />
        <div className={rc.palette.backgroundGrid} />
        <div className={rc.palette.orbitOne} />
        <div className={rc.palette.orbitTwo} />
      </div>

      {/* ========================================
          SIX DECORATIVE PNGS
          These are inside the same section.
      ======================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[30] hidden overflow-hidden md:block"
      >
        {decorativePngs.map((png) => (
          <div
            key={png.id}
            className={`absolute ${png.positionClass}`}
          >
            <div
              className={`portfolio-palette-png ${png.animationClass}`}
            >
              <Image
                src={png.src}
                alt=""
                width={260}
                height={260}
                sizes="(min-width: 1280px) 130px, (min-width: 1024px) 108px, 82px"
                className="portfolio-palette-png__image"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ========================================
          TOP MARK
      ======================================== */}
      <div className={`${rc.palette.topMarkWrap} relative z-10`}>
        <div className={rc.palette.topMark}>
          <div className={rc.palette.topMarkMainLine} />
          <div className={rc.palette.topMarkLineLong} />
          <div className={rc.palette.topMarkLineShort} />
        </div>
      </div>

      {/* ========================================
          CONTENT
      ======================================== */}
      <div className={`${rc.palette.inner} relative z-10`}>
        <div className={rc.palette.header}>
          <p className={rc.palette.kicker}>Visual System</p>

          <h2 className={`${rc.palette.title} whitespace-nowrap`}>
            Color Palette.
          </h2>
        </div>

        <div className={rc.palette.shelf}>
          <div className={rc.palette.shelfLine} />

          <div className="relative z-10 grid w-full grid-cols-1 overflow-hidden rounded-[10px] border-2 border-[#0055df] bg-[#ece9d8] shadow-[inset_1px_1px_0_rgba(255,255,255,0.8),inset_-1px_-1px_0_rgba(0,0,0,0.35),0_24px_70px_rgba(0,0,0,0.45)] sm:grid-cols-2 lg:grid-cols-6">
            {palette.map((color, index) => (
              <article
                key={color.hex}
                className="group relative min-h-[420px] border-b border-[#003c9d]/50 transition duration-500 hover:z-30 hover:-translate-y-2 sm:border-r lg:min-h-[540px] lg:border-b-0"
                style={{
                  zIndex: palette.length - index,
                }}
              >
                <div className="flex h-full flex-col overflow-hidden">
                  <div className="flex h-8 shrink-0 items-center justify-between border-r border-white/20 bg-gradient-to-b from-[#3d95ff] via-[#1266d6] to-[#0647a8] px-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="h-4 w-4 shrink-0 rounded-[3px] border border-white/60 bg-gradient-to-b from-[#9be7ff] to-[#1f7cff] shadow-[inset_1px_1px_0_rgba(255,255,255,0.9)]" />

                      <span
                        className={`${pixelFont} truncate text-[9px] font-bold leading-none drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]`}
                      >
                        {String(index + 1).padStart(2, "0")} — {color.name}
                      </span>
                    </div>

                    <div className="ml-2 flex shrink-0 gap-1">
                      <span className="grid h-4 w-4 place-items-center rounded-[2px] border border-white/60 bg-gradient-to-b from-[#78b8ff] to-[#1d61c8] text-[9px] leading-none shadow-[inset_1px_1px_0_rgba(255,255,255,0.65)]">
                        _
                      </span>

                      <span className="grid h-4 w-4 place-items-center rounded-[2px] border border-white/60 bg-gradient-to-b from-[#ff9b7a] to-[#d83516] text-[10px] font-bold leading-none shadow-[inset_1px_1px_0_rgba(255,255,255,0.7)]">
                        ×
                      </span>
                    </div>
                  </div>

                  <div
                    className={`relative flex h-full min-h-0 flex-1 overflow-hidden ${color.className} ${color.textClass}`}
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-white/15" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-white/35" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-black/25" />

                    <div className="pointer-events-none absolute -left-16 top-10 h-32 w-32 rounded-full bg-white/20 blur-3xl transition duration-700 group-hover:scale-150" />
                    <div className="pointer-events-none absolute -right-20 bottom-20 h-40 w-40 rounded-full bg-black/20 blur-3xl transition duration-700 group-hover:scale-150" />

                    <div className="relative z-10 flex h-full w-full flex-col justify-between p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={`${pixelFont} text-[10px] opacity-80`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span
                          className={`${pixelFont} text-[8px] opacity-80 [writing-mode:vertical-rl]`}
                        >
                          {color.hex.replace("#", "")}
                        </span>
                      </div>

                      <div>
                        <h3
                          className={`${pixelFont} text-[1.25rem] font-black leading-[0.95] drop-shadow-[2px_2px_0_rgba(0,0,0,0.22)] sm:text-[1.45rem] lg:text-[0.95rem] xl:text-[1.2rem] 2xl:text-[1.45rem]`}
                        >
                          {color.displayName}
                        </h3>

                        <p
                          className={`${pixelFont} mt-6 text-[8px] leading-relaxed tracking-[0.32em] opacity-75`}
                        >
                          {color.role}
                        </p>
                      </div>

                      <div className="h-px w-full bg-current opacity-25" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================
          BOTTOM MARK
      ======================================== */}
      <div className={`${rc.palette.bottomMarkWrap} relative z-10`}>
        <div className={rc.palette.bottomMark}>
          <span className={rc.palette.bottomDotStrong} />
          <span className={rc.palette.bottomDotMedium} />
          <span className={rc.palette.bottomDotSoft} />
          <span className={rc.palette.bottomMarkLine} />
        </div>
      </div>
    </section>
  );
}