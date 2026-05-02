"use client";

const processSteps = [
  {
    n: "01",
    title: "Observe",
    icon: "◉",
    color: "blue",
    text: "I start by understanding the context, the user and the real problems behind the project.",
    items: ["Research", "User insights", "Market analysis"],
  },
  {
    n: "02",
    title: "Deconstruct",
    icon: "✣",
    color: "violet",
    text: "I break things down to the essentials. Finding patterns, opportunities and the core idea.",
    items: ["Information architecture", "Wireframing", "Concept development"],
  },
  {
    n: "03",
    title: "Build",
    icon: "</>",
    color: "blue",
    text: "I bring the idea to life with clean code and thoughtful design. Focused on performance, usability and details.",
    items: ["Development", "Design systems", "Prototyping"],
  },
  {
    n: "04",
    title: "Iterate",
    icon: "↻",
    color: "cyan",
    text: "I test, refine and improve. Every project is an ongoing evolution.",
    items: ["Testing", "Feedback", "Optimization"],
  },
];

export default function ProcessSection() {
  return (
    <section className="relative min-h-screen w-full border border-cyan-400/20">
      <section className="relative min-h-screen w-full overflow-hidden px-6 py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,220,255,0.16),transparent_42%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,220,255,0.16),transparent_25%),radial-gradient(circle_at_85%_35%,rgba(0,220,255,0.16),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70" />

        <div className="pointer-events-none absolute left-[7%] top-[23%] font-mono">
          <div className="w-[220px] border-2 border-[#000] bg-[#c0c0c0] shadow-[2px_2px_0_#000]">
            <div className="flex items-center justify-between bg-[#000080] px-2 py-[2px] text-[12px] text-white">
              <span>System.exe</span>

              <div className="flex gap-[2px]">
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

            <div className="border-t-2 border-white border-l-2 border-white border-b-2 border-black border-r-2 border-black p-3 text-[13px] text-black">
              <p>ideas</p>
              <p>&gt; systems</p>
              <p>&gt; impact</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-[1450px]">
          <div className="text-center">
            <p className="font-mono text-sm text-blue-400">/ my process</p>

            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              How I think &amp; build
            </h2>

            <div className="mx-auto mt-5 h-[3px] w-20 rounded-full bg-blue-400 shadow-[0_0_22px_rgba(96,165,250,0.9)]" />

            <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-white/55">
              A structured but flexible approach to creating meaningful digital
              experiences.
            </p>
          </div>

          <div className="relative mt-24">
            <div className="absolute left-[7%] right-[7%] top-[90px] h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-300 shadow-[0_0_18px_rgba(59,130,246,0.7)]" />

            <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
              {processSteps.map((step) => (
                <div key={step.n} className="relative">
                  <div className="mb-8 flex items-center gap-7">
                    <p
                      className={`font-mono text-2xl ${
                        step.color === "violet"
                          ? "text-violet-400"
                          : step.color === "cyan"
                          ? "text-cyan-300"
                          : "text-blue-400"
                      }`}
                    >
                      {step.n}
                    </p>

                    <div
                      className={`relative flex h-24 w-24 items-center justify-center rounded-[28px] border bg-white/5 text-4xl backdrop-blur-xl ${
                        step.color === "violet"
                          ? "border-violet-400/50 text-violet-300 shadow-[0_0_35px_rgba(168,85,247,0.35)]"
                          : step.color === "cyan"
                          ? "border-cyan-300/50 text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.35)]"
                          : "border-blue-400/50 text-blue-300 shadow-[0_0_35px_rgba(59,130,246,0.35)]"
                      }`}
                    >
                      {step.icon}

                      <span
                        className={`absolute bottom-[-10px] left-1/2 h-5 w-5 -translate-x-1/2 rounded-full ${
                          step.color === "violet"
                            ? "bg-violet-400 shadow-[0_0_18px_rgba(168,85,247,1)]"
                            : step.color === "cyan"
                            ? "bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,1)]"
                            : "bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,1)]"
                        }`}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 max-w-[260px] text-base leading-7 text-white/60">
                    {step.text}
                  </p>

                  <div className="mt-8 w-full max-w-[260px] rounded-xl border border-blue-400/20 bg-blue-950/20 p-5 backdrop-blur-md shadow-[inset_0_0_28px_rgba(59,130,246,0.06)]">
                    <div className="space-y-3 text-sm text-white/65">
                      {step.items.map((item) => (
                        <p key={item}>↗ {item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl items-center gap-8 text-blue-500/50">
            <div className="h-px flex-1 bg-blue-400/20" />

            <span className="text-3xl">✶</span>

            <div className="h-px flex-1 bg-blue-400/20" />
          </div>

          <p className="mt-8 text-center text-lg text-white/35">
            Something, Something, something, something, something, something,
            something, something.
          </p>
        </div>
      </section>
    </section>
  );
}