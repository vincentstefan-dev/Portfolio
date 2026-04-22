"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/* =========================
   TYPES
========================= */

export type SiteMode = "basic" | "random";

type ThemeContextType = {
  siteMode: SiteMode;
  setSiteMode: (mode: SiteMode) => void;
  isRandomMode: boolean;
};

/* =========================
   CONTEXT
========================= */

const ThemeContext = createContext<ThemeContextType | null>(null);

/* =========================
   PROVIDER
========================= */

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteMode, setSiteModeState] = useState<SiteMode>("basic");

  useEffect(() => {
    const savedMode = localStorage.getItem("site-mode") as SiteMode | null;

    if (savedMode === "random") {
      setSiteModeState("random");
    }
  }, []);

  const setSiteMode = (mode: SiteMode) => {
    setSiteModeState(mode);
    localStorage.setItem("site-mode", mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        siteMode,
        setSiteMode,
        isRandomMode: siteMode === "random",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/* =========================
   HOOK
========================= */

export function useThemeMode() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeMode must be used inside ThemeProvider");
  }

  return context;
}