"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { House } from "lucide-react";

import ThemedBackground from "../components/template/theme/ThemedBackground";
import AtomicPlayer from "@/app/components/media/atomicplayer";
import PageTransitionWrapper from "@/app/components/template/layout/PageTransitionWrapper";

import { useAtomicPlayerControls } from "@/app/components/template/layout/useAtomicPlayerControls";
import { usePageTransition } from "@/app/components/template/layout/usePageTransition";

import { contactRc as rc } from "./contactResponsiveConfig";

const CONTACT_CARTRIDGES = [
  {
    id: "call",
    image: "/catridges/purple.png",
    icon: "📅",
    title: "Bookings",
    description: "Schedule a short call to discuss the project direction.",
    button: "Check Bookings",
  },
  {
    id: "inquiry",
    image: "/catridges/crystal.png",
    icon: "📧",
    title: "Send Inquiry",
    description:
      "For projects, collaborations, websites, brand systems, or strategy work.",
    button: "Send Email",
  },
  {
    id: "message",
    image: "/catridges/Green.png",
    icon: "📱",
    title: "Whatsapp",
    description: "Send a Whatsapp message if you already know what you need.",
    button: "Whatsapp me",
  },
];

export default function ContactPage() {
  const touchStartX = useRef(0);

  const {
    playerRef,
    isPlaying,
    setIsPlaying,
    isMuted,
    setIsMuted,
    volume,
    setVolume,
    handlePlayerReady,
  } = useAtomicPlayerControls();

  const isInitialBlur = usePageTransition(0);
  const [activeIndex, setActiveIndex] = useState(1);

  const [sendStatus, setSendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <main className={rc.main}>
      <ThemedBackground onReady={handlePlayerReady} />

      <AtomicPlayer
        playerRef={playerRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        volume={volume}
        setVolume={setVolume}
      />

      <div className={rc.backButtonWrap}>
        <Link href="/" aria-label="Return home" className={rc.backButton}>
          <House className={rc.backIcon} strokeWidth={1.5} />
        </Link>
      </div>

      <div className={rc.blueGlowWrap}>
        <div className={rc.blueGlow} />
      </div>

      <div className={rc.starsWrap}>
        <div className="stars stars-far" />
        <div className="stars stars-mid" />
        <div className="stars stars-near" />
      </div>

      <div className={rc.noise} />
      <div className={rc.colorWash} />

      <PageTransitionWrapper isBlurred={isInitialBlur}>
        <section className={rc.section}>
          <div className={rc.header}>
            <p className={rc.eyebrow}>Hey! Let&apos;s Build It</p>

            <h1 className={rc.title}>How should we talk?</h1>

            <p className={rc.subtitle}>
              I would love to know about your project!
            </p>
          </div>

          <div
            className={rc.carousel}
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const endX = e.changedTouches[0].clientX;
              const diff = touchStartX.current - endX;

              if (Math.abs(diff) < 40) return;

              if (diff > 0) {
                setActiveIndex((prev) =>
                  Math.min(prev + 1, CONTACT_CARTRIDGES.length - 1)
                );
              } else {
                setActiveIndex((prev) => Math.max(prev - 1, 0));
              }
            }}
          >
            {CONTACT_CARTRIDGES.map((item, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;
              const isInquiryActive = item.id === "inquiry" && isActive;

              const titleGlow =
                item.id === "call"
                  ? "animate-call-glow text-purple-100"
                  : item.id === "message"
                    ? "animate-message-glow text-green-100"
                    : "animate-inquiry-glow text-cyan-100";

              const buttonSpectrum =
                item.id === "call"
                  ? "animate-spectrum-purple shadow-[0_0_25px_rgba(168,85,247,0.25)]"
                  : item.id === "message"
                    ? "animate-spectrum-green shadow-[0_0_25px_rgba(34,197,94,0.25)]"
                    : "animate-spectrum-cyan shadow-[0_0_25px_rgba(0,240,255,0.25)]";

              const innerGlow =
                item.id === "call"
                  ? "bg-purple-400/20"
                  : item.id === "message"
                    ? "bg-green-400/20"
                    : "bg-cyan-400/20";

              const iconGlow =
                item.id === "call"
                  ? "text-purple-100 border-purple-200/45 shadow-[0_0_30px_rgba(168,85,247,0.8),inset_0_0_18px_rgba(168,85,247,0.18)]"
                  : item.id === "message"
                    ? "text-green-100 border-green-200/45 shadow-[0_0_30px_rgba(34,197,94,0.8),inset_0_0_18px_rgba(34,197,94,0.18)]"
                    : "text-cyan-100 border-cyan-200/45 shadow-[0_0_30px_rgba(34,211,238,0.8),inset_0_0_18px_rgba(34,211,238,0.18)]";

              return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveIndex(index);
                    }
                  }}
                  className={`${rc.cartridgeOuter} ${
                    isActive ? rc.cartridgeActive : rc.cartridgeInactive
                  }`}
                  style={{
                    transform: `translateX(${offset * 270}px) scale(${
                      isActive ? 1 : 0.72
                    })`,
                    touchAction: "pan-y",
                  }}
                >
                  <div className={rc.cartridgeBody}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={rc.cartridgeImage}
                    />

                    <div className={`${rc.icon} ${iconGlow}`}>
                      <span className={rc.iconInner}>{item.icon}</span>
                    </div>

                    <div className={rc.content}>
                      <h2
                        className={`${rc.cardTitle} ${
                          isActive ? titleGlow : "text-white/70"
                        }`}
                      >
                        {item.title}
                      </h2>

                      {item.id === "inquiry" && isActive ? (
                        <div
                          className={rc.formStack}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            placeholder="Your name"
                            className={rc.input}
                          />

                          <input
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            placeholder="Your email"
                            className={rc.input}
                          />

                          <textarea
                            value={formData.message}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                message: e.target.value,
                              }))
                            }
                            placeholder="What are we building?"
                            rows={2}
                            className={rc.textarea}
                          />
                        </div>
                      ) : (
                        <p className={rc.description}>{item.description}</p>
                      )}

                      <button
                        type="button"
                        disabled={sendStatus === "sending"}
                        onClick={async (e) => {
                          e.stopPropagation();

                          if (!isActive) {
                            setActiveIndex(index);
                            return;
                          }

                          if (item.id === "call") {
                            window.open(
                              "https://calendly.com/YOUR-LINK",
                              "_blank"
                            );
                            return;
                          }

                          if (item.id === "message") {
                            window.location.href =
                              "https://api.whatsapp.com/send?phone=4915778786924";
                            return;
                          }

                          if (item.id === "inquiry") {
                            if (!formData.email || !formData.message) {
                              setSendStatus("error");
                              return;
                            }

                            try {
                              setSendStatus("sending");

                              const res = await fetch("/api/contact", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  name: formData.name,
                                  email: formData.email,
                                  message: formData.message,
                                  type: "inquiry",
                                }),
                              });

                              if (res.ok) {
                                setSendStatus("sent");
                                setFormData({
                                  name: "",
                                  email: "",
                                  message: "",
                                });
                              } else {
                                setSendStatus("error");
                              }
                            } catch (err) {
                              console.error(err);
                              setSendStatus("error");
                            }
                          }
                        }}
                        className={`${rc.button} ${buttonSpectrum} ${
                          isInquiryActive ? rc.inquiryButton : rc.normalButton
                        }`}
                      >
                        <span
                          className={`${rc.buttonGlowLayer} ${innerGlow}`}
                        />

                        <span className={rc.buttonText}>
                          {sendStatus === "sending" && item.id === "inquiry"
                            ? "Sending..."
                            : item.button}
                          <span>→</span>
                        </span>
                      </button>

                      {item.id === "inquiry" && sendStatus !== "idle" && (
                        <p className={rc.status}>
                          {sendStatus === "sending" && "Sending signal..."}
                          {sendStatus === "sent" && "Signal sent."}
                          {sendStatus === "error" && "Add email + message."}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </PageTransitionWrapper>
    </main>
  );
}