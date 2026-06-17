"use client";

import React, { useEffect, useState } from "react";

type KoyotePageTransitionProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  blurAmount?: number;
};

export default function KoyotePageTransition({
  children,
  delay = 0,
  duration = 700,
  blurAmount = 18,
}: KoyotePageTransitionProps) {
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBlurred(false);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className="relative min-h-screen w-full"
      style={{
        filter: isBlurred ? `blur(${blurAmount}px)` : "blur(0px)",
        opacity: isBlurred ? 0 : 1,
        transform: isBlurred ? "scale(1.025)" : "scale(1)",
        transition: `
          filter ${duration}ms cubic-bezier(0.22, 1, 0.36, 1),
          opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1),
          transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)
        `,
        willChange: "filter, opacity, transform",
      }}
    >
      {children}
    </div>
  );
}