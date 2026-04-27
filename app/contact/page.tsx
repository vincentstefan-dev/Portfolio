"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ThemedBackground from "../template/theme/ThemedBackground";
import { House } from "lucide-react";
import Link from "next/link";

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
  const playerRef = useRef<any>(null);
  const touchStartX = useRef(0);
  const [isInitialBlur, setIsInitialBlur] = useState(true);
  const [activeIndex, setActiveIndex] = useState(1);
  const [sendStatus, setSendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isMobile, setIsMobile] = useState(false);

  const playBlurIntro = useCallback(() => {
    setIsInitialBlur(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.setTimeout(() => {
          setIsInitialBlur(false);
        }, 50);
      });
    });
  }, []);

  useEffect(() => {
    playBlurIntro();
  }, [playBlurIntro]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePlayerReady = useCallback((player: any) => {
    playerRef.current = player;
  }, []);

  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">
      <ThemedBackground onReady={handlePlayerReady} />

        {/* BACK BUTTON */}
        <div className="fixed bottom-6 right-6 z-50">
          <Link
            href="/"
            aria-label="Return to portfolio"
            className="group flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition hover:bg-white/50"
          >
            <House
              className="h-5 w-5 text-white transition-transform duration-100 group-hover:scale-110"
              strokeWidth={1.5}
            />
          </Link>
        </div>

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-1/2 top-[48%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 blur-[180px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
        <div className="stars stars-far" />
        <div className="stars stars-mid" />
        <div className="stars stars-near" />
      </div>

      <div className="noise pointer-events-none fixed inset-0 z-[3] opacity-25 mix-blend-overlay" />

      <div className="pointer-events-none absolute inset-0 z-[4] bg-blue-900/10 mix-blend-color" />

      <div
      className={`relative z-10 h-screen transition-all duration-[400ms] ease-out ${
          isInitialBlur ? "scale-[1.01] blur-sm" : "scale-100 blur-0"
        }`}
      >
        <section className="relative flex h-screen flex-col items-center justify-center px-6 py-10">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.45em] text-white/50">
            Hey! Let's Build It
          </p>

          <h1 className="text-3xl font-semibold tracking-[0.12em] text-white md:text-5xl">
            How should we talk?
          </h1>

          <p className="mt-4 max-w-xl leading-6 text-white/55 md:text-base">
            I would love to know about your project!
          </p>
        </div>

          <div
              className="relative flex h-[620px] w-full max-w-6xl touch-pan-y items-center justify-center overflow-visible"
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
                  className={`absolute cursor-pointer transition-all duration-500 ease-out ${
                    isActive
                      ? "z-30 opacity-100"
                      : "z-10 opacity-55 hover:opacity-80"
                  }`}
                    style={{
                      transform: `translateX(${offset * (isMobile ? 260 : 270)}px) scale(${
                        isActive ? 1 : 0.72
                      })`,
                      touchAction: "pan-y",
                    }}
                >
                  <div className="relative w-[500px] max-w-[85vw]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="block w-full select-none object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.65)] drop-shadow-[0_0_45px_rgba(120,180,255,0.25)]"
                    />

                    <div
                      className={`pointer-events-none absolute left-1/2 top-[12%] z-20 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border bg-black/20 text-4xl backdrop-blur-md ${iconGlow}`}
                    >
                      <span className="drop-shadow-[0_0_12px_currentColor]">
                        {item.icon}
                      </span>
                    </div>

                    <div className="absolute left-[17%] top-[34%] z-10 flex w-[60%] flex-col gap-3">
                      <h2
                        className={`w-full text-center text-2xl font-semibold uppercase tracking-[0.18em] ${
                          isActive ? titleGlow : "text-white/70"
                        }`}
                      >
                        {item.title}
                      </h2>

                      {item.id === "inquiry" && isActive ? (
                        <div
                          className="space-y-2"
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
                            className="w-full border border-white/30 bg-white/10 px-3 py-2 text-xs text-white outline-none backdrop-blur-md placeholder:text-white/45 focus:border-cyan-200 focus:shadow-[0_0_12px_rgba(120,180,255,0.4)]"
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
                            className="w-full border border-white/30 bg-white/10 px-3 py-2 text-xs text-white outline-none backdrop-blur-md placeholder:text-white/45 focus:border-cyan-200 focus:shadow-[0_0_12px_rgba(120,180,255,0.4)]"
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
                            rows={3}
                            className="w-full resize-none border border-white/30 bg-white/10 px-3 py-2 text-xs text-white outline-none backdrop-blur-md placeholder:text-white/45 focus:border-cyan-200 focus:shadow-[0_0_12px_rgba(120,180,255,0.4)]"
                          />
                        </div>
                      ) : (
                        <p className="mt-2 text-sm leading-6 text-white/60">
                          {item.description}
                        </p>
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
                            window.location.href = "https://api.whatsapp.com/send?phone=4915778786924";
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
                        className={`relative mt-2 flex w-full items-center justify-between px-5 py-3 text-xs uppercase tracking-[0.25em] text-black transition backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${buttonSpectrum}`}
                      >
                        <span
                          className={`pointer-events-none absolute inset-0 opacity-30 ${innerGlow}`}
                        />

                        <span className="relative z-10 flex w-full items-center justify-between">
                          {sendStatus === "sending" && item.id === "inquiry"
                            ? "Sending..."
                            : item.button}
                          <span>→</span>
                        </span>
                      </button>

                      {item.id === "inquiry" && sendStatus !== "idle" && (
                        <p className="text-center text-xs uppercase tracking-[0.2em] text-cyan-100/70">
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
      </div>
    </main>
  );
}