"use client";

import { Rocket, type LucideIcon } from "lucide-react";
import DiscountEgg from "@/app/components/Discounts/DiscountEggSection";
import { processRc as rc } from "./aboutMeResponsiveConfig";

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
      chip:
        "border-blue-300/20 bg-blue-300/10 text-blue-100/75 shadow-[0_0_14px_rgba(59,130,246,0.08)]",
    },
    violet: {
      number: "text-violet-400",
      icon: "border-violet-400/50 text-violet-300 shadow-[0_0_35px_rgba(168,85,247,0.35)]",
      dot: "bg-violet-400 shadow-[0_0_18px_rgba(168,85,247,1)]",
      card: "border-violet-400/20 bg-violet-950/20",
      chip:
        "border-violet-300/20 bg-violet-300/10 text-violet-100/75 shadow-[0_0_14px_rgba(168,85,247,0.08)]",
    },
    cyan: {
      number: "text-cyan-300",
      icon: "border-cyan-300/50 text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.35)]",
      dot: "bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,1)]",
      card: "border-cyan-300/20 bg-cyan-950/20",
      chip:
        "border-cyan-300/20 bg-cyan-300/10 text-cyan-100/75 shadow-[0_0_14px_rgba(34,211,238,0.08)]",
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
  return (
    <section className={rc.section}>
      <div className={rc.background.mainGlow} />
      <div className={rc.background.sideGlow} />
      <div className={rc.background.grid} />

      <DiscountEgg className={rc.discount.desktop} />

      <div className={rc.shell}>
        <div className={rc.header.wrapper}>
          <p className={rc.header.eyebrow}>/ my process</p>

          <h2 className={rc.header.title}>How I think &amp; build</h2>

          <div className={rc.header.divider} />

          <p className={rc.header.text}>
            A practical operating system for moving from abstract problems to
            structured, testable digital solutions.
          </p>
        </div>

        <div className={rc.discount.mobile}>
          <DiscountEgg />
        </div>

        <div className={rc.mobile.grid}>
          {processSteps.map((step) => (
            <MobileProcessCard key={step.n} step={step} />
          ))}
        </div>

        <div className={rc.desktop.wrapper}>
          <div className={rc.desktop.line} />

          <div className={rc.desktop.grid}>
            {processSteps.map((step) => (
              <DesktopProcessCard key={step.n} step={step} />
            ))}
          </div>
        </div>

        <div className={rc.footer.divider}>
          <div className={rc.footer.line} />
          <span className={rc.footer.star}>✶</span>
          <div className={rc.footer.line} />
        </div>

        <p className={rc.footer.text}>
          A practical operating system for translating ideas into structure, and
          prototypes.
        </p>
      </div>
    </section>
  );
}

function MobileProcessCard({ step }: { step: ProcessStep }) {
  const colors = getColorClasses(step.color);

  return (
    <article className={`${rc.mobile.card} ${colors.card}`}>
      <div className={rc.mobile.cardGlow} />

      <div className={rc.mobile.contentRow}>
        <div className={`${rc.mobile.iconBox} ${colors.icon}`}>
          <ProcessIcon icon={step.icon} className={rc.mobile.iconSvg} />
        </div>

        <div className={rc.mobile.content}>
          <p className={`${rc.mobile.number} ${colors.number}`}>[{step.n}]</p>

          <h3 className={rc.mobile.title}>{step.title}</h3>

          <p className={rc.mobile.text}>{step.text}</p>
        </div>
      </div>

      <div className={rc.mobile.chipBox}>
        <div className={rc.mobile.chipGrid}>
          {step.items.map((item) => (
            <span key={item} className={`${rc.mobile.chip} ${colors.chip}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function DesktopProcessCard({ step }: { step: ProcessStep }) {
  const colors = getColorClasses(step.color);

  return (
    <article className={rc.desktop.card}>
      <div className={rc.desktop.topRow}>
        <p className={`${rc.desktop.number} ${colors.number}`}>{step.n}</p>

        <div className={`${rc.desktop.iconBox} ${colors.icon}`}>
          <ProcessIcon icon={step.icon} className={rc.desktop.iconSvg} />

          <span className={`${rc.desktop.dot} ${colors.dot}`} />
        </div>
      </div>

      <h3 className={rc.desktop.title}>{step.title}</h3>

      <p className={rc.desktop.text}>{step.text}</p>

      <div className={rc.desktop.itemBox}>
        <div className={rc.desktop.itemStack}>
          {step.items.map((item) => (
            <p key={item}>↗ {item}</p>
          ))}
        </div>
      </div>
    </article>
  );
}