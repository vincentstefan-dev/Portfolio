"use client";

import { useEffect, useRef, useState } from "react";
import { LOGO_BANK } from "@/app/template/theme/LOGO_BANK";
import { motion } from "framer-motion";
type Star = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  glow: number;
  rotation: number;
  rotationSpeed: number;
  points: number;
  hollow: boolean;
  pulseOffset: number;
};

const STAR_COLORS = [
  "#ff2d55",
  "#ff5f1f",
  "#ffd60a",
  "#32d74b",
  "#0a84ff",
  "#ffffff",
  "#ff4fd8",
];

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function pickWeightedLogo() {
  const total = LOGO_BANK.reduce(
    (sum, logo) => sum + (logo.weight ?? 1),
    0
  );

  let randomValue = Math.random() * total;

  for (const logo of LOGO_BANK) {
    randomValue -= logo.weight ?? 1;
    if (randomValue <= 0) return logo;
  }

  return LOGO_BANK[0];
}

function drawStarShape(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number,
  rotation: number
) {
  let rot = rotation;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);

  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
    rot += step;
    ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
    rot += step;
  }

  ctx.closePath();
}

function drawStarLayer(
  ctx: CanvasRenderingContext2D,
  star: Star,
  time: number,
  offsetX = 0,
  offsetY = 0,
  alpha = 1
) {
  const pulse = 1 + Math.sin(time * 0.003 + star.pulseOffset) * 0.12;
  const outer = star.size * pulse;
  const inner = outer * 0.48;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(offsetX, offsetY);

  drawStarShape(
    ctx,
    star.x,
    star.y,
    star.points,
    outer,
    inner,
    star.rotation
  );

  if (star.hollow) {
    ctx.strokeStyle = star.color;
    ctx.lineWidth = Math.max(1.2, outer * 0.16);
    ctx.shadowBlur = star.glow;
    ctx.shadowColor = star.color;
    ctx.stroke();
  } else {
    ctx.fillStyle = star.color;
    ctx.shadowBlur = star.glow;
    ctx.shadowColor = star.color;
    ctx.fill();
  }

  ctx.restore();
}

export default function CRTStarIntro() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // SOUND REF
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [visible, setVisible] = useState(true);
  const [activeLogo, setActiveLogo] = useState(LOGO_BANK[0]);

  // PICK LOGO ON FIRST LOAD
  useEffect(() => {
    setActiveLogo(pickWeightedLogo());
  }, []);

  // INTRO SOUND EFFECT
  // Plays after the user's first click/tap.
  // This avoids browser autoplay blocking.
    useEffect(() => {
      const playIntroSound = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.35;
        audio.currentTime = 0;

        audio.play().catch((error) => {
          console.log("Audio play blocked:", error);
        });

        window.removeEventListener("pointerdown", playIntroSound);
      };

      window.addEventListener("pointerdown", playIntroSound);

      return () => {
        window.removeEventListener("pointerdown", playIntroSound);
      };
    }, []);

  // CANVAS ANIMATION EFFECT
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    const startTime = performance.now();

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const starCount = Math.floor((width * height) / 8000);

    const stars: Star[] = Array.from({ length: starCount }, () => {
      const size = random(3, 18);

      return {
        x: random(0, width),
        y: random(0, height),
        size,
        vx: random(-0.28, 0.28),
        vy: random(-0.28, 0.28),
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        glow: random(8, 22),
        rotation: random(0, Math.PI * 2),
        rotationSpeed: random(-0.015, 0.015),
        points: 5,
        hollow: Math.random() > 0.72,
        pulseOffset: random(0, Math.PI * 2),
      };
    });

    const drawNoise = (alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;

      for (let i = 0; i < 140; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.5 + 0.3;

        ctx.fillStyle =
          Math.random() > 0.5 ? "white" : "rgba(180,220,255,0.9)";

        ctx.fillRect(x, y, size, size);
      }

      ctx.restore();
    };

    const drawScanlines = () => {
      ctx.save();
      ctx.globalAlpha = 0.14;

      for (let y = 0; y < height; y += 3) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, y, width, 1);
      }

      ctx.restore();
    };

    const drawVignette = () => {
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.15,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.72
      );

      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(0.65, "rgba(0,0,0,0.08)");
      gradient.addColorStop(1, "rgba(0,0,0,0.42)");

      ctx.save();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    };

    const drawCurvature = () => {
      ctx.save();

      const edgeGradient = ctx.createLinearGradient(0, 0, width, 0);
      edgeGradient.addColorStop(0, "rgba(0,0,0,0.20)");
      edgeGradient.addColorStop(0.08, "rgba(0,0,0,0)");
      edgeGradient.addColorStop(0.92, "rgba(0,0,0,0)");
      edgeGradient.addColorStop(1, "rgba(0,0,0,0.20)");

      ctx.fillStyle = edgeGradient;
      ctx.fillRect(0, 0, width, height);

      const topBottomGradient = ctx.createLinearGradient(0, 0, 0, height);
      topBottomGradient.addColorStop(0, "rgba(255,255,255,0.04)");
      topBottomGradient.addColorStop(0.08, "rgba(0,0,0,0)");
      topBottomGradient.addColorStop(0.92, "rgba(0,0,0,0)");
      topBottomGradient.addColorStop(1, "rgba(0,0,0,0.18)");

      ctx.fillStyle = topBottomGradient;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();
    };

    const drawRollingBand = (time: number) => {
      const bandY = ((time * 0.08) % (height + 140)) - 140;
      const grad = ctx.createLinearGradient(0, bandY, 0, bandY + 140);

      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(0.5, "rgba(255,255,255,0.055)");
      grad.addColorStop(1, "rgba(255,255,255,0)");

      ctx.save();
      ctx.fillStyle = grad;
      ctx.fillRect(0, bandY, width, 140);
      ctx.restore();
    };

    const animate = (time: number) => {
      const elapsed = time - startTime;

      // INTRO DURATION
      // 5000 = 5 seconds
      if (elapsed >= 5000) {
        setVisible(false);
        cancelAnimationFrame(animationFrame);
        return;
      }

      const fadeIn = Math.min(1, elapsed / 450);
      const fadeOut = Math.max(0, 1 - Math.max(0, elapsed - 4200) / 800);
      const masterAlpha = fadeIn * fadeOut;

      const flicker =
        0.96 + Math.sin(time * 0.08) * 0.015 + Math.random() * 0.03;

      const jitterX = random(-0.35, 0.35);
      const jitterY = random(-0.25, 0.25);

      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      ctx.save();

      const curveScaleX = 0.985;
      const curveScaleY = 0.992;

      ctx.translate(width / 2, height / 2);
      ctx.scale(curveScaleX, curveScaleY);
      ctx.translate(-width / 2, -height / 2);

      ctx.globalAlpha = masterAlpha * flicker;

      for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;
        star.rotation += star.rotationSpeed;

        if (star.x < -30) star.x = width + 30;
        if (star.x > width + 30) star.x = -30;
        if (star.y < -30) star.y = height + 30;
        if (star.y > height + 30) star.y = -30;

        drawStarLayer(ctx, star, time, jitterX - 1.2, jitterY, 0.28);
        drawStarLayer(ctx, star, time, jitterX + 1.2, jitterY, 0.28);
        drawStarLayer(ctx, star, time, jitterX, jitterY, 0.9);

        ctx.save();
        ctx.globalAlpha = 0.18 * masterAlpha;

        drawStarShape(
          ctx,
          star.x + jitterX,
          star.y + jitterY,
          star.points,
          star.size * 1.4,
          star.size * 0.68,
          star.rotation
        );

        ctx.strokeStyle = star.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      drawRollingBand(time);
      drawNoise(0.05);
      drawScanlines();
      drawCurvature();
      drawVignette();

      ctx.restore();

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-black">
      {/* INTRO SOUND */}
      <audio ref={audioRef} src="../Audio/logoaudio.mp3" preload="auto" />

      {/* CANVAS BACKGROUND */}
      <canvas ref={canvasRef} className="h-full w-full" />

      {/* CENTERED LOGO BANK */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center">
        <img
          src={activeLogo.src}
          alt={activeLogo.alt}
          className={`object-contain transition-all duration-700 ease-out ${
            activeLogo.className ?? "w-[240px] md:w-[360px]"
          }`}
          style={{
            filter: activeLogo.glow,
            opacity: activeLogo.opacity ?? 0.85,
            transform: "scale(1)",
          }}
        />
      {/* TEXT BELOW LOGO */}
<motion.span
  initial={{
    opacity: 0,
    y: 6,
    letterSpacing: "0.7em",
  }}
  animate={{
    opacity: [
      0,
      1,
      0.2,
      1,
      0.4,
      1,
      0.6,
      1,
      0.8,
      1,
    ],
    y: [6, 0, 1, 0],
    letterSpacing: ["0.7em", "0.55em", "0.52em", "0.5em"],
  }}
  transition={{
    duration: 3,
    delay: 0.5,
    ease: "easeOut",
  }}
        >

          K O Y O T E ║ S T U D I O S
        </motion.span>
      </div>

      {/* RADIAL DARKENING OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.18)_100%)]" />

      {/* CRT GLASS LAYER */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-20 mix-blend-screen">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_12%,transparent_88%,rgba(255,255,255,0.03))]" />
      </div>
    </div>
  );
}