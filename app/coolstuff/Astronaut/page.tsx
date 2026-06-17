"use client";

import Link from "next/link";

export default function AstronautIntroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-[#f1dcc0]">
      {/* Background image */}
      <img
        src="/Images/Astronaut/astronaut-intro 2.png"
        alt="Pixel astronaut portrait"
        className="absolute inset-0 h-full w-full object-cover object-center image-render-pixel"
        draggable={false}
      />

      {/* Dark CRT overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] scanline-layer" />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.78)_100%)]" />

      {/* Main title */}
      <div className="absolute left-1/2 top-[18%] z-20 w-full -translate-x-1/2 px-4 text-center">
        <h1 className="arcade-text crt-float text-[clamp(2.4rem,8vw,8rem)] leading-none tracking-[0.08em] text-[#f3d7b1]">
          ASTRONAUT
        </h1>
      </div>

      {/* Arcade menu */}
      <nav className="absolute left-1/2 top-[67%] z-20 flex -translate-x-1/2 flex-col items-center gap-6 text-center">
        <Link
          href="/coolstuff/Astronaut/Astronaut2"
          className="voxel-link crt-float-delay"
        >
          <span className="voxel-link-text start-text">START</span>
        </Link>

        <Link href="/" className="voxel-link crt-float-delay-2">
          <span className="voxel-link-text settings-text">BACK HOME</span>
        </Link>
      </nav>

      {/* Bottom helper text */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center">
        <p className="arcade-small animate-pulse text-xs tracking-[0.24em] text-[#c9ad8f]/80 sm:text-sm">
          PRESENTED BY KOYOTE STUDIO
        </p>
      </div>

      <style jsx>{`
        .image-render-pixel {
          image-rendering: pixelated;
          image-rendering: crisp-edges;
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

        .arcade-text,
        .arcade-small,
        .voxel-link,
        .voxel-link-text {
          font-family: var(--font-press-start), "Courier New", monospace;
          -webkit-font-smoothing: none;
          -moz-osx-font-smoothing: unset;
          text-rendering: geometricPrecision;
        }

        .arcade-text {
          text-shadow:
            4px 4px 0 #1d1712,
            -2px 0 0 rgba(255, 255, 255, 0.22),
            2px 0 0 rgba(80, 45, 25, 0.45),
            0 0 16px rgba(255, 216, 176, 0.45);
        }

        .arcade-small {
          text-shadow:
            2px 2px 0 #1d1712,
            0 0 10px rgba(255, 216, 176, 0.35);
        }

        .voxel-link {
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          text-decoration: none;
          image-rendering: pixelated;
          transform-style: preserve-3d;
          transition:
            transform 180ms steps(2, end),
            filter 180ms steps(2, end);
        }

        .voxel-link:hover {
          transform: translateY(-4px) scale(1.04);
          filter: brightness(1.18);
        }

        .voxel-link-text {
          display: inline-block;
          color: #f8e0bd;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-shadow:
            4px 0 0 #3a281d,
            0 4px 0 #3a281d,
            4px 4px 0 #1a120d,
            -2px -2px 0 rgba(255, 255, 255, 0.18),
            0 0 14px rgba(255, 224, 189, 0.65),
            0 0 28px rgba(255, 224, 189, 0.35);
          animation: voxel-glow 1.8s steps(2, end) infinite;
        }

        .start-text {
          font-size: clamp(1.3rem, 3.7vw, 3rem);
        }

        .settings-text {
          font-size: clamp(0.9rem, 2.4vw, 1.8rem);
          color: #c9ad8f;
          text-shadow:
            3px 0 0 #2b211a,
            0 3px 0 #2b211a,
            3px 3px 0 #110d0a,
            -1px -1px 0 rgba(255, 255, 255, 0.16),
            0 0 12px rgba(201, 173, 143, 0.55);
        }

        .crt-float {
          animation:
            float-title 4s ease-in-out infinite,
            crt-jitter 0.12s steps(2, end) infinite;
        }

        .crt-float-delay {
          animation:
            float-menu 3.2s ease-in-out infinite,
            crt-jitter 0.14s steps(2, end) infinite;
        }

        .crt-float-delay-2 {
          animation:
            float-menu 3.6s ease-in-out infinite,
            crt-jitter 0.16s steps(2, end) infinite;
          animation-delay: 0.35s;
        }

        @keyframes float-title {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes float-menu {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes crt-jitter {
          0%,
          100% {
            filter: brightness(1);
          }

          50% {
            filter: brightness(1.08);
          }
        }

        @keyframes voxel-glow {
          0%,
          100% {
            filter: brightness(1);
          }

          50% {
            filter: brightness(1.15);
          }
        }
      `}</style>
    </section>
  );
}