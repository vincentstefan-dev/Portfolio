"use client";

import { useEffect } from "react";

type UseEscapeCloseParams = {
  isOpen: boolean;
  onClose: () => void;
};

export function useEscapeClose({ isOpen, onClose }: UseEscapeCloseParams) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
}