"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, UserRound } from "lucide-react";

import { LOGO_BANK } from "@/app/components/template/theme/LOGO_BANK";
import ProjectCarousel from "@/app/components/sections/Portfolio/ProjectCarousel";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";

export default function NeonHero() {
  const [activeLogo, setActiveLogo] = useState(LOGO_BANK[0]);

  useEffect(() => {
    const totalWeight = LOGO_BANK.reduce((sum, logo) => {
      return sum + (logo.weight ?? 1);
    }, 0);

    let random = Math.random() * totalWeight;

    for (const logo of LOGO_BANK) {
      random -= logo.weight ?? 1;

      if (random <= 0) {
        setActiveLogo(logo);
        return;
      }
    }

    setActiveLogo(LOGO_BANK[0]);
  }, []);

  return (
    <section className={rc.neonHero.section}>
      <div className={rc.neonHero.background}>
        <div className={rc.neonHero.grid} />

        <GlowDot className="left-[34%] top-[23%]" />
        <GlowDot className="left-[28%] top-[64%]" />
        <GlowDot className="right-[22%] top-[49%]" />
      </div>

      <Link href="/portfolio" className={rc.neonHero.logoLink}>
        <img
          src={activeLogo.src}
          alt={activeLogo.alt}
          className={`${rc.neonHero.logoImage} ${activeLogo.glow}`}
          style={{
            opacity: activeLogo.opacity,
          }}
        />
      </Link>

      <main className={rc.neonHero.main}>
        <div className={rc.neonHero.layout}>
          <div className={rc.neonHero.textBlock}>
            <h1 className={rc.neonHero.title}>
              <span className={rc.neonHero.titleWordOne}>Portfolio:</span>
              <span className={rc.neonHero.titleWordTwo}>Projects</span>
              <span className={rc.neonHero.titleWordThree}>Brands</span>
              <span className={rc.neonHero.titleWordFour}>Codes</span>
            </h1>

            <div className={rc.neonHero.introWrap}>
              <div className={rc.neonHero.introLine}>
                <span className={rc.neonHero.introStar}>✦</span>
              </div>

              <p className={rc.neonHero.introText}>
                HI 🥳! Here you can explore my professional projects:
                highlights, client work, and deeper looks into the research,
                building, and production behind each piece. I hope it gives you
                a clear sense of what we can create together.
              </p>
            </div>

            <div className={rc.neonHero.ctaWrap}>
              <Link href="#portfolio-index" className={rc.neonHero.primaryCta}>
                View all projects
                <ArrowUpRight className={rc.neonHero.ctaIcon} />
              </Link>

              <Link href="/aboutme" className={rc.neonHero.secondaryCta}>
                About Me
                <UserRound className={rc.neonHero.aboutIcon} />
              </Link>
            </div>
          </div>

          <ProjectCarousel />
        </div>
      </main>
    </section>
  );
}

function GlowDot({ className = "" }: { className?: string }) {
  return <span className={`${rc.neonHero.glowDot} ${className}`} />;
}