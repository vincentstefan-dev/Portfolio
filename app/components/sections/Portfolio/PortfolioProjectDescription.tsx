"use client";

import Image from "next/image";
import Link from "next/link";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";

const portraitWindows = [
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
  {
    title: "Dominique Designer",
    src: "/potraits/dominique.png",
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
    <section className={rc.description.section}>
      <div className={rc.description.inner}>
        <div className={rc.description.textContent}>
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

            <div className={rc.description.tagWrap}>
              <Tag>Strategy</Tag>
              <Tag>Sustainability</Tag>
              <Tag>Creativity</Tag>
              <Tag>Technical expertise</Tag>
            </div>

            <p className={rc.description.blogParagraph}>
              You should check the{" "}
              <Link href="/blog" className={rc.description.blogLink}>
                <span className={rc.description.blogLinkText}>Blog area</span>
              </Link>{" "}
              to see our creative expression at the fullest.
            </p>
          </InfoBlock>
        </div>

        <div className={rc.description.windowsWrap}>
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
    <div className={rc.description.infoBlock}>
      <h2 className={rc.description.infoTitle}>{title}</h2>

      <div className={rc.description.infoBody}>{children}</div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className={rc.description.tag}>{children}</span>;
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
    <div className={`${rc.description.xpWindow} ${className}`}>
      <div className={rc.description.xpTitleBar}>
        <div className={rc.description.xpTitleLeft}>
          <span className={rc.description.xpFolderIcon} />

          <span className={rc.description.xpTitleText}>{title}</span>
        </div>

        <div className={rc.description.xpControls}>
          <span className={rc.description.xpControlBlue}>_</span>
          <span className={rc.description.xpControlBlueSmall}>□</span>
          <span className={rc.description.xpControlRed}>×</span>
        </div>
      </div>

      <div className={rc.description.xpBody}>
        <div className={rc.description.xpImageFrame}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 230px, 70vw"
            className={rc.description.xpImage}
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}