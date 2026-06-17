"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

type CarouselItem = {
  title: string;
  subtitle: string;
  tag: string;
  value: string;
  image: string;
  href: string;
};

const carouselItems: CarouselItem[] = [
  {
    title: "Koyote",
    subtitle: "Personal brand project",
    tag: "Completion:",
    value: "75%",
    image: "/logos/16bit.webp",
    href: "#portfolio-index",
  },
  {
    title: "Sacred Human Experience",
    subtitle: "Health and wellness brand",
    tag: "Visual System and marketing strategy",
    value: "Executed",
    image: "/Icons/SHE.png",
    href: "#portfolio-index",
  },
  {
    title: "Pixelate",
    subtitle: "Image modifcator app",
    tag: "Application",
    value: "Completed",
    image: "/Icons/frog.png",
    href: "#portfolio-index",
  },
];

export default function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  function goToPrevious() {
    setActiveIndex((current) =>
      current === 0 ? carouselItems.length - 1 : current - 1
    );
  }

  function goToNext() {
    setActiveIndex((current) =>
      current === carouselItems.length - 1 ? 0 : current + 1
    );
  }

  function getCardPosition(index: number) {
    const total = carouselItems.length;
    const offset = (index - activeIndex + total) % total;

    if (offset === 0) {
      return {
        className:
          "z-30 h-[500px] w-[360px] translate-x-0 scale-100 rotate-0 opacity-100",
        featured: true,
      };
    }

    if (offset === 1) {
      return {
        className:
          "z-20 h-[390px] w-[250px] translate-x-[270px] scale-95 rotate-[5deg] opacity-70",
        featured: false,
      };
    }

    return {
      className:
        "z-20 h-[390px] w-[250px] -translate-x-[270px] scale-95 rotate-[-5deg] opacity-70",
      featured: false,
    };
  }

  return (
    <div className="relative hidden min-h-[620px] items-center justify-center lg:flex">
      <button
        type="button"
        aria-label="Previous project"
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300/5 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.25)] backdrop-blur-md transition hover:bg-cyan-300/15"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Next project"
        onClick={goToNext}
        className="absolute right-0 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300/5 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.25)] backdrop-blur-md transition hover:bg-cyan-300/15"
      >
        <ArrowRight className="h-5 w-5" />
      </button>

      <div className="relative flex h-[540px] w-full items-center justify-center">
        {carouselItems.map((item, index) => {
          const position = getCardPosition(index);

          return (
            <CarouselCard
              key={item.title}
              item={item}
              className={`absolute transition-all duration-500 ease-out ${position.className}`}
              featured={position.featured}
            />
          );
        })}
      </div>

      <div className="absolute bottom-10 left-1/2 z-40 flex -translate-x-1/2 gap-3">
        {carouselItems.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Go to ${item.title}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index === activeIndex
                ? "bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,1)]"
                : "bg-cyan-100/25 hover:bg-cyan-100/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselCard({
  item,
  className = "",
  featured = false,
}: {
  item: CarouselItem;
  className?: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-[2rem] border border-cyan-300/45 bg-[#04172f]/55 p-6 shadow-[0_0_34px_rgba(34,211,238,0.22),inset_0_0_34px_rgba(34,211,238,0.08)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-200/80 hover:shadow-[0_0_54px_rgba(34,211,238,0.36)] ${className}`}
    >
      <div className="relative z-20 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              className={`font-mono uppercase tracking-[0.08em] text-cyan-100 ${
                featured ? "text-2xl" : "text-lg"
              }`}
            >
              {item.title}
            </h2>

            <p className="mt-3 max-w-[14rem] text-sm leading-5 text-cyan-100/65">
              {item.subtitle}
            </p>
          </div>

          <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 text-cyan-200/80">
            ≡
          </span>
        </div>

        <div className="relative my-8 flex flex-1 items-center justify-center overflow-hidden rounded-[1.5rem] border border-cyan-300/20 bg-black/20 shadow-[inset_0_0_24px_rgba(34,211,238,0.12)]">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-contain p-4 opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.18),transparent_48%),linear-gradient(to_bottom,transparent,rgba(4,23,47,0.42))]" />
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-100/40">
              {item.tag}
            </p>

            <p className="mt-1 font-mono text-xl text-cyan-200">
              {item.value}
            </p>
          </div>

          <Link
            href={item.href}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-100/80 transition hover:text-cyan-200"
          >
            View Project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.16),transparent_45%),linear-gradient(135deg,rgba(34,211,238,0.08),transparent_45%)]" />
    </article>
  );
}