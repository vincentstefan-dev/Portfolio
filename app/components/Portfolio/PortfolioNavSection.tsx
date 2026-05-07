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

import ThemedNavIcon from "@/app/template/theme/ThemedNavIcon";
import { useThemeGlow } from "@/app/components/layout/useThemeGlow";
import type { SiteMode } from "@/app/template/theme/ThemeProvider";

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
    <nav
      aria-label="Portfolio navigation"
      className="relative flex min-h-[120vh] w-full items-center justify-center px-6 py-24 text-white"
    >
      {/* LOCAL BACKGROUND DEPTH */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[42%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />

        <div className="absolute left-[22%] top-[30%] h-[32rem] w-[54rem] rotate-[-12deg] rounded-[50%] border border-cyan-300/10" />

        <div className="absolute left-[30%] top-[42%] h-[28rem] w-[50rem] rotate-[10deg] rounded-[50%] border border-blue-300/10" />

        <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* MAIN 100VH VISUAL AREA */}
      <div className="relative z-10 flex min-h-[100vh] w-full max-w-7xl items-center justify-center">
        <div
          ref={navClusterRef}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-14 lg:gap-20"
        >
          {items.map((item, index) => {
            const offset = iconOffsets[index] ?? { x: 0, y: 0 };

            return (
              <div
                key={`${item.href}-${item.label}-${index}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="will-change-transform will-change-opacity"
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
                <Link
                  href={item.href}
                  className="group block rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  <div className="flex w-24 flex-col items-center justify-center gap-3 rounded-2xl px-2 py-3 text-center transition duration-300 hover:-translate-y-1">
                    <div className="relative flex h-12 w-12 items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.label}
                          className="h-14 w-14 object-contain transition duration-300 group-hover:scale-110"
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
                            className={`h-12 w-12 text-white transition duration-300 group-hover:scale-110 ${glow.text} ${glow.shadow}`}
                          />

                          <div
                            className={`absolute inset-0 rounded-full bg-white/0 blur-xl transition duration-300 ${glow.bg}`}
                          />
                        </>
                      ) : null}
                    </div>

                    <span className="text-sm font-light tracking-tight text-[#e9d5ff]/70 group-hover:text-[#e9d5ff]/70">
                      {item.label}
                    </span>
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