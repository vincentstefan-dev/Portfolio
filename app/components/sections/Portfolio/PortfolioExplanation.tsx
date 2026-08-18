"use client";

import Image from "next/image";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";
import "./portfolio-explanation-section.css";

type DecorativePng = {
  id: string;
  src: string;
  positionClass: string;
  animationClass: string;
};

const decorativePngs: DecorativePng[] = [
  {
    id: "top-large-sparkle",
    src: "/website-icons/castle.png",
    positionClass:
      "left-[25.5%] top-[19%] w-[44px] lg:w-[54px] xl:w-[62px]",
    animationClass: "portfolio-explanation-png--one",
  },
  {
    id: "top-small-sparkle",
    src: "/website-icons/pc.png",
    positionClass:
      "left-[28%] top-[23%] w-[20px] lg:w-[25px] xl:w-[29px]",
    animationClass: "portfolio-explanation-png--two",
  },
  {
    id: "left-middle-accent",
    src: "/website-icons/paperairplane.png",
    positionClass:
      "left-[8.5%] top-[45%] w-[34px] lg:w-[43px] xl:w-[50px]",
    animationClass: "portfolio-explanation-png--three",
  },
  {
    id: "center-glow",
    src: "/website-icons/pcstar.png",
    positionClass:
      "left-[53.5%] top-[44%] w-[54px] lg:w-[68px] xl:w-[78px]",
    animationClass: "portfolio-explanation-png--four",
  },
  {
    id: "lower-planet",
    src: "/website-icons/moon.png",
    positionClass:
      "bottom-[17%] left-[33.5%] w-[105px] lg:w-[132px] xl:w-[150px]",
    animationClass: "portfolio-explanation-png--five",
  },
  {
    id: "center-cursor",
    src: "/website-icons/sun.png",
    positionClass:
      "bottom-[23%] left-[47%] w-[82px] lg:w-[104px] xl:w-[120px]",
    animationClass: "portfolio-explanation-png--six",
  },
  {
    id: "bottom-small-accent",
    src: "/website-icons/ufo2.png",
    positionClass:
      "bottom-[12%] left-[55%] w-[34px] lg:w-[43px] xl:w-[50px]",
    animationClass: "portfolio-explanation-png--seven",
  },
  {
    id: "upper-right-graphic",
    src: "/website-icons/ufo.png",
    positionClass:
      "right-[20%] top-[25%] w-[155px] lg:w-[195px] xl:w-[225px]",
    animationClass: "portfolio-explanation-png--eight",
  },

  /* ========================================
     NEW RIGHT-SIDE PNG
  ======================================== */
  {
    id: "middle-right-graphic",
    src: "/website-icons/books.png",
    positionClass:
      "right-[3.5%] top-[45%] w-[155px] lg:w-[195px] xl:w-[225px]",
    animationClass: "portfolio-explanation-png--nine",
  },

  /* ========================================
     NEW LOWER-RIGHT PNG
  ======================================== */
  {
    id: "lower-right-graphic",
    src: "/website-icons/lab.png",
    positionClass:
      "bottom-[3%] right-[12%] w-[155px] lg:w-[195px] xl:w-[225px]",
    animationClass: "portfolio-explanation-png--ten",
  },
];

export default function PortfolioExplanation() {
  return (
    <section
      className={`${rc.identity.section} relative isolate overflow-hidden`}
    >
      {/* ========================================
          LEFT RAIL
      ======================================== */}
      <div className={`${rc.identity.rail} z-30`}>
        <div className={rc.identity.railDotTop} />
        <div className={rc.identity.railDotBottom} />

        <div className={rc.identity.railDots}>
          <span className={rc.identity.railDotOne} />
          <span className={rc.identity.railDotTwo} />
          <span className={rc.identity.railDotThree} />
          <span className={rc.identity.railDotFour} />
        </div>
      </div>

      {/* ========================================
          DECORATIVE PNGS
      ======================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] hidden overflow-hidden md:block"
      >
        {decorativePngs.map((png) => (
          <div
            key={png.id}
            className={`absolute ${png.positionClass}`}
          >
            <div
              className={`portfolio-explanation-png ${png.animationClass}`}
            >
              <Image
                src={png.src}
                alt=""
                width={300}
                height={300}
                sizes="(min-width: 1280px) 225px, (min-width: 1024px) 195px, 150px"
                className="portfolio-explanation-png__image"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ========================================
          SECTION CONTENT
      ======================================== */}
      <div className={`${rc.identity.inner} relative z-20`}>
        <div className={rc.identity.grid}>
          <div>
            <p className={rc.identity.kicker}>
              Project 001
            </p>

            <h1 className={rc.identity.title}>
              <span className={rc.identity.titleLineOne}>
                <span className={rc.identity.titleGradientOne}>
                  The making of{" "}
                </span>

                <span className={rc.identity.rainbowWord}>
                  Koyote
                </span>

                <span className={rc.identity.titleGradientOne}>
                  ,
                </span>
              </span>

              <span className={rc.identity.titleLineTwo}>
                From Concept to
              </span>

              <span className={rc.identity.titleLineThree}>
                Identity.
              </span>
            </h1>
          </div>

          <div className={rc.identity.listWrap}>
            <div className={rc.identity.listGlow} />

            <ul className={rc.identity.list}>
              <li className={rc.identity.listItem}>
                <span className={rc.identity.listDot} />
                Our concept
              </li>

              <li className={rc.identity.listItem}>
                <span className={rc.identity.listDot} />
                Color Palette
              </li>

              <li className={rc.identity.listItem}>
                <span className={rc.identity.listDot} />
                Logo
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}