"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";

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
    subtitle: "Image modificator app",
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
        className: rc.carousel.cardFeatured,
        featured: true,
      };
    }

    if (offset === 1) {
      return {
        className: rc.carousel.cardRight,
        featured: false,
      };
    }

    return {
      className: rc.carousel.cardLeft,
      featured: false,
    };
  }

  return (
    <div className={rc.carousel.desktopWrap}>
      <button
        type="button"
        aria-label="Previous project"
        onClick={goToPrevious}
        className={`${rc.carousel.navButton} ${rc.carousel.navButtonLeft}`}
      >
        <ArrowLeft className={rc.carousel.navIcon} />
      </button>

      <button
        type="button"
        aria-label="Next project"
        onClick={goToNext}
        className={`${rc.carousel.navButton} ${rc.carousel.navButtonRight}`}
      >
        <ArrowRight className={rc.carousel.navIcon} />
      </button>

      <div className={rc.carousel.cardStage}>
        {carouselItems.map((item, index) => {
          const position = getCardPosition(index);

          return (
            <CarouselCard
              key={item.title}
              item={item}
              className={`${rc.carousel.cardBase} ${position.className}`}
              featured={position.featured}
            />
          );
        })}
      </div>

      <div className={rc.carousel.dotsWrap}>
        {carouselItems.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Go to ${item.title}`}
            onClick={() => setActiveIndex(index)}
            className={`${rc.carousel.dot} ${
              index === activeIndex
                ? rc.carousel.dotActive
                : rc.carousel.dotInactive
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
    <article className={`${rc.carousel.article} ${className}`}>
      <div className={rc.carousel.articleInner}>
        <div className={rc.carousel.articleTop}>
          <div>
            <h2
              className={`${rc.carousel.title} ${
                featured
                  ? rc.carousel.titleFeatured
                  : rc.carousel.titleNormal
              }`}
            >
              {item.title}
            </h2>

            <p className={rc.carousel.subtitle}>{item.subtitle}</p>
          </div>

          <span className={rc.carousel.menuIcon}>≡</span>
        </div>

        <div className={rc.carousel.imageWrap}>
          <img src={item.image} alt={item.title} className={rc.carousel.image} />

          <div className={rc.carousel.imageOverlay} />
        </div>

        <div className={rc.carousel.bottomRow}>
          <div>
            <p className={rc.carousel.tag}>{item.tag}</p>

            <p className={rc.carousel.value}>{item.value}</p>
          </div>

          <Link href={item.href} className={rc.carousel.link}>
            View Project
            <ArrowUpRight className={rc.carousel.linkIcon} />
          </Link>
        </div>
      </div>

      <div className={rc.carousel.articleOverlay} />
    </article>
  );
}