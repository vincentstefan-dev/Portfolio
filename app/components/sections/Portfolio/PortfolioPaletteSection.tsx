"use client";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";

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
    displayName: "Cyan Glow",
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
    <section className={rc.palette.section}>
      <div className={rc.palette.background}>
        <div className={rc.palette.backgroundGlow} />
        <div className={rc.palette.backgroundGrid} />
        <div className={rc.palette.orbitOne} />
        <div className={rc.palette.orbitTwo} />
      </div>

      <div className={rc.palette.topMarkWrap}>
        <div className={rc.palette.topMark}>
          <div className={rc.palette.topMarkMainLine} />
          <div className={rc.palette.topMarkLineLong} />
          <div className={rc.palette.topMarkLineShort} />
        </div>
      </div>

      <div className={rc.palette.inner}>
        <div className={rc.palette.header}>
          <p className={rc.palette.kicker}>Visual System</p>

          <h2 className={rc.palette.title}>
            Color
            <br />
            Palette.
          </h2>
        </div>

        <div className={rc.palette.shelf}>
          <div className={rc.palette.shelfLine} />

          <div className={rc.palette.grid}>
            {palette.map((color, index) => (
              <article
                key={color.hex}
                className={rc.palette.article}
                style={{
                  zIndex: palette.length - index,
                }}
              >
                <div
                  className={`${rc.palette.swatchBase} ${color.className} ${color.textClass}`}
                >
                  <div className={rc.palette.swatchGlow}>
                    <div className={rc.palette.swatchGlowLeft} />
                    <div className={rc.palette.swatchGlowRight} />
                    <div className={rc.palette.swatchGlowBlur} />
                  </div>

                  <div className={rc.palette.swatchTop}>
                    <span className={rc.palette.index}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className={rc.palette.hex}>{color.hex}</span>
                  </div>

                  <div className={rc.palette.swatchText}>
                    <h3 className={rc.palette.colorName}>
                      {color.displayName}
                    </h3>

                    <p className={rc.palette.role}>{color.role}</p>
                  </div>

                  <div className={rc.palette.bottomLine} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className={rc.palette.bottomMarkWrap}>
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