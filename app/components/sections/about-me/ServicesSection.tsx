"use client";

import Link from "next/link";
import { servicesRc as rc } from "./aboutMeResponsiveConfig";

const serviceCards = [
  {
    id: "build",
    n: "01",
    title: "BUILD",
    text: "Websites, interfaces and systems that are fast, scalable and built with purpose.",
  },
  {
    id: "design",
    n: "02",
    title: "DESIGN",
    text: "Visual systems, UI design and brand marketing that communicate clearly.",
  },
  {
    id: "strategy",
    n: "03",
    title: "STRATEGY",
    text: "Positioning, structure and systems thinking that move ideas forward.",
  },
  {
    id: "brandLogic",
    n: "04",
    title: "BRAND LOGIC",
    text: "Brand systems, positioning and structure that give ideas clarity and consistency.",
  },
  {
    id: "experiment",
    n: "05",
    title: "EXPERIMENT",
    text: "Creative prototypes, testing and iteration that turn rough ideas into usable direction.",
  },
] as const;

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

type ServiceCardItem = (typeof serviceCards)[number];

export default function ServicesSection() {
  return (
    <section className={rc.section}>
      <div className={rc.background.glow} />
      <div className={rc.background.grid} />

      <div className={rc.shell}>
        <div className={rc.mobile.wrapper}>
          <div className={rc.mobile.panel}>
            <p className={rc.mobile.eyebrow}>02 &gt; What I do</p>

            <h2 className={rc.mobile.heading}>
              From strategy to interface, I help brands shape digital concepts
              that are clear, functional, and ready to grow.
            </h2>

            <Link href="/contact" className={rc.cta.project}>
              ● Start a project
            </Link>
          </div>

          <div className={rc.mobile.cardGrid}>
            {serviceCards.map((item) => (
              <MobileServiceCard key={item.n} item={item} />
            ))}
          </div>

          <div className={rc.mobile.panel}>
            <div className={rc.mobile.aboutHeader}>
              <div className={rc.mobile.aboutImageWrapper}>
                <img
                  src="/aboutme/about-me3.png"
                  alt="Vincent"
                  className={rc.mobile.aboutImage}
                />

                <div className={rc.mobile.aboutImageOverlay} />
              </div>

              <p className={rc.mobile.aboutLabel}>About me</p>
            </div>

            <p className={rc.mobile.aboutText}>
              I am 28 years old, with a Guatemalan and German background. I grew
              up in the forests of Guatemala with a beautiful Siamese cat named
              Mishi.
            </p>

            <div className={rc.mobile.mishiWrapper}>
              <img
                src="/Gifs/MISHI.gif"
                alt="Creative work"
                className={rc.mobile.mishiImage}
              />
            </div>
          </div>

          <div className={rc.mobile.sidePanelGrid}>
            {sidePanels.map((panel) => (
              <SidePanel key={panel.title} panel={panel} />
            ))}
          </div>
        </div>

        <div className={rc.desktop.wrapper}>
          <aside className={rc.desktop.leftAside}>
            <p className={rc.desktop.leftEyebrow}>02 &gt; WHAT I DO</p>

            <div className={rc.desktop.leftTextStack}>
              <p>
                From strategy to interface, I help brands shape digital concepts
                that are clear, functional, and ready to grow.
              </p>

              <Link href="/contact" className={rc.cta.project}>
                ● Start a project
              </Link>
            </div>

            <div className={rc.desktop.aboutBlock}>
              <div className={rc.desktop.aboutHeader}>
                <div className={rc.desktop.aboutImageWrapper}>
                  <img
                    src="/aboutme/about-me3.png"
                    alt="Vincent"
                    className={rc.desktop.aboutImage}
                  />

                  <div className={rc.desktop.aboutImageOverlay} />
                </div>

                <p className={rc.desktop.aboutLabel}>ABOUT ME</p>
              </div>

              <p className={rc.desktop.aboutText}>
                I’m 28 years old and come from a Guatemalan and German
                background. I grew up in the forests of Guatemala with a
                beautiful Siamese cat named Mishi.
              </p>

              <div className={rc.desktop.mishiWrapper}>
                <img
                  src="/Gifs/MISHI.gif"
                  alt="Creative work"
                  className={rc.desktop.mishiImage}
                />
              </div>
            </div>
          </aside>

          <main className={rc.desktop.mainPanel}>
            <div className={rc.desktop.mainGlow} />

            <div className={rc.desktop.mainContent}>
              <h1 className={rc.desktop.headline}>
                A five-part system for shaping ideas into clear, functional, and
                ready to launch digital work.
              </h1>
            </div>

            <div className={rc.desktop.cardStage}>
              {serviceCards.map((item) => (
                <DesktopServiceCard key={item.n} item={item} />
              ))}
            </div>
          </main>

          <aside className={rc.desktop.rightAside}>
            {sidePanels.map((panel) => (
              <SidePanel key={panel.title} panel={panel} desktop />
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}

function DesktopServiceCard({ item }: { item: ServiceCardItem }) {
  return (
    <div
      className={`${rc.serviceCard.desktop} ${rc.cardPositions[item.id]}`}
    >
      <CardCorners />

      <p className={rc.serviceCard.number}>[{item.n}]</p>

      <h3 className={rc.serviceCard.title}>{item.title}</h3>

      <p className={rc.serviceCard.text}>{item.text}</p>
    </div>
  );
}

function MobileServiceCard({ item }: { item: ServiceCardItem }) {
  return (
    <div className={rc.serviceCard.mobile}>
      <CardCorners />

      <p className={rc.serviceCard.number}>[{item.n}]</p>

      <h3 className={rc.serviceCard.title}>{item.title}</h3>

      <p className={rc.serviceCard.text}>{item.text}</p>
    </div>
  );
}

function CardCorners() {
  return (
    <>
      <span className={rc.corners.topLeft} />
      <span className={rc.corners.topRight} />
      <span className={rc.corners.bottomLeft} />
      <span className={rc.corners.bottomRight} />
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
      className={`${rc.sidePanel.base} ${
        desktop ? rc.sidePanel.desktop : rc.sidePanel.mobile
      }`}
    >
      <p className={rc.sidePanel.title}>{panel.title}</p>

      <div className={rc.sidePanel.items}>
        {panel.items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}