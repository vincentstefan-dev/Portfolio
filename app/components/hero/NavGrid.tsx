"use client";

import Link from "next/link";
import ThemedNavIcon from "@/app/components/template/theme/ThemedNavIcon";

type NavIcon = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
}>;

type MenuItem = {
  label: string;
  href: string;
  img?: string;
  icon?: NavIcon;
  gif: string;
};

type GlowStyle = {
  text: string;
  shadow: string;
  bg: string;
};

type NavGridProps = {
  items: MenuItem[];
  glow: GlowStyle;
  onOpenTheme: () => void;
};

const themeButtonGif = "/Gifs/questionmark.gif";

export default function NavGrid({ items, glow, onOpenTheme }: NavGridProps) {
  return (
    <nav aria-label="Main navigation" className="flex w-full justify-center">
      <div
        className="
          grid w-full max-w-[420px] grid-cols-2 place-items-center gap-x-10 gap-y-12
          sm:max-w-[520px] sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14
          md:max-w-[760px] md:grid-cols-3 md:gap-x-14 md:gap-y-14
          lg:max-w-[980px] lg:grid-cols-4 lg:gap-x-16 lg:gap-y-16
          xl:max-w-[1200px] xl:grid-cols-7 xl:gap-x-18 xl:gap-y-16
          2xl:max-w-7xl 2xl:grid-cols-7 2xl:gap-x-20 2xl:gap-y-0
        "
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex h-[82px] w-[90px] flex-col items-center justify-start text-center transition duration-300 hover:-translate-y-1 focus:outline-none"
          >
            <ThemedNavIcon
              label={item.label}
              icon={item.icon}
              img={item.img}
              gif={item.gif}
              glow={glow}
            />

            <span className="mt-2 text-sm text-white/70">{item.label}</span>
          </Link>
        ))}

        <button
          type="button"
          onClick={onOpenTheme}
          aria-label="Open theme selector"
          className="
            group col-span-2 flex h-[82px] w-[90px] flex-col items-center justify-start justify-self-center text-center
            transition duration-300 hover:-translate-y-1 focus:outline-none active:scale-95
            md:col-span-1 md:col-start-2
            lg:col-span-1
            xl:col-span-1
            2xl:col-span-1
          "
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-xl">
            <img
              src={themeButtonGif}
              alt=""
              className="pointer-events-none h-[50px] w-[50px] object-contain transition duration-300 md:group-hover:scale-[1.35]"
            />
          </span>

          <span className="mt-2 text-sm text-white/70">Themes</span>
        </button>
      </div>
    </nav>
  );
}