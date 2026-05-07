"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode, CSSProperties, MouseEvent } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  Globe,
  Clock3,
  Sparkles,
  Heart,
  Plus,
} from "lucide-react";

type FireworkSpark = {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  color: string;
};

export default function GoodbyeSection() {
  return (
    <section className="relative min-h-screen overflow-hidden border-t border-cyan-300/10 px-5 py-16 text-white sm:px-8 md:px-10 md:py-24 lg:px-16">
      <BackgroundDecor />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* MOBILE VERSION — divided into 3 clean parts */}
        <div className="block space-y-6 lg:hidden">
          <div className="rounded-[1.75rem] border border-cyan-300/20 bg-cyan-950/15 p-5 shadow-[0_0_35px_rgba(34,211,238,0.12)] backdrop-blur-md sm:p-7">
            <IntroContent />
          </div>

          <ContactPanel />

          <div className="rounded-[1.75rem] border border-cyan-300/15 bg-cyan-950/10 p-5 backdrop-blur-md">
            <BlobStatus />
          </div>
        </div>

        {/* DESKTOP VERSION */}
        <div className="hidden items-center gap-16 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <IntroContent />
          <ContactPanel />
        </div>

        <div className="hidden lg:block">
          <BlobStatus />
        </div>
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-35 md:opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="pointer-events-none absolute left-5 top-5 h-5 w-5 border-l border-t border-cyan-300/35 md:left-10 md:top-10 md:h-6 md:w-6" />
      <div className="pointer-events-none absolute right-5 top-5 h-5 w-5 border-r border-t border-cyan-300/35 md:right-10 md:top-10 md:h-6 md:w-6" />
      <div className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 border-b border-l border-cyan-300/35 md:bottom-10 md:left-10 md:h-6 md:w-6" />
      <div className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 border-b border-r border-cyan-300/35 md:bottom-10 md:right-10 md:h-6 md:w-6" />

      <div className="pointer-events-none absolute left-[6%] top-[32%] hidden h-2 w-2 rounded-full border border-cyan-300/50 md:block" />

      <div className="pointer-events-none absolute right-[12%] top-[9%] text-2xl text-cyan-300/60 md:right-[16%] md:top-[12%] md:text-3xl">
        ✶
      </div>

      <div className="pointer-events-none absolute left-[38%] top-[22%] hidden text-3xl text-cyan-200/60 md:block">
        ✧
      </div>
    </>
  );
}

function IntroContent() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-cyan-100/70 sm:text-xs md:mb-8 md:tracking-[0.45em]">
        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
        Final Signal
      </div>

      <h2 className="max-w-2xl text-[48px] font-black leading-[0.9] tracking-[-0.06em] text-white drop-shadow-[0_0_28px_rgba(255,255,255,0.12)] min-[390px]:text-[56px] sm:text-7xl md:text-8xl lg:text-9xl">
        Goodbye,
        <br />
        for now
        <span className="text-cyan-300">.</span>
      </h2>

      <p className="mt-8 max-w-2xl text-xl font-semibold leading-tight tracking-[-0.03em] text-cyan-300 sm:text-2xl md:mt-10 md:text-3xl">
        If you like my work, let&apos;s build something meaningful together.
      </p>

      <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-7 text-white/75 sm:text-base md:mt-8 md:space-y-5 md:text-lg">
        <p>
          I&apos;m always open to new projects, collaborations, and experiments;
          anything that can help me grow, I am willing to give my attention and
          skills to.
          <br />
          I would love to hear about your projects and dreams.
        </p>

        <p>
          Have an idea, a problem to solve, or a project in progress? Let&apos;s
          talk.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 md:mt-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/contact" className="rainbow-project-button group">
            <span className="rainbow-project-button-icon">
              <ArrowUpRight className="h-5 w-5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            Start a project
          </Link>

          <a
            href="https://wa.me/4915778786924?text=Hi%20Vincent%2C%20I%20wanted%20to%20reach%20out."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-14 items-center justify-center gap-3 rounded-2xl border border-cyan-300/40 bg-cyan-950/20 px-6 text-base font-semibold text-white backdrop-blur-md transition duration-300 hover:scale-[1.02] hover:border-cyan-300/80 hover:bg-cyan-300/10 sm:h-16 sm:gap-4 sm:px-8 sm:text-lg"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200 sm:h-11 sm:w-11">
              <Mail className="h-5 w-5" />
            </span>
            Text me 📬
          </a>
        </div>

        <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-950/20 px-4 py-3 text-xs text-white/65 backdrop-blur-md sm:gap-4 sm:px-6 sm:text-sm">
          <Globe className="h-4 w-4 shrink-0 text-cyan-300" />
          <span className="truncate">Built from Berlin · Working globally</span>
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
        </div>
      </div>
    </div>
  );
}

function FireworkPortal({ sparks }: { sparks: FireworkSpark[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || sparks.length === 0) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[2147483647]">
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="firework-particle"
          style={
            {
              left: `${spark.x}px`,
              top: `${spark.y}px`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              backgroundColor: spark.color,
              boxShadow: `0 0 12px ${spark.color}, 0 0 28px ${spark.color}`,
              "--tx": `${spark.tx}px`,
              "--ty": `${spark.ty}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>,
    document.body
  );
}

function ContactPanel() {
  const [fireworks, setFireworks] = useState<FireworkSpark[]>([]);

  const triggerFireworks = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const colors = [
      "#67e8f9",
      "#22d3ee",
      "#a855f7",
      "#facc15",
      "#fb7185",
      "#ffffff",
      "#4ade80",
    ];

    const sparkCount = 90;

    const burst = Array.from({ length: sparkCount }, (_, i) => {
      const angle = (Math.PI * 2 * i) / sparkCount;
      const distance = 90 + Math.random() * 190;

      return {
        id: Date.now() + i,
        x: originX,
        y: originY,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        size: 4 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    setFireworks(burst);

    window.setTimeout(() => {
      setFireworks([]);
    }, 1200);
  };

  return (
    <div className="relative">
      {/* Fireworks layer — fixed so it does not get clipped */}
      <FireworkPortal sparks={fireworks} />

      <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-300/25 bg-cyan-950/20 shadow-[0_0_45px_rgba(34,211,238,0.14)] backdrop-blur-xl sm:rounded-[2rem] md:border-cyan-300/35 md:shadow-[0_0_60px_rgba(34,211,238,0.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_45%)]" />

        <div className="relative flex items-center justify-between border-b border-cyan-300/10 p-4 sm:p-6 md:p-7">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-950/40 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-cyan-100/70 sm:px-5 sm:text-xs sm:tracking-[0.25em]">
            Let&apos;s Talk!
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>

          <button
            type="button"
            onClick={triggerFireworks}
            className="firework-trigger-debug group/firework relative z-20 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 text-cyan-100 transition duration-300 hover:scale-110 hover:border-cyan-200 hover:bg-cyan-300/20 active:scale-95 sm:h-12 sm:w-12"            aria-label="Trigger fireworks"
          >
            <ArrowUpRight className="relative z-10 h-5 w-5 transition duration-300 group-hover/firework:translate-x-0.5 group-hover/firework:-translate-y-0.5" />
          </button>
        </div>

        <div className="relative divide-y divide-cyan-300/10">
          <ContactRow
            icon={<Mail className="h-5 w-5 sm:h-6 sm:w-6" />}
            label="Email"
            value="Vincentstefan@Icloud.com"
            href="mailto:hello@vincent-lab.dev"
          />

          <ContactRow
            icon={<Globe className="h-5 w-5 sm:h-6 sm:w-6" />}
            label="Portfolio"
            value="The studio."
            href="/potfgolio"
          />

          <ContactRow
            icon={<Clock3 className="h-5 w-5 text-emerald-400 sm:h-6 sm:w-6" />}
            label="Availability"
            value="Open for freelance & collaborations"
            href="/contact"
          />

          <ContactRow
            icon={<Sparkles className="h-5 w-5 text-cyan-300 sm:h-6 sm:w-6" />}
            label="Let’s start somewhere"
            value="Send me your idea, even if it’s messy, we can shape it together 👾 ."
            href="/contact"
          />
        </div>

<div className="relative p-4 sm:p-6 md:p-7">
  <div className="flex items-center justify-between gap-4 rounded-2xl border border-cyan-300/15 bg-cyan-950/30 px-4 py-4 text-xs text-cyan-100/70 sm:px-5 sm:text-sm">
    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
      <Plus className="h-4 w-4 shrink-0 text-cyan-300" />
      <span className="leading-5">
        Start with a message, let’s shape the next thing.
      </span>
    </div>

    <img
      src="/Gifs/REDHEART.gif"
      alt=""
      className="h-5 w-5 shrink-0 object-contain opacity-90"
    />
  </div>
</div>
      </div>
    </div>
  );
}

function BlobStatus() {
  return (
    <>
      <div className="pointer-events-none relative z-10 mx-auto flex max-w-7xl justify-center lg:mt-16">
        <img
          src="/Icons/8BIT.png"
          alt=""
          className="w-[210px] opacity-90 drop-shadow-[0_0_28px_rgba(34,211,238,0.45)] sm:w-[260px] md:w-[360px] md:opacity-95"
        />
      </div>

      <div className="relative z-10 mx-auto mt-8 flex max-w-4xl flex-col items-center justify-center gap-4 text-center text-[10px] uppercase tracking-[0.28em] text-cyan-100/60 sm:flex-row sm:gap-8 sm:text-xs sm:tracking-[0.35em]">
        <span>Thanks for Watching</span>

        <div className="hidden h-px w-40 items-center justify-center bg-cyan-300/30 sm:flex md:w-72">
          <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
        </div>

      <span className="inline-flex items-center gap-2">
        See you!
        <img
          src="Gifs/Mishi/MISHI1.gif"
          alt=""
          className="h-5 w-5 object-contain"
        />
      </span>
      </div>
    </>
  );
}

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
};

function ContactRow({ icon, label, value, href }: ContactRowProps) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 p-4 transition duration-300 hover:bg-cyan-300/5 sm:p-6 md:p-7"
    >
      <div className="flex min-w-0 items-center gap-4 sm:gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/10 bg-cyan-300/10 text-cyan-100 shadow-[inset_0_0_20px_rgba(34,211,238,0.08)] sm:h-14 sm:w-14">
          {icon}
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-semibold text-white sm:text-lg">
            {label}
          </h3>

          <p className="mt-1 truncate font-mono text-xs text-cyan-300 sm:text-sm">
            {value}
          </p>
        </div>
      </div>

      <ArrowUpRight className="h-5 w-5 shrink-0 text-white/70 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-cyan-200" />
    </Link>
  );
}