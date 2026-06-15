import ThemedBackground from "@/app/components/template/theme/ThemedBackground";

import PortfolioHeroSection from "@/app/components/sections/Portfolio/PortfolioHeroSection";
import PortfolioProjectsSection from "@/app/components/sections/Portfolio/PortfolioProjectsSection";
import PortfolioNavSection from "@/app/components/sections/Portfolio/PortfolioNavSection";
import PortfolioSideNav from "@/app/components/sections/Portfolio/PortfolioSideNav";
import PortfolioExplanation from "@/app/components/sections/Portfolio/PortfolioExplanation";
import PortfolioPaletteSection from "@/app/components/sections/Portfolio/PortfolioPaletteSection";
import PortfolioProjectDescription from "@/app/components/sections/Portfolio/PortfolioProjectDescription";
import PortfolioLogoSection from "@/app/components/sections/Portfolio/PortfolioLogoSection";
import PortfolioSelectedProjectsSection from "@/app/components/sections/Portfolio/PortfolioSelectedProjectsSection";
import React from "react";
import Link from "next/link";
import { House } from "lucide-react";

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
    <main className="relative min-h-screen overflow-x-hidden text-white">
      <ThemedBackground />

      <div className="relative z-10">
        

        <PortfolioHeroSection />

        <PortfolioProjectsSection />

        <PortfolioSelectedProjectsSection />

        <PortfolioExplanation />

        <PortfolioProjectDescription /> 

        <PortfolioPaletteSection /> 

        <PortfolioLogoSection />
        
        <PortfolioNavSection siteMode="basic" items={portfolioItems} />

        {/* BACK BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/"
          aria-label="Return to HOME"
          className="group flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition hover:bg-white/50"
        >
          <House
            className="h-5 w-5 text-white transition-transform duration-100 group-hover:scale-110"
            strokeWidth={1.5}
          />
        </Link>
      </div>

      </div>
    </main>
  );
}