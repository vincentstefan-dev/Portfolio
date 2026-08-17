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

import { useThemeGlow } from "@/app/components/template/layout/useThemeGlow";
import ThemedNavIcon from "@/app/components/template/theme/ThemedNavIcon";
import { useThemeMode } from "@/app/components/template/theme/ThemeProvider";

import { coolstuffRc as rc } from "@/app/coolstuff/coolstuffResponsiveConfig";

import "./lab-projects-section.css";

/* ========================================
   TYPES
======================================== */

type ProjectItem = {
  label: string;
  href: string;

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
  glow: ReturnType<typeof useThemeGlow>;
};

type TitleLetter = {
  char: string;
  color: string;
  rotation: number;
};

/* ========================================
   CLASS NAME HELPER
======================================== */

/*
 * Removes accidental leading, trailing, or repeated whitespace.
 *
 * This keeps the server-rendered and client-rendered className
 * attributes identical during hydration.
 */
function classNames(
  ...values: Array<string | false | null | undefined>
): string {
  return values
    .filter(
      (
        value,
      ): value is string => typeof value === "string" && value.length > 0,
    )
    .map((value) => value.trim().replace(/\s+/g, " "))
    .filter(Boolean)
    .join(" ");
}

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
      className={classNames(rc.labProjects.header.title)}
    >
      {titleWords.map((word, wordIndex) => {
        const wordClassName = classNames(
          rc.labProjects.header.titleWord,
          wordIndex === 1
            ? rc.labProjects.header.titleWordProjects
            : rc.labProjects.header.titleWordLab,
        );

        return (
          <span
            key={`title-word-${wordIndex}`}
            aria-hidden="true"
            className={wordClassName}
          >
            {word.map((letter, letterIndex) => (
              <span
                key={`title-letter-${wordIndex}-${letterIndex}`}
                className={classNames(
                  rc.labProjects.header.titleLetter,
                )}
                style={{
                  color: letter.color,
                  transform: `rotate(${letter.rotation}deg)`,
                }}
              >
                {letter.char}
              </span>
            ))}
          </span>
        );
      })}
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
  const projectNumber = String(index + 1).padStart(2, "0");

  const style: ProjectCardStyle = {
    "--project-accent": item.accent,
    "--project-accent-soft": `${item.accent}24`,
    "--project-index": `"${projectNumber}"`,
  };

  let projectVisual: ReactNode = null;

  if (item.placeholder) {
    projectVisual = (
      <Plus
        aria-hidden="true"
        className={classNames(
          rc.labProjects.card.placeholderIcon,
        )}
        strokeWidth={1.4}
        style={{
          color: item.accent,
          filter: `drop-shadow(0 0 10px ${item.accent})`,
        }}
      />
    );
  } else if (item.icon && item.gif) {
    projectVisual = (
      <ThemedNavIcon
        label={item.label}
        icon={item.icon}
        gif={item.gif}
        glow={glow}
      />
    );
  }

  const cardContent: ReactNode = (
    <>
      <span
        className={classNames(rc.labProjects.card.number)}
        aria-hidden="true"
      >
        {projectNumber}
      </span>

      <span
        className={classNames(rc.labProjects.card.accent)}
        aria-hidden="true"
      />

      <span
        className={classNames(rc.labProjects.card.spark)}
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
        <span />
      </span>

      <div className={classNames(rc.labProjects.card.meta)}>
        <span
          className={classNames(rc.labProjects.card.category)}
        >
          {item.featured ? "FEATURED / " : ""}
          {item.category}
        </span>

        <span
          className={classNames(rc.labProjects.card.status)}
        >
          <span
            className={classNames(
              rc.labProjects.card.statusDot,
            )}
            aria-hidden="true"
          />

          {item.status}
        </span>
      </div>

      <div className={classNames(rc.labProjects.card.body)}>
        <div className={classNames(rc.labProjects.card.visual)}>
          <span
            className={classNames(rc.labProjects.card.glow)}
            aria-hidden="true"
          />

          {projectVisual}
        </div>

        <div
          className={classNames(rc.labProjects.card.content)}
        >
          <h3
            className={classNames(rc.labProjects.card.title)}
          >
            {item.label}
          </h3>

          <p
            className={classNames(
              rc.labProjects.card.description,
            )}
          >
            {item.description}
          </p>
        </div>
      </div>

      <div className={classNames(rc.labProjects.card.footer)}>
        <span>
          {item.placeholder
            ? "Empty slot"
            : item.href === "/"
              ? "Visit"
              : "Open"}
        </span>

        {!item.placeholder && (
          <ArrowUpRight
            className={classNames(
              rc.labProjects.card.arrow,
            )}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
      </div>
    </>
  );

  const projectCardClassName = classNames(
    rc.labProjects.card.base,
    item.featured && rc.labProjects.card.featured,
    item.placeholder && rc.labProjects.card.placeholder,
  );

  if (item.placeholder) {
    return (
      <article
        style={style}
        className={projectCardClassName}
        aria-label={`${item.label}, empty project slot`}
      >
        {cardContent}
      </article>
    );
  }

  return (
    <Link
      href={item.href}
      style={style}
      className={projectCardClassName}
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
  const glow = useThemeGlow(siteMode);

  return (
    <section
      id="lab-projects"
      aria-labelledby="apps-heading"
      className={classNames(rc.labProjects.section)}
    >
      <div
        className={classNames(
          rc.labProjects.background.grid,
        )}
        aria-hidden="true"
      />

      <div
        className={classNames(
          rc.labProjects.background.word,
        )}
        aria-hidden="true"
      >
        BUILDS
      </div>

      <div
        className={classNames(
          rc.labProjects.background.ambientOne,
        )}
        aria-hidden="true"
      />

      <div
        className={classNames(
          rc.labProjects.background.ambientTwo,
        )}
        aria-hidden="true"
      />

      {/* =====================================
          DECORATIVE FLOATING PNG ASSETS
      ====================================== */}

      <div
        className={classNames(
          rc.labProjects.decorations.wrapper,
        )}
        aria-hidden="true"
      >
        {/* USB */}
        <div
          className={classNames(
            rc.labProjects.decorations.usb,
          )}
        >
          <Image
            src="/lab/lab-usb.png"
            alt=""
            width={1255}
            height={994}
            className={classNames(
              rc.labProjects.decorations.image,
            )}
            draggable={false}
          />
        </div>

        {/* HARD DRIVE */}
        <div
          className={classNames(
            rc.labProjects.decorations.hardDrive,
          )}
        >
          <Image
            src="/lab/lab-harddrive.png"
            alt=""
            width={1254}
            height={1254}
            className={classNames(
              rc.labProjects.decorations.image,
            )}
            draggable={false}
          />
        </div>

        {/* CHIP */}
        <div
          className={classNames(
            rc.labProjects.decorations.chip,
          )}
        >
          <Image
            src="/lab/lab-chip.jpg"
            alt=""
            width={1100}
            height={1100}
            className={classNames(
              rc.labProjects.decorations.image,
            )}
            draggable={false}
          />
        </div>

        {/* DOCUMENT */}
        <div
          className={classNames(
            rc.labProjects.decorations.document,
          )}
        >
          <Image
            src="/lab/lab-document.png"
            alt=""
            width={909}
            height={853}
            className={classNames(
              rc.labProjects.decorations.image,
            )}
            draggable={false}
          />
        </div>

        {/* CURSOR */}
        <div
          className={classNames(
            rc.labProjects.decorations.cursor,
          )}
        >
          <Image
            src="/lab/lab-cursor.png"
            alt=""
            width={674}
            height={1200}
            className={classNames(
              rc.labProjects.decorations.image,
            )}
            draggable={false}
          />
        </div>
      </div>

      <div className={classNames(rc.labProjects.inner)}>
        <header
          className={classNames(
            rc.labProjects.header.wrapper,
          )}
        >
          <div
            className={classNames(
              rc.labProjects.header.headingGroup,
            )}
          >
            <p
              className={classNames(
                rc.labProjects.header.eyebrow,
              )}
            >
              KOYOTE PROJECT ARCHIVE
            </p>

            <LabProjectsTitle />

            <div
              className={classNames(
                rc.labProjects.header.underline,
              )}
              aria-hidden="true"
            >
              <span />
              <span />
            </div>
          </div>

          <div
            className={classNames(
              rc.labProjects.header.introduction,
            )}
          >
            <p>
              A collection of small tools, apps, and experiments
              built to explore ideas, solve tiny problems, and see
              what happens.
            </p>

            <div
              className={classNames(
                rc.labProjects.header.process,
              )}
              aria-label="Lab process"
            >
              <span
                className={classNames(
                  rc.labProjects.header.processBlue,
                )}
              >
                TINKER
              </span>

              <i aria-hidden="true">•</i>

              <span
                className={classNames(
                  rc.labProjects.header.processOrange,
                )}
              >
                TEST
              </span>

              <i aria-hidden="true">•</i>

              <span
                className={classNames(
                  rc.labProjects.header.processPink,
                )}
              >
                BREAK
              </span>

              <i aria-hidden="true">•</i>

              <span
                className={classNames(
                  rc.labProjects.header.processGreen,
                )}
              >
                REBUILD
              </span>
            </div>

            <div
              className={classNames(
                rc.labProjects.header.arrow,
              )}
              aria-hidden="true"
            >
              <span
                className={classNames(
                  rc.labProjects.header.arrowLine,
                )}
              />

              <span
                className={classNames(
                  rc.labProjects.header.arrowHead,
                )}
              />
            </div>
          </div>
        </header>

        <nav
          aria-label="Laboratory projects"
          className={classNames(
            rc.labProjects.projects.nav,
          )}
        >
          <div
            className={classNames(
              rc.labProjects.projects.grid,
            )}
          >
            {projectItems.map((item, index) => (
              <ProjectCard
                key={`${item.label}-${index}`}
                item={item}
                index={index}
                glow={glow}
              />
            ))}
          </div>
        </nav>

        <div
          className={classNames(
            rc.labProjects.note.wrapper,
          )}
        >
          <span
            className={classNames(
              rc.labProjects.note.icon,
            )}
            aria-hidden="true"
          >
            ⚗
          </span>

          <p>
            New ideas. Small builds. Frequent experiments.
            <strong>This lab is always open.</strong>
          </p>

          <span
            className={classNames(
              rc.labProjects.note.spark,
            )}
            aria-hidden="true"
          >
            ✦
          </span>
        </div>
      </div>
    </section>
  );
}