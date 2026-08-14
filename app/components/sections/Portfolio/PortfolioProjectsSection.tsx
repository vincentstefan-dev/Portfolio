"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  FolderKanban,
  Layers3,
  PenTool,
} from "lucide-react";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";

const toolIcons = [
  {
    label: "Projects",
    icon: FolderKanban,
    className: "left-[7%] top-[17%] rotate-[-10deg]",
  },
  {
    label: "Vector",
    icon: PenTool,
    className: "left-[22%] top-[7%] rotate-[-7deg]",
  },
  {
    label: "Code",
    icon: Code2,
    className: "right-[21%] top-[8%] rotate-[5deg]",
  },
  {
    label: "Layers",
    icon: Layers3,
    className: "right-[7%] top-[18%] rotate-[8deg]",
  },
];

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

export default function PortfolioProjectsSection() {
  return (
    <section className={`${rc.projectsHero.section} overflow-hidden`}>
      <div className={rc.projectsHero.background} />

      <div className={rc.projectsHero.topRailWrap}>
        <div className={rc.projectsHero.topRail}>
          <div className={rc.projectsHero.topRailMainLine} />
          <div className={rc.projectsHero.topRailLineLong} />
          <div className={rc.projectsHero.topRailLineShort} />
        </div>
      </div>

      {toolIcons.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className={`${rc.projectsHero.floatingIconPositionBase} ${item.className}`}
          >
            <div className={rc.projectsHero.floatingIconBox}>
              <Icon className={rc.projectsHero.floatingIcon} />
            </div>
          </div>
        );
      })}

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

              <ArrowUpRight className="h-4 w-4 text-white/55" />
            </div>
          </div>
        ))}
      </div>

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