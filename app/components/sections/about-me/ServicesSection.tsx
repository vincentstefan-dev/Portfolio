"use client";

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
    text: "Visual systems, UI design and brand direction that communicate clearly.",
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
    text: "Building brands with soul, structure and a story that sticks.",
    pos: "left-[2%] top-[400px]",
  },
  {
    n: "05",
    title: "EXPERIMENTS",
    text: "Creative development, weird UI and prototypes that explore new ideas.",
    pos: "right-[3%] top-[400px]",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden px-4 py-10 text-cyan-300">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,220,255,0.16),transparent_45%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,220,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(0,220,255,0.16)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />

      <div className="relative z-10 mx-auto grid min-h-[88vh] max-w-[1600px] grid-cols-[260px_1fr_360px] gap-3 border border-cyan-400/35 p-8 shadow-[0_0_45px_rgba(0,220,255,0.16)]">
        <aside className="border border-cyan-400/30 p-8 font-mono text-sm">
          <p className="mb-6 text-cyan-200">02 &gt; WHAT I DO</p>

          <div className="space-y-4 text-cyan-300/80">
            <p>
              From strategy to interface, I help brands and products become
              clear, functional and impactful.
            </p>

            <p className="border border-cyan-400/40 px-8 py-2 text-cyan-200">
              ● Work with me :)
            </p>
          </div>

          <div className="mt-10 border-t border-cyan-400/25 pt-8">
            <p className="mb-4 text-cyan-200">ABOUT ME</p>

            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-cyan-400/30">
                <img
                  src="/aboutme/about-me3.png"
                  alt="Vincent"
                  className="h-full w-full object-cover opacity-90"
                />

                <div className="absolute inset-0 bg-cyan-400/10" />
              </div>

              <p className="leading-6 text-cyan-300/70">
                I build, design and shape systems.
              </p>
            </div>

            <div className="relative mt-6 w-full overflow-hidden">
              <img
                src="/Gifs/sillyhorse.gif"
                alt="Creative work"
                className="h-[360px] w-full object-cover opacity-100"
              />
            </div>
          </div>
        </aside>

        <main className="relative overflow-hidden border border-cyan-400/30 p-[60px] font-mono">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.08),transparent_55%)]" />

          <div className="relative z-10">
            <h1 className="max-w-lg text-xl leading-relaxed text-cyan-300/70 md:text-2xl">
              From strategy to interface, I help brands and products become
              clear, functional and impactful.
            </h1>
          </div>

          <div className="relative z-10 mt-8 h-[560px]">
            {serviceCards.map((item) => (
              <div
                key={item.n}
                className={`absolute ${item.pos} w-[260px] border border-cyan-300/35 bg-cyan-950/20 p-6 text-cyan-200 backdrop-blur-xl shadow-[inset_0_0_30px_rgba(34,211,238,0.06),0_0_24px_rgba(34,211,238,0.10)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/70 hover:bg-cyan-900/25 hover:shadow-[inset_0_0_35px_rgba(34,211,238,0.10),0_0_40px_rgba(34,211,238,0.22)]`}
              >
                <span className="absolute left-[-1px] top-[-1px] h-4 w-4 border-l border-t border-cyan-200/80" />
                <span className="absolute right-[-1px] top-[-1px] h-4 w-4 border-r border-t border-cyan-200/80" />
                <span className="absolute bottom-[-1px] left-[-1px] h-4 w-4 border-b border-l border-cyan-200/80" />
                <span className="absolute bottom-[-1px] right-[-1px] h-4 w-4 border-b border-r border-cyan-200/80" />

                <p className="text-xs tracking-[0.25em] text-cyan-400/80">
                  [{item.n}]
                </p>

                <h3 className="mt-5 text-xl font-bold text-cyan-100">
                  {item.title}
                </h3>

                <p className="mt-5 text-sm leading-6 text-cyan-300/70">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </main>

        <aside className="grid h-full grid-rows-3 gap-3 font-mono">
          <div className="h-full border border-cyan-400/30 p-6">
            <p className="mb-5 text-cyan-200">CURRENT FOCUS</p>

            <div className="space-y-4 text-sm text-cyan-300/75">
              <p>&gt; Portfolio systems</p>
              <p>&gt; Brand identity work</p>
              <p>&gt; Web interfaces</p>
              <p>&gt; Experimental UI</p>
            </div>
          </div>

          <div className="h-full border border-cyan-400/30 p-6">
            <p className="mb-5 text-cyan-200">BEST FIT</p>

            <div className="space-y-4 text-sm text-cyan-300/75">
              <p>&gt; Small brands and startups</p>
              <p>&gt; Founders and solo builders</p>
              <p>&gt; Creative projects</p>
              <p>&gt; Digital products</p>
            </div>
          </div>

          <div className="h-full border border-cyan-400/30 p-6">
            <p className="mb-5 text-cyan-200">WHAT I VALUE</p>

            <div className="space-y-4 text-sm text-cyan-300/75">
              <p>◎ CLARITY — clear outcomes</p>
              <p>▣ SYSTEMS — structured thinking</p>
              <p>ϟ IMPACT — useful work</p>
              <p>☻ CURIOSITY — experiment often</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}