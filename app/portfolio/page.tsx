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
    description: "",
    iconKey: "heart",
  },
  {
    title: "Antonia",
    href: "/portfolio/antonia",
    label: "Antonia Schindler Portfolio",
    description: "",
    iconKey: "film",
  },
  {
    title: "Moodboard",
    href: "/moodboard",
    label: "Apps",
    description: "",
    iconKey: "app",
  },
  {
    title: "Projects",
    href: "/projects",
    label: "Projects",
    description: "",
    iconKey: "folder",
  },
];

export default function PortfolioPage() {
  return (
    <main className={rc.page.main}>
      <ThemedBackground />

      <div className={rc.page.content}>
        {/* ========================================
            PORTFOLIO HERO
        ======================================== */}
        <PortfolioHeroSection />

        {/* ========================================
            SELECTED PROJECTS
        ======================================== */}
        <PortfolioSelectedProjectsSection />

        {/* ========================================
            PORTFOLIO EXPLANATION
        ======================================== */}
        <PortfolioExplanation />

        {/* ========================================
            PROJECT DESCRIPTION
        ======================================== */}
        <PortfolioProjectDescription />

        {/* ========================================
            COLOR PALETTE
        ======================================== */}
        <PortfolioPaletteSection />

        {/* ========================================
            LOGO SECTION
        ======================================== */}
        <PortfolioLogoSection />

        {/* ========================================
            PROJECTS SECTION
        ======================================== */}
        <PortfolioProjectsSection />

        {/* ========================================
            PORTFOLIO NAVIGATION
        ======================================== */}
        <PortfolioNavSection
          siteMode="basic"
          items={portfolioItems}
        />
      </div>

      {/* ========================================
          FIXED HOME BUTTON
      ======================================== */}
      <div className="fixed bottom-6 right-6 z-[200] sm:bottom-8 sm:right-8">
        <Link
          href="/"
          aria-label="Return to home"
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/80 shadow-[0_0_20px_rgba(255,255,255,0.08)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:h-12 sm:w-12"
        >
          <House
            aria-hidden="true"
            className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6"
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </main>
  );
}