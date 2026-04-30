"use client";

import { motion } from "framer-motion";

type CTA = {
  value: string;
  type: "text" | "image";
};

type HeroCTAProps = {
  cta: CTA;
  fontClass: string;
};

export default function HeroCTA({ cta, fontClass }: HeroCTAProps) {
  return (
    <div className="pointer-events-none z-20 -mt-8 mb-8 md:-mt-14 md:mb-10">
      <div className="flex min-h-[40px] flex-col items-center justify-center">
        <motion.div
          key={cta.value}
          initial={{ opacity: 0.35, y: 3 }}
          animate={{
            opacity: [0.45, 0.78, 0.55],
            y: [-1.4, 1.4, -1],
            x: [-0.6, 0.5, -0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex items-center justify-center"
        >
          {cta.type === "image" ? (
            <img
              src={cta.value}
              alt="cta"
              className="h-25 w-25 object-contain opacity-80 pixelated md:h-25"
            />
          ) : (
            <span
              className={`${fontClass} select-none whitespace-nowrap text-center text-[11px] tracking-[0.24em] text-white/65 sm:text-[12px] md:text-[13px]`}
              style={{
                textShadow:
                  "0 0 10px rgba(190,220,255,0.18), 0 0 24px rgba(190,220,255,0.08)",
              }}
            >
              {cta.value}
            </span>
          )}
        </motion.div>
      </div>
    </div>
  );
}