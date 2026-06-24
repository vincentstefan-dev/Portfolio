"use client";

import {
  Code2,
  FolderKanban,
  ImageIcon,
  Layers3,
  PenTool,
  Play,
  Scan,
  Type,
} from "lucide-react";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";

const toolIcons = [
  {
    label: "Projects",
    icon: FolderKanban,
    className: "left-[8%] top-[20%] rotate-[-10deg]",
  },
  {
    label: "Vector",
    icon: PenTool,
    className: "left-[21%] top-[8%] rotate-[-7deg]",
  },
  {
    label: "Video",
    icon: Play,
    className: "right-[30%] top-[7%] rotate-[2deg]",
  },
  {
    label: "Layers",
    icon: Layers3,
    className: "right-[12%] top-[18%] rotate-[8deg]",
  },
  {
    label: "Type",
    icon: Type,
    className: "left-[8%] top-[52%] rotate-[-3deg]",
  },
  {
    label: "Code",
    icon: Code2,
    className: "left-[24%] bottom-[13%] rotate-[1deg]",
  },
  {
    label: "Motion",
    icon: Scan,
    className: "right-[28%] bottom-[13%] rotate-[-5deg]",
  },
  {
    label: "Image",
    icon: ImageIcon,
    className: "right-[9%] bottom-[25%] rotate-[4deg]",
  },
];

export default function PortfolioProjectsSection() {
  return (
    <section className={rc.projectsHero.section}>
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

      <div className={rc.projectsHero.centerWrap}>
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