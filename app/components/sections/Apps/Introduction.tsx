"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

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
    <span
      aria-hidden="true"
      className="
        inline-flex items-end
        font-[Arial_Black] font-black
        leading-none tracking-[-0.065em]
      "
    >
      {enterLabLetters.map((letter, index) => {
        if (letter.char === " ") {
          return (
            <span
              key={`enter-lab-space-${index}`}
              className="w-[0.34em] shrink-0"
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
            className="relative inline-block"
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
      className="
        relative z-10 flex min-h-[75svh] w-full
        items-center overflow-hidden bg-transparent
        py-10 sm:py-14 lg:py-16
      "
    >
      <div
        className="
          flex w-full translate-y-[35px] items-center
          sm:translate-y-[45px]
          lg:translate-y-[55px]
        "
      >
        {/* LEFT SIDE */}
        <div
          className="
            flex w-full items-center justify-start
            px-5
            lg:w-1/2 lg:pr-6
          "
        >
          <div className="w-full translate-x-[20%]">
            <Image
              src="/website-icons/coolstuff.png"
              alt="Cool Stuff"
              width={1530}
              height={1100}
              priority
              draggable={false}
              className="
                cool-stuff-float
                block h-auto w-full
                max-w-[760px]
                object-contain
                sm:max-w-[850px]
                lg:max-w-none
              "
            />

            <a
              href="#lab-introduction"
              aria-label="Go to the Lab introduction"
              className="
                group mt-3 inline-flex items-center gap-3
                text-[clamp(1.25rem,2.2vw,2.5rem)]
                no-underline
                transition-transform duration-200
                hover:translate-x-1
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[#1265d8]
                sm:mt-5
              "
            >
              <EnterLabTitle />

              <span
                aria-hidden="true"
                className="
                  inline-block text-[#1265d8]
                  transition-transform duration-200
                  group-hover:translate-x-2
                "
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT SIDE — RANDOMIZED MOVING PNGS */}
        <div
          className="
            relative hidden w-1/2 items-center justify-center
            px-5 lg:flex
          "
          aria-hidden="true"
        >
          <div className="relative min-h-[680px] w-full max-w-[650px]">
            {/* STAR RAINBOW — UPPER LEFT */}
            <div
              className="
                absolute left-[2%] top-[-4%] z-[1]
                w-[clamp(280px,25vw,420px)]
                rotate-[3deg]
              "
            >
              <Image
                src="/website-icons/starrainbow.png"
                alt=""
                width={1254}
                height={1254}
                className="
                  cool-stuff-asset-image
                  cool-stuff-asset-image--floating
                "
                style={getFloatingAssetStyle("starRainbow")}
                draggable={false}
                priority
              />
            </div>

            {/* BOOKS — UPPER RIGHT */}
            <div
              className="
                absolute right-[-3%] top-[2%] z-[2]
                w-[clamp(220px,19vw,320px)]
                rotate-[-7deg]
              "
            >
              <Image
                src="/website-icons/books.png"
                alt=""
                width={909}
                height={853}
                className="
                  cool-stuff-asset-image
                  cool-stuff-asset-image--floating
                "
                style={getFloatingAssetStyle("books")}
                draggable={false}
              />
            </div>

            {/* MOON — TOP CENTER */}
            <div
              className="
                absolute left-[43%] top-[1%] z-[6]
                w-[clamp(68px,5.95vw,102px)]
                rotate-[-14deg]
              "
            >
              <Image
                src="/website-icons/moon.png"
                alt=""
                width={674}
                height={1200}
                className="
                  cool-stuff-asset-image
                  cool-stuff-asset-image--floating
                "
                style={getFloatingAssetStyle("moon")}
                draggable={false}
              />
            </div>

            {/* PAPER AIRPLANE — TOP RIGHT */}
            <div
              className="
                absolute right-[20%] top-[10%] z-[4]
                w-[clamp(149px,13.6vw,225px)]
                rotate-[-8deg]
              "
            >
              <Image
                src="/website-icons/paperairplane.png"
                alt=""
                width={1100}
                height={1100}
                className="
                  cool-stuff-asset-image
                  cool-stuff-asset-image--floating
                "
                style={getFloatingAssetStyle("paperAirplane")}
                draggable={false}
              />
            </div>

            {/* ATOM — CENTER LEFT */}
            <div
              className="
                absolute left-[7%] top-[43%] z-[5]
                w-[clamp(80px,7vw,120px)]
                rotate-[12deg]
              "
            >
              <Image
                src="/website-icons/atom.png"
                alt=""
                width={674}
                height={1200}
                className="
                  cool-stuff-asset-image
                  cool-stuff-asset-image--floating
                "
                style={getFloatingAssetStyle("atom")}
                draggable={false}
              />
            </div>

            {/* PC — CENTER RIGHT */}
            <div
              className="
                absolute right-[8%] top-[28%] z-[3]
                w-[clamp(280px,24vw,400px)]
                rotate-[5deg]
              "
            >
              <Image
                src="/website-icons/pc.png"
                alt=""
                width={1255}
                height={994}
                className="
                  cool-stuff-asset-image
                  cool-stuff-asset-image--floating
                "
                style={getFloatingAssetStyle("pc")}
                draggable={false}
              />
            </div>

            {/* UFO — LOWER LEFT */}
            <div
              className="
                absolute bottom-[-3%] left-[-2%] z-[2]
                w-[clamp(270px,25vw,410px)]
                rotate-[-4deg]
              "
            >
              <Image
                src="/website-icons/ufo.png"
                alt=""
                width={823}
                height={699}
                className="
                  cool-stuff-asset-image
                  cool-stuff-asset-image--floating
                "
                style={getFloatingAssetStyle("ufo")}
                draggable={false}
              />
            </div>

            {/* LAB — LOWER RIGHT */}
            <div
              className="
                absolute bottom-[1%] right-[-3%] z-[4]
                w-[clamp(175px,16vw,265px)]
                rotate-[10deg]
              "
            >
              <Image
                src="/website-icons/lab.png"
                alt=""
                width={1100}
                height={1100}
                className="
                  cool-stuff-asset-image
                  cool-stuff-asset-image--floating
                "
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