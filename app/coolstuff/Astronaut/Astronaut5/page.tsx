"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const dialogueLine =
  "...  ...  ...     ...             ....";

/* Main wallpaper stays fixed */
const mainBackground = {
  src: "/Images/Astronaut/LOOKING2.png",
  alt: "Pixel astronaut crater scene",
};

export default function AstronautIntroSection() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;

    const typingInterval = window.setInterval(() => {
      index += 1;
      setTypedText(dialogueLine.slice(0, index));

      if (index >= dialogueLine.length) {
        window.clearInterval(typingInterval);
      }
    }, 55);

    return () => window.clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-[#f1dcc0]">
      {/* Fixed background image */}
      <img
        src={mainBackground.src}
        alt={mainBackground.alt}
        className="absolute inset-0 h-full w-full object-cover object-center image-render-pixel"
        draggable={false}
      />

      {/* Dark CRT overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] scanline-layer" />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.78)_100%)]" />

      {/* RPG bottom interface */}
      <div className="absolute bottom-[7%] left-1/2 z-20 flex w-[min(94vw,1160px)] -translate-x-1/2 items-stretch gap-4">
        {/* Dialogue pane */}
        <div className="dialogue-pane relative min-h-[150px] flex-1 overflow-hidden rounded-[22px] border border-[#f8e0bd]/35 px-7 py-6 shadow-[0_0_35px_rgba(0,0,0,0.65)]">
          <div className="pointer-events-none absolute left-4 right-4 top-3 h-[34%] rounded-[18px] bg-gradient-to-b from-white/22 to-transparent opacity-70" />
          <div className="pointer-events-none absolute inset-3 rounded-[16px] border border-white/12" />

          <span className="dialogue-cursor absolute left-5 top-6 text-[#f8e0bd] sm:left-7 sm:top-7">
            ▸
          </span>

          <p className="dialogue-text relative z-10 max-w-[760px] pl-7 text-[clamp(0.72rem,1.25vw,1rem)] leading-[2.1] tracking-[0.08em] text-[#f8e0bd] sm:pl-8">
            {typedText}
            <span className="typing-caret">█</span>
          </p>
        </div>

        {/* Command pane */}
        <nav className="command-pane relative flex min-h-[150px] w-[min(34vw,330px)] flex-col justify-center gap-7 overflow-hidden rounded-[22px] border border-[#f8e0bd]/35 px-8 py-6 shadow-[0_0_35px_rgba(0,0,0,0.65)]">
          <div className="pointer-events-none absolute left-4 right-4 top-3 h-[34%] rounded-[18px] bg-gradient-to-b from-white/22 to-transparent opacity-70" />
          <div className="pointer-events-none absolute inset-3 rounded-[16px] border border-white/12" />

          <Link
            href="/coolstuff/Astronaut/Astronaut6"
            className="command-link relative z-10"
          >
            <span className="command-arrow">▶</span>
            <span>...</span>
          </Link>
        </nav>
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

        .dialogue-text,
        .dialogue-cursor,
        .typing-caret,
        .command-link,
        .command-arrow {
          font-family: var(--font-press-start), "Courier New", monospace;
          -webkit-font-smoothing: none;
          -moz-osx-font-smoothing: unset;
          text-rendering: geometricPrecision;
        }

        .dialogue-pane,
        .command-pane {
          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.18),
              rgba(255, 255, 255, 0.06) 35%,
              rgba(16, 13, 12, 0.72) 100%
            ),
            rgba(24, 19, 18, 0.58);
          backdrop-filter: blur(14px) saturate(1.35);
          -webkit-backdrop-filter: blur(14px) saturate(1.35);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.35),
            inset 0 -14px 28px rgba(0, 0, 0, 0.28),
            0 0 0 3px rgba(40, 28, 22, 0.55),
            0 22px 70px rgba(0, 0, 0, 0.65);
        }

        .dialogue-text {
          text-shadow:
            2px 2px 0 #1d1712,
            0 0 12px rgba(255, 224, 189, 0.45);
        }

        .dialogue-cursor {
          font-size: clamp(0.8rem, 1.5vw, 1rem);
          text-shadow:
            2px 2px 0 #1d1712,
            0 0 10px rgba(255, 224, 189, 0.7);
          animation: cursor-blink 0.9s steps(2, end) infinite;
        }

        .typing-caret {
          margin-left: 0.35rem;
          color: #f8e0bd;
          text-shadow:
            2px 2px 0 #1d1712,
            0 0 10px rgba(255, 224, 189, 0.7);
          animation: caret-blink 0.8s steps(2, end) infinite;
        }

        .command-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #f8e0bd;
          text-decoration: none;
          font-size: clamp(0.78rem, 1.35vw, 1.2rem);
          letter-spacing: 0.12em;
          line-height: 1.4;
          text-transform: uppercase;
          transition:
            transform 160ms steps(2, end),
            filter 160ms steps(2, end);
          text-shadow:
            3px 0 0 #3a281d,
            0 3px 0 #3a281d,
            3px 3px 0 #1a120d,
            -1px -1px 0 rgba(255, 255, 255, 0.16),
            0 0 14px rgba(255, 224, 189, 0.55);
        }

        .command-link:hover {
          transform: translateX(6px);
          filter: brightness(1.2);
        }

        .command-arrow {
          font-size: clamp(0.7rem, 1vw, 1rem);
          color: #f8e0bd;
          text-shadow:
            2px 2px 0 #1d1712,
            0 0 12px rgba(255, 224, 189, 0.75);
          animation: arrow-blink 0.9s steps(2, end) infinite;
        }

        @keyframes cursor-blink {
          0%,
          49% {
            opacity: 1;
          }

          50%,
          100% {
            opacity: 0.25;
          }
        }

        @keyframes arrow-blink {
          0%,
          49% {
            opacity: 1;
          }

          50%,
          100% {
            opacity: 0.25;
          }
        }

        @keyframes caret-blink {
          0%,
          49% {
            opacity: 1;
          }

          50%,
          100% {
            opacity: 0;
          }
        }

        @media (max-width: 760px) {
          .dialogue-pane {
            min-height: 140px;
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }

          .command-pane {
            min-height: 140px;
            width: 42vw;
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .command-link {
            gap: 0.55rem;
            font-size: 0.62rem;
          }

          .dialogue-text {
            font-size: 0.58rem;
            line-height: 2;
          }
        }

        @media (max-width: 560px) {
          .absolute.bottom-\\[7\\%\\] {
            flex-direction: column;
            gap: 0.75rem;
          }

          .command-pane {
            width: 100%;
            min-height: 95px;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }

          .dialogue-pane {
            min-height: 130px;
          }
        }
      `}</style>
    </section>
  );
}