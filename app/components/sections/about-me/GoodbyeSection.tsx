"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode, CSSProperties, MouseEvent } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  Globe,
  Clock3,
  Sparkles,
  Plus,
} from "lucide-react";
import { goodbyeRc as rc } from "./aboutMeResponsiveConfig";

type FireworkSpark = {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  color: string;
};

export default function GoodbyeSection() {
  return (
    <section className={rc.section}>
      <BackgroundDecor />

      <div className={rc.shell}>
        <div className={rc.mobile.wrapper}>
          <div className={rc.mobile.introPanel}>
            <IntroContent />
          </div>

          <ContactPanel />

          <div className={rc.mobile.blobPanel}>
            <BlobStatus />
          </div>
        </div>

        <div className={rc.desktop.wrapper}>
          <IntroContent />
          <ContactPanel />
        </div>

        <div className={rc.desktop.blobWrapper}>
          <BlobStatus />
        </div>
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div className={rc.background.gridWrapper}>
        <div className={rc.background.grid} />
      </div>

      <div className={rc.background.cornerTopLeft} />
      <div className={rc.background.cornerTopRight} />
      <div className={rc.background.cornerBottomLeft} />
      <div className={rc.background.cornerBottomRight} />

      <div className={rc.background.smallDot} />

      <div className={rc.background.star}>✶</div>

      <div className={rc.background.sparkle}>✧</div>
    </>
  );
}

function IntroContent() {
  return (
    <div className={rc.intro.wrapper}>
      <div className={rc.intro.eyebrow}>
        <span className={rc.intro.eyebrowDot} />
        Final Signal
      </div>

      <h2 className={rc.intro.title}>
        Goodbye,
        <br />
        for now
        <span className={rc.intro.titleDot}>.</span>
      </h2>

      <p className={rc.intro.subtitle}>
        If you like my work, let&apos;s build something meaningful together.
      </p>

      <div className={rc.intro.body}>
        <p>
          I&apos;m always open to new projects, collaborations, and experiments;
          anything that can help me grow, I am willing to give my attention and
          skills to.
          <br />I would love to hear about your projects and dreams.
        </p>

        <p>
          Have an idea, a problem to solve, or a project in progress? Let&apos;s
          talk.
        </p>
      </div>

      <div className={rc.intro.ctaArea}>
        <div className={rc.intro.ctaRow}>
          <Link href="/contact" className="rainbow-project-button group">
            <span className="rainbow-project-button-icon">
              <ArrowUpRight className="h-5 w-5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            Start a project
          </Link>

          <a
            href="https://wa.me/4915778786924?text=Hi%20Vincent%2C%20I%20wanted%20to%20reach%20out."
            target="_blank"
            rel="noopener noreferrer"
            className={rc.intro.whatsapp}
          >
            <span className={rc.intro.whatsappIcon}>
              <Mail className="h-5 w-5" />
            </span>
            Text me 📬
          </a>
        </div>

        <div className={rc.intro.locationPill}>
          <Globe className={rc.intro.locationIcon} />
          <span className={rc.intro.locationText}>
            Built from Berlin · Working globally
          </span>
          <span className={rc.intro.locationDot} />
        </div>
      </div>
    </div>
  );
}

function FireworkPortal({ sparks }: { sparks: FireworkSpark[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || sparks.length === 0) return null;

  return createPortal(
    <div className={rc.fireworks.portal}>
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="firework-particle"
          style={
            {
              left: `${spark.x}px`,
              top: `${spark.y}px`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              backgroundColor: spark.color,
              boxShadow: `0 0 12px ${spark.color}, 0 0 28px ${spark.color}`,
              "--tx": `${spark.tx}px`,
              "--ty": `${spark.ty}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>,
    document.body
  );
}

function ContactPanel() {
  const [fireworks, setFireworks] = useState<FireworkSpark[]>([]);

  const triggerFireworks = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const colors = [
      "#67e8f9",
      "#22d3ee",
      "#a855f7",
      "#facc15",
      "#fb7185",
      "#ffffff",
      "#4ade80",
    ];

    const sparkCount = 90;

    const burst = Array.from({ length: sparkCount }, (_, i) => {
      const angle = (Math.PI * 2 * i) / sparkCount;
      const distance = 90 + Math.random() * 190;

      return {
        id: Date.now() + i,
        x: originX,
        y: originY,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        size: 4 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });

    setFireworks(burst);

    window.setTimeout(() => {
      setFireworks([]);
    }, 1200);
  };

  return (
    <div className={rc.contact.wrapper}>
      <FireworkPortal sparks={fireworks} />

      <div className={rc.contact.panel}>
        <div className={rc.contact.glow} />

        <div className={rc.contact.header}>
          <div className={rc.contact.badge}>
            Let&apos;s Talk!
            <span className={rc.contact.badgeDot} />
          </div>

          <button
            type="button"
            onClick={triggerFireworks}
            className={rc.contact.fireworkButton}
            aria-label="Trigger fireworks"
          >
            <ArrowUpRight className={rc.contact.fireworkIcon} />
          </button>
        </div>

        <div className={rc.contact.rows}>
          <ContactRow
            icon={<Mail className="h-5 w-5 sm:h-6 sm:w-6" />}
            label="Email"
            value="Vincentstefan@Icloud.com"
            href="mailto:hello@vincent-lab.dev"
          />

          <ContactRow
            icon={<Globe className="h-5 w-5 sm:h-6 sm:w-6" />}
            label="Portfolio"
            value="The studio."
            href="/potfgolio"
          />

          <ContactRow
            icon={<Clock3 className="h-5 w-5 text-emerald-400 sm:h-6 sm:w-6" />}
            label="Availability"
            value="Open for freelance & collaborations"
            href="/contact"
          />

          <ContactRow
            icon={<Sparkles className="h-5 w-5 text-cyan-300 sm:h-6 sm:w-6" />}
            label="Let’s start somewhere"
            value="Send me your idea, even if it’s messy, we can shape it together 👾 ."
            href="/contact"
          />
        </div>

        <div className={rc.contact.footer}>
          <div className={rc.contact.footerBox}>
            <div className={rc.contact.footerContent}>
              <Plus className={rc.contact.footerIcon} />
              <span className={rc.contact.footerText}>
                Start with a message, let’s shape the next thing.
              </span>
            </div>

            <img
              src="/Gifs/REDHEART.gif"
              alt=""
              className={rc.contact.footerHeart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BlobStatus() {
  return (
    <>
      <div className={rc.blob.imageWrapper}>
        <img src="/logos/8BIT.png" alt="" className={rc.blob.image} />
      </div>

      <div className={rc.blob.status}>
        <span>Thanks for Watching</span>

        <div className={rc.blob.line}>
          <span className={rc.blob.lineDot} />
        </div>

        <span className={rc.blob.seeYou}>
          See you!
          <img
            src="/Gifs/Mishi/MISHI1.gif"
            alt=""
            className={rc.blob.mishiIcon}
          />
        </span>
      </div>
    </>
  );
}

type ContactRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
};

function ContactRow({ icon, label, value, href }: ContactRowProps) {
  return (
    <Link href={href} className={rc.contactRow.link}>
      <div className={rc.contactRow.left}>
        <div className={rc.contactRow.iconBox}>{icon}</div>

        <div className={rc.contactRow.textBox}>
          <h3 className={rc.contactRow.label}>{label}</h3>

          <p className={rc.contactRow.value}>{value}</p>
        </div>
      </div>

      <ArrowUpRight className={rc.contactRow.arrow} />
    </Link>
  );
}