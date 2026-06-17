"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const rotatingAstronautImages = [
  {
    src: "/Images/Astronaut/G1.png",
    alt: "Pixel astronaut god scene 1",
  },
  {
    src: "/Images/Astronaut/G2.png",
    alt: "Pixel astronaut god scene 2",
  },
  {
    src: "/Images/Astronaut/G3.png",
    alt: "Pixel astronaut god scene 3",
  },
  {
    src: "/Images/Astronaut/G4.png",
    alt: "Pixel astronaut god scene 4",
  },
  {
    src: "/Images/Astronaut/G5.png",
    alt: "Pixel astronaut god scene 5",
  },
  {
    src: "/Images/Astronaut/G6.png",
    alt: "Pixel astronaut god scene 6",
  },
  {
    src: "/Images/Astronaut/G7.png",
    alt: "Pixel astronaut god scene 7",
  },
  {
    src: "/Images/Astronaut/G8.png",
    alt: "Pixel astronaut god scene 8",
  },
  {
    src: "/Images/Astronaut/G9.png",
    alt: "Pixel astronaut god scene 9",
  },
];

export default function AstronautIntroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = rotatingAstronautImages[activeIndex];

  useEffect(() => {
    const imageInterval = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % rotatingAstronautImages.length;
      });
    }, 800);

    return () => window.clearInterval(imageInterval);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-[#f1dcc0]">
      {/* Background image carousel */}
      <img
        key={activeImage.src}
        src={activeImage.src}
        alt={activeImage.alt}
        className="absolute inset-0 h-full w-full object-cover object-center image-render-pixel background-fade"
        draggable={false}
      />

      {/* Dark CRT overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] scanline-layer" />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_32%,rgba(0,0,0,0.82)_100%)]" />

      {/* GOD comic link */}
      <Link
        href="/coolstuff/Astronaut"
        className="god-link absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        aria-label="Go to the next astronaut scene"
      >
        <span className="god-text">GOD</span>
      </Link>

      <style jsx>{`
        .image-render-pixel {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }

        .background-fade {
          animation: background-fade-in 500ms steps(4, end);
        }

        .scanline-layer {
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.18) 0px,
            rgba(255, 255, 255, 0.18) 1px,
            transparent 1px,
            transparent 4px
          );
          mix-blend-mode: overlay;
        }

        .god-link {
          text-decoration: none;
          transform-style: preserve-3d;
          transition:
            transform 160ms steps(2, end),
            filter 160ms steps(2, end);
        }

        .god-link:hover {
          transform: translate(-50%, -50%) scale(1.08) rotate(-2deg);
          filter: brightness(1.22);
        }

        .god-text {
          display: inline-block;
          font-family: var(--font-press-start), "Courier New", monospace;
          -webkit-font-smoothing: none;
          -moz-osx-font-smoothing: unset;
          text-rendering: geometricPrecision;

          color: #f8e0bd;
          font-size: clamp(3.2rem, 13vw, 13rem);
          line-height: 0.9;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;

          transform: rotate(-4deg) skew(-4deg);
          animation:
            god-impact 1.15s steps(2, end) infinite,
            god-shake 0.16s steps(2, end) infinite;

          text-shadow:
            7px 0 0 #3a281d,
            0 7px 0 #3a281d,
            7px 7px 0 #1a120d,
            -4px -4px 0 rgba(255, 255, 255, 0.28),
            0 0 18px rgba(255, 224, 189, 0.85),
            0 0 42px rgba(255, 224, 189, 0.55),
            0 0 90px rgba(255, 224, 189, 0.32);
        }

        @keyframes background-fade-in {
          from {
            opacity: 0.3;
            filter: brightness(0.75);
          }

          to {
            opacity: 1;
            filter: brightness(1);
          }
        }

        @keyframes god-impact {
          0%,
          100% {
            filter: brightness(1);
          }

          50% {
            filter: brightness(1.35);
          }
        }

        @keyframes god-shake {
          0%,
          100% {
            transform: rotate(-4deg) skew(-4deg) translate(0, 0);
          }

          25% {
            transform: rotate(-4deg) skew(-4deg) translate(2px, -1px);
          }

          50% {
            transform: rotate(-4deg) skew(-4deg) translate(-2px, 1px);
          }

          75% {
            transform: rotate(-4deg) skew(-4deg) translate(1px, 2px);
          }
        }

        @media (max-width: 760px) {
          .god-text {
            font-size: clamp(2.4rem, 15vw, 6rem);
            letter-spacing: 0.04em;
            text-shadow:
              4px 0 0 #3a281d,
              0 4px 0 #3a281d,
              4px 4px 0 #1a120d,
              -2px -2px 0 rgba(255, 255, 255, 0.24),
              0 0 18px rgba(255, 224, 189, 0.75),
              0 0 42px rgba(255, 224, 189, 0.45);
          }
        }
      `}</style>
    </section>
  );
}