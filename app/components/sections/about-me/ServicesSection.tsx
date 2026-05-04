"use client";

import Link from "next/link";

const serviceCards = [
  {
    n: "01",
    title: "BUILD",
    text: "Websites, interfaces and systems that are fast, scalable and built with purpose.",
    pos: "left-[5%] top-[0px]",
  },
  {
    n: "02",
    title: "DESIGN",
    text: "Visual systems, UI design and brand marketing that communicate clearly.",
    pos: "right-[5%] top-[3px]",
  },
  {
    n: "03",
    title: "STRATEGY",
    text: "Positioning, structure and systems thinking that move ideas forward.",
    pos: "left-[30%] top-[200px]",
  },
  {
    n: "04",
    title: "BRAND LOGIC",
    text: "Brand systems, positioning and structure that give ideas clarity and consistency.",
    pos: "left-[2%] top-[400px]",
  },
  {
    n: "05",
    title: "EXPERIMENT",
    text: "Creative prototypes, testing and iteration that turn rough ideas into usable direction.",
    pos: "right-[3%] top-[400px]",
  },
];

const sidePanels = [
  {
    title: "CURRENT WORKSTREAMS 🍃",
    items: [
              "BUILD        → Interface design and web builds",
              "DESIGN       → Brand logic and identity",
              "STRATEGY     → Structured Game Theory",
              "BRAND LOGIC  → Brand logic and identity",
              "EXPERIMENTS  → Experimental digital prototypes",
    ],
  },
  {
    title: "BEST FIT FOR PROJECTS 🌳:",
    items: [
      "> Small brands and startups",
      "> Founders and solo builders",
      "> Creative projects",
      "> Digital products",
    ],
  },
  {
    title: "WORKING PRINCIPLES 🫸",
    items: [
    "◎ CLARITY — make ideas legible",
    "▣ SYSTEMS — structure before scale",
    "ϟ IMPACT — build what is useful",
    "☻ CURIOSITY — test what feels alive",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden px-5 py-16 text-cyan-300 sm:px-8 lg:px-4 lg:py-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,220,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,220,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(0,220,255,0.16)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        {/* MOBILE / TABLET VERSION */}
        <div className="block space-y-5 lg:hidden">
          {/* PART 1 — Intro */}
          <div className="rounded-[28px] border border-cyan-400/30 bg-cyan-950/20 p-5 font-mono shadow-[0_0_35px_rgba(0,220,255,0.12)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">
              02 &gt; What I do
            </p>

            <h2 className="mt-6 text-2xl leading-snug text-cyan-300">
              From strategy to interface, I help brands shape digital concepts
              that are clear, functional, and ready to grow.
            </h2>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center border border-cyan-400/40 bg-cyan-300/10 px-5 py-3 text-sm text-cyan-100 transition hover:bg-cyan-300/20"
            >
              ● Start a project
            </Link>
          </div>

          {/* PART 2 — Service cards */}
          <div className="grid grid-cols-1 gap-4">
            {serviceCards.map((item) => (
              <MobileServiceCard key={item.n} item={item} />
            ))}
          </div>

          {/* PART 3 — About */}
          <div className="rounded-[28px] border border-cyan-400/30 bg-cyan-950/20 p-5 font-mono shadow-[0_0_35px_rgba(0,220,255,0.12)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between gap-6">
              <div className="relative h-24 w-32 shrink-0 overflow-hidden border border-cyan-400/40 bg-cyan-950/30 shadow-[0_0_24px_rgba(34,211,238,0.15)]">
                <img
                  src="/aboutme/about-me3.png"
                  alt="Vincent"
                  className="h-full w-full object-cover object-center opacity-90"
                />

                <div className="absolute inset-0 bg-cyan-400/10" />
              </div>

              <p className="shrink-0 text-right text-sm uppercase tracking-[0.28em] text-cyan-200 drop-shadow-[0_0_10px_rgba(103,232,249,0.55)]">
                About me
              </p>
            </div>

            <p className="max-w-full text-sm leading-7 text-cyan-300/75">
              I am 28 years old, with a Guatemalan and German background. I grew
              up in the forests of Guatemala with a beautiful Siamese cat named
              Mishi.
            </p>

            <div className="relative mt-6 max-h-[260px] w-full overflow-hidden rounded-2xl border border-cyan-400/20">
              <img
                src="/Gifs/MISHI.gif"
                alt="Creative work"
                className="h-full w-full object-cover opacity-50"
              />
            </div>
          </div>

          {/* PART 4 — Side panels */}
          <div className="grid grid-cols-1 gap-4">
            {sidePanels.map((panel) => (
              <SidePanel key={panel.title} panel={panel} />
            ))}
          </div>
        </div>

        {/* DESKTOP VERSION */}
        <div className="hidden min-h-[88vh] grid-cols-[260px_1fr_360px] gap-3 border border-cyan-400/35 p-8 shadow-[0_0_45px_rgba(0,220,255,0.16)] lg:grid">
          <aside className="border border-cyan-400/30 p-8 font-mono text-sm">
            <p className="mb-6 text-cyan-200">02 &gt; WHAT I DO</p>

            <div className="space-y-4 text-cyan-300/80">
              <p>
                From strategy to interface, I help brands shape digital concepts
                that are clear, functional, and ready to grow.
              </p>

              <Link
                href="/contact"
                className="block border border-cyan-400/40 px-5 py-2 text-cyan-200 transition hover:bg-cyan-300/10"
              >
                <span>● Start a project</span>
              </Link>
            </div>

            <div className="mt-10 border-t border-cyan-400/25 pt-8">
              <div className="mb-6 flex items-center justify-between gap-5">
                <div className="relative h-20 w-24 shrink-0 overflow-hidden border border-cyan-400/40 bg-cyan-950/30 shadow-[0_0_24px_rgba(34,211,238,0.15)]">
                  <img
                    src="/aboutme/about-me3.png"
                    alt="Vincent"
                    className="h-full w-full object-cover object-center opacity-90"
                  />

                  <div className="absolute inset-0 bg-cyan-400/10" />
                </div>

                <p className="shrink-0 text-right text-cyan-200 drop-shadow-[0_0_10px_rgba(103,232,249,0.55)]">
                  ABOUT ME
                </p>
              </div>

              <p className="leading-6 text-cyan-300/70">
                  I’m 28 years old and come from a Guatemalan and German background. 
                  I grew up in the forests of Guatemala with a beautiful Siamese cat named Mishi.
              </p>

              <div className="relative mt-6 w-full overflow-hidden">
                <img
                  src="/Gifs/MISHI.gif"
                  alt="Creative work"
                  className="h-[300px] w-full object-cover opacity-50"
                />
              </div>
            </div>
          </aside>

          <main className="relative overflow-hidden border border-cyan-400/30 p-[60px] font-mono">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.08),transparent_55%)]" />

          <div className="relative z-10">
            <h1 className="mx-auto max-w-3xl text-center text-xl leading-[1.6] tracking-[-0.02em] text-cyan-300/70 md:text-2xl">
              A five-part system for shaping ideas into clear, functional, and ready to launch
               digital work.
            </h1>
          </div>

            <div className="relative z-10 mt-8 h-[560px]">
              {serviceCards.map((item) => (
                <DesktopServiceCard key={item.n} item={item} />
              ))}
            </div>
          </main>

          <aside className="grid h-full grid-rows-3 gap-3 font-mono">
            {sidePanels.map((panel) => (
              <SidePanel key={panel.title} panel={panel} desktop />
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}

type ServiceCardItem = {
  n: string;
  title: string;
  text: string;
  pos: string;
};

function DesktopServiceCard({ item }: { item: ServiceCardItem }) {
  return (
    <div
      className={`absolute ${item.pos} w-[260px] border border-cyan-300/35 bg-cyan-950/20 p-6 text-cyan-200 shadow-[inset_0_0_30px_rgba(34,211,238,0.06),0_0_24px_rgba(34,211,238,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/70 hover:bg-cyan-900/25 hover:shadow-[inset_0_0_35px_rgba(34,211,238,0.10),0_0_40px_rgba(34,211,238,0.22)]`}
    >
      <CardCorners />

      <p className="text-xs tracking-[0.25em] text-cyan-400/80">
        [{item.n}]
      </p>

      <h3 className="mt-5 text-xl font-bold text-cyan-100">{item.title}</h3>

      <p className="mt-5 text-sm leading-6 text-cyan-300/70">{item.text}</p>
    </div>
  );
}

function MobileServiceCard({ item }: { item: ServiceCardItem }) {
  return (
    <div className="relative rounded-2xl border border-cyan-300/35 bg-cyan-950/20 p-6 font-mono text-cyan-200 shadow-[inset_0_0_30px_rgba(34,211,238,0.06),0_0_24px_rgba(34,211,238,0.10)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/70 hover:bg-cyan-900/25 hover:shadow-[inset_0_0_35px_rgba(34,211,238,0.10),0_0_40px_rgba(34,211,238,0.22)]">
      <CardCorners />

      <p className="text-xs tracking-[0.25em] text-cyan-400/80">
        [{item.n}]
      </p>

      <h3 className="mt-5 text-xl font-bold text-cyan-100">{item.title}</h3>

      <p className="mt-5 text-sm leading-6 text-cyan-300/70">{item.text}</p>
    </div>
  );
}

function CardCorners() {
  return (
    <>
      <span className="absolute left-[-1px] top-[-1px] h-4 w-4 border-l border-t border-cyan-200/80" />
      <span className="absolute right-[-1px] top-[-1px] h-4 w-4 border-r border-t border-cyan-200/80" />
      <span className="absolute bottom-[-1px] left-[-1px] h-4 w-4 border-b border-l border-cyan-200/80" />
      <span className="absolute bottom-[-1px] right-[-1px] h-4 w-4 border-b border-r border-cyan-200/80" />
    </>
  );
}

type SidePanelProps = {
  panel: {
    title: string;
    items: string[];
  };
  desktop?: boolean;
};

function SidePanel({ panel, desktop = false }: SidePanelProps) {
  return (
    <div
      className={`border border-cyan-400/30 font-mono ${
        desktop
          ? "h-full p-6"
          : "rounded-2xl bg-cyan-950/20 p-5 backdrop-blur-md"
      }`}
    >
      <p className="mb-5 text-xs uppercase tracking-[0.22em] text-cyan-200 lg:text-base lg:tracking-normal">
        {panel.title}
      </p>

      <div className="space-y-4 text-sm text-cyan-300/75">
        {panel.items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}