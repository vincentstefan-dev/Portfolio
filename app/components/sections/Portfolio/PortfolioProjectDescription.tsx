"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { portfolioRc as rc } from "./portfolioResponsiveConfig";

const portraitWindows = [
  {
    title: "Vini Creator of Koyote",
    src: "/potraits/ChatGPT Image Jun 22, 2026, 04_36_11 PM.png",
    alt: "Koyote portrait image 1",
    className:
      "lg:left-[61%] lg:top-[9%] lg:translate-x-[95px] lg:rotate-[-3deg] lg:z-30",
  },
  {
    title: "Antonia Amazing Girlfriend",
    src: "/potraits/antonia.png",
    alt: "Koyote portrait image 2",
    className:
      "lg:left-[73%] lg:top-[8%] lg:translate-x-[95px] lg:rotate-[2deg] lg:z-20",
  },
  {
    title: "Daniela Designer",
    src: "/potraits/danielabit.png",
    alt: "Koyote portrait image 3",
    className:
      "lg:left-[85%] lg:top-[10%] lg:translate-x-[95px] lg:rotate-[6deg] lg:z-30",
  },
  {
    title: "Dominique Designer",
    src: "/potraits/dominique.png",
    alt: "Koyote portrait image 4",
    className:
      "lg:left-[61%] lg:top-[47%] lg:translate-x-[95px] lg:rotate-[4deg] lg:z-20",
  },
  {
    title: "Alex Project Friend",
    src: "/potraits/alex.png",
    alt: "Koyote portrait image 5",
    className:
      "lg:left-[73%] lg:top-[50%] lg:translate-x-[95px] lg:rotate-[-3deg] lg:z-30",
  },
  {
    title: "Koyote Support",
    src: "/potraits/mishi.png",
    alt: "Koyote portrait image 6",
    className:
      "lg:left-[85%] lg:top-[52%] lg:translate-x-[95px] lg:rotate-[5deg] lg:z-10",
  },
];

export default function ProjectDescriptionSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  function scrollMobileTo(index: number) {
    const track = mobileTrackRef.current;
    if (!track) return;

    track.scrollTo({
      left: index * track.clientWidth,
      behavior: "smooth",
    });
  }

  function setWindowIndex(index: number) {
    setActiveIndex(index);

    requestAnimationFrame(() => {
      scrollMobileTo(index);
    });
  }

  function goToNextWindow() {
    const nextIndex = (activeIndex + 1) % portraitWindows.length;
    setWindowIndex(nextIndex);
  }

  function goToPreviousWindow() {
    const previousIndex =
      activeIndex === 0 ? portraitWindows.length - 1 : activeIndex - 1;

    setWindowIndex(previousIndex);
  }

  function handleMobileScroll() {
    const track = mobileTrackRef.current;
    if (!track) return;

    const nextIndex = Math.round(track.scrollLeft / track.clientWidth);

    if (portraitWindows[nextIndex] && nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
    }
  }

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

        <div className={rc.description.mobileWindowsArea}>
          <div className={rc.description.mobileWindowButtons}>
            <button
              type="button"
              aria-label="Previous portrait"
              onClick={goToPreviousWindow}
              className={rc.description.mobileWindowButton}
            >
              <ArrowLeft className={rc.description.mobileWindowButtonIcon} />
            </button>

            <button
              type="button"
              aria-label="Next portrait"
              onClick={goToNextWindow}
              className={rc.description.mobileWindowButton}
            >
              <ArrowRight className={rc.description.mobileWindowButtonIcon} />
            </button>
          </div>

          <div
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
            className={rc.description.mobileWindowsTrack}
          >
            {portraitWindows.map((item) => (
              <div
                key={`${item.title}-mobile`}
                className={rc.description.mobileWindowSlide}
              >
                <XpImageWindow
                  title={item.title}
                  src={item.src}
                  alt={item.alt}
                  className=""
                  mobile
                />
              </div>
            ))}
          </div>

          <div className={rc.description.mobileWindowDots}>
            {portraitWindows.map((item, index) => (
              <button
                key={`${item.title}-dot`}
                type="button"
                aria-label={`Show ${item.title}`}
                onClick={() => setWindowIndex(index)}
                className={`${rc.description.mobileWindowDot} ${
                  activeIndex === index
                    ? rc.description.mobileWindowDotActive
                    : rc.description.mobileWindowDotInactive
                }`}
              />
            ))}
          </div>
        </div>

        <div className={rc.description.windowsWrap}>
          {portraitWindows.map((item) => (
            <XpImageWindow
              key={`${item.title}-desktop`}
              title={item.title}
              src={item.src}
              alt={item.alt}
              className={item.className}
            />
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
  mobile = false,
}: {
  title: string;
  src: string;
  alt: string;
  className: string;
  mobile?: boolean;
}) {
  return (
    <div
      className={`${rc.description.xpWindow} ${
        mobile ? rc.description.xpWindowMobile : ""
      } ${className}`}
    >
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
            sizes={
              mobile
                ? "90vw"
                : "(min-width: 1280px) 176px, (min-width: 1024px) 162px, 90vw"
            }
            className={rc.description.xpImage}
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}