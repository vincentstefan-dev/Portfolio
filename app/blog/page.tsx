"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Minus, X, House } from "lucide-react";

type ExpandedImage = {
  src: string;
  alt: string;
};


export default function TechBlueBlogEntry() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [isPopupMinimized, setIsPopupMinimized] = useState(false);
  const [expandedImage, setExpandedImage] = useState<ExpandedImage | null>(null);

  const handleMinimize = () => {
    setIsPopupOpen(false);
    setIsPopupMinimized(true);
  };

  const handleRestore = () => {
    setIsPopupOpen(true);
    setIsPopupMinimized(false);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
    setIsPopupMinimized(false);
  };

  const openExpandedImage = (src: string, alt: string) => {
    setExpandedImage({ src, alt });
  };

  const closeExpandedImage = () => {
    setExpandedImage(null);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#d9ebff] text-white">
      {/* BASE ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.95),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(77,139,255,0.22),transparent_26%),linear-gradient(180deg,#eaf4ff_0%,#cfe5ff_35%,#bedcff_100%)]" />

      {/* SOFT FOREGROUND BLOBS */}
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#8ab8ff]/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-52 -translate-x-1/2 rounded-full bg-[#98bfff]/45 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 right-8 h-56 w-56 rounded-full bg-[#6ea3ff]/20 blur-3xl" />

      {/* UI BLUEPRINT LINES */}
      <div className="pointer-events-none absolute inset-0 opacity-45">
        <div className="absolute left-[8%] top-[52%] h-px w-[58%] bg-[#5f85cf]/70" />
        <div className="absolute left-[50%] top-[18%] h-[48%] w-px bg-[#8caef2]/60" />
        <div className="absolute left-[18%] bottom-[12%] h-40 w-28 rounded-[28px] border border-[#9ab9f6]/35" />
        <div className="absolute left-[44%] top-[50%] h-28 w-28 border border-[#88a9ea]/70" />
        <div className="absolute right-[14%] bottom-[30%] h-36 w-36 border-2 border-white/55" />
        <div className="absolute left-[58%] bottom-[18%] h-24 w-24 border border-[#88a9ea]/40" />
        <div className="absolute left-[33%] top-[43%] h-8 w-40 border border-[#90afea]/40" />
        <div className="absolute right-[20%] top-[32%] h-10 w-10 border border-[#8faee8]/45" />
      </div>

      {/* MICRO GRID / TECH MARKS */}
      <div className="pointer-events-none absolute inset-0 opacity-100 mix-blend-screen">
        <div className="absolute left-[31%] top-[40%] text-[10px] tracking-[0.4em] text-[#8cb5ff]">
          ::: :::
        </div>
        <div className="absolute right-[15%] top-[40%] text-[10px] tracking-[0.4em] text-[#8cb5ff]">
          ::: :::
        </div>
        <div className="absolute left-[48%] bottom-[42%] text-[9px] tracking-[0.35em] text-[#8cb5ff]">
          000 010 101
        </div>
        <div className="absolute left-[22%] bottom-[41%] text-[9px] tracking-[0.35em] text-[#8cb5ff]">
          
        </div>
        <div className="absolute right-[11%] bottom-[22%] text-[9px] tracking-[0.3em] text-[#8cb5ff]">
          SYS 02
        </div>
      </div>

      {/* CONTENT FRAME */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16 md:px-10">
        <div className="grid w-full items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT CONTENT */}
          <article className="relative">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#8cb5ff]/50 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/85 backdrop-blur-md transition hover:bg-[#C2DAFF]/55"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              Back to archive
            </Link>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8cb5ff]/50 bg-[#7cabff]/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.32em] text-[#eef6ff] backdrop-blur-md">
              <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.7} />
              Blog entry 1
            </div>

            <h1 className="max-w-xl text-5xl font-medium uppercase leading-[0.92] tracking-[-0.04em] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] md:text-7xl">
              THE CONCEPT OF I
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[#edf5ff]/82 md:text-base">
              Lately I have been thinking about how my perception is seen
              through the lens of time and others, in a non-linear way. I am
              trying to understand the concept of &quot;I&quot; through your eyes and
              mine, through the past and future.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/25 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
                Me
              </span>
              <span className="rounded-full border border-white/25 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
                Therapy
              </span>
              <span className="rounded-full border border-white/25 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur-md">
                Editorial self
              </span>
            </div>
          </article>

          {/* RIGHT VISUAL STACK */}
          <div className="relative h-[540px] md:h-[620px]">
            {/* TOP OBJECT */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2">
              <div className="absolute inset-0 rounded-[2rem] bg-white/10 blur-2xl" />
              <button
                type="button"
                onClick={() =>
                  openExpandedImage("/Images/gifs/babyfinal.gif", "Decorative object")
                }
                className="relative rounded-[2rem] border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition duration-300 hover:scale-[1.03] hover:bg-white/15"
                aria-label="Expand top image"
              >
                <Image
                  src="/Images/gifs/babyfinal.gif"
                  alt="Decorative object"
                  width={130}
                  height={130}
                  className="h-auto w-[110px] object-contain grayscale contrast-125 md:w-[130px]"
                />
              </button>
            </div>

            {/* TITLE FLOAT */}
            <div className="absolute left-4 top-[33%] md:left-0">
              <div className="text-[42px] font-medium uppercase tracking-[-0.06em] text-white/90 drop-shadow-[0_0_12px_rgba(255,255,255,0.18)] md:text-[64px]">
                Vincent Lambour
              </div>
            </div>

            {/* OK PANEL */}
            <div className="absolute right-0 top-[50%] rounded-[1.5rem] border-2 border-white/65 bg-white/8 px-6 py-4 backdrop-blur-md md:px-8 md:py-5">
              <span className="text-5xl font-semibold lowercase tracking-[-0.08em] text-white/95 md:text-7xl">
                !
              </span>
            </div>

            {/* BOTTOM OBJECT */}
            <div className="absolute bottom-0 right-10">
              <div className="absolute inset-0 rounded-[2rem] bg-[#7faeff]/20 blur-2xl" />
              <button
                type="button"
                onClick={() =>
                  openExpandedImage("/Images/gifs/final.gif", "Tech object")
                }
                className="relative rounded-[2rem] border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition duration-300 hover:scale-[1.03] hover:bg-white/15"
                aria-label="Expand bottom image"
              >
                <Image
                  src="/Images/gifs/final.gif"
                  alt="Tech object"
                  width={220}
                  height={220}
                  className="h-auto w-[220px] object-contain brightness-75 contrast-125 md:w-[220px]"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RETRO POPUP WINDOW */}
      {isPopupOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-[320px] overflow-hidden rounded-[18px] border border-blue-200/20 bg-[#d6e2f2]/70 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:w-[380px]">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between border-b border-blue-200/20 bg-[#d6e2f2]/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-[#9fe870] shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">
                Memory window
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMinimize}
                aria-label="Minimize popup"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <Minus className="h-4 w-4" strokeWidth={2} />
              </button>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close popup"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* POPUP BODY */}
          <div className="relative">
            <div className="relative p-4">
              <div className="relative h-[500px] overflow-hidden rounded-[10px] border border-white/10 bg-black">
                <Image
                  src="/Images/TheconceptofI/concepti/clouds.jpg"
                  alt="Popup visual"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover opacity-85"
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.42))]" />
                <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:100%_3px]" />

                <div className="absolute left-4 top-4 max-w-[78%]">
                  <p className="text-[30px] font-semibold leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    IIIIIIIIIIIIIIIIIIIIIII
                  </p>
                  <p className="mt-1 text-sm font-medium leading-5 text-white/90">
                    The Concept of I
                  </p>
                  <p className="mt-3 text-[15px] leading-4 text-white/80">
                    The composition errored the self, and it can be viewed
                    non-linearly; as time accelerates, it also deteriorates from
                    a full concept in time, turned into a thumbnail, a preview,
                    an irreverent idea, squeezed through time and endless
                    connection; the self [et al] becomes compressed, ripped,
                    morphed, remixed, as connections of present, past, and
                    future alter the composition of the self [et al], and when
                    viewed in its equidistant, the self morphs from an
                    irreverent idea into the concrete self by the same process
                    of composition, morphism, and setting of reality. Lastly,
                    the self [et al] relationship with the self [et al] and its
                    degrees of value exist only as much as I, WE, ET AL engage
                    in the iteration, morphing, remixing of the self. We solely
                    decide the composition only and only when we are aware of
                    the deterioration as time accelerates.
                  </p>
                </div>

                <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-white/75">
                  Who · am I to you?
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-white/45">
                <span>1.47 mb</span>
                <span>Self archive</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MINIMIZED BAR */}
      {!isPopupOpen && isPopupMinimized && (
        <button
          type="button"
          onClick={handleRestore}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-full border border-white/15 bg-[#8cb5ff]/75 px-4 py-3 text-left shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:bg-[#8cb5ff]/85"
        >
          <div className="h-2.5 w-2.5 rounded-full bg-[#9fe870] shadow-[0_0_10px_rgba(159,232,112,0.8)]" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">
            Memory window minimized
          </span>
        </button>
      )}

      {/* EXPANDED IMAGE MODAL */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#90bffc]/55 p-6 backdrop-blur-md"
          onClick={closeExpandedImage}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/15 bg-[#90bffc]/12 shadow-[0_20px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-white/70">
                Expanded memory asset
              </span>

              <button
                type="button"
                onClick={closeExpandedImage}
                aria-label="Close expanded image"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="relative flex items-center justify-center p-5 md:p-8">
              <div className="relative max-h-[78vh] w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/25">
                <Image
                  src={expandedImage.src}
                  alt={expandedImage.alt}
                  width={1400}
                  height={1400}
                  className={`h-auto max-h-[78vh] w-full object-contain ${
                    expandedImage.src === "/Images/gifs/babyfinal.gif"
                      ? "grayscale contrast-125"
                      : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FILM / SCREEN WASH */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.14),transparent_18%,transparent_82%,rgba(255,255,255,0.12))] opacity-80" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:100%_4px]" />

      {/* HOME BUTTON */}
      <div className="absolute bottom-6 right-6 z-30">
        <Link
          href="/"
          aria-label="Return to portfolio"
          className="group flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition hover:bg-white/50"
        >
          <House
            className="h-5 w-5 text-white transition-transform duration-100 group-hover:scale-110"
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </main>
  );
}