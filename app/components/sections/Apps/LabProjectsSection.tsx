"use client";

import Image from "next/image";
import Link from "next/link";
import type {
  ComponentType,
  CSSProperties,
  ReactNode,
} from "react";
import {
  ArrowUpRight,
  Database,
  Eye,
  FileScan,
  Gamepad2,
  House,
  LoaderPinwheel,
  Plus,
  Rocket,
} from "lucide-react";

import ThemedNavIcon from "@/app/components/template/theme/ThemedNavIcon";
import { useThemeGlow } from "@/app/components/template/layout/useThemeGlow";
import { useThemeMode } from "@/app/components/template/theme/ThemeProvider";

import "./lab-projects-section.css";

/* ========================================
   TYPES
======================================== */

type ProjectItem = {
  label: string;
  href: string;

  /*
   * icon and gif are optional because placeholder cards
   * do not need a real application visual yet.
   */
  icon?: ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;

  gif?: string;

  category: string;
  status: string;
  description: string;
  accent: string;
  featured?: boolean;
  placeholder?: boolean;
};

type ProjectCardStyle = CSSProperties & {
  "--project-accent": string;
  "--project-accent-soft": string;
  "--project-index": string;
};

type ProjectCardProps = {
  item: ProjectItem;
  index: number;

  /*
   * This glow value comes from LabProjectsSection.
   * ProjectCard receives it as a prop.
   */
  glow: ReturnType<typeof useThemeGlow>;
};

type TitleLetter = {
  char: string;
  color: string;
  rotation: number;
};

/* ========================================
   TITLE
======================================== */

const titleWords: TitleLetter[][] = [
  [
    {
      char: "L",
      color: "#1265d8",
      rotation: -3,
    },
    {
      char: "A",
      color: "#f89d1c",
      rotation: 2,
    },
    {
      char: "B",
      color: "#ffdf22",
      rotation: -2,
    },
  ],
  [
    {
      char: "P",
      color: "#1265d8",
      rotation: -3,
    },
    {
      char: "R",
      color: "#d31f69",
      rotation: 2,
    },
    {
      char: "O",
      color: "#39cf35",
      rotation: -2,
    },
    {
      char: "J",
      color: "#ffdf22",
      rotation: 2,
    },
    {
      char: "E",
      color: "#1caeaa",
      rotation: -3,
    },
    {
      char: "C",
      color: "#f89d1c",
      rotation: 2,
    },
    {
      char: "T",
      color: "#d31f69",
      rotation: -2,
    },
    {
      char: "S",
      color: "#39cf35",
      rotation: 3,
    },
  ],
];

/* ========================================
   PROJECT DATA
======================================== */

const projectItems: ProjectItem[] = [
  {
    label: "Background Remover",
    href: "/coolstuff/background_remover",
    icon: FileScan,
    gif: "/Gifs/portfolio.gif",
    category: "WEB APP",
    status: "LIVE",
    description:
      "Remove image backgrounds directly in the browser. Fast, private, and simple to use.",
    accent: "#1265d8",
    featured: true,
  },
  {
    label: "Pixelate",
    href: "/coolstuff/pixelate",
    icon: LoaderPinwheel,
    gif: "/Gifs/final.gif",
    category: "WEB APP",
    status: "LIVE",
    description:
      "Convert images into pixel-based compositions with custom sizing and visual controls.",
    accent: "#39cf35",
  },
  {
    label: "Theme Viewer",
    href: "/coolstuff/theme-lab",
    icon: Eye,
    gif: "/Gifs/themeviewer.gif",
    category: "THEME LAB",
    status: "EXPERIMENT",
    description:
      "Preview and compare the different visual themes used throughout the site.",
    accent: "#9c7cff",
  },
  {
    label: "JSON Thesis Dataset",
    href: "/coolstuff/thesis-paper-dataset",
    icon: Database,
    gif: "/Gifs/sdcard.gif",
    category: "DATASET",
    status: "ACTIVE",
    description:
      "Explore and inspect my structured thesis-paper dataset in JSON format.",
    accent: "#ffdf22",
  },
  {
    label: "Astronaut",
    href: "/coolstuff/Astronaut",
    icon: Rocket,
    gif: "/catridges/bronce.png",
    category: "CANVAS",
    status: "PROTOTYPE",
    description:
      "A small experiment involving space, pixels, motion, and curiosity.",
    accent: "#f89d1c",
  },
  {
    label: "Gameboy Portrait",
    href: "/coolstuff/gameboyprinter",
    icon: Gamepad2,
    gif: "/catridges/bronce.png",
    category: "WEB APP",
    status: "EXPERIMENT",
    description:
      "Turn photographs into portraits inspired by the original Game Boy printer.",
    accent: "#ff3ec2",
  },
  {
    label: "Home",
    href: "/",
    icon: House,
    gif: "/Gifs/mystar.gif",
    category: "LINK",
    status: "BASE",
    description:
      "Return to the main page and continue exploring the rest of the site.",
    accent: "#1caeaa",
  },

  /*
   * ==========================================================
   * EMPTY APP EXAMPLE 01
   *
   * Replace:
   * - label
   * - href
   * - category
   * - status
   * - description
   * - accent
   *
   * Add:
   * - icon
   * - gif
   *
   * Then remove:
   * placeholder: true
   * ==========================================================
   */
  {
    label: "New App Example 01",
    href: "/coolstuff/new-app-example-01",
    category: "NEW APP",
    status: "COMING SOON",
    description:
      "This is an empty project slot. Replace this text with the description of your new application.",
    accent: "#ff5f87",
    placeholder: true,
  },

  /*
   * ==========================================================
   * EMPTY APP EXAMPLE 02
   *
   * Replace:
   * - label
   * - href
   * - category
   * - status
   * - description
   * - accent
   *
   * Add:
   * - icon
   * - gif
   *
   * Then remove:
   * placeholder: true
   * ==========================================================
   */
  {
    label: "New App Example 02",
    href: "/coolstuff/new-app-example-02",
    category: "NEW APP",
    status: "COMING SOON",
    description:
      "This is another empty project slot. Replace this text when you add another application.",
    accent: "#69d9ff",
    placeholder: true,
  },
];

/* ========================================
   TITLE COMPONENT
======================================== */

function LabProjectsTitle() {
  return (
    <h2
      id="apps-heading"
      aria-label="Lab Projects"
      className="lab-projects__title"
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "flex-start",
        width: "fit-content",
        maxWidth: "100%",
      }}
    >
      {titleWords.map((word, wordIndex) => (
        <span
          key={`title-word-${wordIndex}`}
          aria-hidden="true"
          className={[
            "lab-projects__title-word",
            wordIndex === 1
              ? "lab-projects__title-word--projects"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            display: "flex",
            alignItems: "flex-end",
            width: "fit-content",
            maxWidth: "100%",
            whiteSpace: "nowrap",
            marginTop: wordIndex === 1 ? "0.06em" : 0,
            fontSize: wordIndex === 1 ? "0.82em" : "1em",
          }}
        >
          {word.map((letter, letterIndex) => (
            <span
              key={`title-letter-${wordIndex}-${letterIndex}`}
              className="lab-projects__title-letter"
              style={{
                color: letter.color,
                transform: `rotate(${letter.rotation}deg)`,
              }}
            >
              {letter.char}
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}

/* ========================================
   PROJECT CARD
======================================== */

function ProjectCard({
  item,
  index,
  glow,
}: ProjectCardProps) {
  const projectNumber = String(index + 1).padStart(
    2,
    "0",
  );

  const style: ProjectCardStyle = {
    "--project-accent": item.accent,
    "--project-accent-soft": `${item.accent}24`,
    "--project-index": `"${projectNumber}"`,
  };

  /*
   * ==========================================================
   * PROJECT VISUAL LOGIC
   *
   * This variable decides which child visual appears inside
   * .lab-project-card__visual.
   * ==========================================================
   */

  let projectVisual: ReactNode = null;

  if (item.placeholder) {
    /*
     * PLACEHOLDER CHILD:
     *
     * When placeholder is true, the card displays a Plus icon.
     * It does not use ThemedNavIcon yet.
     */
    projectVisual = (
      <Plus
        aria-hidden="true"
        size={58}
        strokeWidth={1.4}
        style={{
          position: "relative",
          zIndex: 2,
          color: item.accent,
          filter: `drop-shadow(
            0 0 10px ${item.accent}
          )`,
        }}
      />
    );
  } else if (item.icon && item.gif) {
    /*
     * REAL APP CHILD:
     *
     * The glow value originally came from LabProjectsSection.
     *
     * Flow:
     *
     * LabProjectsSection
     *       ↓
     * ProjectCard
     *       ↓
     * ThemedNavIcon
     */
    projectVisual = (
      <ThemedNavIcon
        label={item.label}
        icon={item.icon}
        gif={item.gif}
        glow={glow}
      />
    );
  }

  /*
   * Everything inside cardContent is a child of either:
   *
   * 1. <Link className="lab-project-card">
   * 2. <article className="lab-project-card">
   *
   * This allows CSS parent selectors such as:
   *
   * .lab-project-card:hover
   *   .lab-project-card__visual
   *
   * or:
   *
   * .lab-project-card--placeholder
   *   .lab-project-card__title
   */

  const cardContent: ReactNode = (
    <>
      <span
        className="lab-project-card__number"
        aria-hidden="true"
      >
        {projectNumber}
      </span>

      <span
        className="lab-project-card__accent"
        aria-hidden="true"
      />

      <span
        className="lab-project-card__spark"
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
        <span />
      </span>

      <div className="lab-project-card__meta">
        <span className="lab-project-card__category">
          {item.featured ? "FEATURED / " : ""}
          {item.category}
        </span>

        <span className="lab-project-card__status">
          <span
            className="lab-project-card__status-dot"
            aria-hidden="true"
          />

          {item.status}
        </span>
      </div>

      <div className="lab-project-card__body">
        <div className="lab-project-card__visual">
          <span
            className="lab-project-card__glow"
            aria-hidden="true"
          />

          {projectVisual}
        </div>

        <div className="lab-project-card__content">
          <h3 className="lab-project-card__title">
            {item.label}
          </h3>

          <p className="lab-project-card__description">
            {item.description}
          </p>
        </div>
      </div>

      <div className="lab-project-card__footer">
        <span>
          {item.placeholder
            ? "Empty slot"
            : item.href === "/"
              ? "Visit"
              : "Open"}
        </span>

        {!item.placeholder && (
          <ArrowUpRight
            className="lab-project-card__arrow"
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
      </div>
    </>
  );

  /*
   * Base parent class:
   * lab-project-card
   *
   * Optional parent modifier classes:
   * lab-project-card--featured
   * lab-project-card--placeholder
   */

  const className = [
    "lab-project-card",
    item.featured
      ? "lab-project-card--featured"
      : "",
    item.placeholder
      ? "lab-project-card--placeholder"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  /*
   * Placeholder cards use an article because they should
   * not navigate to a page yet.
   */

  if (item.placeholder) {
    return (
      <article
        style={style}
        className={className}
        aria-label={`${item.label}, empty project slot`}
      >
        {cardContent}
      </article>
    );
  }

  /*
   * Real application cards use a Link.
   */

  return (
    <Link
      href={item.href}
      style={style}
      className={className}
    >
      {cardContent}
    </Link>
  );
}

/* ========================================
   SECTION COMPONENT
======================================== */

export default function LabProjectsSection() {
  const { siteMode } = useThemeMode();

  /*
   * STEP 1:
   *
   * useThemeGlow calculates the glow value for the
   * currently active site theme.
   */

  const glow = useThemeGlow(siteMode);

  return (
    <section
      id="lab-projects"
      aria-labelledby="apps-heading"
      className="lab-projects"
    >
      <div
        className="lab-projects__background-grid"
        aria-hidden="true"
      />

      <div
        className="lab-projects__background-word"
        aria-hidden="true"
      >
        BUILDS
      </div>

      <div
        className="
          lab-projects__ambient
          lab-projects__ambient--one
        "
        aria-hidden="true"
      />

      <div
        className="
          lab-projects__ambient
          lab-projects__ambient--two
        "
        aria-hidden="true"
      />

      {/* =====================================
          DECORATIVE FLOATING PNG ASSETS
      ====================================== */}

      <div
        className="lab-projects__decorations"
        aria-hidden="true"
      >
        {/* USB */}

        <div
          className="
            lab-projects__decoration
            lab-projects__decoration--camera
          "
        >
          <Image
            src="/lab/lab-usb.png"
            alt=""
            width={1255}
            height={994}
            className="lab-projects__decoration-image"
            draggable={false}
          />
        </div>

        {/* HARD DRIVE */}

        <div
          className="
            lab-projects__decoration
            lab-projects__decoration--globe
          "
        >
          <Image
            src="/lab/lab-harddrive.png"
            alt=""
            width={1254}
            height={1254}
            className="lab-projects__decoration-image"
            draggable={false}
          />
        </div>

        {/* CHIP */}

        <div
          className="
            lab-projects__decoration
            lab-projects__decoration--pencils
          "
        >
          <Image
            src="/lab/lab-chip.jpg"
            alt=""
            width={1100}
            height={1100}
            className="lab-projects__decoration-image"
            draggable={false}
          />
        </div>

        {/* DOCUMENT */}

        <div
          className="
            lab-projects__decoration
            lab-projects__decoration--document
          "
        >
          <Image
            src="/lab/lab-document.png"
            alt=""
            width={909}
            height={853}
            className="lab-projects__decoration-image"
            draggable={false}
          />
        </div>

        {/* CURSOR */}

        <div
          className="
            lab-projects__decoration
            lab-projects__decoration--cursor
          "
        >
          <Image
            src="/lab/lab-cursor.png"
            alt=""
            width={674}
            height={1200}
            className="lab-projects__decoration-image"
            draggable={false}
          />
        </div>
      </div>

      <div className="lab-projects__inner">
        <header className="lab-projects__header">
          <div className="lab-projects__heading-group">
            <p className="lab-projects__eyebrow">
              KOYOTE PROJECT ARCHIVE
            </p>

            <LabProjectsTitle />

            <div
              className="lab-projects__underline"
              aria-hidden="true"
            >
              <span />
              <span />
            </div>
          </div>

          <div className="lab-projects__introduction">
            <p>
              A collection of small tools, apps, and
              experiments built to explore ideas, solve tiny
              problems, and see what happens.
            </p>

            <div
              className="lab-projects__process"
              aria-label="Lab process"
            >
              <span className="lab-projects__process--blue">
                TINKER
              </span>

              <i>•</i>

              <span className="lab-projects__process--orange">
                TEST
              </span>

              <i>•</i>

              <span className="lab-projects__process--pink">
                BREAK
              </span>

              <i>•</i>

              <span className="lab-projects__process--green">
                REBUILD
              </span>
            </div>

            <div
              className="lab-projects__header-arrow"
              aria-hidden="true"
            >
              <span className="lab-projects__header-arrow-line" />

              <span className="lab-projects__header-arrow-head" />
            </div>
          </div>
        </header>

        <nav
          aria-label="Laboratory projects"
          className="lab-projects__nav"
        >
          <div className="lab-projects__grid">
            {/*
             * STEP 2:
             *
             * map() creates one ProjectCard child for every
             * object inside projectItems.
             */}

            {projectItems.map((item, index) => (
              <ProjectCard
                key={`${item.label}-${index}`}
                item={item}
                index={index}

                /*
                 * STEP 3:
                 *
                 * The parent LabProjectsSection passes glow
                 * into the child ProjectCard.
                 */
                glow={glow}
              />
            ))}
          </div>
        </nav>

        <div className="lab-projects__note">
          <span
            className="lab-projects__note-icon"
            aria-hidden="true"
          >
            ⚗
          </span>

          <p>
            New ideas. Small builds. Frequent experiments.

            <strong>
              This lab is always open.
            </strong>
          </p>

          <span
            className="lab-projects__note-spark"
            aria-hidden="true"
          >
            ✦
          </span>
        </div>
      </div>
    </section>
  );
}