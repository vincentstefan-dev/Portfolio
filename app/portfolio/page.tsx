import ThemedBackground from "@/app/components/template/theme/ThemedBackground";

import PortfolioHeroSection from "@/app/components/sections/Portfolio/PortfolioHeroSection";
import PortfolioProjectsSection from "@/app/components/sections/Portfolio/PortfolioProjectsSection";
import PortfolioNavSection from "@/app/components/sections/Portfolio/PortfolioNavSection";
import PortfolioSideNav from "@/app/components/sections/Portfolio/PortfolioSideNav";
import PortfolioExplanation from "@/app/components/sections/Portfolio/PortfolioExplanation";
import PortfolioPaletteSection from "@/app/components/sections/Portfolio/PortfolioPaletteSection";

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

        <PortfolioExplanation />

        <PortfolioPaletteSection />

        <PortfolioNavSection siteMode="basic" items={portfolioItems} />

      </div>
    </main>
  );
}