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
import {
  AppWindow,
  Clapperboard,
  FolderKanban,
  HeartHandshake,
  House,
  TreeDeciduous,
} from "lucide-react";

import ThemedNavIcon from "@/app/components/template/theme/ThemedNavIcon";
import { useThemeGlow } from "@/app/components/template/layout/useThemeGlow";
import type { SiteMode } from "@/app/components/template/theme/ThemeProvider";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";

type IconKey =
  | "home"
  | "she"
  | "antonia"
  | "heart"
  | "film"
  | "app"
  | "folder";

type MenuItem = {
  title?: string;
  label: string;
  description?: string;
  href: string;
  iconKey?: IconKey;
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

const iconMap = {
  home: House,
  she: HeartHandshake,
  antonia: TreeDeciduous,
  heart: HeartHandshake,
  film: Clapperboard,
  app: AppWindow,
  folder: FolderKanban,
};

const defaultMenuItems: MenuItem[] = [
  {
    title: "Home",
    label: "Home",
    iconKey: "home",
    href: "/",
    gif: "/Gifs/mystar.gif",
  },
  {
    title: "SHE",
    label: "Sacred Human Experience",
    image: "/Icons/SHE.png",
    href: "/portfolio/SHE",
  },
  {
    title: "Antonia",
    label: "Antonia Website",
    iconKey: "antonia",
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

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
    setIconOffsets(items.map(() => ({ x: 0, y: 0 })));
    setAreIconOffsetsReady(false);
  }, [items]);

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
            const Icon = item.iconKey ? iconMap[item.iconKey] : null;
            const displayTitle = item.title ?? item.label;

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
                <Link href={item.href} className={`${rc.iconNav.link} group`}>
                  <div className={rc.iconNav.item}>
                    <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-200/25 bg-black/35 shadow-[0_0_30px_rgba(103,232,249,0.28)] backdrop-blur-md transition duration-500 group-hover:scale-110 group-hover:border-cyan-200/60 group-hover:shadow-[0_0_45px_rgba(103,232,249,0.5)]">
                      <div className="absolute inset-0 rounded-2xl bg-cyan-200/10 blur-xl" />

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.label}
                          className="relative z-10 h-10 w-10 object-contain drop-shadow-[0_0_14px_rgba(103,232,249,0.55)]"
                        />
                      ) : Icon && item.gif ? (
                        <div className="relative z-10 flex h-10 w-10 items-center justify-center">
                          <ThemedNavIcon
                            label={item.label}
                            icon={Icon}
                            gif={item.gif}
                            glow={glow}
                          />
                        </div>
                      ) : Icon ? (
                        <Icon
                          strokeWidth={1.8}
                          className="relative z-10 h-9 w-9 text-cyan-100 drop-shadow-[0_0_14px_rgba(103,232,249,0.75)]"
                        />
                      ) : null}
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <span className={rc.iconNav.label}>{displayTitle}</span>

                      {item.description ? (
                        <span className="mt-2 max-w-[13rem] text-xs leading-snug text-white/55">
                          {item.description}
                        </span>
                      ) : item.title && item.label !== item.title ? (
                        <span className="mt-2 max-w-[13rem] text-xs leading-snug text-white/55">
                          {item.label}
                        </span>
                      ) : null}
                    </div>
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