"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    label: "Projects",
    href: "#portfolio-index",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function PortfolioSideNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-7 text-sm font-semibold uppercase tracking-[0.2em] text-white/85 sm:left-10 md:flex lg:left-14">
      {navItems.map((item) => {
        const isActive =
          item.href === pathname ||
          (pathname.startsWith("/portfolio") && item.href === "/portfolio");

        return (
          <Link
            key={item.label}
            href={item.href}
            className="group flex items-center gap-4 transition hover:text-cyan-200"
          >
            <span
              className={`h-px w-5 transition ${
                isActive
                  ? "bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                  : "bg-transparent group-hover:bg-cyan-300"
              }`}
            />

            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}