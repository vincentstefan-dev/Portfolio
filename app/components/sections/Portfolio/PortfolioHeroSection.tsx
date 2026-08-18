"use client";

import { type CSSProperties, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, UserRound } from "lucide-react";

import { LOGO_BANK } from "@/app/components/template/theme/LOGO_BANK";
import ProjectCarousel from "@/app/components/sections/Portfolio/ProjectCarousel";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";
import "./neon-hero-decorations.css";

type PngPosition = {
  left: string;
  top: string;
  width: string;
  rotation: string;
};

type DecorativePngConfig = {
  id: string;
  src: string;
  mobile: PngPosition;
  small: PngPosition;
  medium: PngPosition;
  large: PngPosition;
};

type PngCssVariables = CSSProperties & {
  [key: `--${string}`]: string | number;
};

/*
|--------------------------------------------------------------------------
| PNG POSITION SETTINGS
|--------------------------------------------------------------------------
|
| left:
|   Higher value = move right
|   Lower value = move left
|
| top:
|   Higher value = move down
|   Lower value = move up
|
| width:
|   Higher value = make larger
|   Lower value = make smaller
|
| rotation:
|   Positive value = clockwise
|   Negative value = counterclockwise
|
*/

const decorativePngs: DecorativePngConfig[] = [
  /*
  |--------------------------------------------------------------------------
  | PNG 1 — FIRESTAR, TOP-LEFT
  |--------------------------------------------------------------------------
  */

  {
    id: "bluestarthingy-top",
    src: "/website-icons/bluestarthingy.png",

    mobile: {
      left: "8%",
      top: "7%",
      width: "72px",
      rotation: "-6deg",
    },

    small: {
      left: "6%",
      top: "5%",
      width: "90px",
      rotation: "-6deg",
    },

    medium: {
      left: "4%",
      top: "3%",
      width: "108px",
      rotation: "-6deg",
    },

    large: {
      left: "2%",
      top: "-2%",
      width: "175px",
      rotation: "-6deg",
    },
  },

  /*
  |--------------------------------------------------------------------------
  | PNG 2 — STAR THING, BOTTOM-RIGHT
  |--------------------------------------------------------------------------
  */

  {
    id: "star-thing-bottom",
    src: "/website-icons/star%20thing.png",

    mobile: {
      left: "54%",
      top: "72%",
      width: "76px",
      rotation: "6deg",
    },

    small: {
      left: "60%",
      top: "74%",
      width: "94px",
      rotation: "6deg",
    },

    medium: {
      left: "66%",
      top: "76%",
      width: "112px",
      rotation: "6deg",
    },

    large: {
      left: "72%",
      top: "78%",
      width: "130px",
      rotation: "6deg",
    },
  },

  /*
  |--------------------------------------------------------------------------
  | PNG 3 — FIRESTAR, OUTSIDE LEFT
  |--------------------------------------------------------------------------
  */

  {
    id: "bluestarthingy-left",
    src: "/website-icons/bluestarthingy.png",

    mobile: {
      left: "-8%",
      top: "40%",
      width: "62px",
      rotation: "-12deg",
    },

    small: {
      left: "-15%",
      top: "39%",
      width: "76px",
      rotation: "-12deg",
    },

    medium: {
      left: "-25%",
      top: "38%",
      width: "90px",
      rotation: "-12deg",
    },

    large: {
      left: "-47%",
      top: "37%",
      width: "200px",
      rotation: "-12deg",
    },
  },

  /*
  |--------------------------------------------------------------------------
  | PNG 4 — STAR THING, OUTSIDE RIGHT
  |--------------------------------------------------------------------------
  */

  {
    id: "star-thing-right",
    src: "/website-icons/star%20thing.png",

    mobile: {
      left: "88%",
      top: "18%",
      width: "62px",
      rotation: "12deg",
    },

    small: {
      left: "96%",
      top: "17%",
      width: "76px",
      rotation: "12deg",
    },

    medium: {
      left: "105%",
      top: "16%",
      width: "90px",
      rotation: "12deg",
    },

    large: {
      left: "115%",
      top: "15%",
      width: "105px",
      rotation: "12deg",
    },
  },
];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randomDirection(min: number, max: number) {
  const distance = randomBetween(min, max);
  return Math.random() < 0.5 ? -distance : distance;
}

function createRandomMotion(): PngCssVariables {
  return {
    "--png-x-1": `${randomDirection(3, 10).toFixed(1)}px`,
    "--png-y-1": `${randomDirection(3, 12).toFixed(1)}px`,
    "--png-rotate-1": `${randomDirection(1, 4).toFixed(1)}deg`,

    "--png-x-2": `${randomDirection(5, 15).toFixed(1)}px`,
    "--png-y-2": `${randomDirection(5, 17).toFixed(1)}px`,
    "--png-rotate-2": `${randomDirection(2, 6).toFixed(1)}deg`,

    "--png-x-3": `${randomDirection(3, 12).toFixed(1)}px`,
    "--png-y-3": `${randomDirection(3, 14).toFixed(1)}px`,
    "--png-rotate-3": `${randomDirection(1, 5).toFixed(1)}deg`,

    "--png-duration": `${randomBetween(5.5, 10).toFixed(2)}s`,
    "--png-delay": `-${randomBetween(0, 8).toFixed(2)}s`,
  };
}

export default function NeonHero() {
  const [activeLogo, setActiveLogo] = useState(LOGO_BANK[0]);

  useEffect(() => {
    const totalWeight = LOGO_BANK.reduce((sum, logo) => {
      return sum + (logo.weight ?? 1);
    }, 0);

    let random = Math.random() * totalWeight;

    for (const logo of LOGO_BANK) {
      random -= logo.weight ?? 1;

      if (random <= 0) {
        setActiveLogo(logo);
        return;
      }
    }

    setActiveLogo(LOGO_BANK[0]);
  }, []);

  return (
    <section className={rc.neonHero.section}>
      <div className={rc.neonHero.background}>
        <div className={rc.neonHero.grid} />

        <GlowDot className="left-[34%] top-[23%]" />
        <GlowDot className="left-[28%] top-[64%]" />
        <GlowDot className="right-[22%] top-[49%]" />
      </div>

      <Link href="/portfolio" className={rc.neonHero.logoLink}>
        <img
          src={activeLogo.src}
          alt={activeLogo.alt}
          className={`${rc.neonHero.logoImage} ${activeLogo.glow}`}
          style={{
            opacity: activeLogo.opacity,
          }}
        />
      </Link>

      <main className={rc.neonHero.main}>
        <div className={rc.neonHero.layout}>
          <div className={rc.neonHero.textBlock}>
            <h1 className={rc.neonHero.title}>
              <span className={rc.neonHero.titleWordOne}>Portfolio:</span>
              <span className={rc.neonHero.titleWordTwo}>Projects</span>
              <span className={rc.neonHero.titleWordThree}>Brands</span>
              <span className={rc.neonHero.titleWordFour}>Codes</span>
            </h1>

            <div className={rc.neonHero.introWrap}>
              <div className={rc.neonHero.introLine}>
                <span className={rc.neonHero.introStar}>✦</span>
              </div>

              <p className={rc.neonHero.introText}>
                HI 🥳! Here you can explore my professional projects:
                highlights, client work, and deeper looks into the research,
                building, and production behind each piece. I hope it gives you
                a clear sense of what we can create together.
              </p>
            </div>

            <div className={rc.neonHero.ctaWrap}>
              <Link href="#portfolio-index" className={rc.neonHero.primaryCta}>
                View all projects
                <ArrowUpRight className={rc.neonHero.ctaIcon} />
              </Link>

              <Link href="/aboutme" className={rc.neonHero.secondaryCta}>
                About Me
                <UserRound className={rc.neonHero.aboutIcon} />
              </Link>
            </div>
          </div>

          <div className="relative isolate overflow-visible">
            {decorativePngs.map((png) => (
              <DecorativePng key={png.id} config={png} />
            ))}

            <div className="relative z-10">
              <ProjectCarousel />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

function DecorativePng({
  config,
}: {
  config: DecorativePngConfig;
}) {
  const [motionStyle, setMotionStyle] =
    useState<PngCssVariables | null>(null);

  useEffect(() => {
    setMotionStyle(createRandomMotion());
  }, []);

  const pngStyle: PngCssVariables = {
    "--png-mobile-left": config.mobile.left,
    "--png-mobile-top": config.mobile.top,
    "--png-mobile-width": config.mobile.width,
    "--png-mobile-rotation": config.mobile.rotation,

    "--png-small-left": config.small.left,
    "--png-small-top": config.small.top,
    "--png-small-width": config.small.width,
    "--png-small-rotation": config.small.rotation,

    "--png-medium-left": config.medium.left,
    "--png-medium-top": config.medium.top,
    "--png-medium-width": config.medium.width,
    "--png-medium-rotation": config.medium.rotation,

    "--png-large-left": config.large.left,
    "--png-large-top": config.large.top,
    "--png-large-width": config.large.width,
    "--png-large-rotation": config.large.rotation,

    /*
    |--------------------------------------------------------------------------
    | DEFAULT MOVEMENT BEFORE RANDOM VALUES LOAD
    |--------------------------------------------------------------------------
    */

    "--png-x-1": "4px",
    "--png-y-1": "-6px",
    "--png-rotate-1": "2deg",

    "--png-x-2": "-7px",
    "--png-y-2": "-12px",
    "--png-rotate-2": "-3deg",

    "--png-x-3": "3px",
    "--png-y-3": "-5px",
    "--png-rotate-3": "1deg",

    "--png-duration": "7s",
    "--png-delay": "0s",

    ...motionStyle,
  };

  return (
    <img
      src={config.src}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={pngStyle}
      className={`decorative-png ${
        motionStyle ? "decorative-png--ready" : ""
      }`}
    />
  );
}

function GlowDot({
  className = "",
}: {
  className?: string;
}) {
  return <span className={`${rc.neonHero.glowDot} ${className}`} />;
}