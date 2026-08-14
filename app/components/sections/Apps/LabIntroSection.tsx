"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

import "./lab-intro-section.css";

const processSteps = ["TINKER", "TEST", "BREAK", "REBUILD"];

type TileLetterProps = {
  children: string;
  color: string;
  rotation?: number;
};

type ExploreLetterData = {
  char: string;
  color: string;
  rotation: number;
};

const exploreLetters: ExploreLetterData[] = [
  { char: "E", color: "#ff3ec2", rotation: -3 },
  { char: "X", color: "#39cf35", rotation: 2 },
  { char: "P", color: "#ffdf22", rotation: -2 },
  { char: "L", color: "#1265d8", rotation: 3 },
  { char: "O", color: "#f89d1c", rotation: -2 },
  { char: "R", color: "#1caeaa", rotation: 2 },
  { char: "E", color: "#d31f69", rotation: -3 },

  { char: " ", color: "transparent", rotation: 0 },

  { char: "W", color: "#ffdf22", rotation: 2 },
  { char: "H", color: "#1265d8", rotation: -2 },
  { char: "A", color: "#39cf35", rotation: 3 },
  { char: "T", color: "#f89d1c", rotation: -2 },

  { char: " ", color: "transparent", rotation: 0 },

  { char: "I", color: "#d31f69", rotation: 2 },

  { char: " ", color: "transparent", rotation: 0 },

  { char: "H", color: "#1caeaa", rotation: -2 },
  { char: "A", color: "#ff3ec2", rotation: 3 },
  { char: "V", color: "#ffdf22", rotation: -3 },
  { char: "E", color: "#1265d8", rotation: 2 },

  { char: " ", color: "transparent", rotation: 0 },

  { char: "B", color: "#39cf35", rotation: -2 },
  { char: "U", color: "#f89d1c", rotation: 3 },
  { char: "I", color: "#d31f69", rotation: -2 },
  { char: "L", color: "#1caeaa", rotation: 2 },
  { char: "T", color: "#ffdf22", rotation: -3 },
];

function TileLetter({
  children,
  color,
  rotation = 0,
}: TileLetterProps) {
  const style = {
    "--tile-color": color,
    "--tile-rotation": `${rotation}deg`,
  } as CSSProperties;

  return (
    <span className="lab-tile-letter" style={style}>
      {children}
    </span>
  );
}

function ExploreBuildsLink() {
  return (
    <a
      href="#lab-projects"
      aria-label="Explore what I have built"
      className="
        group mt-8 inline-flex max-w-full items-center gap-3
        no-underline transition-transform duration-200
        hover:translate-x-1
        focus-visible:rounded-sm
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#ffdf22]
      "
    >
      <span
        aria-hidden="true"
        className="
          inline-flex max-w-full flex-wrap items-end
          font-[Arial_Black] text-[clamp(1.1rem,1.7vw,1.75rem)]
          font-black leading-[1.15] tracking-[-0.055em]
        "
      >
        {exploreLetters.map((letter, index) => {
          if (letter.char === " ") {
            return (
              <span
                key={`explore-space-${index}`}
                className="w-[0.38em] shrink-0"
              />
            );
          }

          const letterStyle: CSSProperties = {
            color: letter.color,
            transform: `rotate(${letter.rotation}deg)`,
            textShadow: `
              2px 2px 0 rgba(0, 0, 0, 0.18),
              4px 4px 0 rgba(0, 0, 0, 0.10),
              0 0 10px currentColor
            `,
          };

          return (
            <span
              key={`explore-letter-${index}`}
              className="
                relative inline-block origin-bottom
                transition-transform duration-200
                group-hover:-translate-y-0.5
              "
              style={letterStyle}
            >
              {letter.char}
            </span>
          );
        })}
      </span>

      <span
        aria-hidden="true"
        className="
          inline-block shrink-0
          font-[Arial_Black] text-[clamp(1.4rem,2vw,2rem)]
          font-black leading-none text-[#ff3ec2]
          transition-transform duration-200
          group-hover:translate-x-2
        "
        style={{
          textShadow:
            "2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 10px rgba(255, 62, 194, 0.5)",
        }}
      >
        →
      </span>
    </a>
  );
}

export default function LabIntroSection() {
  return (
    <section
      className="lab-intro"
      aria-labelledby="lab-intro-title"
    >
      <div className="lab-intro__content">
        {/* LEFT SIDE — TEXT */}
        <div className="lab-intro__copy">
          <h2
            id="lab-intro-title"
            className="lab-intro__title"
          >
            <span className="lab-intro__title-row">
              <TileLetter color="#1265d8" rotation={-3}>
                T
              </TileLetter>

              <TileLetter color="#f89d1c" rotation={2}>
                H
              </TileLetter>

              <TileLetter color="#d31f69" rotation={-2}>
                E
              </TileLetter>
            </span>

            <span className="lab-intro__title-row lab-intro__title-row--lab">
              <TileLetter color="#39cf35" rotation={2}>
                L
              </TileLetter>

              <TileLetter color="#ffdf22" rotation={-2}>
                A
              </TileLetter>

              <TileLetter color="#1caeaa" rotation={3}>
                B
              </TileLetter>
            </span>
          </h2>

          <div
            className="lab-intro__underline"
            aria-hidden="true"
          >
            <span />
            <span />
          </div>

          <p className="lab-intro__description">
            The Lab is where I make small tools, apps, visual
            experiments, prototypes, and other things that begin
            with curiosity rather than a finished plan.
          </p>

          <p className="lab-intro__description lab-intro__description--secondary">
            Tinkering means learning through making: testing an
            idea, changing it, breaking it, and rebuilding it until
            something interesting appears.
          </p>

          <div
            className="lab-intro__process"
            aria-label="Tinkering process"
          >
            {processSteps.map((step, index) => (
              <div
                className="lab-intro__process-item"
                key={step}
              >
                <span className="lab-intro__process-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>{step}</span>
              </div>
            ))}
          </div>

          {/* COLORFUL PROJECT LINK */}
          <ExploreBuildsLink />
        </div>

        {/* RIGHT SIDE — PNG COMPOSITION */}
        <div
          className="lab-intro__visual"
          aria-hidden="true"
        >
          {/* CAMERA */}
          <div className="lab-intro__asset lab-intro__asset--camera">
            <Image
              src="/lab/lab-camera.png"
              alt=""
              width={1255}
              height={994}
              className="lab-intro__asset-image"
              draggable={false}
            />
          </div>

          {/* GLOBE */}
          <div className="lab-intro__asset lab-intro__asset--globe">
            <Image
              src="/lab/lab-globe.png"
              alt=""
              width={1254}
              height={1254}
              className="lab-intro__asset-image"
              draggable={false}
              priority
            />
          </div>

          {/* TOOLS / TINKERING GRAPHIC */}
          <div className="lab-intro__asset lab-intro__asset--tools">
            <Image
              src="/lab/lab-tools.png"
              alt=""
              width={823}
              height={699}
              className="lab-intro__asset-image"
              draggable={false}
            />
          </div>

          {/* PENCIL CUP */}
          <div className="lab-intro__asset lab-intro__asset--pencilcup">
            <Image
              src="/lab/lab-pencilcup.png"
              alt=""
              width={1100}
              height={1100}
              className="lab-intro__asset-image"
              draggable={false}
            />
          </div>

          {/* CURSOR */}
          <div className="lab-intro__asset lab-intro__asset--cursor">
            <Image
              src="/lab/lab-cursor.png"
              alt=""
              width={674}
              height={1200}
              className="lab-intro__asset-image"
              draggable={false}
            />
          </div>

          {/* DOCUMENT */}
          <div className="lab-intro__asset lab-intro__asset--document">
            <Image
              src="/lab/lab-document.png"
              alt=""
              width={909}
              height={853}
              className="lab-intro__asset-image"
              draggable={false}
            />
          </div>

          {/* DECORATIVE WORDS */}
          <div className="lab-intro__word lab-intro__word--build">
            BUILD
          </div>

          <div className="lab-intro__word lab-intro__word--again">
            AGAIN!
          </div>

          {/* DECORATIVE SPARK */}
          <div className="lab-doodle lab-doodle--spark">
            <span />
            <span />
            <span />
            <span />
          </div>

          {/* DECORATIVE MOTION LINES */}
          <div className="lab-doodle lab-doodle--motion">
            <span />
            <span />
            <span />
          </div>

          {/* DECORATIVE ARROW */}
          <div className="lab-doodle lab-doodle--arrow">
            <span className="lab-doodle__arrow-line" />
            <span className="lab-doodle__arrow-head" />
          </div>
        </div>
      </div>
    </section>
  );
}