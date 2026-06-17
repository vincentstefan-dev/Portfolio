"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type ProjectCard = {
  number: string;
  title: string;
  category: string;
  href: string;
  image: string;
  imagePosition: string;
};

const projects: ProjectCard[] = [
  {
    number: "01",
    title: "Koyote",
    category: "Brand Identity • Web Experience",
    href: "/portfolio",
    image: "/3TO6/KOYOTEFINAL.png",
    imagePosition: "center",
  },
  {
    number: "02",
    title: "SHE",
    category: "Brand Identity • Web Experience",
    href: "/portfolio/SHE",
    image:  "/3TO6/SHE.png",
    imagePosition: "center",
  },
  {
    number: "03",
    title: "Pixelate",
    category: "Client Website • Film Portfolio",
    href: "/portfolio/antonia",
    image: "/3TO6/PIXEL.png",
    imagePosition: "center",
  },
  {
    number: "04",
    title: "Astronaut",
    category: "Comic",
    href: "/portfolio/junix",
    image: "/3TO6/astronaut.png",
    imagePosition: "center",
  },
  {
    number: "05",
    title: "The concept of I",
    category: "Vlog",
    href: "/theme-lab",
    image: "/3TO6/babyfinal.gif",
    imagePosition: "center",
  },
];

export default function PortfolioSelectedProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleProjects = useMemo(() => {
    return [0, 1, 2].map((offset) => {
      const index = (activeIndex + offset) % projects.length;
      return projects[index];
    });
  }, [activeIndex]);

  function goToNextProject() {
    setActiveIndex((current) => (current + 1) % projects.length);
  }

  function goToPreviousProject() {
    setActiveIndex((current) =>
      current === 0 ? projects.length - 1 : current - 1
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden px-6 py-24 text-white sm:px-10 lg:px-16">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[45%] h-[760px] w-[1050px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[150px]" />

        <div className="absolute left-[15%] top-[42%] h-1 w-1 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,1)]" />
        <div className="absolute right-[20%] top-[31%] h-1 w-1 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,1)]" />
        <div className="absolute left-[52%] bottom-[23%] h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_22px_rgba(103,232,249,1)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] max-w-7xl flex-col justify-center">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.65em] text-cyan-300/80">
            Explore Work
          </p>

          <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-cyan-100 drop-shadow-[0_0_30px_rgba(103,232,249,0.95)] sm:text-7xl lg:text-8xl">
            Select a Project
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-relaxed text-slate-100/80 sm:text-base">
            Check some of the coolest projects i´ve worked!
          </p>
        </div>

        {/* Cards area */}
        <div className="relative mx-auto w-full max-w-6xl">
          {/* Desktop arrows */}
          <button
            type="button"
            aria-label="Previous project"
            onClick={goToPreviousProject}
            className="absolute left-[-4.5rem] top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/40 bg-[#07111f]/50 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.2)] backdrop-blur-md transition hover:border-cyan-200 hover:bg-cyan-300/10 lg:flex"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <button
            type="button"
            aria-label="Next project"
            onClick={goToNextProject}
            className="absolute right-[-4.5rem] top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/40 bg-[#07111f]/50 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.2)] backdrop-blur-md transition hover:border-cyan-200 hover:bg-cyan-300/10 lg:flex"
          >
            <ArrowRight className="h-6 w-6" />
          </button>

          {/* Mobile arrows */}
          <div className="mb-6 flex justify-center gap-4 lg:hidden">
            <button
              type="button"
              aria-label="Previous project"
              onClick={goToPreviousProject}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/40 bg-[#07111f]/60 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.2)] backdrop-blur-md transition hover:border-cyan-200 hover:bg-cyan-300/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Next project"
              onClick={goToNextProject}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/40 bg-[#07111f]/60 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.2)] backdrop-blur-md transition hover:border-cyan-200 hover:bg-cyan-300/10"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Project cards */}
          <div className="grid gap-7 lg:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <Link
                key={`${project.number}-${project.title}`}
                href={project.href}
                className={[
                  "group relative block h-[460px] overflow-hidden rounded-[1.65rem]",
                  "border border-cyan-300/30 bg-[#07111f] shadow-[0_0_42px_rgba(34,211,238,0.18)]",
                  "transition duration-300 hover:-translate-y-2 hover:border-cyan-200/70 hover:shadow-[0_0_70px_rgba(34,211,238,0.35)]",
                  "sm:h-[500px] lg:h-[480px]",
                  index === 0 ? "lg:rotate-[-2.5deg]" : "",
                  index === 1 ? "lg:-translate-y-3" : "",
                  index === 2 ? "lg:rotate-[2.5deg]" : "",
                ].join(" ")}
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    priority={index === 1}
                    className="object-contain opacity-95 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    style={{
                      objectPosition: project.imagePosition,
                    }}
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 33vw"
                  />
                </div>

                {/* Dark readability overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(103,232,249,0.16),transparent_45%)]" />

                {/* Cyan border */}
                <div className="pointer-events-none absolute inset-0 rounded-[1.65rem] border border-cyan-200/20" />

                {/* Project number */}
                <div className="absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-100/25 bg-black/60 text-[0.65rem] font-black text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.55)]">
                  {project.number}
                </div>

                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="max-w-[16rem] text-3xl font-black leading-[0.92] tracking-[-0.06em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.4)] sm:text-4xl">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-xs font-medium text-slate-200/85">
                    {project.category}
                  </p>

                  <div className="mt-7 h-px w-full bg-cyan-100/15" />

                  <div className="mt-7 flex items-center justify-between">
                    <span className="text-[0.68rem] font-black uppercase tracking-[0.42em] text-cyan-50">
                      View Case Study
                    </span>

                    <ArrowRight className="h-4 w-4 text-cyan-50 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-10 flex justify-center gap-2">
            {projects.map((project, index) => (
              <button
                key={project.number}
                type="button"
                aria-label={`Show project ${project.number}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition ${
                  activeIndex === index
                    ? "w-8 bg-cyan-200 shadow-[0_0_16px_rgba(103,232,249,0.9)]"
                    : "w-2 bg-cyan-200/30 hover:bg-cyan-200/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}