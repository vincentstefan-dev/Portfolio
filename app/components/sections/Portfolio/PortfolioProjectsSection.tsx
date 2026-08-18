"use client";

import {
  type CSSProperties,
  useEffect,
  useState,
} from "react";
import Image from "next/image";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";
import "./portfolio-allprojects-section.css";

type PixelStar = {
  id: string;
  shapeClass: string;
  positionClass: string;
  animationClass: string;
};

type DecorativePng = {
  id: string;
  src: string;
  positionClass: string;
  animationClass: string;
};

type LetterColor = {
  color: string;
  shadow: string;
};

const titlePalette: LetterColor[] = [
  {
    color: "#2487ff",
    shadow: "#1050b8",
  },
  {
    color: "#f02f93",
    shadow: "#a4145d",
  },
  {
    color: "#ff354f",
    shadow: "#b01831",
  },
  {
    color: "#42df31",
    shadow: "#168d18",
  },
  {
    color: "#ffe02d",
    shadow: "#c28d0b",
  },
  {
    color: "#ff9f1c",
    shadow: "#bd5d0c",
  },
  {
    color: "#34d9e8",
    shadow: "#148496",
  },
  {
    color: "#a866ff",
    shadow: "#6031ac",
  },
];

const initialTitleColors: LetterColor[] = [
  titlePalette[0],
  titlePalette[4],
  titlePalette[1],
  titlePalette[6],
  titlePalette[2],
  titlePalette[3],
  titlePalette[7],
  titlePalette[4],
  titlePalette[5],
  titlePalette[1],
  titlePalette[3],
  titlePalette[6],
];

const letterRotations = [
  "-2deg",
  "1deg",
  "-1deg",
  "1deg",
  "-2deg",
  "1.5deg",
  "-1deg",
  "2deg",
  "-1.5deg",
  "1deg",
  "-2deg",
  "1.5deg",
];

const letterOffsets = [
  "1px",
  "-2px",
  "2px",
  "0px",
  "3px",
  "-1px",
  "2px",
  "-2px",
  "1px",
  "3px",
  "-1px",
  "1px",
];

const pixelStars: PixelStar[] = [
  {
    id: "star-one",
    shapeClass: "portfolio-allprojects-star--cross",
    positionClass: "left-[5%] top-[21%] h-[16px] w-[16px]",
    animationClass: "portfolio-allprojects-star--one",
  },
  {
    id: "star-two",
    shapeClass: "portfolio-allprojects-star--dot",
    positionClass: "left-[12%] top-[39%] h-[5px] w-[5px]",
    animationClass: "portfolio-allprojects-star--two",
  },
  {
    id: "star-three",
    shapeClass: "portfolio-allprojects-star--diamond",
    positionClass: "left-[20%] top-[12%] h-[8px] w-[8px]",
    animationClass: "portfolio-allprojects-star--three",
  },
  {
    id: "star-four",
    shapeClass: "portfolio-allprojects-star--cross",
    positionClass: "left-[36%] top-[14%] h-[12px] w-[12px]",
    animationClass: "portfolio-allprojects-star--four",
  },
  {
    id: "star-five",
    shapeClass: "portfolio-allprojects-star--dot",
    positionClass: "left-[43%] top-[29%] h-[4px] w-[4px]",
    animationClass: "portfolio-allprojects-star--one",
  },
  {
    id: "star-six",
    shapeClass: "portfolio-allprojects-star--diamond",
    positionClass: "right-[39%] top-[11%] h-[9px] w-[9px]",
    animationClass: "portfolio-allprojects-star--two",
  },
  {
    id: "star-seven",
    shapeClass: "portfolio-allprojects-star--cross",
    positionClass: "right-[25%] top-[19%] h-[14px] w-[14px]",
    animationClass: "portfolio-allprojects-star--three",
  },
  {
    id: "star-eight",
    shapeClass: "portfolio-allprojects-star--dot",
    positionClass: "right-[13%] top-[37%] h-[5px] w-[5px]",
    animationClass: "portfolio-allprojects-star--four",
  },
  {
    id: "star-nine",
    shapeClass: "portfolio-allprojects-star--diamond",
    positionClass: "right-[5%] top-[24%] h-[10px] w-[10px]",
    animationClass: "portfolio-allprojects-star--one",
  },
  {
    id: "star-ten",
    shapeClass: "portfolio-allprojects-star--cross",
    positionClass: "left-[16%] bottom-[23%] h-[13px] w-[13px]",
    animationClass: "portfolio-allprojects-star--two",
  },
  {
    id: "star-eleven",
    shapeClass: "portfolio-allprojects-star--dot",
    positionClass: "left-[31%] bottom-[12%] h-[5px] w-[5px]",
    animationClass: "portfolio-allprojects-star--three",
  },
  {
    id: "star-twelve",
    shapeClass: "portfolio-allprojects-star--diamond",
    positionClass: "left-[43%] bottom-[18%] h-[8px] w-[8px]",
    animationClass: "portfolio-allprojects-star--four",
  },
  {
    id: "star-thirteen",
    shapeClass: "portfolio-allprojects-star--cross",
    positionClass: "right-[36%] bottom-[12%] h-[15px] w-[15px]",
    animationClass: "portfolio-allprojects-star--one",
  },
  {
    id: "star-fourteen",
    shapeClass: "portfolio-allprojects-star--dot",
    positionClass: "right-[22%] bottom-[25%] h-[4px] w-[4px]",
    animationClass: "portfolio-allprojects-star--two",
  },
  {
    id: "star-fifteen",
    shapeClass: "portfolio-allprojects-star--diamond",
    positionClass: "right-[9%] bottom-[16%] h-[9px] w-[9px]",
    animationClass: "portfolio-allprojects-star--three",
  },
];

const decorativePngs: DecorativePng[] = [
  {
    id: "upper-left-ufo",
    src: "/website-icons/ufo.png",
    positionClass:
      "left-[6%] top-[8%] w-[115px] lg:w-[145px] xl:w-[180px]",
    animationClass: "portfolio-allprojects-png--one",
  },
  {
    id: "upper-moon",
    src: "/website-icons/moon.png",
    positionClass:
      "left-[30%] top-[7%] w-[68px] lg:w-[86px] xl:w-[105px]",
    animationClass: "portfolio-allprojects-png--two",
  },
  {
    id: "upper-right-pc",
    src: "/website-icons/pc.png",
    positionClass:
      "right-[8%] top-[12%] w-[95px] lg:w-[120px] xl:w-[145px]",
    animationClass: "portfolio-allprojects-png--three",
  },
  {
    id: "middle-left-atom",
    src: "/website-icons/atom.png",
    positionClass:
      "left-[4%] top-[48%] w-[54px] lg:w-[68px] xl:w-[82px]",
    animationClass: "portfolio-allprojects-png--four",
  },
  {
    id: "middle-right-brain",
    src: "/website-icons/brain.png",
    positionClass:
      "right-[3%] top-[49%] w-[78px] lg:w-[98px] xl:w-[118px]",
    animationClass: "portfolio-allprojects-png--five",
  },
  {
    id: "lower-left-drive",
    src: "/website-icons/hdd.png",
    positionClass:
      "bottom-[7%] left-[9%] w-[82px] lg:w-[105px] xl:w-[128px]",
    animationClass: "portfolio-allprojects-png--six",
  },
  {
    id: "lower-center-cd",
    src: "/website-icons/cd.png",
    positionClass:
      "bottom-[2%] left-1/2 w-[75px] -translate-x-1/2 lg:w-[96px] xl:w-[115px]",
    animationClass: "portfolio-allprojects-png--seven",
  },
  {
    id: "lower-right-airplane",
    src: "/website-icons/paperairplane.png",
    positionClass:
      "bottom-[7%] right-[11%] w-[68px] lg:w-[88px] xl:w-[108px]",
    animationClass: "portfolio-allprojects-png--eight",
  },
];

function createRandomTitleColors(count: number): LetterColor[] {
  const colors: LetterColor[] = [];
  let previousColor = "";

  for (let index = 0; index < count; index += 1) {
    const availableColors = titlePalette.filter(
      (paletteColor) => paletteColor.color !== previousColor,
    );

    const randomIndex = Math.floor(
      Math.random() * availableColors.length,
    );

    const selectedColor = availableColors[randomIndex];

    colors.push(selectedColor);
    previousColor = selectedColor.color;
  }

  return colors;
}

export default function PortfolioProjectsSection() {
  const [titleColors, setTitleColors] =
    useState<LetterColor[]>(initialTitleColors);

  useEffect(() => {
    setTitleColors(createRandomTitleColors(12));
  }, []);

  const allColors = titleColors.slice(0, 3);
  const projectsColors = titleColors.slice(3);

  return (
    <section
      className={`${rc.projectsHero.section} relative isolate overflow-hidden`}
    >
      <div className={rc.projectsHero.background} />

      {/* ========================================
          TOP RAIL
      ======================================== */}
      <div className={`${rc.projectsHero.topRailWrap} relative z-30`}>
        <div className={rc.projectsHero.topRail}>
          <div className={rc.projectsHero.topRailMainLine} />
          <div className={rc.projectsHero.topRailLineLong} />
          <div className={rc.projectsHero.topRailLineShort} />
        </div>
      </div>

      {/* ========================================
          PIXEL STARS
      ======================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[4] overflow-hidden"
      >
        {pixelStars.map((star) => (
          <span
            key={star.id}
            className={`portfolio-allprojects-star absolute ${star.shapeClass} ${star.positionClass} ${star.animationClass}`}
          />
        ))}
      </div>

      {/* ========================================
          DECORATIVE PNGS
      ======================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[8] hidden overflow-hidden md:block"
      >
        {decorativePngs.map((png) => (
          <div
            key={png.id}
            className={`absolute ${png.positionClass}`}
          >
            <div
              className={`portfolio-allprojects-png ${png.animationClass}`}
            >
              <Image
                src={png.src}
                alt=""
                width={280}
                height={280}
                sizes="(min-width: 1280px) 180px, (min-width: 1024px) 145px, 115px"
                className="portfolio-allprojects-png__image"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ========================================
          BLOCKY RANDOM-COLOR TITLE
      ======================================== */}
      <div className={`${rc.projectsHero.centerWrap} z-20`}>
        <div className={rc.projectsHero.centerInner}>
          <div className={rc.projectsHero.titleWrap}>
            <h2
              className="portfolio-allprojects-block-title"
              aria-label="All Projects"
            >
              <BlockTitleLine
                text="ALL"
                colors={allColors}
                startIndex={0}
                className="portfolio-allprojects-block-title__top"
              />

              <BlockTitleLine
                text="PROJECTS!"
                colors={projectsColors}
                startIndex={3}
                className="portfolio-allprojects-block-title__bottom"
              />
            </h2>

            <div className={rc.projectsHero.titleGlow} />
          </div>
        </div>
      </div>

      {/* ========================================
          BOTTOM RAIL
      ======================================== */}
      <div
        className={`${rc.projectsHero.bottomRailWrap} relative z-30`}
      >
        <div className={rc.projectsHero.bottomRail}>
          <span className={rc.projectsHero.bottomDotStrong} />
          <span className={rc.projectsHero.bottomDotMedium} />
          <span className={rc.projectsHero.bottomDotSoft} />
          <span className={rc.projectsHero.bottomLine} />
        </div>
      </div>
    </section>
  );
}

function BlockTitleLine({
  text,
  colors,
  startIndex,
  className,
}: {
  text: string;
  colors: LetterColor[];
  startIndex: number;
  className: string;
}) {
  return (
    <span className={`portfolio-allprojects-block-title__line ${className}`}>
      {text.split("").map((letter, index) => {
        const color =
          colors[index] ?? titlePalette[index % titlePalette.length];

        const globalIndex = startIndex + index;

        return (
          <span
            key={`${letter}-${globalIndex}`}
            className="portfolio-allprojects-block-letter"
            style={
              {
                "--block-letter-color": color.color,
                "--block-letter-shadow": color.shadow,
                "--block-letter-rotation":
                  letterRotations[globalIndex] ?? "0deg",
                "--block-letter-offset":
                  letterOffsets[globalIndex] ?? "0px",
              } as CSSProperties
            }
          >
            {letter}
          </span>
        );
      })}
    </span>
  );
}