"use client";

import type { ReactNode } from "react";
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

export default function GoodbyeSection() {
  return (
    <section className="relative min-h-screen overflow-hidden border-t border-cyan-300/10 px-5 py-16 text-white sm:px-8 md:px-10 md:py-24 lg:px-16">
      <BackgroundDecor />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* MOBILE VERSION — divided into 3 clean parts */}
        <div className="block space-y-6 lg:hidden">
          {/* PART 1 — Goodbye / CTA */}
          <div className="rounded-[1.75rem] border border-cyan-300/20 bg-cyan-950/15 p-5 shadow-[0_0_35px_rgba(34,211,238,0.12)] backdrop-blur-md sm:p-7">
            <IntroContent />
          </div>

          {/* PART 2 — Contact panel */}
          <ContactPanel />

          {/* PART 3 — Final artifact / status */}
          <div className="rounded-[1.75rem] border border-cyan-300/15 bg-cyan-950/10 p-5 backdrop-blur-md">
            <BlobStatus />
          </div>
        </div>

        {/* DESKTOP VERSION */}
        <div className="hidden items-center gap-16 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <IntroContent />
          <ContactPanel />
        </div>

        {/* Desktop blob / status */}
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
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-35 md:opacity-40">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_75%_45%,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(20,184,166,0.2),transparent_40%)]" />
      </div>

      {/* Soft atmosphere layer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.18))]" />

      {/* Decorative HUD marks */}
      <div className="pointer-events-none absolute left-5 top-5 h-5 w-5 border-l border-t border-cyan-300/35 md:left-10 md:top-10 md:h-6 md:w-6" />
      <div className="pointer-events-none absolute right-5 top-5 h-5 w-5 border-r border-t border-cyan-300/35 md:right-10 md:top-10 md:h-6 md:w-6" />
      <div className="pointer-events-none absolute bottom-5 left-5 h-5 w-5 border-b border-l border-cyan-300/35 md:bottom-10 md:left-10 md:h-6 md:w-6" />
      <div className="pointer-events-none absolute bottom-5 right-5 h-5 w-5 border-b border-r border-cyan-300/35 md:bottom-10 md:right-10 md:h-6 md:w-6" />

      {/* Small floating details */}
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
        If the work resonated, let&apos;s build something meaningful together.
      </p>

      <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-7 text-white/75 sm:text-base md:mt-8 md:space-y-5 md:text-lg">
        <p>
          I&apos;m always open to new projects, collaborations, and experiments
          — from brand systems and digital products to web experiences and
          creative prototypes.
        </p>

        <p>
          Have an idea, a challenge, or just want to talk shop? I&apos;d love to
          hear from you.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row md:mt-10">
        <Link
          href="/contact"
          className="group flex h-14 items-center justify-center gap-3 rounded-2xl bg-cyan-300 px-6 text-base font-semibold text-[#052323] shadow-[0_0_35px_rgba(34,211,238,0.35)] transition duration-300 hover:scale-[1.02] hover:bg-cyan-200 hover:shadow-[0_0_50px_rgba(34,211,238,0.55)] sm:h-16 sm:gap-4 sm:px-8 sm:text-lg"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#052323] sm:h-11 sm:w-11">
            <ArrowUpRight className="h-5 w-5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          Start a project
        </Link>

        <a
          href="mailto:hello@vincent-lab.dev"
          className="group flex h-14 items-center justify-center gap-3 rounded-2xl border border-cyan-300/40 bg-cyan-950/20 px-6 text-base font-semibold text-white backdrop-blur-md transition duration-300 hover:scale-[1.02] hover:border-cyan-300/80 hover:bg-cyan-300/10 sm:h-16 sm:gap-4 sm:px-8 sm:text-lg"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200 sm:h-11 sm:w-11">
            <Mail className="h-5 w-5" />
          </span>
          Say hello
        </a>
      </div>

      <div className="mt-6 inline-flex max-w-full items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-950/20 px-4 py-3 text-xs text-white/65 backdrop-blur-md sm:mt-8 sm:gap-4 sm:px-6 sm:text-sm">
        <Globe className="h-4 w-4 shrink-0 text-cyan-300" />
        <span className="truncate">Based in Berlin / working globally</span>
        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
      </div>
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-300/25 bg-cyan-950/20 shadow-[0_0_45px_rgba(34,211,238,0.14)] backdrop-blur-xl sm:rounded-[2rem] md:border-cyan-300/35 md:shadow-[0_0_60px_rgba(34,211,238,0.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_45%)]" />

        <div className="relative flex items-center justify-between border-b border-cyan-300/10 p-4 sm:p-6 md:p-7">
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-950/40 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-cyan-100/70 sm:px-5 sm:text-xs sm:tracking-[0.25em]">
            Let&apos;s connect
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 text-cyan-100 sm:h-12 sm:w-12">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="relative divide-y divide-cyan-300/10">
          <ContactRow
            icon={<Mail className="h-5 w-5 sm:h-6 sm:w-6" />}
            label="Email"
            value="hello@vincent-lab.dev"
            href="mailto:hello@vincent-lab.dev"
          />

          <ContactRow
            icon={<Globe className="h-5 w-5 sm:h-6 sm:w-6" />}
            label="Portfolio"
            value="vincent-lab.dev"
            href="/"
          />

          <ContactRow
            icon={<Clock3 className="h-5 w-5 sm:h-6 sm:w-6" />}
            label="Availability"
            value="Open for freelance & collaborations"
            href="/contact"
          />

          <ContactRow
            icon={<Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />}
            label="Next step"
            value="You reach out. We build from there."
            href="/contact"
          />
        </div>

        <div className="relative p-4 sm:p-6 md:p-7">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-cyan-300/15 bg-cyan-950/30 px-4 py-4 text-xs text-cyan-100/70 sm:px-5 sm:text-sm">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <Plus className="h-4 w-4 shrink-0 text-cyan-300" />
              <span className="leading-5">
                Thoughtful ideas. Clear systems. Lasting impact.
              </span>
            </div>

            <Heart className="h-4 w-4 shrink-0 text-cyan-200/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BlobStatus() {
  return (
    <>
      {/* Metallic pixel blob */}
      <div className="pointer-events-none relative z-10 mx-auto flex max-w-7xl justify-center lg:mt-16">
        <img
          src="/Icons/8BIT.png"
          alt=""
          className="w-[210px] opacity-90 drop-shadow-[0_0_28px_rgba(34,211,238,0.45)] sm:w-[260px] md:w-[360px] md:opacity-95"
        />
      </div>

      {/* Bottom status strip */}
      <div className="relative z-10 mx-auto mt-8 flex max-w-4xl flex-col items-center justify-center gap-4 text-center text-[10px] uppercase tracking-[0.28em] text-cyan-100/60 sm:flex-row sm:gap-8 sm:text-xs sm:tracking-[0.35em]">
        <span>Thanks for scrolling</span>

        <div className="hidden h-px w-40 items-center justify-center bg-cyan-300/30 sm:flex md:w-72">
          <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
        </div>

        <span>See you around :)</span>
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