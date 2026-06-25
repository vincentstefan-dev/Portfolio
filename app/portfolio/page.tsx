import React from "react";
import Link from "next/link";
import { House } from "lucide-react";

import ThemedBackground from "@/app/components/template/theme/ThemedBackground";

import PortfolioHeroSection from "@/app/components/sections/Portfolio/PortfolioHeroSection";
import PortfolioNavSection from "@/app/components/sections/Portfolio/PortfolioNavSection";
import PortfolioExplanation from "@/app/components/sections/Portfolio/PortfolioExplanation";
import PortfolioPaletteSection from "@/app/components/sections/Portfolio/PortfolioPaletteSection";
import PortfolioProjectDescription from "@/app/components/sections/Portfolio/PortfolioProjectDescription";
import PortfolioLogoSection from "@/app/components/sections/Portfolio/PortfolioLogoSection";
import PortfolioSelectedProjectsSection from "@/app/components/sections/Portfolio/PortfolioSelectedProjectsSection";
import PortfolioProjectsSection from "@/app/components/sections/Portfolio/PortfolioProjectsSection";

import { portfolioRc as rc } from "@/app/components/sections/Portfolio/portfolioResponsiveConfig";

type PortfolioIconKey = "heart" | "film" | "app" | "folder";

type PortfolioItem = {
  title: string;
  href: string;
  label: string;
  description: string;
  iconKey: PortfolioIconKey;
};

const portfolioItems: PortfolioItem[] = [
  {
    title: "SHE",
    href: "/portfolio/SHE",
    label: "Sacred Human Experience",
    description: "Immersive visual direction and interface system.",
    iconKey: "heart",
  },
  {
    title: "Antonia",
    href: "/portfolio/antonia",
    label: "Antonia Schindler Portfolio",
    description: "Film portfolio and production identity website.",
    iconKey: "film",
  },
  {
    title: "Moodboard",
    href: "/moodboard",
    label: "Apps",
    description: "Collected references, layouts, and style directions.",
    iconKey: "app",
  },
  {
    title: "Projects",
    href: "/projects",
    label: "Personal projects",
    description: "Hardware mods, experiments, and digital systems.",
    iconKey: "folder",
  },
];

export default function PortfolioPage() {
  return (
    <main className={rc.page.main}>
      <ThemedBackground />

      <div className={rc.page.content}>
        <PortfolioHeroSection />

        <PortfolioSelectedProjectsSection />

        <PortfolioExplanation />

        <PortfolioProjectDescription />

        <PortfolioPaletteSection />

        <PortfolioLogoSection />

        <PortfolioProjectsSection />

        <PortfolioNavSection siteMode="basic" items={portfolioItems} />

        <div className={rc.page.backButtonWrap}>
          <Link
            href="/"
            aria-label="Return to HOME"
            className={rc.page.backButton}
          >
            <House className={rc.page.backIcon} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </main>
  );
}