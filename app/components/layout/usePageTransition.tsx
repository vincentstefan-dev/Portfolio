"use client";

import { useCallback, useEffect, useState } from "react";

export function usePageTransition(trigger: any) {
  const [isBlurred, setIsBlurred] = useState(true);

  const playTransition = useCallback(() => {
    setIsBlurred(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.setTimeout(() => {
          setIsBlurred(false);
        }, 50);
      });
    });
  }, []);

  useEffect(() => {
    playTransition();
  }, [trigger, playTransition]);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) playTransition();
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [playTransition]);

  return isBlurred;
}