"use client";

import type { CSSProperties } from "react";

type CrayonLetterData = {
  char: string;
  x: number;
  y: number;
  size: number;
  color: string;
  rotate?: number;
};

type EnterLabLetterData = {
  char: string;
  color: string;
  rotate: number;
};

type PixelFaceDefinition = {
  rows: string[];
};

type PixelFaceProps = PixelFaceDefinition & {
  index: number;
};

const titleLetters: CrayonLetterData[] = [
  {
    char: "C",
    x: 55,
    y: 500,
    size: 330,
    color: "#1657d9",
    rotate: -7,
  },
  {
    char: "O",
    x: 408,
    y: 510,
    size: 310,
    color: "#f28b17",
    rotate: 4,
  },
  {
    char: "O",
    x: 708,
    y: 500,
    size: 310,
    color: "#c51f63",
    rotate: -3,
  },
  {
    char: "L",
    x: 1053,
    y: 490,
    size: 320,
    color: "#f4cf19",
    rotate: 6,
  },
  {
    char: "S",
    x: 55,
    y: 900,
    size: 330,
    color: "#c51f63",
    rotate: -5,
  },
  {
    char: "T",
    x: 393,
    y: 890,
    size: 320,
    color: "#49df2d",
    rotate: 2,
  },
  {
    char: "U",
    x: 685,
    y: 900,
    size: 310,
    color: "#1657d9",
    rotate: -3,
  },
  {
    char: "F",
    x: 970,
    y: 890,
    size: 310,
    color: "#f28b17",
    rotate: 5,
  },
  {
    char: "F",
    x: 1188,
    y: 890,
    size: 300,
    color: "#19a9a2",
    rotate: 4,
  },
];

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

const pixelColorMap: Record<string, string> = {
  ".": "transparent",
  u: "#2a53f0",
  c: "#2cb8bc",
  g: "#18a645",
  l: "#b8ef99",
  y: "#f1d938",
  o: "#f6a22a",
  p: "#e33b8b",
  s: "#f1c9b2",
  b: "#4a2b1d",
  v: "#9d96e8",
  k: "#0a0a0a",
  w: "#ffffff",
  r: "#ff4c34",
  d: "#d9d2c0",
};

const pixelFaces: PixelFaceDefinition[] = [
  {
    rows: [
      "..uu....",
      ".uuuu...",
      ".sbbbu..",
      "sspwpkp.",
      "cccuupp.",
      ".cgggug.",
      ".gggggg.",
      ".ggggg..",
      "........",
      "........",
    ],
  },
  {
    rows: [
      "..llss..",
      ".lllssss",
      "lllcsssd",
      ".llckksd",
      ".llckksd",
      ".ggcvssp",
      ".ggcvssp",
      ".ggcvssp",
      "........",
      "........",
    ],
  },
  {
    rows: [
      "..uvbo..",
      ".uuvborr",
      "uuvbkorp",
      ".uubkwpc",
      ".uurbwpc",
      ".orbpwcc",
      ".orpvvcc",
      ".rrppccc",
      "........",
      "........",
    ],
  },
  {
    rows: [
      "..oooo..",
      ".oooooo.",
      ".obbbbb.",
      "vbbwbkbv",
      "vbbbbbbv",
      ".vbbbbbv",
      ".vvvvvv.",
      "..vvvv..",
      "........",
      "........",
    ],
  },
  {
    rows: [
      "..llly..",
      ".lllyyy.",
      ".llyyyy.",
      ".llyyyyo",
      ".llwkwwo",
      ".llyyyyo",
      ".lyyyyso",
      ".yyyyss.",
      "........",
      "........",
    ],
  },
  {
    rows: [
      "..vcccu.",
      ".ppprrcc",
      ".rrrroop",
      "bbbwbkkp",
      "ubbbbbb.",
      "uuuvvvv.",
      ".uuuuvv.",
      "..uuuu..",
      "........",
      "........",
    ],
  },
  {
    rows: [
      "..llly..",
      ".lllyyy.",
      ".llyyyy.",
      ".llyyyyo",
      ".lywkwwo",
      ".lyyyyyo",
      ".yyyyyso",
      ".yyyyss.",
      "........",
      "........",
    ],
  },
  {
    rows: [
      "..dvvccu",
      ".sspprrc",
      "ssoorrpp",
      "bbbwbkkp",
      "ubbbbbb.",
      "uuuvvvv.",
      ".uuuuvv.",
      "..uuuu..",
      "........",
      "........",
    ],
  },
  {
    rows: [
      "..gggcc.",
      ".gggcccc",
      ".gggcccc",
      ".gggcccc",
      "gggckkcc",
      "gggwkwcc",
      "gggccccp",
      ".ggcccc.",
      "........",
      "........",
    ],
  },
];

const faceAnimationSettings = [
  { duration: 3.6, delay: -0.4 },
  { duration: 4.1, delay: -1.8 },
  { duration: 3.3, delay: -2.2 },
  { duration: 4.4, delay: -0.9 },
  { duration: 3.8, delay: -2.7 },
  { duration: 4.2, delay: -1.3 },
  { duration: 3.5, delay: -2.9 },
  { duration: 4.5, delay: -0.6 },
  { duration: 3.9, delay: -2.1 },
];

const titlePixelColors = Array.from(
  new Set(titleLetters.map((letter) => letter.color)),
);

function getPixelPatternId(color: string) {
  return `intro-pixel-${color.replace("#", "")}`;
}

function CrayonLetter({
  char,
  x,
  y,
  size,
  color,
  rotate = 0,
}: CrayonLetterData) {
  const commonProps = {
    x,
    y,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fontSize: size,
    fontWeight: 900,
    fontFamily: '"Arial Black", Impact, sans-serif',
    transform: `rotate(${rotate} ${x} ${y})`,
  };

  return (
    <g>
      <text
        {...commonProps}
        stroke={color}
        strokeWidth={24}
        opacity={0.92}
        filter="url(#crayonRoughness)"
      >
        {char}
      </text>

      <text
        {...commonProps}
        x={x + 3}
        y={y - 2}
        stroke={color}
        strokeWidth={10}
        opacity={0.5}
        filter="url(#crayonRoughnessSmall)"
      >
        {char}
      </text>

      <text
        {...commonProps}
        x={x - 3}
        y={y + 3}
        stroke={color}
        strokeWidth={5}
        opacity={0.42}
      >
        {char}
      </text>

      <text
        {...commonProps}
        className="cool-stuff-pixel-overlay"
        stroke={`url(#${getPixelPatternId(color)})`}
        strokeWidth={19}
        strokeLinecap="square"
        strokeLinejoin="miter"
        shapeRendering="crispEdges"
      >
        {char}
      </text>
    </g>
  );
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

function PixelFace({ rows, index }: PixelFaceProps) {
  const columnCount = rows[0]?.length ?? 0;
  const cells = rows.flatMap((row) => row.split(""));
  const animation =
    faceAnimationSettings[index % faceAnimationSettings.length];

  const animationStyle: CSSProperties = {
    animationDuration: `${animation.duration}s`,
    animationDelay: `${animation.delay}s`,
    animationDirection: index % 2 === 0 ? "normal" : "reverse",
  };

  return (
    <div
      className="pixel-face-float relative bg-transparent p-0 shadow-none"
      style={animationStyle}
    >
      <div
        className="grid aspect-[4/5] w-full overflow-visible bg-transparent"
        style={{
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows.length}, minmax(0, 1fr))`,
          imageRendering: "pixelated",
        }}
      >
        {cells.map((cell, cellIndex) => (
          <div
            key={`${index}-${cellIndex}`}
            aria-hidden="true"
            style={{
              backgroundColor:
                pixelColorMap[cell] ?? "transparent",
            }}
          />
        ))}
      </div>
    </div>
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
        {/* LEFT HALF */}
        <div
          className="
            flex w-full items-center justify-start
            pl-5 pr-5
            lg:w-1/2 lg:pr-6
          "
        >
          <div className="w-full translate-x-[20%]">
            <svg
              viewBox="35 0 1530 1100"
              role="img"
              aria-labelledby="cool-stuff-title cool-stuff-description"
              className="
                cool-stuff-float
                block h-auto w-full
                max-w-[760px]
                sm:max-w-[850px]
                lg:max-w-none
              "
              preserveAspectRatio="xMinYMid meet"
            >
              <title id="cool-stuff-title">
                Cool Stuff
              </title>

              <desc id="cool-stuff-description">
                A colorful title drawn in a rough crayon and pixel
                style.
              </desc>

              <defs>
                <filter
                  id="crayonRoughness"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.018 0.15"
                    numOctaves="2"
                    seed="8"
                    result="noise"
                  />

                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="7"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>

                <filter
                  id="crayonRoughnessSmall"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.035 0.2"
                    numOctaves="2"
                    seed="14"
                    result="noise"
                  />

                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="4"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>

                {titlePixelColors.map((color) => (
                  <pattern
                    key={color}
                    id={getPixelPatternId(color)}
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="12"
                      height="12"
                      fill={color}
                      opacity="1"
                    />

                    <rect
                      x="12"
                      y="0"
                      width="12"
                      height="12"
                      fill={color}
                      opacity="0.58"
                    />

                    <rect
                      x="0"
                      y="12"
                      width="12"
                      height="12"
                      fill={color}
                      opacity="0.74"
                    />

                    <rect
                      x="12"
                      y="12"
                      width="12"
                      height="12"
                      fill={color}
                      opacity="0.9"
                    />

                    <path
                      d="M12 0V24 M0 12H24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.4"
                      opacity="0.28"
                    />
                  </pattern>
                ))}
              </defs>

              {/* COOL STUFF */}
              <g aria-hidden="true">
                {titleLetters.map((letter, index) => (
                  <CrayonLetter
                    key={`title-${index}`}
                    {...letter}
                  />
                ))}

                <CrayonLetter
                  char="!"
                  x={1360}
                  y={890}
                  size={300}
                  color="#d93872"
                  rotate={7}
                />
              </g>

              {/* DECORATIVE MARKS */}
              <g
                fill="none"
                strokeLinecap="round"
                filter="url(#crayonRoughnessSmall)"
                aria-hidden="true"
              >
                <path
                  d="M70 960 C380 920, 850 975, 1250 935"
                  stroke="#1657d9"
                  strokeWidth="14"
                />

                <path
                  d="M760 995 C930 945, 1090 960, 1210 1015"
                  stroke="#1657d9"
                  strokeWidth="12"
                />

                <path
                  d="M1210 1015 L1150 995 M1210 1015 L1165 1055"
                  stroke="#1657d9"
                  strokeWidth="12"
                />

                <path
                  d="M1220 225 L1250 155 M1280 240 L1340 175 M1320 270 L1395 230"
                  stroke="#1657d9"
                  strokeWidth="11"
                />

                <path
                  d="M95 665 L95 735 M60 700 L130 700 M70 675 L120 725 M120 675 L70 725"
                  stroke="#1657d9"
                  strokeWidth="9"
                />

                <path
                  d="M1320 970 L1320 1050 M1280 1010 L1360 1010 M1290 980 L1350 1040 M1350 980 L1290 1040"
                  stroke="#f4cf19"
                  strokeWidth="9"
                />

                <path
                  d="M1300 360 L1355 330 L1315 410 L1380 375"
                  stroke="#49df2d"
                  strokeWidth="13"
                />
              </g>
            </svg>

            {/* ENTER THE LAB */}
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

        {/* RIGHT HALF */}
        <div
          className="
            hidden w-1/2
            lg:flex lg:items-center lg:justify-center lg:px-5
          "
        >
          <div className="w-full max-w-[620px]">
            <div className="grid grid-cols-3 gap-3 xl:gap-4">
              {pixelFaces.map((face, index) => (
                <PixelFace
                  key={`pixel-face-${index}`}
                  rows={face.rows}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}