"use client";

import { useEffect, useState, type ReactNode } from "react";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";

const rotatingLogos = [
  {
    src: "/logos/8BIT.webp",
    alt: "Koyote 8-bit logo",
  },
  {
    src: "/logos/16bit.webp", 
    alt: "Koyote 16-bit logo",
  },
  {
    src: "/logos/alien.webp",
    alt: "Koyote alien logo",
  },
  {
    src: "/logos/bluecrt.webp",
    alt: "Koyote blue CRT logo",
  },
  {
    src: "/logos/default.webp",
    alt: "Koyote default logo",
  },
  {
    src: "/logos/frutigerclean.webp",
    alt: "Koyote frutigerclean logo",
  },
  {
    src: "/logos/gamecube.webp",
    alt: "Koyote GameCube logo",
  },
  {
    src: "/logos/IOS.webp",
    alt: "Koyote iOS logo",
  },
  {
    src: "/logos/LINES.webp",
    alt: "Koyote lines logo",
  },
  {
    src: "/logos/liquidmetal.webp",
    alt: "Koyote liquid metal logo",
  },
  {
    src: "/logos/microsoft.webp",
    alt: "Koyote Microsoft logo",
  },
  {
    src: "/logos/minecraft.webp",
    alt: "Koyote Minecraft logo",
  },
  {
    src: "/logos/N64.webp",
    alt: "Koyote N64 logo",
  },
  {
    src: "/logos/plasma.webp",
    alt: "Koyote plasma logo",
  },
  {
    src: "/logos/polygon.webp",
    alt: "Koyote polygon logo",
  },
  {
    src: "/logos/purpleplasma.webp",
    alt: "Koyote purple plasma logo",
  },
  {
    src: "/logos/shineblue.webp",
    alt: "Koyote shine blue logo",
  },
  {
    src: "/logos/sleekps2.webp",
    alt: "Koyote sleek PS2 logo",
  },
  {
    src: "/logos/voxel.webp",
    alt: "Koyote voxel logo",
  },
  {
    src: "/logos/web2.0.webp",
    alt: "Koyote web 2.0 logo",
  },
  {
    src: "/logos/whitelines.webp",
    alt: "Koyote white lines logo",
  },
];

export default function RotatingLogoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % rotatingLogos.length;
      });
    }, 600);

    return () => window.clearInterval(interval);
  }, []);

  const activeLogo = rotatingLogos[activeIndex];

  return (
    <section className={rc.rotatingLogo.section}>
      <div className={rc.rotatingLogo.grid}>
        <div className={rc.rotatingLogo.textColumn}>
          <div className={rc.rotatingLogo.leftDecorLine} />
          <div className={rc.rotatingLogo.leftDecorDotTop} />
          <div className={rc.rotatingLogo.leftDecorDotMiddle} />
          <div className={rc.rotatingLogo.leftDecorDotBottom} />

          <div className={rc.rotatingLogo.kickerRow}>
            <p className={rc.rotatingLogo.kicker}>Logo Meaning</p>

            <div className={rc.rotatingLogo.kickerLine} />
          </div>

          <h2 className={rc.rotatingLogo.title}>Logo</h2>

          <div className={rc.rotatingLogo.titleDivider}>
            <div className={rc.rotatingLogo.titleDividerLine} />
            <span className={rc.rotatingLogo.titleDividerDot} />
          </div>

          <div className={rc.rotatingLogo.tags}>
            <MiniTag>Help</MiniTag>
            <MiniTag>Growth</MiniTag>
            <MiniTag>Movement</MiniTag>
          </div>

          <p className={rc.rotatingLogo.paragraph}>
            The KOYOTE logo represents help as the foundation of growth. Its
            three human silhouettes show a person moving forward through
            different phases of development. Each step symbolizes progress,
            transformation, and evolution.
          </p>

          <p className={rc.rotatingLogo.paragraphSecond}>
            The core idea is that growth does not happen alone. We move forward
            by helping others, and through helping others, we also help
            ourselves.
          </p>

          <div className={rc.rotatingLogo.coreBox}>
            <p className={rc.rotatingLogo.coreKicker}>Core Message</p>

            <p className={rc.rotatingLogo.coreText}>
              KOYOTE stands for the belief that goals are achieved collectively,
              not individually. Each silhouette marks a phase of movement,
              showing that personal and creative growth is a process. The final
              message is simple: we grow when we help, and we help because
              growth is shared.
            </p>
          </div>
        </div>

        <div className={rc.rotatingLogo.logoColumn}>
          <div className={rc.rotatingLogo.logoFrame}>
            <img
              key={activeLogo.src}
              src={activeLogo.src}
              alt={activeLogo.alt}
              className={rc.rotatingLogo.logoImage}
              onError={() => {
                console.error("Logo failed to load:", activeLogo.src);
              }}
            />
          </div>

          <div className={rc.rotatingLogo.wordmarkFrame}>
            <img
              src="/OSnames/16bit.webp"
              alt="Koyote 16-bit wordmark"
              className={rc.rotatingLogo.wordmarkImage}
              onError={() => {
                console.error("Wordmark failed to load: /OSnames/16bit.webp");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniTag({ children }: { children: ReactNode }) {
  return <span className={rc.rotatingLogo.miniTag}>{children}</span>;
}