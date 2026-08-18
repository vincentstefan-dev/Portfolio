"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";
import "./portfolioprojectsshowcase-section.css";

type ProjectItem = {
  id: string;
  number: string;
  label: string;
  status: string;
  title: string;
  category: string;
  description: string;
  href: string;
  image: string;
  imagePosition: string;
  accent: string;
  featured?: boolean;
};

type PixelStar = {
  id: string;
  className: string;
};

const pixelStars: PixelStar[] = [
  {
    id: "star-one",
    className: "left-[4%] top-[20%] h-[5px] w-[5px]",
  },
  {
    id: "star-two",
    className: "left-[11%] top-[44%] h-[8px] w-[8px]",
  },
  {
    id: "star-three",
    className: "left-[31%] top-[9%] h-[4px] w-[4px]",
  },
  {
    id: "star-four",
    className: "right-[35%] top-[17%] h-[6px] w-[6px]",
  },
  {
    id: "star-five",
    className: "right-[12%] top-[30%] h-[5px] w-[5px]",
  },
  {
    id: "star-six",
    className: "right-[5%] top-[58%] h-[8px] w-[8px]",
  },
  {
    id: "star-seven",
    className: "left-[7%] bottom-[20%] h-[6px] w-[6px]",
  },
  {
    id: "star-eight",
    className: "left-[38%] bottom-[8%] h-[5px] w-[5px]",
  },
  {
    id: "star-nine",
    className: "right-[29%] bottom-[14%] h-[7px] w-[7px]",
  },
  {
    id: "star-ten",
    className: "right-[7%] bottom-[8%] h-[4px] w-[4px]",
  },
];

const projectItems: ProjectItem[] = [
  {
    id: "koyote",
    number: "01",
    label: "Brand Identity",
    status: "Featured",
    title: "Koyote",
    category: "Small business project",
    description:
      "The creation of Koyote’s visual identity, digital language, logo system, and experimental creative direction.",
    href: "/portfolio",
    image: "/3TO6/KOYOTEFINAL.png",
    imagePosition: "center",
    accent: "#238cff",
    featured: true,
  },
  {
    id: "she",
    number: "02",
    label: "Brand Identity",
    status: "Case Study",
    title: "SHE",
    category: "Small business project",
    description:
      "A visual identity project built around atmosphere, personality, typography, and a carefully controlled brand system.",
    href: "/portfolio/SHE",
    image: "/3TO6/SHE.png",
    imagePosition: "center",
    accent: "#44ef61",
  },
  {
    id: "pixelate",
    number: "03",
    label: "Web Application",
    status: "Live",
    title: "Pixelate",
    category: "Image manipulation",
    description:
      "A browser-based application for transforming images into customizable pixel-art compositions.",
    href: "/portfolio/antonia",
    image: "/3TO6/PIXEL.png",
    imagePosition: "center",
    accent: "#a86dff",
  },
  {
    id: "astronaut",
    number: "04",
    label: "Interactive Story",
    status: "Experiment",
    title: "Astronaut",
    category: "Built with Pixelate",
    description:
      "A small click-based visual story combining space imagery, pixel graphics, interaction, and playful experimentation.",
    href: "/portfolio/junix",
    image: "/3TO6/astronaut.png",
    imagePosition: "center",
    accent: "#ffae20",
  },
  {
    id: "concept-of-i",
    number: "05",
    label: "Personal Blog",
    status: "Ongoing",
    title: "The Concept of I",
    category: "Writing and visual experimentation",
    description:
      "A personal publishing space for ideas, visual exploration, reflection, and experimental digital expression.",
    href: "/theme-lab",
    image: "/3TO6/babyfinal.gif",
    imagePosition: "center",
    accent: "#f03ca9",
  },
];

export default function PortfolioProjectsShowcaseSection() {
  return (
    <section
      className={`${rc.projectsHero.section} portfolio-projects-showcase-section`}
    >
      <div className={rc.projectsHero.background} />

      {/* ========================================
          PIXEL STAR LAYER
      ======================================== */}
      <div
        aria-hidden="true"
        className="portfolio-projects-showcase-stars"
      >
        {pixelStars.map((star, index) => (
          <span
            key={star.id}
            className={`portfolio-projects-showcase-star ${star.className}`}
            style={
              {
                "--showcase-star-delay": `${index * -0.67}s`,
                "--showcase-star-duration": `${
                  4.8 + (index % 4) * 0.9
                }s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* ========================================
          SECTION CONTENT
      ======================================== */}
      <div className="portfolio-projects-showcase-inner">
        {/* ========================================
            HEADER
        ======================================== */}
        <header className="portfolio-projects-showcase-header">
          <div className="portfolio-projects-showcase-heading">
            <p className="portfolio-projects-showcase-kicker">
              Koyote Project Archive
            </p>

            <h2
              className="portfolio-projects-showcase-title"
              aria-label="Portfolio Projects"
            >
              <span className="portfolio-projects-showcase-title__lab">
                PORTFOLIO
              </span>

              <span className="portfolio-projects-showcase-title__projects">
                <span className="portfolio-projects-showcase-letter portfolio-projects-showcase-letter--blue">
                  P
                </span>

                <span className="portfolio-projects-showcase-letter portfolio-projects-showcase-letter--pink">
                  R
                </span>

                <span className="portfolio-projects-showcase-letter portfolio-projects-showcase-letter--red">
                  O
                </span>

                <span className="portfolio-projects-showcase-letter portfolio-projects-showcase-letter--green">
                  J
                </span>

                <span className="portfolio-projects-showcase-letter portfolio-projects-showcase-letter--yellow">
                  E
                </span>

                <span className="portfolio-projects-showcase-letter portfolio-projects-showcase-letter--orange">
                  C
                </span>

                <span className="portfolio-projects-showcase-letter portfolio-projects-showcase-letter--pink">
                  T
                </span>

                <span className="portfolio-projects-showcase-letter portfolio-projects-showcase-letter--green">
                  S
                </span>
              </span>
            </h2>

            <div className="portfolio-projects-showcase-title-lines">
              <span />
              <span />
            </div>
          </div>

          <div className="portfolio-projects-showcase-intro">
            <p className="portfolio-projects-showcase-intro__text">
              A collection of brand identities, web applications,
              interactive stories, and personal experiments developed
              through research, curiosity, and visual exploration.
            </p>

            <p className="portfolio-projects-showcase-process">
              <span>Research</span>
              <span>•</span>
              <span>Design</span>
              <span>•</span>
              <span>Build</span>
              <span>•</span>
              <span>Experiment</span>
            </p>

            <div className="portfolio-projects-showcase-intro-line">
              <span />
              <i />
            </div>
          </div>
        </header>

        {/* ========================================
            PROJECT GRID
        ======================================== */}
        <div className="portfolio-projects-showcase-grid">
          {projectItems.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

        {/* ========================================
            BOTTOM MESSAGE
        ======================================== */}
        <div className="portfolio-projects-showcase-footer">
          <span className="portfolio-projects-showcase-footer__icon">
            ✦
          </span>

          <span>
            Identity systems. Applications. Visual experiments.
          </span>

          <strong>More projects are always being built.</strong>

          <span className="portfolio-projects-showcase-footer__spark">
            ✦
          </span>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: ProjectItem;
}) {
  const cardClassName = [
    "portfolio-projects-showcase-card",
    project.featured
      ? "portfolio-projects-showcase-card--featured"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const cardStyle = {
    "--project-accent": project.accent,
  } as CSSProperties;

  return (
    <Link
      href={project.href}
      className={cardClassName}
      style={cardStyle}
    >
      <ProjectCardChrome project={project} />

      <div className="portfolio-projects-showcase-card__body">
        <div className="portfolio-projects-showcase-card__image-wrap">
          <Image
            src={project.image}
            alt={`${project.title} project preview`}
            fill
            priority={project.featured}
            className="portfolio-projects-showcase-card__image"
            style={{
              objectPosition: project.imagePosition,
            }}
            sizes={
              project.featured
                ? "(max-width: 639px) 100vw, (max-width: 1023px) 90vw, 50vw"
                : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
            }
          />

          <div className="portfolio-projects-showcase-card__image-overlay" />
        </div>

        <div className="portfolio-projects-showcase-card__copy">
          <p className="portfolio-projects-showcase-card__category">
            {project.category}
          </p>

          <h3>{project.title}</h3>

          <p className="portfolio-projects-showcase-card__description">
            {project.description}
          </p>
        </div>
      </div>

      <div className="portfolio-projects-showcase-card__footer">
        <span>View Case Study</span>

        <ArrowUpRight
          aria-hidden="true"
          size={14}
          strokeWidth={1.8}
        />
      </div>
    </Link>
  );
}

function ProjectCardChrome({
  project,
}: {
  project: ProjectItem;
}) {
  return (
    <>
      <div className="portfolio-projects-showcase-card__top-line" />

      <div className="portfolio-projects-showcase-card__meta">
        <span>{project.label}</span>

        <span className="portfolio-projects-showcase-card__status">
          <i />
          {project.status}
        </span>
      </div>

      <span className="portfolio-projects-showcase-card__number">
        {project.number}
      </span>

      <span className="portfolio-projects-showcase-card__spark">
        ✦
      </span>
    </>
  );
}