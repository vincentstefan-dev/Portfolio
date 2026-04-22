"use client";

import Link from "next/link";
import {
  Cormorant_Garamond,
  Montserrat,
  Luxurious_Script,
} from "next/font/google";
import CursorSparkles from "../../components/CursorSparkles";

import {
  House,
} from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const luxuriousScript = Luxurious_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-luxurious-script",
});

export default function HomePage() {
  const videoId = "29XymHesxa0";

  return (
    <>
      <CursorSparkles />

      <main
        className={`${cormorant.variable} ${montserrat.variable} ${luxuriousScript.variable} relative h-screen w-full overflow-hidden bg-black`}
      >
        {/* YOUTUBE BACKGROUND */}
        <div className="absolute inset-0">
          <iframe
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&playsinline=1`}
            title="Background video"
            allow="autoplay; encrypted-media"
          />
        </div>

        {/* DARK GREEN FILM OVERLAY */}
        <div className="absolute inset-0 bg-[#0f2a12]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.28)_100%)]" />

        {/* CONTENT */}
        <section className="relative z-10 flex h-screen w-full flex-col items-center justify-center px-8 py-8 md:px-14 md:py-12">
          {/* HERO TEXT */}
          <div className="max-w-[760px] pt-4 text-left md:pt-6">
            <p
              className="leading-[0.88] tracking-[-0.03em] text-[#f2dc78]"
              style={{
                fontFamily: "var(--font-luxurious-script)",
                fontSize: "clamp(12rem, 9vw, 12rem)",
                fontWeight: 400,
              }}
            >
              Wander
            </p>

            <div className="mt-[-0.2em] flex items-center justify-center">
              <Link href="/portfolio">
                <span
                  className="inline-flex cursor-pointer items-center justify-center text-[#f2dc78] transition-all duration-200 hover:scale-105"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1rem, 2vw, 2rem)",
                    fontWeight: 600,
                    fontStyle: "italic",
                    lineHeight: 1,
                    opacity: 0.85,
                    border: "1px solid rgba(242, 220, 120, 0.5)",
                    borderRadius: "999px",
                    padding: "0.2em 0.9em",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  inside
                </span>
              </Link>
            </div>

            <p
              className="mt-[-0.05em] leading-[0.82] tracking-[-0.04em] text-[#f2dc78]"
              style={{
                fontFamily: "var(--font-luxurious-script)",
                fontSize: "clamp(12rem, 9vw, 12rem)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              The Forest
            </p>
          </div>

          {/* INQUIRY BLOCK */}
          <div className="absolute bottom-10 right-10 max-w-[560px] text-right text-[#f2dc78]">
            <p
              className="mb-3"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(0.9rem, 1.2vw, 1.2rem)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                opacity: 0.8,
              }}
            >
              INQUIRY
            </p>

            <div
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(0.8rem, 1.2vw, 1.3rem)",
                fontWeight: 600,
                lineHeight: 1.5,
                opacity: 0.9,
              }}
            >
              <p>Phone: 123-456-7890</p>
              <p style={{ whiteSpace: "nowrap" }}>
                Email: AntoniaSchindler@Ilovemybf.com
              </p>
            </div>
                  </div>
      {/* Return home (FIXED ERROR HERE) */}
            <div className="absolute bottom-6 right-6 z-30">
        <Link
          href="/portfolio"
          aria-label="Return to portfolio"
          className="group flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition hover:bg-white/50"
        >
          <House
            className="h-5 w-5 text-white transition-transform duration-100 group-hover:scale-110"
            strokeWidth={1.5}
          />
        </Link>
          </div>
        </section>
      </main>
    </>
  );
}