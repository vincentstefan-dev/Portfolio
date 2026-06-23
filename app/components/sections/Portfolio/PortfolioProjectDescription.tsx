"use client";

import Image from "next/image";
import Link from "next/link";

  const portraitWindows = [
  // FIRST ROW
  {
    title: "Vini Creator of Koyote",
    src: "/potraits/ChatGPT Image Jun 22, 2026, 04_36_11 PM.png",
    alt: "Koyote portrait image 1",
    className: "lg:left-[63%] lg:top-[6%] rotate-[-3deg] z-30",
  },
  {
    title: "Antonia Amazing Girlfriend",
    src: "/potraits/antonia.png",
    alt: "Koyote portrait image 2",
    className: "lg:right-[0%] lg:top-[6%] rotate-[2deg] z-20",
  },
  {
    title: "Daniela Designer",
    src: "/potraits/danielabit.png",
    alt: "Koyote portrait image 3",
    className: "lg:right-[-18%] lg:top-[8%] rotate-[8deg] z-30",
  },

  // SECOND ROW
  {
    title: "Dominique Designer",
    src: "/potraits/Dominique.png",
    alt: "Koyote portrait image 4",
    className: "lg:left-[61%] lg:top-[50%] rotate-[4deg] z-20",
  },
  {
    title: "Alex Project Friend",
    src: "/potraits/alex.png",
    alt: "Koyote portrait image 5",
    className: "lg:right-[2%] lg:top-[53%] rotate-[-3deg] z-30",
  },
  {
    title: "Koyote Support",
    src: "/potraits/mishi.png",
    alt: "Koyote portrait image 6",
    className: "lg:right-[-17%] lg:top-[55%] rotate-[5deg] z-10",
  },
];

export default function ProjectDescriptionSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent px-6 py-20 text-[#F3F8FF] sm:px-10 lg:px-16">
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* TEXT CONTENT */}
        <div className="relative z-20 max-w-3xl">
          <InfoBlock title="Where does it start?">
            <p>
              Koyote is my personal creative project, where I combine what I
              have learned throughout my university career in Business,
              Marketing, and Game Theory with my deep personal passions for
              coding, illustration, and, most importantly, creative flexibility.
              <br />
              <br />
              I believe that, for both myself and Koyote, the essence of good
              work comes from flexibility, growth, and the desire to change.
              Being experimental and learning as a project is assembled is the
              key to creating something functional, aligned, and sustainable.
              <br />
              <br />
              I align deeply and personally with Koyote, and I hope that this
              alignment can meet you.
            </p>
          </InfoBlock>

          <InfoBlock title="The mentality">
            <p>
              My small team and I address project challenges by being boldly
              experimental without being chaotic. We agreed to approach each
              project the same way we explored and completed our favorite video
              games: with curiosity, strategy, and a weirdly huge amount of
              research.
              <br />
              <br />
              Our team’s key pillars are:
              <br />
              • Creativity
              <br />
              • Game Theory, for strategic solutions
              <br />
              • Business acumen, after all, that is why we got these degrees
              <br />
              • Human interaction above all
              <br />
              <br />
              Our goal is to create projects that are sustainable, and to ensure
              that every handshake, virtual or in real life, leaves a lasting
              impression of friendship.
            </p>
          </InfoBlock>

          <InfoBlock title="Goal">
            <p>
              <strong>Our final Goal with you</strong> is to deliver a project
              that meets the German standard of technical expertise, Strategy
              and Implementation <strong> without </strong> losing our Latin
              American roots deeply embedded in bold creative expression.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Tag>Strategy</Tag>
              <Tag>Sustainability</Tag>
              <Tag>Creativity</Tag>
              <Tag>Technical expertise</Tag>
            </div>

            <p className="mt-5">
              You should check the{" "}
              <Link href="/blog" className="inline-block hover:opacity-80">
                <span className="inline-block overflow-visible animate-rainbow-text pb-[0.14em] font-semibold leading-[1.2]">
                  Blog area
                </span>
              </Link>{" "}
              to see our creative expression at the fullest.
            </p>
          </InfoBlock>
        </div>

        {/* WINDOWS XP IMAGE POPUPS */}
        <div className="pointer-events-none relative z-10 mt-12 grid gap-6 sm:grid-cols-2 lg:absolute lg:inset-0 lg:mt-0 lg:block">
          {portraitWindows.map((item) => (
            <XpImageWindow key={item.src} {...item} />
          ))}
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

function XpImageWindow({
  title,
  src,
  alt,
  className,
}: {
  title: string;
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div
      className={[
        "overflow-hidden rounded-[7px] border border-[#08348f] bg-[#ece9d8]",
        "shadow-[6px_8px_0_rgba(0,0,0,0.28),0_0_24px_rgba(103,232,249,0.18)]",
        "transition-transform duration-300 ease-out",
        "hover:scale-[1.03]",
        "lg:absolute lg:w-[230px]",
        className,
      ].join(" ")}
    >
      {/* XP TITLE BAR */}
      <div className="flex h-7 items-center justify-between bg-gradient-to-b from-[#3f8cff] via-[#1456d8] to-[#073b9f] px-2 text-white">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="h-3 w-3 shrink-0 rounded-sm bg-[#f7d24c] shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.28)]" />

          <span className="truncate text-[11px] font-bold leading-none drop-shadow">
            {title}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <span className="grid h-4 w-4 place-items-center rounded-sm bg-[#2f73e8] text-[10px] font-black leading-none shadow-[inset_1px_1px_0_rgba(255,255,255,0.45)]">
            _
          </span>

          <span className="grid h-4 w-4 place-items-center rounded-sm bg-[#2f73e8] text-[9px] font-black leading-none shadow-[inset_1px_1px_0_rgba(255,255,255,0.45)]">
            □
          </span>

          <span className="grid h-4 w-4 place-items-center rounded-sm bg-[#e54835] text-[10px] font-black leading-none shadow-[inset_1px_1px_0_rgba(255,255,255,0.45)]">
            ×
          </span>
        </div>
      </div>

      {/* IMAGE BODY */}
      <div className="border-x-2 border-b-2 border-[#1b55b9] bg-[#ece9d8] p-2">
        <div className="relative aspect-[3/4] overflow-hidden border border-[#8a867a] bg-white">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 230px, 70vw"
            className="object-cover object-center"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}