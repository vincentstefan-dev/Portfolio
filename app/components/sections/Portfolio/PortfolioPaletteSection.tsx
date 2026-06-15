"use client";

const palette = [
  {
    name: "Black",
    hex: "#05070A",
    role: "Base background",
    className: "bg-[#05070A]",
    textClass: "text-white",
  },
  {
    name: "Charcoal",
    hex: "#070A0D",
    role: "Depth layer",
    className: "bg-[#070A0D]",
    textClass: "text-white",
  },
  {
    name: "Ice White",
    hex: "#F3F8FF",
    role: "Main text",
    className: "bg-[#F3F8FF]",
    textClass: "text-black",
  },
  {
    name: "Cyan",
    hex: "#67E8F9",
    role: "Primary accent",
    className: "bg-[#67E8F9]",
    textClass: "text-black",
  },
  {
    name: "Cyan Glow",
    hex: "#22D3EE",
    role: "Glow / active state",
    className: "bg-[#22D3EE]",
    textClass: "text-black",
  },
  {
    name: "Electric Blue",
    hex: "#2563EB",
    role: "Orbit shadow",
    className: "bg-[#2563EB]",
    textClass: "text-white",
  },
];

export default function PortfolioPaletteSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent px-6 py-24 text-white sm:px-10 lg:px-14">
      {/* BACKGROUND SYSTEM */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.12),transparent_38%),radial-gradient(circle_at_70%_55%,rgba(37,99,235,0.1),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.045)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.12]" />

        <div className="absolute left-1/2 top-1/2 h-[520px] w-[1180px] -translate-x-1/2 -translate-y-1/2 rotate-[-10deg] rounded-[50%] border border-cyan-300/15" />
        <div className="absolute left-[52%] top-[52%] h-[360px] w-[980px] -translate-x-1/2 -translate-y-1/2 rotate-[16deg] rounded-[50%] border border-blue-500/15" />
      </div>

      {/* SMALL UI MARK */}
      <div className="pointer-events-none absolute left-8 top-8 z-20 hidden md:block">
        <div className="h-16 border-l border-cyan-300/70 pl-4">
          <div className="h-1 w-24 bg-cyan-300/70 shadow-[0_0_16px_rgba(34,211,238,0.65)]" />
          <div className="mt-3 h-px w-32 bg-white/10" />
          <div className="mt-2 h-px w-20 bg-white/10" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] max-w-7xl flex-col justify-center">
        {/* HEADER */}
        <div className="mb-16 max-w-3xl">

          <h1 className="max-w-4xl text-[clamp(3rem,8vw,7.4rem)] font-black uppercase leading-[0.86] tracking-[-0.08em] text-[#F3F8FF] drop-shadow-[0_0_26px_rgba(34,211,238,0.36)]">
            Color Palette.
          </h1>
        </div>

        {/* PALETTE SHELF */}
        <div className="relative">
          <div className="absolute -bottom-5 left-0 right-0 h-px bg-cyan-300/25 shadow-[0_0_24px_rgba(34,211,238,0.35)]" />

          <div className="grid min-h-[430px] grid-cols-2 items-end gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0">
            {palette.map((color, index) => (
              <article
                key={color.hex}
                className="group relative flex min-h-[360px] cursor-default items-end [perspective:900px]"
                style={{
                  zIndex: palette.length - index,
                }}
              >
                <div
                  className={`relative flex h-[360px] w-full origin-bottom flex-col justify-between overflow-hidden border border-white/10 px-5 py-6 shadow-[0_18px_60px_rgba(0,0,0,0.42)] transition duration-500 ease-out group-hover:z-30 group-hover:-translate-y-10 group-hover:scale-[1.045] group-hover:rotate-[-1.5deg] group-hover:shadow-[0_0_34px_rgba(34,211,238,0.4),0_30px_80px_rgba(0,0,0,0.65)] sm:h-[390px] lg:h-[430px] ${color.className} ${color.textClass}`}
                >
                  {/* BOOK SPINE GLOW */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute inset-y-0 left-0 w-px bg-white/50" />
                    <div className="absolute inset-y-0 right-0 w-px bg-black/30" />
                    <div className="absolute left-0 top-0 h-full w-16 bg-white/10 blur-2xl" />
                  </div>

                  {/* TOP LABEL */}
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.32em] opacity-70">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="origin-top-right rotate-90 font-mono text-[10px] uppercase tracking-[0.28em] opacity-70">
                      {color.hex}
                    </span>
                  </div>

                  {/* LARGE TYPE */}
                  <div className="relative z-10">
                    <h3 className="max-w-[8rem] text-4xl font-black uppercase leading-[0.85] tracking-[-0.08em] sm:text-5xl">
                      {color.name}
                    </h3>

                    <p className="mt-5 max-w-[11rem] font-mono text-[10px] uppercase tracking-[0.24em] opacity-70">
                      {color.role}
                    </p>
                  </div>

                  {/* BOTTOM LINE */}
                  <div className="relative z-10 h-px w-full bg-current opacity-20" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM UI DOTS */}
      <div className="pointer-events-none absolute bottom-8 left-8 z-20">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/40" />
          <span className="h-px w-28 bg-white/20" />
        </div>
      </div>
    </section>
  );
}