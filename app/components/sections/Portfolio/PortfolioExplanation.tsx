"use client";

export default function JunixIdentitySection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Left UI rail */}
      <div className="pointer-events-none absolute left-8 top-10 hidden h-[86vh] w-px bg-white/10 md:block">
        <div className="absolute -left-[5px] top-10 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(125,230,255,0.9)]" />
        <div className="absolute -left-[5px] bottom-8 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(125,230,255,0.9)]" />

        <div className="absolute left-[-2px] top-[48%] flex flex-col gap-3">
          <span className="h-1 w-1 rounded-full bg-blue-200/80" />
          <span className="h-1 w-1 rounded-full bg-blue-200/60" />
          <span className="h-1 w-1 rounded-full bg-blue-200/40" />
          <span className="h-1 w-1 rounded-full bg-blue-200/30" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] items-center px-8 py-24 md:px-16 lg:px-24">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_0.85fr]">
          {/* Title */}
          <div>
            <p className="mb-8 text-xs uppercase tracking-[0.55em] text-cyan-100/45">
              Project 001
            </p>

            <h1 className="max-w-[760px] overflow-visible text-left text-[clamp(2.7rem,4.25vw,5rem)] font-black leading-[1.03] tracking-[-0.055em]">
              <span className="block overflow-visible pb-[0.12em] bg-gradient-to-r from-white via-blue-100 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(140,180,255,0.35)]">
                The making of {" "}
            <span className="animate-rainbow-text font-semibold">Koyote</span>,
              </span>

              <span className="block overflow-visible pb-[0.12em] bg-gradient-to-r from-white via-blue-100 to-slate-200 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(140,180,255,0.28)]">
                From Concept to
              </span>

              <span className="block overflow-visible pb-[0.12em] bg-gradient-to-r from-blue-200 via-white to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(150,180,255,0.45)]">
                Identity.
              </span>
            </h1>
          </div>

          {/* Bullet list */}
          <div className="relative">
            <div className="absolute -inset-20 rounded-full bg-cyan-400/10 blur-[90px]" />

            <ul className="relative ml-2 space-y-7 text-[clamp(1.25rem,1.65vw,2rem)] font-light tracking-[-0.04em] text-blue-50/90">
              <li className="flex items-center gap-6">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(125,220,255,0.95)]" />
                Logo
              </li>

              <li className="flex items-center gap-6">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(125,220,255,0.95)]" />
                Brand Identity
              </li>

              <li className="flex items-center gap-6">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(125,220,255,0.95)]" />
                Social Media Posts
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}