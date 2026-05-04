"use client";

import { useEffect, useState } from "react";
import { Rocket, type LucideIcon } from "lucide-react";

type ProcessColor = "blue" | "violet" | "cyan";

type ProcessStep = {
  n: string;
  title: string;
  icon: string | LucideIcon;
  color: ProcessColor;
  text: string;
  items: string[];
};

const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Define",
    icon: "◉",
    color: "blue",
    text: "I start by identifying the real problem behind the request: what is being solved, why it matters, and what constraints shape the solution.",
    items: ["Graph theory", "Context mapping", "Project insights"],
  },
  {
    n: "02",
    title: "Deconstruct",
    icon: "✣",
    color: "violet",
    text: "I design the structure before building: the pipeline, dependencies, inputs, outputs, and contracts between each layer of the system.",
    items: ["Pipeline logic", "Input / output mapping", "Data contracts"],
  },
  {
    n: "03",
    title: "Scaffold",
    icon: "</>",
    color: "blue",
    text: "I use AI referencing, data patterns, and existing code buckets to create the first workable version of the idea without reinventing the wheel.",
    items: ["AI scaffolding", "Pattern research", "Data buckets"],
  },
  {
    n: "04",
    title: "Prototype",
    icon: Rocket,
    color: "cyan",
    text: "I turn the structure into a proof of concept, test the logic, refine the system, and prepare it for interface, brand, or product-level execution.",
    items: ["Proof of concept", "Applied code", "Iteration loop"],
  },
];

function getColorClasses(color: ProcessColor) {
  const map = {
    blue: {
      number: "text-blue-400",
      icon: "border-blue-400/50 text-blue-300 shadow-[0_0_35px_rgba(59,130,246,0.35)]",
      dot: "bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,1)]",
      card: "border-blue-400/20 bg-blue-950/20",
    },
    violet: {
      number: "text-violet-400",
      icon: "border-violet-400/50 text-violet-300 shadow-[0_0_35px_rgba(168,85,247,0.35)]",
      dot: "bg-violet-400 shadow-[0_0_18px_rgba(168,85,247,1)]",
      card: "border-violet-400/20 bg-violet-950/20",
    },
    cyan: {
      number: "text-cyan-300",
      icon: "border-cyan-300/50 text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.35)]",
      dot: "bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,1)]",
      card: "border-cyan-300/20 bg-cyan-950/20",
    },
  };

  return map[color] ?? map.blue;
}

function ProcessIcon({
  icon,
  className = "",
}: {
  icon: string | LucideIcon;
  className?: string;
}) {
  if (typeof icon === "string") {
    return <span>{icon}</span>;
  }

  const Icon = icon;

  return <Icon className={className} strokeWidth={1.8} />;
}

export default function ProcessSection() {
  const [showDiscountEgg, setShowDiscountEgg] = useState(false);

  useEffect(() => {
    const storageKey = "koyote-discount-egg-started-at";
    const tenMinutes = 10 * 60 * 1000;

    const now = Date.now();
    const storedStart = sessionStorage.getItem(storageKey);

    if (!storedStart) {
      sessionStorage.setItem(storageKey, String(now));
      setShowDiscountEgg(true);

      const timer = window.setTimeout(() => {
        setShowDiscountEgg(false);
      }, tenMinutes);

      return () => window.clearTimeout(timer);
    }

    const elapsed = now - Number(storedStart);
    const remaining = tenMinutes - elapsed;

    if (remaining > 0) {
      setShowDiscountEgg(true);

      const timer = window.setTimeout(() => {
        setShowDiscountEgg(false);
      }, remaining);

      return () => window.clearTimeout(timer);
    }

    setShowDiscountEgg(false);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden border border-cyan-400/20 text-white">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,220,255,0.16),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,220,255,0.16),transparent_25%),radial-gradient(circle_at_85%_35%,rgba(0,220,255,0.16),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70" />

      {/* Windows 98 mini popup - desktop only / 10-minute discount easter egg */}
      {showDiscountEgg && (
        <DiscountEgg className="absolute left-[7%] top-[23%] z-10 hidden font-mono lg:block" />
      )}

      <div className="relative z-10 mx-auto max-w-[1450px] px-5 py-16 sm:px-8 md:px-10 md:py-24 lg:px-6">
        {/* Header */}
        <div className="text-center">
          <p className="font-mono text-xs text-blue-400 sm:text-sm">
            / my process
          </p>

          <h2 className="mt-5 text-[42px] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl">
            How I think &amp; build
          </h2>

          <div className="mx-auto mt-5 h-[3px] w-20 rounded-full bg-blue-400 shadow-[0_0_22px_rgba(96,165,250,0.9)]" />

          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
            A practical operating system for moving from abstract problems to
            structured, testable digital solutions.
          </p>
        </div>

        {/* Mobile mini popup / 10-minute discount easter egg */}
        {showDiscountEgg && (
          <div className="mx-auto mt-10 block max-w-[290px] lg:hidden">
            <DiscountEgg />
          </div>
        )}

        {/* MOBILE VERSION */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:hidden">
          {processSteps.map((step) => (
            <MobileProcessCard key={step.n} step={step} />
          ))}
        </div>

        {/* DESKTOP VERSION */}
        <div className="relative mt-24 hidden md:block">
          <div className="absolute left-[7%] right-[7%] top-[90px] h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-300 shadow-[0_0_18px_rgba(59,130,246,0.7)]" />

          <div className="grid grid-cols-4 gap-8 xl:gap-12">
            {processSteps.map((step) => (
              <DesktopProcessCard key={step.n} step={step} />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-3xl items-center gap-6 text-blue-500/50 md:mt-10 md:gap-8">
          <div className="h-px flex-1 bg-blue-400/20" />
          <span className="text-2xl md:text-3xl">✶</span>
          <div className="h-px flex-1 bg-blue-400/20" />
        </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-7 text-white/35 sm:text-base md:text-lg">
            A practical operating system for translating ideas into structure,
            and prototypes.
          </p>
      </div>
    </section>
  );
}

function DiscountEgg({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="group w-[275px] overflow-hidden border-2 border-[#000] bg-[#c0c0c0] shadow-[2px_2px_0_#000] transition-transform duration-200 hover:-translate-y-[2px]">
        {/* Title bar */}
        <div className="relative z-20 flex items-center justify-between gap-2 bg-[#000080] px-2 py-[2px] text-[12px] text-white">
          <span className="min-w-0 truncate group-hover:hidden">
            System.exe
          </span>

          <span className="hidden min-w-0 truncate group-hover:inline">
            koyote_offer.exe
          </span>

          <div className="flex shrink-0 gap-[2px]">
            <div className="h-[12px] w-[12px] border border-black bg-[#c0c0c0] text-center text-[10px] leading-[10px] text-black">
              _
            </div>

            <div className="h-[12px] w-[12px] border border-black bg-[#c0c0c0] text-center text-[10px] leading-[10px] text-black">
              □
            </div>

            <div className="h-[12px] w-[12px] border border-black bg-[#c0c0c0] text-center text-[10px] leading-[10px] text-black">
              ×
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="relative min-h-[118px] overflow-hidden border-b-2 border-l-2 border-r-2 border-t-2 border-b-black border-l-white border-r-black border-t-white bg-[#c0c0c0] px-3 py-3 text-[13px] leading-[1.6] text-black">
          {/* Rainbow background layer */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#ff004c,#ff9f00,#fff200,#00ff85,#00c8ff,#7a5cff,#ff00f5,#ff004c)] bg-[length:400%_400%] animate-[koyoteDiscountRainbow_4s_linear_infinite]" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="group-hover:hidden">
              <p>hidden file found</p>
              <p>&gt; open?</p>
              <p>&gt; hover to unlock</p>
            </div>

            <div className="hidden group-hover:block">
              <p>&gt; discount unlocked:</p>
              <p>&gt; write the secret code</p>
              <p>&gt; on the contact email :)</p>
              <p>&gt; 30% off</p>
              <p>
                code:{" "}
                <span className="font-bold tracking-wide">MISHI30</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileProcessCard({ step }: { step: ProcessStep }) {
  const colors = getColorClasses(step.color);

  return (
    <article
      className={`relative overflow-hidden rounded-3xl border ${colors.card} p-5 shadow-[inset_0_0_28px_rgba(59,130,246,0.06)] backdrop-blur-md`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.16),transparent_38%)]" />

      <div className="relative flex items-start gap-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border bg-white/5 text-2xl backdrop-blur-xl ${colors.icon}`}
        >
          <ProcessIcon
            icon={step.icon}
            className="h-8 w-8 translate-x-[1px] -translate-y-[1px]"
          />
        </div>

        <div className="min-w-0">
          <p className={`font-mono text-sm ${colors.number}`}>[{step.n}]</p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            {step.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-white/60">{step.text}</p>
        </div>
      </div>

      <div className="relative mt-6 rounded-2xl border border-blue-400/20 bg-blue-950/20 p-4 backdrop-blur-md">
        <div className="space-y-3 text-sm text-white/65">
          {step.items.map((item) => (
            <p key={item}>↗ {item}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

function DesktopProcessCard({ step }: { step: ProcessStep }) {
  const colors = getColorClasses(step.color);

  return (
    <article className="relative">
      <div className="mb-8 flex items-center gap-7">
        <p className={`font-mono text-2xl ${colors.number}`}>{step.n}</p>

        <div
          className={`relative flex h-24 w-24 items-center justify-center rounded-[28px] border bg-white/5 text-4xl backdrop-blur-xl ${colors.icon}`}
        >
          <ProcessIcon
            icon={step.icon}
            className="h-10 w-10 translate-x-[1px] -translate-y-[2px]"
          />

          <span
            className={`absolute bottom-[-10px] left-1/2 h-5 w-5 -translate-x-1/2 rounded-full ${colors.dot}`}
          />
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-white">{step.title}</h3>

      <p className="mt-4 max-w-[260px] text-base leading-7 text-white/60">
        {step.text}
      </p>

      <div className="mt-8 w-full max-w-[260px] rounded-xl border border-blue-400/20 bg-blue-950/20 p-5 shadow-[inset_0_0_28px_rgba(59,130,246,0.06)] backdrop-blur-md">
        <div className="space-y-3 text-sm text-white/65">
          {step.items.map((item) => (
            <p key={item}>↗ {item}</p>
          ))}
        </div>
      </div>
    </article>
  );
}