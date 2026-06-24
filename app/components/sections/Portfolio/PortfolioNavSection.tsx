"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, TreeDeciduous } from "lucide-react";

import ThemedNavIcon from "@/app/components/template/theme/ThemedNavIcon";
import { useThemeGlow } from "@/app/components/template/layout/useThemeGlow";
import type { SiteMode } from "@/app/components/template/theme/ThemeProvider";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";

type MenuItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  image?: string;
  gif?: string;
};

type IconOffset = {
  x: number;
  y: number;
};

type PortfolioIconNavProps = {
  siteMode: SiteMode;
  items?: MenuItem[];
};

const defaultMenuItems: MenuItem[] = [
  {
    label: "Home",
    icon: House,
    href: "/",
    gif: "/Gifs/mystar.gif",
  },
  {
    label: "SHE",
    image: "/Icons/SHE.png",
    href: "/portfolio/SHE",
  },
  {
    label: "Antonia Website",
    icon: TreeDeciduous,
    href: "/portfolio/antonia",
  },
];

export default function PortfolioIconNav({
  siteMode,
  items = defaultMenuItems,
}: PortfolioIconNavProps) {
  const pathname = usePathname();
  const glow = useThemeGlow(siteMode);

  const navClusterRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [iconOffsets, setIconOffsets] = useState<IconOffset[]>(
    items.map(() => ({ x: 0, y: 0 }))
  );

  const [isIconIntroActive, setIsIconIntroActive] = useState(false);
  const [areIconOffsetsReady, setAreIconOffsetsReady] = useState(false);

  const measureIconOffsets = useCallback(() => {
    const navEl = navClusterRef.current;
    if (!navEl) return;

    const navRect = navEl.getBoundingClientRect();
    const navCenterX = navRect.left + navRect.width / 2;
    const navCenterY = navRect.top + navRect.height / 2;

    const nextOffsets = items.map((_, index) => {
      const itemEl = itemRefs.current[index];
      if (!itemEl) return { x: 0, y: 0 };

      const itemRect = itemEl.getBoundingClientRect();
      const itemCenterX = itemRect.left + itemRect.width / 2;
      const itemCenterY = itemRect.top + itemRect.height / 2;

      return {
        x: navCenterX - itemCenterX,
        y: navCenterY - itemCenterY,
      };
    });

    setIconOffsets(nextOffsets);
    setAreIconOffsetsReady(true);
  }, [items]);

  const playIconIntro = useCallback(() => {
    setIsIconIntroActive(false);

    requestAnimationFrame(() => {
      measureIconOffsets();

      requestAnimationFrame(() => {
        setIsIconIntroActive(true);
      });
    });
  }, [measureIconOffsets]);

  useLayoutEffect(() => {
    measureIconOffsets();
  }, [measureIconOffsets]);

  useEffect(() => {
    window.addEventListener("resize", measureIconOffsets);

    return () => {
      window.removeEventListener("resize", measureIconOffsets);
    };
  }, [measureIconOffsets]);

  useEffect(() => {
    playIconIntro();
  }, [pathname, playIconIntro]);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        playIconIntro();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [playIconIntro]);

  return (
    <nav aria-label="Portfolio navigation" className={rc.iconNav.nav}>
      <div className={rc.iconNav.background}>
        <div className={rc.iconNav.glow} />
        <div className={rc.iconNav.orbitOne} />
        <div className={rc.iconNav.orbitTwo} />
        <div className={rc.iconNav.grid} />
      </div>

      <div className={rc.iconNav.visualArea}>
        <div ref={navClusterRef} className={rc.iconNav.cluster}>
          {items.map((item, index) => {
            const offset = iconOffsets[index] ?? { x: 0, y: 0 };

            return (
              <div
                key={`${item.href}-${item.label}-${index}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={rc.iconNav.animatedItem}
                style={{
                  opacity: areIconOffsetsReady
                    ? isIconIntroActive
                      ? 1
                      : 0.15
                    : 0,
                  transform: areIconOffsetsReady
                    ? isIconIntroActive
                      ? "translate3d(0, 0, 0) scale(1)"
                      : `translate3d(${offset.x}px, ${offset.y}px, 0) scale(0.35)`
                    : "translate3d(0, 0, 0) scale(0.35)",
                  transitionProperty: "transform, opacity, filter",
                  transitionDuration: "1100ms",
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  transitionDelay: `${index * 70}ms`,
                  filter: isIconIntroActive ? "blur(0px)" : "blur(8px)",
                }}
              >
                <Link href={item.href} className={rc.iconNav.link}>
                  <div className={rc.iconNav.item}>
                    <div className={rc.iconNav.iconWrap}>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.label}
                          className={rc.iconNav.image}
                        />
                      ) : item.icon && item.gif ? (
                        <ThemedNavIcon
                          label={item.label}
                          icon={item.icon}
                          gif={item.gif}
                          glow={glow}
                        />
                      ) : item.icon ? (
                        <>
                          <item.icon
                            strokeWidth={1.8}
                            className={`${rc.iconNav.lucideIcon} ${glow.text} ${glow.shadow}`}
                          />

                          <div className={`${rc.iconNav.glowOrb} ${glow.bg}`} />
                        </>
                      ) : null}
                    </div>

                    <span className={rc.iconNav.label}>{item.label}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}