"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";
import "./portfolio-selected-projects-section.css";

type ProjectCard = {
  number: string;
  title: string;
  category: string;
  href: string;
  image: string;
  imagePosition: string;
};

type FloatingPng = {
  label: string;
  src: string;
  positionClass: string;
  animationClass: string;
};

const projects: ProjectCard[] = [
  {
    number: "01",
    title: "Koyote",
    category: "Brand Identity • Small business Project",
    href: "/portfolio",
    image: "/3TO6/KOYOTEFINAL.png",
    imagePosition: "center",
  },
  {
    number: "02",
    title: "SHE",
    category: "Brand Identity • Small business project",
    href: "/portfolio/SHE",
    image: "/3TO6/SHE.png",
    imagePosition: "center",
  },
  {
    number: "03",
    title: "Pixelate",
    category: "Web-based app • Image manipulation",
    href: "/portfolio/antonia",
    image: "/3TO6/PIXEL.png",
    imagePosition: "center",
  },
  {
    number: "04",
    title: "Astronaut",
    category: "Small click-based story • Built with Pixelate",
    href: "/portfolio/junix",
    image: "/3TO6/astronaut.png",
    imagePosition: "center",
  },
  {
    number: "05",
    title: "The concept of I",
    category: "Personal Blog",
    href: "/theme-lab",
    image: "/3TO6/babyfinal.gif",
    imagePosition: "center",
  },
];

const floatingPngs: FloatingPng[] = [
  // ========================================
  // TOP FRAME
  // ========================================
  {
    label: "Floating brain",
    src: "/website-icons/brain.png",
    positionClass:
      "left-[4%] top-[6%] w-[78px] rotate-[-10deg] lg:left-[5%] lg:w-[105px] xl:w-[120px]",
    animationClass: "selected-projects-png-float--one",
  },
  {
    label: "Floating gaming console",
    src: "/website-icons/gaming.png",
    positionClass:
      "left-1/2 top-[1%] w-[90px] -translate-x-1/2 rotate-[-2deg] lg:w-[120px] xl:w-[145px]",
    animationClass: "selected-projects-png-float--seven",
  },
  {
    label: "Floating hand",
    src: "/website-icons/hand.png",
    positionClass:
      "right-[4%] top-[5%] w-[82px] rotate-[8deg] lg:right-[5%] lg:w-[110px] xl:w-[125px]",
    animationClass: "selected-projects-png-float--two",
  },

  // ========================================
  // SIDE FRAME
  // ========================================
  {
    label: "Floating atom",
    src: "/website-icons/atom.png",
    positionClass:
      "left-[3%] top-[46%] w-[52px] rotate-[10deg] lg:left-[3%] lg:w-[72px] xl:w-[84px]",
    animationClass: "selected-projects-png-float--three",
  },
  {
    label: "Floating paper airplane",
    src: "/website-icons/paperairplane.png",
    positionClass:
      "right-[3%] top-[45%] w-[66px] rotate-[-10deg] lg:right-[3%] lg:w-[92px] xl:w-[108px]",
    animationClass: "selected-projects-png-float--four",
  },

  // ========================================
  // BOTTOM CORNERS
  // ========================================
  {
    label: "Floating hard drive",
    src: "/website-icons/hdd.png",
    positionClass:
      "bottom-[-1%] left-[6%] w-[88px] rotate-[7deg] lg:left-[8%] lg:w-[120px] xl:w-[140px]",
    animationClass: "selected-projects-png-float--five",
  },
  {
    label: "Floating CD",
    src: "/website-icons/cd.png",
    positionClass:
      "bottom-[-1%] right-[6%] w-[88px] rotate-[-8deg] lg:right-[8%] lg:w-[120px] xl:w-[140px]",
    animationClass: "selected-projects-png-float--six",
  },

  // ========================================
  // INNER LOWER ACCENTS
  // ========================================
  {
    label: "Floating mail",
    src: "/website-icons/mail.png",
    positionClass:
      "bottom-[9%] left-[26%] w-[46px] rotate-[-8deg] lg:w-[62px] xl:w-[74px]",
    animationClass: "selected-projects-png-float--eight",
  },
  {
    label: "Floating rainbow star",
    src: "/website-icons/starrainbow.png",
    positionClass:
      "bottom-[9%] right-[26%] w-[52px] rotate-[9deg] lg:w-[72px] xl:w-[84px]",
    animationClass: "selected-projects-png-float--nine",
  },
];

export default function PortfolioSelectedProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  const visibleProjects = useMemo(() => {
    return [0, 1, 2].map((offset) => {
      const index = (activeIndex + offset) % projects.length;
      return projects[index];
    });
  }, [activeIndex]);

  function scrollMobileTo(index: number) {
    const track = mobileTrackRef.current;

    if (!track) {
      return;
    }

    track.scrollTo({
      left: index * track.clientWidth,
      behavior: "smooth",
    });
  }

  function setProjectIndex(index: number) {
    setActiveIndex(index);

    requestAnimationFrame(() => {
      scrollMobileTo(index);
    });
  }

  function goToNextProject() {
    const nextIndex = (activeIndex + 1) % projects.length;
    setProjectIndex(nextIndex);
  }

  function goToPreviousProject() {
    const previousIndex =
      activeIndex === 0 ? projects.length - 1 : activeIndex - 1;

    setProjectIndex(previousIndex);
  }

  function handleMobileScroll() {
    const track = mobileTrackRef.current;

    if (!track || track.clientWidth === 0) {
      return;
    }

    const nextIndex = Math.round(
      track.scrollLeft / track.clientWidth,
    );

    if (nextIndex !== activeIndex && projects[nextIndex]) {
      setActiveIndex(nextIndex);
    }
  }

  function getCardTilt(index: number) {
    if (index === 0) {
      return rc.selectedProjects.cardLeft;
    }

    if (index === 1) {
      return rc.selectedProjects.cardCenter;
    }

    return rc.selectedProjects.cardRight;
  }

  return (
    <section
      className={`${rc.selectedProjects.section} relative overflow-hidden`}
    >
      {/* ========================================
          SECTION BACKGROUND
      ======================================== */}
      <div className={rc.selectedProjects.background}>
        <div className={rc.selectedProjects.glow} />
        <div className={rc.selectedProjects.starOne} />
        <div className={rc.selectedProjects.starTwo} />
        <div className={rc.selectedProjects.starThree} />
      </div>

      {/* ========================================
          FLOATING PNG ASSETS
      ======================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] hidden overflow-hidden md:block"
      >
        {floatingPngs.map((asset) => (
          <div
            key={asset.label}
            className={`absolute ${asset.positionClass}`}
          >
            <div
              className={`selected-projects-png-float ${asset.animationClass}`}
            >
              <Image
                src={asset.src}
                alt=""
                width={220}
                height={220}
                sizes="(min-width: 1280px) 145px, (min-width: 1024px) 120px, 90px"
                className="h-auto w-full select-none object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ========================================
          SECTION CONTENT
      ======================================== */}
      <div className={`${rc.selectedProjects.inner} relative z-10`}>
        <div className={rc.selectedProjects.header}>
          <h2 className={rc.selectedProjects.title}>
            Check out this cool projects!
          </h2>

          <p className={rc.selectedProjects.subtitle}>
            You could be here too! and for a GOOD price!
          </p>
        </div>

        <div className={rc.selectedProjects.cardsArea}>
          {/* ========================================
              DESKTOP ARROWS
          ======================================== */}
          <button
            type="button"
            aria-label="Previous project"
            onClick={goToPreviousProject}
            className={`${rc.selectedProjects.desktopArrow} ${rc.selectedProjects.desktopArrowLeft}`}
          >
            <ArrowLeft
              aria-hidden="true"
              className={rc.selectedProjects.desktopArrowIcon}
            />
          </button>

          <button
            type="button"
            aria-label="Next project"
            onClick={goToNextProject}
            className={`${rc.selectedProjects.desktopArrow} ${rc.selectedProjects.desktopArrowRight}`}
          >
            <ArrowRight
              aria-hidden="true"
              className={rc.selectedProjects.desktopArrowIcon}
            />
          </button>

          {/* ========================================
              MOBILE ARROWS
          ======================================== */}
          <div className={rc.selectedProjects.mobileArrows}>
            <button
              type="button"
              aria-label="Previous project"
              onClick={goToPreviousProject}
              className={rc.selectedProjects.mobileArrow}
            >
              <ArrowLeft
                aria-hidden="true"
                className={rc.selectedProjects.mobileArrowIcon}
              />
            </button>

            <button
              type="button"
              aria-label="Next project"
              onClick={goToNextProject}
              className={rc.selectedProjects.mobileArrow}
            >
              <ArrowRight
                aria-hidden="true"
                className={rc.selectedProjects.mobileArrowIcon}
              />
            </button>
          </div>

          {/* ========================================
              MOBILE CAROUSEL
          ======================================== */}
          <div className={rc.selectedProjects.mobileCarousel}>
            <div
              ref={mobileTrackRef}
              onScroll={handleMobileScroll}
              className={rc.selectedProjects.mobileTrack}
            >
              {projects.map((project) => (
                <div
                  key={`${project.number}-${project.title}-mobile`}
                  className={rc.selectedProjects.mobileSlide}
                >
                  <ProjectCardLink
                    project={project}
                    priority={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ========================================
              DESKTOP PROJECT CARDS
          ======================================== */}
          <div className={rc.selectedProjects.grid}>
            {visibleProjects.map((project, index) => (
              <ProjectCardLink
                key={`${project.number}-${project.title}-desktop`}
                project={project}
                priority={index === 1}
                className={getCardTilt(index)}
              />
            ))}
          </div>

          {/* ========================================
              CAROUSEL DOTS
          ======================================== */}
          <div className={rc.selectedProjects.dots}>
            {projects.map((project, index) => (
              <button
                key={project.number}
                type="button"
                aria-label={`Show project ${project.number}`}
                onClick={() => setProjectIndex(index)}
                className={`${rc.selectedProjects.dot} ${
                  activeIndex === index
                    ? rc.selectedProjects.dotActive
                    : rc.selectedProjects.dotInactive
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCardLink({
  project,
  priority,
  className = "",
}: {
  project: ProjectCard;
  priority: boolean;
  className?: string;
}) {
  return (
    <Link
      href={project.href}
      className={`${rc.selectedProjects.cardBase} ${className}`}
    >
      <div className={rc.selectedProjects.imageWrap}>
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          priority={priority}
          className={rc.selectedProjects.image}
          style={{
            objectPosition: project.imagePosition,
          }}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 33vw"
        />
      </div>

      <div className={rc.selectedProjects.overlayDarkTop} />
      <div className={rc.selectedProjects.overlayDarkBottom} />
      <div className={rc.selectedProjects.overlayCyan} />

      <div className={rc.selectedProjects.cardBorder} />

      <div className={rc.selectedProjects.number}>
        {project.number}
      </div>

      <div className={rc.selectedProjects.content}>
        <h3 className={rc.selectedProjects.cardTitle}>
          {project.title}
        </h3>

        <p className={rc.selectedProjects.category}>
          {project.category}
        </p>

        <div className={rc.selectedProjects.divider} />

        <div className={rc.selectedProjects.caseStudyRow}>
          <span className={rc.selectedProjects.caseStudyText}>
            View Case Study
          </span>

          <ArrowRight
            aria-hidden="true"
            className={rc.selectedProjects.caseStudyIcon}
          />
        </div>
      </div>
    </Link>
  );
}