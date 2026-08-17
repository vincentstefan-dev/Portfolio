"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

import { coolstuffRc as rc } from "@/app/coolstuff/coolstuffResponsiveConfig";

import "./cool-stuff-intro.css";

type EnterLabLetterData = {
  char: string;
  color: string;
  rotate: number;
};

type FloatingAssetStyle = CSSProperties & {
  "--cool-stuff-asset-x-a": string;
  "--cool-stuff-asset-y-a": string;
  "--cool-stuff-asset-rotation-a": string;

  "--cool-stuff-asset-x-b": string;
  "--cool-stuff-asset-y-b": string;
  "--cool-stuff-asset-rotation-b": string;

  "--cool-stuff-asset-x-c": string;
  "--cool-stuff-asset-y-c": string;
  "--cool-stuff-asset-rotation-c": string;

  "--cool-stuff-asset-x-d": string;
  "--cool-stuff-asset-y-d": string;
  "--cool-stuff-asset-rotation-d": string;
};

const enterLabLetters: EnterLabLetterData[] = [
  { char: "E", color: "#1265d8", rotate: -3 },
  { char: "N", color: "#f89d1c", rotate: 2 },
  { char: "T", color: "#d31f69", rotate: -2 },
  { char: "E", color: "#39cf35", rotate: 2 },
  { char: "R", color: "#ffdf22", rotate: -2 },

  { char: " ", color: "transparent", rotate: 0 },

  { char: "T", color: "#1caeaa", rotate: 3 },
  { char: "H", color: "#1265d8", rotate: -2 },
  { char: "E", color: "#f89d1c", rotate: 2 },

  { char: " ", color: "transparent", rotate: 0 },

  { char: "L", color: "#d31f69", rotate: -3 },
  { char: "A", color: "#39cf35", rotate: 2 },
  { char: "B", color: "#ffdf22", rotate: -2 },
];

const floatingAssetSettings = {
  starRainbow: {
    duration: 6.3,
    delay: -2.1,
    direction: "normal" as const,

    xA: "-7px",
    yA: "-5px",
    rotationA: "-0.8deg",

    xB: "5px",
    yB: "-17px",
    rotationB: "1.2deg",

    xC: "-3px",
    yC: "-10px",
    rotationC: "-0.4deg",

    xD: "4px",
    yD: "-3px",
    rotationD: "0.6deg",
  },

  books: {
    duration: 4.8,
    delay: -3.4,
    direction: "reverse" as const,

    xA: "8px",
    yA: "-9px",
    rotationA: "1.4deg",

    xB: "-5px",
    yB: "-15px",
    rotationB: "-1.1deg",

    xC: "4px",
    yC: "-4px",
    rotationC: "0.5deg",

    xD: "-3px",
    yD: "-11px",
    rotationD: "-0.7deg",
  },

  moon: {
    duration: 3.4,
    delay: -2.4,
    direction: "reverse" as const,

    xA: "11px",
    yA: "-7px",
    rotationA: "2.4deg",

    xB: "-6px",
    yB: "-20px",
    rotationB: "-1.7deg",

    xC: "7px",
    yC: "-13px",
    rotationC: "1deg",

    xD: "-3px",
    yD: "-4px",
    rotationD: "-0.9deg",
  },

  paperAirplane: {
    duration: 5.6,
    delay: -0.8,
    direction: "normal" as const,

    xA: "-8px",
    yA: "-11px",
    rotationA: "-1.5deg",

    xB: "6px",
    yB: "-18px",
    rotationB: "1deg",

    xC: "-4px",
    yC: "-6px",
    rotationC: "-0.6deg",

    xD: "3px",
    yD: "-14px",
    rotationD: "0.8deg",
  },

  atom: {
    duration: 3.9,
    delay: -1.1,
    direction: "normal" as const,

    xA: "-5px",
    yA: "-16px",
    rotationA: "-2deg",

    xB: "12px",
    yB: "-8px",
    rotationB: "2.5deg",

    xC: "4px",
    yC: "-21px",
    rotationC: "0.8deg",

    xD: "-8px",
    yD: "-5px",
    rotationD: "-1.3deg",
  },

  pc: {
    duration: 5.2,
    delay: -0.7,
    direction: "normal" as const,

    xA: "7px",
    yA: "-13px",
    rotationA: "0.8deg",

    xB: "-8px",
    yB: "-6px",
    rotationB: "-1.3deg",

    xC: "3px",
    yC: "-18px",
    rotationC: "0.4deg",

    xD: "9px",
    yD: "-4px",
    rotationD: "1.1deg",
  },

  ufo: {
    duration: 4.6,
    delay: -1.4,
    direction: "reverse" as const,

    xA: "-9px",
    yA: "-7px",
    rotationA: "-1deg",

    xB: "7px",
    yB: "-15px",
    rotationB: "1.5deg",

    xC: "-2px",
    yC: "-19px",
    rotationC: "-0.5deg",

    xD: "5px",
    yD: "-3px",
    rotationD: "0.9deg",
  },

  lab: {
    duration: 5.9,
    delay: -2.6,
    direction: "reverse" as const,

    xA: "5px",
    yA: "-17px",
    rotationA: "1.4deg",

    xB: "-9px",
    yB: "-8px",
    rotationB: "-1.7deg",

    xC: "7px",
    yC: "-13px",
    rotationC: "0.6deg",

    xD: "-4px",
    yD: "-3px",
    rotationD: "-0.8deg",
  },
} as const;

type FloatingAssetName = keyof typeof floatingAssetSettings;

function getFloatingAssetStyle(
  assetName: FloatingAssetName,
): FloatingAssetStyle {
  const settings = floatingAssetSettings[assetName];

  return {
    "--cool-stuff-asset-x-a": settings.xA,
    "--cool-stuff-asset-y-a": settings.yA,
    "--cool-stuff-asset-rotation-a": settings.rotationA,

    "--cool-stuff-asset-x-b": settings.xB,
    "--cool-stuff-asset-y-b": settings.yB,
    "--cool-stuff-asset-rotation-b": settings.rotationB,

    "--cool-stuff-asset-x-c": settings.xC,
    "--cool-stuff-asset-y-c": settings.yC,
    "--cool-stuff-asset-rotation-c": settings.rotationC,

    "--cool-stuff-asset-x-d": settings.xD,
    "--cool-stuff-asset-y-d": settings.yD,
    "--cool-stuff-asset-rotation-d": settings.rotationD,

    animationDuration: `${settings.duration}s`,
    animationDelay: `${settings.delay}s`,
    animationDirection: settings.direction,
  };
}

function EnterLabTitle() {
  return (
    <span aria-hidden="true" className={rc.introduction.enterTitle}>
      {enterLabLetters.map((letter, index) => {
        if (letter.char === " ") {
          return (
            <span
              key={`enter-lab-space-${index}`}
              className={rc.introduction.enterSpace}
            />
          );
        }

        const letterStyle: CSSProperties = {
          color: letter.color,
          transform: `rotate(${letter.rotate}deg)`,
          textShadow: `
            2px 2px 0 rgba(0, 0, 0, 0.16),
            4px 4px 0 rgba(0, 0, 0, 0.1),
            0 0 12px currentColor
          `,
        };

        return (
          <span
            key={`enter-lab-${index}`}
            className={rc.introduction.enterLetter}
            style={letterStyle}
          >
            {letter.char}
          </span>
        );
      })}
    </span>
  );
}

export default function Introduction() {
  return (
    <section
      aria-label="Cool Stuff"
      className={rc.introduction.section}
    >
      <div className={rc.introduction.contentRow}>
        {/* LEFT SIDE */}
        <div className={rc.introduction.leftColumn}>
          <div className={rc.introduction.leftContent}>
            <Image
              src="/website-icons/coolstuff.png"
              alt="Cool Stuff"
              width={1530}
              height={1100}
              priority
              draggable={false}
              className={rc.introduction.heroImage}
            />

            <a
              href="#lab-introduction"
              aria-label="Go to the Lab introduction"
              className={rc.introduction.enterLink}
            >
              <EnterLabTitle />

              <span
                aria-hidden="true"
                className={rc.introduction.enterArrow}
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT SIDE — RANDOMIZED MOVING PNGS */}
        <div
          className={rc.introduction.rightColumn}
          aria-hidden="true"
        >
          <div className={rc.introduction.assetStage}>
            {/* STAR RAINBOW */}
            <div className={rc.introduction.assets.starRainbow}>
              <Image
                src="/website-icons/starrainbow.png"
                alt=""
                width={1254}
                height={1254}
                className={rc.introduction.assetImage}
                style={getFloatingAssetStyle("starRainbow")}
                draggable={false}
                priority
              />
            </div>

            {/* BOOKS */}
            <div className={rc.introduction.assets.books}>
              <Image
                src="/website-icons/books.png"
                alt=""
                width={909}
                height={853}
                className={rc.introduction.assetImage}
                style={getFloatingAssetStyle("books")}
                draggable={false}
              />
            </div>

            {/* MOON */}
            <div className={rc.introduction.assets.moon}>
              <Image
                src="/website-icons/moon.png"
                alt=""
                width={674}
                height={1200}
                className={rc.introduction.assetImage}
                style={getFloatingAssetStyle("moon")}
                draggable={false}
              />
            </div>

            {/* PAPER AIRPLANE */}
            <div className={rc.introduction.assets.paperAirplane}>
              <Image
                src="/website-icons/paperairplane.png"
                alt=""
                width={1100}
                height={1100}
                className={rc.introduction.assetImage}
                style={getFloatingAssetStyle("paperAirplane")}
                draggable={false}
              />
            </div>

            {/* ATOM */}
            <div className={rc.introduction.assets.atom}>
              <Image
                src="/website-icons/atom.png"
                alt=""
                width={674}
                height={1200}
                className={rc.introduction.assetImage}
                style={getFloatingAssetStyle("atom")}
                draggable={false}
              />
            </div>

            {/* PC */}
            <div className={rc.introduction.assets.pc}>
              <Image
                src="/website-icons/pc.png"
                alt=""
                width={1255}
                height={994}
                className={rc.introduction.assetImage}
                style={getFloatingAssetStyle("pc")}
                draggable={false}
              />
            </div>

            {/* UFO */}
            <div className={rc.introduction.assets.ufo}>
              <Image
                src="/website-icons/ufo.png"
                alt=""
                width={823}
                height={699}
                className={rc.introduction.assetImage}
                style={getFloatingAssetStyle("ufo")}
                draggable={false}
              />
            </div>

            {/* LAB */}
            <div className={rc.introduction.assets.lab}>
              <Image
                src="/website-icons/lab.png"
                alt=""
                width={1100}
                height={1100}
                className={rc.introduction.assetImage}
                style={getFloatingAssetStyle("lab")}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}