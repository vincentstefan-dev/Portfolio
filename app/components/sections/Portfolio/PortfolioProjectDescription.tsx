"use client";

const koyoteCorePalette = {
  black: "#05070A",
  charcoal: "#070A0D",
  iceWhite: "#F3F8FF",
  cyan: "#67E8F9",
  cyanGlow: "#22D3EE",
  electricBlue: "#2563EB",
};

export default function ProjectDescriptionSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent px-6 py-20 text-[#F3F8FF] sm:px-10 lg:px-16">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* TEXT CONTENT */}
        <div className="max-w-3xl">
          <InfoBlock title="Overview">
            <p>
              Koyote is a digital identity system built around strategy, code,
              brand, and expressive interface design. The visual direction uses
              a reduced blue and white palette to create a clean, futuristic,
              and recognizable portfolio language.
            </p>
          </InfoBlock>

          <InfoBlock title="Challenge">
            <p>
              The portfolio needed to feel experimental without becoming visually
              chaotic. Earlier sections used too many competing accent colors,
              which made the brand feel less consistent across the page.
            </p>

            <ul className="mt-3 space-y-1">
              <li>• Too many unrelated highlight colors</li>
              <li>• Different sections felt like separate visual systems</li>
              <li>• Cyan glow was strong, but not yet fully controlled</li>
              <li>• Project cards and typography needed stronger unity</li>
            </ul>

            <p className="mt-5">
              <strong>The goal</strong> was to reduce the interface to a focused
              palette that still feels digital, luminous, and personal.
            </p>
          </InfoBlock>

          <InfoBlock title="Strategy">
            <p>
              <strong>Brand Positioning:</strong> creative development with a
              strategic, technical, and expressive visual identity.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>Focused</Tag>
              <Tag>Digital</Tag>
              <Tag>Strategic</Tag>
              <Tag>Atmospheric</Tag>
            </div>

            <p className="mt-5">
              <strong>Visual Direction:</strong> instead of using rainbow
              accents, the system relies on dark backgrounds, ice-white text,
              cyan interaction states, and electric-blue atmospheric depth.
            </p>
          </InfoBlock>

          <InfoBlock title="Deliverables">
            <p>
              Brand palette, portfolio interface direction, project carousel
              styling, color-system section, typography hierarchy, hover states,
              glow system, and reusable visual language for future project pages.
            </p>
          </InfoBlock>
        </div>

        {/* VISUAL CARD */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#67E8F9]/35 bg-[#05070A]/80 p-6 shadow-[0_0_42px_rgba(34,211,238,0.28),0_28px_80px_rgba(5,7,10,0.28)] backdrop-blur-md">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.24),transparent_42%),radial-gradient(circle_at_75%_70%,rgba(37,99,235,0.25),transparent_36%)]" />

            <div className="relative z-10 flex min-h-[520px] flex-col justify-between rounded-[1.5rem] border border-[#67E8F9]/20 bg-[#070A0D]/80 p-8 backdrop-blur-md">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.38em] text-[#67E8F9]/80">
                  Core Palette
                </p>

                <h3 className="mt-6 text-[clamp(3rem,6vw,6.4rem)] font-black uppercase leading-[0.82] tracking-[-0.08em] text-[#F3F8FF] drop-shadow-[0_0_24px_rgba(34,211,238,0.45)]">
                  Blue
                  <br />
                  White
                  <br />
                  System
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <ColorSwatch label="Black" hex={koyoteCorePalette.black} />
                <ColorSwatch label="Charcoal" hex={koyoteCorePalette.charcoal} />
                <ColorSwatch label="Ice" hex={koyoteCorePalette.iceWhite} dark />
                <ColorSwatch label="Cyan" hex={koyoteCorePalette.cyan} dark />
                <ColorSwatch label="Glow" hex={koyoteCorePalette.cyanGlow} dark />
                <ColorSwatch label="Blue" hex={koyoteCorePalette.electricBlue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <h2 className="mb-3 text-3xl font-black uppercase tracking-[-0.04em] text-[#67E8F9] drop-shadow-[0_0_16px_rgba(34,211,238,0.35)] sm:text-4xl">
        {title}
      </h2>

      <div className="max-w-3xl text-base font-medium leading-[1.18] text-[#F3F8FF]/85 sm:text-lg">
        {children}
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-[#2563EB] px-3 py-1 text-sm font-black uppercase tracking-[-0.02em] text-[#F3F8FF] shadow-[0_0_18px_rgba(37,99,235,0.25)]">
      {children}
    </span>
  );
}

function ColorSwatch({
  label,
  hex,
  dark = false,
}: {
  label: string;
  hex: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex h-24 flex-col justify-between rounded-xl border border-white/15 p-3 ${
        dark ? "text-[#05070A]" : "text-[#F3F8FF]"
      }`}
      style={{ backgroundColor: hex }}
    >
      <span className="text-xs font-black uppercase tracking-[-0.03em]">
        {label}
      </span>

      <span className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-75">
        {hex}
      </span>
    </div>
  );
}