"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { House } from "lucide-react";

type Ripple = {
  id: string;
  x: number;
  y: number;
};

type Star = {
  id: number;
  size: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
};

type NodeKey =
  | "language"
  | "context"
  | "market"
  | "derivation"
  | "clusters";

type CapsuleNode = {
  id: NodeKey;
  label: string;
  shortLabel?: string;
  x: string;
  y: string;
  width: number;
  height: number;
  eyebrow: string;
  body: string;
};

type ProcessStepId = "source" | "semantic" | "interpretation" | "output";

type ProcessStep = {
  id: ProcessStepId;
  step: string;
  title: string;
  preview: string;
  body: string;
};

const capsuleNodes: CapsuleNode[] = [
  {
    id: "language",
    label: "Language Analysis",
    shortLabel: "Language\nAnalysis",
    x: "50%",
    y: "18%",
    width: 228,
    height: 96,
    eyebrow: "method layer",
    body:
      "Computational text analysis was used to extract recurring semantic structures and identify the founder language that shaped the strategic foundation. This layer moves the project beyond intuition and reveals dominant conceptual patterns through structured interpretation. The result is not just a list of keywords, but a map of meaning that later informs positioning, voice, and strategic direction.",
  },
  {
    id: "context",
    label: "Context",
    x: "27%",
    y: "38%",
    width: 180,
    height: 88,
    eyebrow: "diagnostic frame",
    body:
      "This layer frames the project environment: intimacy, embodiment, overstimulation, and the broader cultural distance from lived, present experience. It defines the problem territory in which SHE operates and clarifies why the brand must be structured around depth, awareness, and reconnection rather than performance or surface-level messaging.",
  },
  {
    id: "market",
    label: "Market Gap",
    x: "73%",
    y: "38%",
    width: 188,
    height: 88,
    eyebrow: "positioning logic",
    body:
      "This step identifies the whitespace between clinical education, performative sexuality, and spiritual practice, where SHE creates a distinct hybrid position. The value of this layer is to clarify not just what the brand is, but what it is not, and why its territory feels differentiated in both tone and proposition.",
  },
  {
    id: "derivation",
    label: "Strategic Derivation",
    shortLabel: "Strategic\nDerivation",
    x: "36%",
    y: "72%",
    width: 232,
    height: 94,
    eyebrow: "strategic output",
    body:
      "The analytical layers were translated into strategic structure: belief, mechanism, transformation promise, and the system through which the brand is expressed. This is the bridge between diagnosis and design. It ensures that brand expression is derived from reasoning rather than imposed stylistically after the fact.",
  },
  {
    id: "clusters",
    label: "Concept Clusters",
    shortLabel: "Concept\nClusters",
    x: "64%",
    y: "72%",
    width: 208,
    height: 92,
    eyebrow: "semantic territories",
    body:
      "Key conceptual territories emerged through clustering: embodied experience, healing and transformation, relational polarity, and practice-oriented delivery. These clusters act as semantic anchors. They make the project readable as a system and allow later messaging, visual identity, and media strategy to remain coherent.",
  },
];

const processSteps: ProcessStep[] = [
  {
    id: "source",
    step: "Step 01",
    title: "Source Review",
    preview:
      "Founder material and project documents were used as the initial analytical base.",
    body:
      "This stage focused on identifying the core source material that defined the internal language of the brand. Founder documents, notes, and prior written material were treated as the primary conceptual territory. The objective was not to summarize them casually, but to establish a stable textual base from which recurring meaning structures could later be extracted.",
  },
  {
    id: "semantic",
    step: "Step 02",
    title: "Semantic Extraction",
    preview:
      "Recurring concepts, vocabulary, and thematic patterns were identified and grouped.",
    body:
      "Once the textual base was defined, recurring vocabulary, relational concepts, and repeated thematic patterns were extracted. This stage converted raw language into analyzable units. The importance of this step was to move away from intuition-only interpretation and instead identify which words, tensions, and semantic relationships consistently shaped the founder narrative.",
  },
  {
    id: "interpretation",
    step: "Step 03",
    title: "Interpretation",
    preview:
      "The clusters were interpreted into strategic insight rather than left as raw language observations.",
    body:
      "The extracted terms and groupings were not treated as final outputs. They were interpreted into conceptual territories and then read in relation to brand structure, emotional range, and strategic possibility. This is where analysis became insight: the project moved from vocabulary recognition into an understanding of what kind of brand logic was actually being expressed.",
  },
  {
    id: "output",
    step: "Step 04",
    title: "Strategic Output",
    preview:
      "The analysis was connected directly to positioning, voice, visual direction, and the final framework.",
    body:
      "The final stage translated the analytical findings into strategic consequence. The language patterns and conceptual territories informed positioning, messaging logic, brand tone, and later visual direction. This ensured that the framework was not aesthetically imposed afterward, but derived from a structured reading of the project itself.",
  },
];

function generateStars(): Star[] {
  return Array.from({ length: 90 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 0.5,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 10 + 12,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.24 + 0.06,
  }));
}

export default function SheDiagnosisPage() {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [lastRippleTime, setLastRippleTime] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState<NodeKey>("language");
  const [activeStep, setActiveStep] = useState<ProcessStepId>("source");

  useEffect(() => {
    setMounted(true);
    setStars(generateStars());
  }, []);

  const activeNodeData = useMemo(
    () => capsuleNodes.find((node) => node.id === activeNode) ?? capsuleNodes[0],
    [activeNode]
  );

  const activeStepData = useMemo(
    () => processSteps.find((step) => step.id === activeStep) ?? processSteps[0],
    [activeStep]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursor({ x, y });

    const now = Date.now();
    if (now - lastRippleTime < 550) return;

    const id = `${now}-${Math.random()}`;
    setLastRippleTime(now);

    setRipples((prev) => [...prev.slice(-3), { id, x, y }]);

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 2400);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#e4d9c9] text-[#2d221b]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.28),transparent_20%),radial-gradient(circle_at_72%_22%,rgba(242,162,65,0.28),transparent_23%),radial-gradient(circle_at_68%_66%,rgba(221,185,109,0.20),transparent_22%),radial-gradient(circle_at_26%_62%,rgba(231,164,112,0.16),transparent_24%),radial-gradient(circle_at_50%_44%,rgba(255,245,231,0.16),transparent_18%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.05)_22%,transparent_44%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_48%,rgba(0,0,0,0.10)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(211,172,67,0.28) 45%, rgba(255,255,255,0.12) 50%, rgba(211,172,67,0.18) 55%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
      />

      <motion.div
        className="pointer-events-none absolute z-[1]"
        animate={{ x: cursor.x - 150, y: cursor.y - 150 }}
        transition={{ type: "spring", stiffness: 26, damping: 24, mass: 1.2 }}
        style={{
          width: 300,
          height: 300,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 22%, rgba(255,255,255,0.03) 44%, transparent 72%)",
          filter: "blur(22px)",
          mixBlendMode: "screen",
          opacity: 0.68,
        }}
      />

      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="pointer-events-none absolute z-[1] rounded-full border border-white/20 bg-white/5"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 44,
            height: 44,
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 30px rgba(255,255,255,0.08)",
            backdropFilter: "blur(4px)",
          }}
          initial={{ scale: 0.2, opacity: 0.24 }}
          animate={{ scale: 6.6, opacity: 0 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {mounted &&
        stars.map((star) => (
          <motion.span
            key={star.id}
            className="pointer-events-none absolute z-[1] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.18)]"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
            }}
            animate={{
              y: [0, -8, 0],
              x: [0, 3, 0],
              opacity: [star.opacity * 0.8, star.opacity, star.opacity * 0.45],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          />
        ))}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1800px] flex-col px-6 pb-16 pt-6 sm:px-10 lg:px-12">
        <header className="flex items-start justify-between gap-6">
          <div className="max-w-[580px]">
            <p className="text-[0.65rem] uppercase tracking-[0.38em] text-[#2d221b]/45">
              SHE / What I Created
            </p>

            <h1 className="mt-3 text-3xl font-light uppercase tracking-[0.18em] text-[#2d221b] sm:text-4xl lg:text-[3.1rem]">
              Diagnosis & Insight
            </h1>

            <p className="mt-3 max-w-[42rem] text-sm leading-7 text-[#2d221b]/62 sm:text-[0.96rem]">
              A conceptual diagnosis of the brand, derived through language
              extraction, semantic grouping, and strategic interpretation.
            </p>
          </div>

          <motion.div
            className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.68rem] uppercase tracking-[0.26em] text-[#2d221b]/55 backdrop-blur-md lg:block"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          >
            Diagnosis Layer
          </motion.div>
        </header>

        <section className="relative mt-6 min-h-0 flex-1 overflow-hidden rounded-[34px] border border-white/14 bg-white/[0.05] shadow-[0_18px_60px_rgba(90,67,46,0.08)] backdrop-blur-[2px] lg:flex">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[16%] top-[16%] h-[32vh] w-[32vh] rounded-full bg-white/10 blur-[120px]" />
            <div className="absolute left-[44%] top-[26%] h-[38vh] w-[38vh] rounded-full bg-[#f2a241]/[0.10] blur-[150px]" />
            <div className="absolute left-[70%] top-[56%] h-[28vh] w-[28vh] rounded-full bg-[#d3ac43]/[0.11] blur-[130px]" />
          </div>

          <div className="relative w-[60%]">
            <div className="relative h-[72vh] w-full">
              {capsuleNodes.map((node) => {
                const isActive = activeNode === node.id;
                const isOtherActive = activeNode !== node.id;

                return (
                  <motion.button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveNode(node.id)}
                    className="absolute rounded-[999px] text-left"
                    style={{
                      left: 0,
                      top: 0,
                      width: node.width,
                    }}
                    animate={{
                      left: node.x,
                      top: node.y,
                      x: "-50%",
                      y: "-50%",
                      scale: isActive ? 1.02 : 1,
                      opacity: isOtherActive ? 0.28 : 1,
                      zIndex: isActive ? 20 : 10,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      scale: isActive ? 1.02 : 1.03,
                    }}
                  >
                    <div
                      className="relative overflow-hidden rounded-[999px] border backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
                      style={{
                        height: node.height,
                        borderColor: isActive
                          ? "rgba(255,255,255,0.28)"
                          : "rgba(255,255,255,0.16)",
                        background: isActive
                          ? "rgba(255,255,255,0.16)"
                          : "rgba(255,255,255,0.08)",
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
                        }}
                      />

                      <div
                        className="absolute inset-0 rounded-[999px] blur-[24px]"
                        style={{
                          background: isActive
                            ? "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 38%, transparent 78%)"
                            : "radial-gradient(circle, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 38%, transparent 78%)",
                        }}
                      />

                      <div className="relative z-10 flex h-full items-center justify-center px-7">
                        <span
                          className="text-center text-[0.82rem] uppercase tracking-[0.24em]"
                          style={{
                            whiteSpace: "pre-line",
                            color: isActive
                              ? "rgba(45,34,27,0.64)"
                              : "rgba(45,34,27,0.46)",
                          }}
                        >
                          {node.shortLabel ?? node.label}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="relative w-[40%] border-l border-white/10">
            <div className="flex h-full items-center justify-center px-8 py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNodeData.id}
                  initial={{ opacity: 0, y: 14, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.99 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex h-[82%] w-full max-w-[460px] flex-col overflow-hidden rounded-[36px] border border-white/20 bg-white/[0.14] backdrop-blur-md shadow-[0_18px_60px_rgba(90,67,46,0.08)]"
                >
                  <div
                    className="absolute inset-0 opacity-70"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col px-8 py-8">
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#2d221b]/36">
                      {activeNodeData.eyebrow}
                    </p>

                    <h2 className="mt-4 text-[1.15rem] uppercase tracking-[0.18em] text-[#2d221b]/70">
                      {activeNodeData.label}
                    </h2>

                    <div className="mt-6 h-px bg-white/10" />

                    <div className="mt-6 min-h-0 flex-1 overflow-y-auto pr-2">
                      <p className="text-[0.98rem] leading-8 text-[#2d221b]/62">
                        {activeNodeData.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-[34px] border border-white/14 bg-white/[0.05] p-10 shadow-[0_18px_60px_rgba(90,67,46,0.06)] backdrop-blur-[2px]">
          <div className="max-w-[980px]">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#2d221b]/38">
              Deeper Breakdown
            </p>

            <h2 className="mt-4 text-[1.4rem] uppercase tracking-[0.16em] text-[#2d221b]/72">
              How the analytical structure was built
            </h2>

            <p className="mt-6 max-w-[1100px] text-[1rem] leading-8 text-[#2d221b]/62">
              This section explains the process in a more linear way. Each step
              represents a distinct layer in how the project moved from raw founder
              material toward structured strategic output.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div className="grid gap-6 sm:grid-cols-2">
              {processSteps.map((step) => {
                const isActive = activeStep === step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(step.id)}
                    className="text-left"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.015 : 1,
                        opacity: isActive ? 1 : 0.88,
                      }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="h-full rounded-[28px] border p-6 backdrop-blur-sm"
                      style={{
                        borderColor: isActive
                          ? "rgba(255,255,255,0.22)"
                          : "rgba(255,255,255,0.14)",
                        background: isActive
                          ? "rgba(255,255,255,0.12)"
                          : "rgba(255,255,255,0.08)",
                        boxShadow: isActive
                          ? "0 12px 40px rgba(90,67,46,0.08)"
                          : "none",
                      }}
                    >
                      <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#2d221b]/38">
                        {step.step}
                      </p>

                      <h3 className="mt-3 text-[1rem] uppercase tracking-[0.12em] text-[#2d221b]/68">
                        {step.title}
                      </h3>

                      <p className="mt-4 text-[0.95rem] leading-7 text-[#2d221b]/60">
                        {step.preview}
                      </p>
                    </motion.div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-[30px] border border-white/14 bg-white/[0.08] p-7 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepData.id}
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.99 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#2d221b]/38">
                    {activeStepData.step}
                  </p>

                  <h3 className="mt-3 text-[1.08rem] uppercase tracking-[0.14em] text-[#2d221b]/70">
                    {activeStepData.title}
                  </h3>

                  <div className="mt-5 h-px bg-white/10" />

                  <p className="mt-6 text-[0.98rem] leading-8 text-[#2d221b]/62">
                    {activeStepData.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <div className="relative mt-6 lg:hidden">
          <div className="overflow-hidden rounded-[28px] border border-white/16 bg-white/[0.10] p-5 shadow-[0_12px_40px_rgba(78,56,37,0.08)] backdrop-blur-xl">
            <div className="space-y-4">
              <div className="relative h-[26vh] w-full rounded-[22px] border border-white/10 bg-white/[0.03]">
                {capsuleNodes.map((node) => {
                  const isActive = activeNode === node.id;
                  const isOtherActive = activeNode !== node.id;

                  return (
                    <motion.button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNode(node.id)}
                      className="absolute rounded-[24px] text-left"
                      style={{
                        left: 0,
                        top: 0,
                        width: node.width * 0.58,
                      }}
                      animate={{
                        left: node.x,
                        top: node.y,
                        x: "-50%",
                        y: "-50%",
                        scale: isActive ? 1.01 : 1,
                        opacity: isOtherActive ? 0.28 : 1,
                        zIndex: isActive ? 20 : 10,
                      }}
                      transition={{
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="overflow-hidden rounded-[24px] border border-white/14 bg-white/[0.06] backdrop-blur-sm">
                        <div
                          className="flex items-center justify-center px-4"
                          style={{ height: node.height * 0.58 }}
                        >
                          <span
                            className="text-center text-[0.58rem] uppercase tracking-[0.18em] text-[#2d221b]/46"
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {node.shortLabel ?? node.label}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNodeData.id}
                  initial={{ opacity: 0, y: 10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.99 }}
                  className="rounded-[28px] border border-white/16 bg-white/[0.12] p-5 backdrop-blur-md"
                >
                  <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#2d221b]/38">
                    {activeNodeData.eyebrow}
                  </p>
                  <h2 className="mt-2 text-[0.95rem] uppercase tracking-[0.16em] text-[#2d221b]/68">
                    {activeNodeData.label}
                  </h2>
                  <div className="mt-4 max-h-[220px] overflow-y-auto pr-1">
                    <p className="text-[0.78rem] leading-6 text-[#2d221b]/62">
                      {activeNodeData.body}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <section className="rounded-[28px] border border-white/16 bg-white/[0.10] p-5 backdrop-blur-md">
                <p className="text-[0.64rem] uppercase tracking-[0.24em] text-[#2d221b]/38">
                  Deeper Breakdown
                </p>
                <h2 className="mt-2 text-[0.95rem] uppercase tracking-[0.16em] text-[#2d221b]/68">
                  How the analytical structure was built
                </h2>

                <div className="mt-4 space-y-3">
                  {processSteps.map((step) => {
                    const isActive = activeStep === step.id;

                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => setActiveStep(step.id)}
                        className="w-full text-left"
                      >
                        <div
                          className="rounded-[22px] border p-4"
                          style={{
                            borderColor: isActive
                              ? "rgba(255,255,255,0.22)"
                              : "rgba(255,255,255,0.12)",
                            background: isActive
                              ? "rgba(255,255,255,0.12)"
                              : "rgba(255,255,255,0.06)",
                          }}
                        >
                          <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[#2d221b]/38">
                            {step.step}
                          </p>
                          <h3 className="mt-2 text-[0.82rem] uppercase tracking-[0.14em] text-[#2d221b]/68">
                            {step.title}
                          </h3>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStepData.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="mt-5 rounded-[22px] border border-white/12 bg-white/[0.08] p-4"
                  >
                    <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[#2d221b]/38">
                      {activeStepData.step}
                    </p>
                    <h3 className="mt-2 text-[0.8rem] uppercase tracking-[0.14em] text-[#2d221b]/68">
                      {activeStepData.title}
                    </h3>
                    <p className="mt-3 text-[0.78rem] leading-6 text-[#2d221b]/60">
                      {activeStepData.body}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </section>
            </div>
          </div>
        </div>

        {/* Return home */}
        <div className="fixed bottom-6 right-6 z-30">
          <Link
            href="/portfolio"
            aria-label="Return to portfolio"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition hover:bg-white/50"
          >
            <House
              className="h-5 w-5 text-[#2d221b] transition-transform duration-100 group-hover:scale-110"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </main>
  );
}