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

import { portfolioRc as rc } from "@/app/components/sections/Portfolio/portfolioResponsiveConfig";

const portfolioItems = [
  {
    title: "SHE",
    href: "/portfolio/SHE",
    label: "Web Experience",
    description: "Immersive visual direction and interface system.",
  },
  {
    title: "Antonia",
    href: "/portfolio/antonia",
    label: "Client Website",
    description: "Film portfolio and production identity website.",
  },
  {
    title: "Moodboard",
    href: "/moodboard",
    label: "Visual Research",
    description: "Collected references, layouts, and style directions.",
  },
  {
    title: "Projects",
    href: "/projects",
    label: "Personal Builds",
    description: "Hardware mods, experiments, and digital systems.",
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