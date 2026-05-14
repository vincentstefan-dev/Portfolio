"use client";

import { useEffect, useState } from "react";
import { getCTA } from "@/app/components/template/theme/CTA_WORD_BANK";

type CTA = {
  value: string;
  type: "text" | "image";
};

export function useRotatingCTA(intervalMs = 10000) {
  const [cta, setCta] = useState<CTA>({
    value: "",
    type: "text",
  });

  useEffect(() => {
    setCta(getCTA());

    const interval = window.setInterval(() => {
      setCta(getCTA());
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs]);

  return cta;
}