"use client";

import { useEffect, useRef, useState } from "react";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  life: number;
};

export default function CursorSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const now = Date.now();

      // throttle creation so it stays elegant and not too heavy
      if (now - lastSpawnRef.current < 22) return;
      lastSpawnRef.current = now;

      const newSparkles: Sparkle[] = Array.from({
        length: Math.random() > 0.65 ? 2 : 1,
      }).map(() => ({
        id: idRef.current++,
        x: e.clientX + (Math.random() - 0.5) * 18,
        y: e.clientY + (Math.random() - 0.5) * 18,
        size: 6 + Math.random() * 10,
        rotation: Math.random() * 180,
        life: 700 + Math.random() * 450,
      }));

      setSparkles((prev) => [...prev, ...newSparkles]);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  useEffect(() => {
    if (sparkles.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      setSparkles((prev) =>
        prev.filter((s) => now - (s.id * 0 + now - s.life) < s.life)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [sparkles.length]);

  // better cleanup with precise timers
  useEffect(() => {
    if (sparkles.length === 0) return;

    const timers = sparkles.map((sparkle) =>
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
      }, sparkle.life)
    );

    return () => timers.forEach(clearTimeout);
  }, [sparkles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute block animate-sparkle-fade"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg)`,
            animationDuration: `${sparkle.life}ms`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-full w-full drop-shadow-[0_0_8px_rgba(242,220,120,0.5)]"
            fill="none"
          >
            <path
              d="M12 1.8L14.2 9.8L22.2 12L14.2 14.2L12 22.2L9.8 14.2L1.8 12L9.8 9.8L12 1.8Z"
              fill="#f2dc78"
              fillOpacity="0.95"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}