"use client";

import { useEffect, useState } from "react";

type DiscountEggProps = {
  className?: string;
};

const STORAGE_KEY = "koyote-discount-egg-started-at";
const DISCOUNT_DURATION = 10 * 60 * 1000; // 10 minutes

function formatTime(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}`;
}

function isTouchLikeDevice() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(hover: none)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export default function DiscountEgg({ className = "" }: DiscountEggProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(DISCOUNT_DURATION);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(isTouchLikeDevice());
  }, []);

  useEffect(() => {
    const now = Date.now();
    const storedStart = sessionStorage.getItem(STORAGE_KEY);

    let startTime: number;

    if (!storedStart || Number.isNaN(Number(storedStart))) {
      startTime = now;
      sessionStorage.setItem(STORAGE_KEY, String(startTime));
    } else {
      startTime = Number(storedStart);
    }

    const updateRemainingTime = () => {
      const elapsed = Date.now() - startTime;
      const remaining = DISCOUNT_DURATION - elapsed;

      if (remaining <= 0) {
        setRemainingTime(0);
        setIsVisible(false);
        return false;
      }

      setRemainingTime(remaining);
      setIsVisible(true);
      return true;
    };

    const shouldContinue = updateRemainingTime();

    if (!shouldContinue) {
      return;
    }

    const interval = window.setInterval(() => {
      const shouldContinueInterval = updateRemainingTime();

      if (!shouldContinueInterval) {
        window.clearInterval(interval);
      }
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`w-full max-w-[300px] touch-manipulation ${className}`}>
      <button
        type="button"
        onClick={() => {
          if (isTouchDevice) {
            setIsUnlocked((current) => !current);
          }
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") {
            setIsUnlocked(true);
          }
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") {
            setIsUnlocked(false);
          }
        }}
        className="block w-full overflow-hidden border-2 border-[#000] bg-[#c0c0c0] text-left font-mono shadow-[2px_2px_0_#000] transition-transform duration-200 hover:-translate-y-[2px] active:translate-y-[1px] active:shadow-[1px_1px_0_#000]"
        aria-label="Unlock discount easter egg"
        aria-expanded={isUnlocked}
      >
        {/* Title bar */}
        <div className="relative z-20 flex items-center justify-between gap-2 bg-[#000080] px-2 py-[3px] text-[11px] text-white sm:text-[12px]">
          <span className="min-w-0 truncate">
            {isUnlocked ? "koyote_offer.exe" : "System.exe"}
          </span>

          <div className="flex shrink-0 items-center gap-[4px]">
            <span className="mr-1 text-[10px] text-white/85">
              {formatTime(remainingTime)}
            </span>

            <span className="flex h-[12px] w-[12px] items-center justify-center border border-black bg-[#c0c0c0] text-[9px] leading-none text-black">
              _
            </span>

            <span className="flex h-[12px] w-[12px] items-center justify-center border border-black bg-[#c0c0c0] text-[9px] leading-none text-black">
              □
            </span>

            <span className="flex h-[12px] w-[12px] items-center justify-center border border-black bg-[#c0c0c0] text-[9px] leading-none text-black">
              ×
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="relative min-h-[112px] overflow-hidden border-b-2 border-l-2 border-r-2 border-t-2 border-b-black border-l-white border-r-black border-t-white bg-[#c0c0c0] px-3 py-3 text-[12px] leading-[1.65] text-black sm:min-h-[118px] sm:text-[13px]">
          <div
            className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-200 ${
              isUnlocked ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 animate-[koyoteDiscountRainbow_4s_linear_infinite] bg-[linear-gradient(90deg,#ff004c,#ff9f00,#fff200,#00ff85,#00c8ff,#7a5cff,#ff00f5,#ff004c)] bg-[length:400%_400%]" />
          </div>

          <div className="relative z-10">
            {!isUnlocked ? (
              <div>
                <p>hidden file found</p>
                <p>&gt; open?</p>
                <p className="hidden lg:block">&gt; hover to unlock</p>
                <p className="lg:hidden">&gt; tap to unlock</p>
                <p>&gt; expires in {formatTime(remainingTime)}</p>
              </div>
            ) : (
              <div>
                <p>&gt; discount unlocked:</p>
                <p>&gt; write the secret code</p>
                <p>&gt; on the contact email :)</p>
                <p>&gt; 30% off</p>
                <p>
                  code: <span className="font-bold tracking-wide">MISHI30</span>
                </p>
                <p>&gt; expires in {formatTime(remainingTime)}</p>
              </div>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}