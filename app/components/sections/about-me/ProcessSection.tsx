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

type ProcessColor = "blue" | "violet" | "cyan";

function getColorClasses(color: string) {
  const safeColor = color as ProcessColor;

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

  return map[safeColor] ?? map.blue;
}

export default function ProcessSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden border border-cyan-400/20 text-white">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,220,255,0.16),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,220,255,0.16),transparent_25%),radial-gradient(circle_at_85%_35%,rgba(0,220,255,0.16),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70" />

      {/* Windows 98 mini popup - desktop only */}
      <div className="pointer-events-none absolute left-[7%] top-[23%] z-10 hidden font-mono lg:block">
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

          <div className="border-b-2 border-l-2 border-r-2 border-t-2 border-b-black border-l-white border-r-black border-t-white p-3 text-[13px] text-black">
            <p>ideas</p>
            <p>&gt; systems</p>
            <p>&gt; impact</p>
          </div>
        </div>
      </div>

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
            A structured but flexible approach to creating meaningful digital
            experiences.
          </p>
        </div>

        {/* Mobile mini popup */}
        <div className="pointer-events-none mx-auto mt-10 block max-w-[260px] font-mono lg:hidden">
          <div className="border-2 border-[#000] bg-[#c0c0c0] shadow-[2px_2px_0_#000]">
            <div className="flex items-center justify-between bg-[#000080] px-2 py-[2px] text-[11px] text-white">
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

            <div className="border-b-2 border-l-2 border-r-2 border-t-2 border-b-black border-l-white border-r-black border-t-white p-3 text-[12px] text-black">
              <p>ideas</p>
              <p>&gt; systems</p>
              <p>&gt; impact</p>
            </div>
          </div>
        </div>

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
          Something, Something, something, something, something, something,
          something, something.
        </p>
      </div>
    </section>
  );
}

type ProcessStep = {
  n: string;
  title: string;
  icon: string;
  color: string;
  text: string;
  items: string[];
};

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
          {step.icon}
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
          {step.icon}

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