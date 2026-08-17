"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";
import "./portfolio-projects-section.css";

const projectPreviews = [
  {
    title: "SHE",
    category: "Web Design",
    src: "/3TO6/SHE.png",
    className:
      "left-[3%] top-[34%] rotate-[-7deg] xl:left-[8%] xl:top-[31%]",
  },
  {
    title: "Koyote",
    category: "Brand Identity",
    src: "/3TO6/KOYOTEFINAL.png",
    className:
      "right-[4%] top-[31%] rotate-[6deg] xl:right-[9%] xl:top-[27%]",
  },
  {
    title: "Astronaut",
    category: "Creative Development",
    src: "/3TO6/astronaut.png",
    className:
      "bottom-[1%] left-1/2 -translate-x-1/2 rotate-[-2deg] xl:bottom-[2%]",
  },
];

const floatingPngs = [
  {
    label: "Floating brain",
    src: "/website-icons/brain.png",
    positionClass:
      "left-[3%] top-[8%] w-[90px] rotate-[-8deg] lg:left-[4%] lg:w-[120px] xl:w-[140px]",
    animationClass: "portfolio-png-float--one",
  },
  {
    label: "Floating hand",
    src: "/website-icons/hand.png",
    positionClass:
      "right-[3%] top-[7%] w-[100px] rotate-[8deg] lg:right-[4%] lg:w-[140px] xl:w-[160px]",
    animationClass: "portfolio-png-float--two",
  },
  {
    label: "Floating hard drive",
    src: "/website-icons/hdd.png",
    positionClass:
      "bottom-[7%] left-[6%] w-[100px] rotate-[6deg] lg:left-[8%] lg:w-[140px] xl:w-[155px]",
    animationClass: "portfolio-png-float--three",
  },
  {
    label: "Floating CD",
    src: "/website-icons/cd.png",
    positionClass:
      "bottom-[7%] right-[6%] w-[100px] rotate-[-7deg] lg:right-[8%] lg:w-[140px] xl:w-[155px]",
    animationClass: "portfolio-png-float--four",
  },

  // Large top-center anchor.
  {
    label: "Floating gaming console",
    src: "/website-icons/gaming.png",
    positionClass:
      "left-1/2 top-[1%] w-[125px] -translate-x-1/2 rotate-[-3deg] lg:w-[165px] xl:w-[195px]",
    animationClass: "portfolio-png-float--five",
  },

  // Small upper-left accent.
  {
    label: "Floating atom",
    src: "/website-icons/atom.png",
    positionClass:
      "left-[27%] top-[18%] w-[48px] rotate-[11deg] lg:w-[65px] xl:w-[78px]",
    animationClass: "portfolio-png-float--six",
  },

  // Small upper-right accent.
  {
    label: "Floating mail",
    src: "/website-icons/mail.png",
    positionClass:
      "right-[27%] top-[19%] w-[52px] rotate-[-10deg] lg:w-[70px] xl:w-[82px]",
    animationClass: "portfolio-png-float--seven",
  },

  // Accent beside the central title.
  {
    label: "Floating paper airplane",
    src: "/website-icons/paperairplane.png",
    positionClass:
      "right-[23%] top-[55%] w-[55px] rotate-[10deg] lg:w-[75px] xl:w-[90px]",
    animationClass: "portfolio-png-float--eight",
  },

  // Lower-left-center accent.
  {
    label: "Floating rainbow star",
    src: "/website-icons/starrainbow.png",
    positionClass:
      "bottom-[15%] left-[25%] w-[65px] rotate-[-8deg] lg:w-[90px] xl:w-[110px]",
    animationClass: "portfolio-png-float--nine",
  },
];

export default function PortfolioProjectsSection() {
  return (
    <section className={`${rc.projectsHero.section} overflow-hidden`}>
      <div className={rc.projectsHero.background} />

      {/* ========================================
          TOP RAIL
      ======================================== */}
      <div className={rc.projectsHero.topRailWrap}>
        <div className={rc.projectsHero.topRail}>
          <div className={rc.projectsHero.topRailMainLine} />
          <div className={rc.projectsHero.topRailLineLong} />
          <div className={rc.projectsHero.topRailLineShort} />
        </div>
      </div>

      {/* ========================================
          FLOATING PNG ASSETS
      ======================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[15] hidden overflow-hidden md:block"
      >
        {floatingPngs.map((asset) => (
          <div
            key={asset.label}
            className={`absolute ${asset.positionClass}`}
          >
            <div
              className={`portfolio-png-float ${asset.animationClass}`}
            >
              <Image
                src={asset.src}
                alt=""
                width={220}
                height={220}
                sizes="(min-width: 1280px) 195px, (min-width: 1024px) 165px, 100px"
                className="h-auto w-full select-none object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ========================================
          PROJECT PREVIEW CARDS
      ======================================== */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden overflow-hidden md:block">
        {projectPreviews.map((project) => (
          <div
            key={project.title}
            className={`absolute w-[205px] rounded-[22px] border border-white/15 bg-white/[0.06] p-2 shadow-2xl backdrop-blur-md lg:w-[235px] xl:w-[260px] ${project.className}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-black/20">
              <Image
                src={project.src}
                alt={`${project.title} project preview`}
                fill
                sizes="(min-width: 1280px) 260px, (min-width: 1024px) 235px, 205px"
                className="object-cover"
              />
            </div>

            <div className="flex items-center justify-between px-2 pb-1 pt-3 text-white">
              <div>
                <p className="text-sm font-semibold">{project.title}</p>

                <p className="mt-0.5 text-[11px] text-white/50">
                  {project.category}
                </p>
              </div>

              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 text-white/55"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ========================================
          CENTRAL TITLE
      ======================================== */}
      <div className={`${rc.projectsHero.centerWrap} z-20`}>
        <div className={rc.projectsHero.centerInner}>
          <div className={rc.projectsHero.titleWrap}>
            <h2 className={rc.projectsHero.title}>
              <span className={rc.projectsHero.titleText}>
                <span className={rc.projectsHero.titleLineTop}>ALL</span>

                <span className={rc.projectsHero.titleLineBottom}>
                  PROJECTS
                  <span className={rc.projectsHero.exclamation}>!</span>
                </span>
              </span>
            </h2>

            <div className={rc.projectsHero.titleGlow} />
          </div>
        </div>
      </div>

      {/* ========================================
          BOTTOM RAIL
      ======================================== */}
      <div className={rc.projectsHero.bottomRailWrap}>
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