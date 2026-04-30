"use client";

import React from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

type AtomicPlayerProps = {
  playerRef: React.RefObject<any>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
};

export default function AtomicPlayer({
  playerRef,
  isPlaying,
  setIsPlaying,
  isMuted,
  setIsMuted,
  volume,
  setVolume,
}: AtomicPlayerProps) {
  const togglePlay = () => {
    const player = playerRef.current;
    if (!player || !window.YT) return;

    const state = player.getPlayerState?.();

    if (state === window.YT.PlayerState.PLAYING) {
      player.pauseVideo();
      setIsPlaying(false);
      return;
    }

    if (player.isMuted?.()) {
      player.unMute();
      player.setVolume(volume);
      setIsMuted(false);
    }

    player.playVideo();
    setIsPlaying(true);
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;

    if (player.isMuted?.()) {
      player.unMute();
      player.setVolume(volume || 20);
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const player = playerRef.current;
    if (!player) return;

    const newVolume = Number(e.target.value);
    setVolume(newVolume);

    if (newVolume === 0) {
      player.mute();
      setIsMuted(true);
      return;
    }

    if (player.isMuted?.()) {
      player.unMute();
      setIsMuted(false);
    }

    player.setVolume(newVolume);
  };

  return (
    <div className="group absolute bottom-0 right-0 z-50 p-8">
      <div className="pointer-events-none w-[320px] translate-y-4 rounded-2xl border border-[#c084fc]/25 bg-[#3b1363]/45 p-4 text-white opacity-0 shadow-[0_0_30px_rgba(168,85,247,0.12)] backdrop-blur-md transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium tracking-wide text-[#e9d5ff]/70">
            Atomic Player
          </span>

          <span className="text-xs text-[#e9d5ff]/70">
            {isPlaying ? "Playing" : "Paused"} •{" "}
            {isMuted ? "Muted" : `${volume}%`}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c084fc]/20 bg-[#6d28d9]/18"
            type="button"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={toggleMute}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c084fc]/20 bg-[#6d28d9]/18"
            type="button"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full accent-[#c084fc]"
          />
        </div>
      </div>
    </div>
  );
}