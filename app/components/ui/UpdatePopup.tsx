"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type UpdatePopupProps = {
  id: string;
  title?: string;
  message: string;
  duration?: number;
};

export default function UpdatePopup({
  id,
  title = "Update",
  message,
  duration = 600000,
}: UpdatePopupProps) {
  const [visible, setVisible] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleClose = () => {
    sessionStorage.setItem(`popup-${id}`, "true");
    setVisible(false);
  };

  const playOkSound = () => {
    const audio = new Audio("/Audio/logoaudio.mp3");
    audio.volume = 0.5;

    audio.play().catch(() => {
      // Audio playback may fail if the browser blocks it.
    });
  };

  const handleOkClick = () => {
    playOkSound();
    handleClose();
  };

  useEffect(() => {
    const dismissed = sessionStorage.getItem(`popup-${id}`);

    if (!dismissed) {
      setVisible(true);

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed left-1/2 top-1/2 z-[9999] w-[360px] -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="relative [perspective:900px]"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();

              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              const rotateY = (x / rect.width - 0.5) * 18;
              const rotateX = -(y / rect.height - 0.5) * 18;

              setRotate({ x: rotateX, y: rotateY });
            }}
            onMouseLeave={() => setRotate({ x: 0, y: 0 })}
          >
            <div
              className="relative transition-transform duration-200 ease-out [transform-style:preserve-3d] group"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              }}
            >
              {/* RAINBOW GLOW */}
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-80 hover-rainbow-glow" />

              {/* POPUP CARD */}
              <div className="relative border-2 border-t-white border-l-white border-r-black border-b-black bg-[#c0c0c0] p-1 shadow-[3px_3px_0_rgba(0,0,0,0.65)]">
                {/* TITLE BAR */}
                <div className="flex h-8 items-center justify-between bg-[#000080] px-3">
                  <p className="font-mono text-sm font-bold tracking-wide text-white">
                    {title}
                  </p>

                  <button
                    onClick={handleClose}
                    className="flex h-6 w-6 items-center justify-center border-2 border-t-white border-l-white border-r-black border-b-black bg-[#c0c0c0] font-mono text-black active:border-t-black active:border-l-black active:border-r-white active:border-b-white"
                    aria-label="Close popup"
                  >
                    ×
                  </button>
                </div>

                {/* BODY */}
                <div className="min-h-[130px] px-6 py-6">
                  <p className="font-mono text-sm leading-5 text-black">
                    {message}
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-center gap-4 pb-6">
                  <button
                    onClick={handleOkClick}
                    className="min-w-[96px] border-2 border-t-white border-l-white border-r-black border-b-black bg-[#c0c0c0] px-5 py-1 font-mono text-sm text-black active:border-t-black active:border-l-black active:border-r-white active:border-b-white"
                  >
                    Ok
                  </button>

                  <button
                    onClick={handleClose}
                    className="min-w-[96px] border-2 border-t-white border-l-white border-r-black border-b-black bg-[#c0c0c0] px-5 py-1 font-mono text-sm text-black active:border-t-black active:border-l-black active:border-r-white active:border-b-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}