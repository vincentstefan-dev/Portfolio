"use client";

import React, { useState } from "react";
import Link from "next/link";

type ProjectItem = {
  title: string;
  type: string;
  text: string;
  img: string;
  pos: string;
  size: "featured" | "normal";
  color: "violet" | "pink" | "orange" | "blue" | "slate";
  role: string;
  scope: string;
  stack: string;
  status: string;
};

const projects: ProjectItem[] = [
  {
    title: "Pierwszy Swag w Polsce",
    type: "PROJECT 1",
    text: "E-commerce website for the first streetwear brand in Poland. Design, development and e-commerce integration.",
    img: "/catridges/frutiger.png",
    pos: "left-[50%] top-[20px]",
    size: "featured",
    color: "violet",
    role: "Design + Development",
    scope: "E-commerce / Visual System / Integration",
    stack: "Web design / Front-end / Commerce",
    status: "Featured",
  },
  {
    title: "Stage Visuals",
    type: "PROJECT 2",
    text: "Visual identity and art direction for live events and shows.",
    img: "/catridges/silver.png",
    pos: "left-[30%] top-[45px]",
    size: "normal",
    color: "slate",
    role: "Visual Direction",
    scope: "Live visuals / Art direction / Event systems",
    stack: "Creative direction / Motion / Identity",
    status: "Selected",
  },
  {
    title: "Trasa Konca Świata",
    type: "PROJECT 3",
    text: "Promotional website and merch store for the tour.",
    img: "/catridges/prisma.png",
    pos: "right-[5%] top-[-20px]",
    size: "normal",
    color: "orange",
    role: "Web + Commerce",
    scope: "Promo site / Merch store / Tour system",
    stack: "Web design / Commerce / Content",
    status: "Live",
  },
  {
    title: "Huta",
    type: "PROJECT 4",
    text: "Modern website for a creative collective and studio.",
    img: "/catridges/gold.png",
    pos: "left-[5%] top-[430px]",
    size: "normal",
    color: "blue",
    role: "Website Design",
    scope: "Studio site / Identity / Web presence",
    stack: "Next.js / Tailwind / Visual system",
    status: "Studio",
  },
  {
    title: "Wine Bottle Label",
    type: "PROJECT 5",
    text: "Concept label design for a limited edition.",
    img: "/catridges/Green.png",
    pos: "left-[31%] top-[570px]",
    size: "normal",
    color: "pink",
    role: "Concept Design",
    scope: "Packaging / Label system / Art direction",
    stack: "Brand design / Print / Concept",
    status: "Concept",
  },
  {
    title: "Fantasmagorie",
    type: "PROJECT 6",
    text: "Experimental website exploring storytelling and animations.",
    img: "/catridges/bronce.png",
    pos: "right-[28%] top-[575px]",
    size: "normal",
    color: "slate",
    role: "Creative Development",
    scope: "Storytelling / Motion / Interaction",
    stack: "Front-end / Animation / Experimental UI",
    status: "Experiment",
  },
  {
    title: "Solar · Białas",
    type: "PROJECT 7",
    text: "Branding and visual identity for the album and merchandise.",
    img: "/catridges/red.png",
    pos: "right-[8%] top-[415px]",
    size: "normal",
    color: "blue",
    role: "Brand Identity",
    scope: "Album system / Merchandise / Visual identity",
    stack: "Branding / Art direction / Print",
    status: "Music",
  },
];

function getColorClasses(color: ProjectItem["color"]) {
  const map = {
    violet: {
      label: "text-violet-400",
      badge: "bg-violet-500/40 shadow-[0_0_18px_rgba(168,85,247,0.7)]",
      selected:
        "border-violet-400/70 shadow-[0_0_55px_rgba(168,85,247,0.45)]",
      pill: "border-violet-300/20 bg-violet-400/10 text-violet-200",
    },
    pink: {
      label: "text-pink-400",
      badge: "bg-pink-500/40 shadow-[0_0_18px_rgba(236,72,153,0.7)]",
      selected:
        "border-pink-400/70 shadow-[0_0_55px_rgba(236,72,153,0.35)]",
      pill: "border-pink-300/20 bg-pink-400/10 text-pink-200",
    },
    orange: {
      label: "text-orange-400",
      badge: "bg-orange-500/40 shadow-[0_0_18px_rgba(249,115,22,0.7)]",
      selected:
        "border-orange-400/70 shadow-[0_0_55px_rgba(249,115,22,0.35)]",
      pill: "border-orange-300/20 bg-orange-400/10 text-orange-200",
    },
    blue: {
      label: "text-blue-400",
      badge: "bg-blue-500/35 shadow-[0_0_18px_rgba(59,130,246,0.7)]",
      selected:
        "border-blue-400/70 shadow-[0_0_55px_rgba(59,130,246,0.35)]",
      pill: "border-blue-300/20 bg-blue-400/10 text-blue-200",
    },
    slate: {
      label: "text-slate-300",
      badge: "bg-slate-500/35 shadow-[0_0_18px_rgba(148,163,184,0.55)]",
      selected:
        "border-slate-300/60 shadow-[0_0_55px_rgba(148,163,184,0.28)]",
      pill: "border-slate-300/20 bg-slate-400/10 text-slate-200",
    },
  };

  return map[color];
}

function TiltImage({
  src,
  alt,
  isFeatured,
}: {
  src: string;
  alt: string;
  isFeatured: boolean;
}) {
  const [transform, setTransform] = useState(
    "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)"
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 14;
    const rotateX = -((y - centerY) / centerY) * 14;

    setTransform(
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)");
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`flex items-center justify-center overflow-visible rounded-xl transition-[filter] duration-300 ease-out hover:drop-shadow-[0_0_24px_rgba(34,211,238,0.45)] ${
        isFeatured ? "h-[160px]" : "h-[120px]"
      }`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-auto object-contain transition-transform duration-150 ease-out"
        style={{
          transform,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      />
    </div>
  );
}

function DesktopProjectNode({
  project,
  isSelected,
  onSelect,
}: {
  project: ProjectItem;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const colors = getColorClasses(project.color);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative z-10 block rounded-[24px] border bg-white/5 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_48px_rgba(34,211,238,0.25)] ${
        project.size === "featured" ? "w-[208px] p-6" : "w-[152px] p-5"
      } ${
        isSelected
          ? colors.selected
          : "border-white/10 shadow-[0_0_22px_rgba(59,130,246,0.16)]"
      }`}
    >
      <span
        className={`absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-sm transition group-hover:scale-110 ${colors.badge}`}
      >
        ↗
      </span>

      <TiltImage
        src={project.img}
        alt={project.title}
        isFeatured={project.size === "featured"}
      />

      <p
        className={`mt-5 text-[10px] font-bold uppercase tracking-[0.08em] ${colors.label}`}
      >
        {project.type}
      </p>

      <h3
        className={`mt-2 font-semibold text-white ${
          project.size === "featured" ? "text-xl" : "text-base"
        }`}
      >
        {project.title}
      </h3>

      <p className="mt-3 text-xs leading-5 text-white/55">{project.text}</p>
    </button>
  );
}

function MobileProjectCard({
  project,
  isSelected,
  onSelect,
}: {
  project: ProjectItem;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const colors = getColorClasses(project.color);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative z-10 block w-full rounded-[24px] border bg-white/5 p-5 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(34,211,238,0.25)] ${
        isSelected
          ? colors.selected
          : "border-white/10 shadow-[0_0_28px_rgba(59,130,246,0.16)]"
      }`}
    >
      <span
        className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition group-hover:scale-110 ${colors.badge}`}
      >
        ↗
      </span>

      <div className="flex items-start gap-4">
        <div className="flex h-[116px] w-[116px] shrink-0 items-center justify-center overflow-visible rounded-xl">
          <img
            src={project.img}
            alt={project.title}
            className="h-full w-full object-contain drop-shadow-[0_0_24px_rgba(34,211,238,0.18)]"
          />
        </div>

        <div className="min-w-0 pr-8">
          <p
            className={`mt-1 text-xs font-bold uppercase tracking-[0.08em] ${colors.label}`}
          >
            {project.type}
          </p>

          <h3 className="mt-3 text-xl font-semibold leading-tight text-white">
            {project.title}
          </h3>

          <p className="mt-4 text-sm leading-6 text-white/55">
            {project.text}
          </p>
        </div>
      </div>
    </button>
  );
}

function SelectedProjectPanel({
  selectedProject,
  selectedIndex,
  onPrevious,
  onNext,
  mobile = false,
}: {
  selectedProject: ProjectItem;
  selectedIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  mobile?: boolean;
}) {
  const colors = getColorClasses(selectedProject.color);

  return (
    <aside
      className={`z-30 rounded-[24px] border border-blue-300/25 bg-blue-950/30 shadow-[0_0_44px_rgba(59,130,246,0.22),inset_0_0_32px_rgba(59,130,246,0.08)] backdrop-blur-2xl ${
        mobile
          ? "relative mt-6 p-5"
          : "absolute right-0 top-[15px] w-[272px] p-5"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-violet-300">
          Selected node
        </p>

        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white/50">
          ×
        </span>
      </div>

      <div className="mt-6 flex items-start gap-4">
        <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2 shadow-[0_0_24px_rgba(34,211,238,0.18)] sm:h-[94px] sm:w-[94px]">
          <img
            src={selectedProject.img}
            alt={selectedProject.title}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] text-emerald-200">
            ● Active
          </span>

          <span
            className={`rounded-full border px-2.5 py-1 text-[10px] ${colors.pill}`}
          >
            {selectedProject.status}
          </span>
        </div>
      </div>

      <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-2xl">
        {selectedProject.title}
      </h3>

      <p className="mt-4 text-sm leading-6 text-white/60">
        {selectedProject.text}
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-blue-300/15 bg-blue-950/25">
        {[
          {
            label: "Role",
            value: selectedProject.role,
            icon: "◎",
          },
          {
            label: "Scope",
            value: selectedProject.scope,
            icon: "▣",
          },
          {
            label: "Stack",
            value: selectedProject.stack,
            icon: "</>",
          },
        ].map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[30px_54px_1fr] items-start gap-2 border-b border-blue-300/10 px-3 py-4 last:border-b-0 sm:grid-cols-[34px_62px_1fr]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-400/10 font-mono text-[10px] text-blue-300">
              {row.icon}
            </span>

            <p className="text-xs text-white/75">{row.label}</p>

            <p className="text-xs leading-5 text-white/55">{row.value}</p>
          </div>
        ))}
      </div>

      <Link
        href="/portfolio"
        className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-violet-300/35 bg-gradient-to-r from-blue-500/30 to-violet-500/40 px-5 py-3 text-sm text-white shadow-[0_0_24px_rgba(168,85,247,0.25)] transition hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(168,85,247,0.45)]"
      >
        View case study <span>↗</span>
      </Link>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-white/40">
          {selectedIndex + 1} of {projects.length} nodes
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPrevious}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={onNext}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10"
          >
            ›
          </button>
        </div>
      </div>
    </aside>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(
    projects[0]
  );

  const selectedIndex = projects.findIndex(
    (project) => project.title === selectedProject.title
  );

  const goToPreviousProject = () => {
    setSelectedProject(
      projects[(selectedIndex - 1 + projects.length) % projects.length]
    );
  };

  const goToNextProject = () => {
    setSelectedProject(projects[(selectedIndex + 1) % projects.length]);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden px-5 py-16 text-white sm:px-8 lg:px-6 lg:py-24">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_35%,rgba(37,99,235,0.24),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_12%_82%,rgba(59,130,246,0.18),transparent_20%),radial-gradient(circle_at_88%_20%,rgba(59,130,246,0.18),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* MOBILE / TABLET VERSION */}
        <div className="block lg:hidden">
          <div className="rounded-[28px] border border-blue-300/20 bg-blue-950/20 p-5 shadow-[0_0_35px_rgba(59,130,246,0.16)] backdrop-blur-xl">
            <p className="font-mono text-xs text-blue-400">/ selected work</p>

            <h2 className="mt-5 text-[42px] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
              Projects as nodes
            </h2>

            <div className="mt-5 h-[3px] w-20 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.9)]" />

            <p className="mt-7 text-base leading-7 text-white/55">
              A selection of projects I&apos;ve worked on. Each one is a node —
              connected by curiosity, creativity and code.
            </p>

            <Link
              href="/portfolio"
              className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-blue-400/40 bg-blue-500/10 px-6 py-3 text-sm text-white/80 backdrop-blur-md transition hover:-translate-y-1 hover:bg-blue-500/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]"
            >
              View all projects <span>↗</span>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            {projects.map((project) => (
              <MobileProjectCard
                key={project.title}
                project={project}
                isSelected={selectedProject.title === project.title}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </div>

          <SelectedProjectPanel
            selectedProject={selectedProject}
            selectedIndex={selectedIndex}
            onPrevious={goToPreviousProject}
            onNext={goToNextProject}
            mobile
          />

          <div className="mx-auto mt-14 flex max-w-3xl items-center gap-6 text-blue-500/50">
            <div className="h-px flex-1 bg-blue-400/20" />
            <span className="text-2xl">✶</span>
            <div className="h-px flex-1 bg-blue-400/20" />
          </div>

          <p className="mt-6 text-center text-sm leading-7 text-white/40">
            More projects, experiments and ideas are always in the works.
          </p>
        </div>

        {/* DESKTOP VERSION */}
        <div className="hidden lg:block">
          <div className="absolute left-0 top-8 max-w-[330px]">
            <p className="font-mono text-sm text-blue-400">/ selected work</p>

            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-white">
              Projects as nodes
            </h2>

            <div className="mt-5 h-[3px] w-20 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.9)]" />

            <p className="mt-8 text-lg leading-8 text-white/55">
              A selection of projects I&apos;ve worked on. Each one is a node —
              connected by curiosity, creativity and code.
            </p>

            <Link
              href="/portfolio"
              className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-blue-400/40 bg-blue-500/10 px-7 py-3 text-white/80 backdrop-blur-md transition hover:-translate-y-1 hover:bg-blue-500/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]"
            >
              View all projects <span>↗</span>
            </Link>
          </div>

          <div className="relative mx-auto h-[900px] max-w-[1120px] -translate-x-[170px]">
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
              viewBox="0 0 1150 900"
              fill="none"
            >
              <path
                d="M160 430 C300 360, 320 500, 450 360 C560 250, 650 330, 760 250 C870 165, 930 230, 1000 150"
                stroke="rgba(59,130,246,0.55)"
                strokeWidth="2"
                strokeDasharray="6 10"
              />
              <path
                d="M570 335 C680 390, 750 360, 855 430"
                stroke="rgba(59,130,246,0.45)"
                strokeWidth="2"
                strokeDasharray="6 10"
              />
              <path
                d="M570 335 C600 455, 500 520, 420 590"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="2"
                strokeDasharray="6 10"
              />
              <path
                d="M570 335 C620 500, 710 510, 740 620"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="2"
                strokeDasharray="6 10"
              />
              <path
                d="M705 315 C830 340, 930 310, 1085 335"
                stroke="rgba(168,85,247,0.7)"
                strokeWidth="2"
              />
            </svg>

            {projects.map((project) => {
              const isSelected = selectedProject.title === project.title;

              return (
                <div key={project.title} className={`absolute ${project.pos}`}>
                  <DesktopProjectNode
                    project={project}
                    isSelected={isSelected}
                    onSelect={() => setSelectedProject(project)}
                  />
                </div>
              );
            })}
          </div>

          <SelectedProjectPanel
            selectedProject={selectedProject}
            selectedIndex={selectedIndex}
            onPrevious={goToPreviousProject}
            onNext={goToNextProject}
          />

          <div className="mx-auto mt-[80px] flex max-w-3xl items-center gap-8 text-blue-500/50">
            <div className="h-px flex-1 bg-blue-400/20" />
            <span className="text-3xl">✶</span>
            <div className="h-px flex-1 bg-blue-400/20" />
          </div>
        </div>
      </div>
    </section>
  );
}