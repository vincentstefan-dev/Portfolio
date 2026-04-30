"use client";

import { useEffect, useState } from "react";
import {
  basicGlow,
  pickRandomGlow,
  type GlowStyle,
} from "../../template/theme/homepageConfig";

export function useThemeGlow(siteMode: string) {
  const [glow, setGlow] = useState<GlowStyle>(basicGlow);

  useEffect(() => {
    setGlow(siteMode === "random" ? pickRandomGlow() : basicGlow);
  }, [siteMode]);

  return glow;
}