"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Download,
  Image as ImageIcon,
  RefreshCcw,
  Upload,
  Copy,
  Wand2,
  House,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const normalized =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;

  const int = parseInt(normalized, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function quantize(value: number, levels: number) {
  if (levels <= 1) return value >= 128 ? 255 : 0;
  const step = 255 / (levels - 1);
  return Math.round(value / step) * step;
}

type PresetName = "blueBird" | "crtGhost" | "softMono" | "hardStamp";

type Settings = {
  pixelSize: number;
  scaleMultiplier: number;
  grayscale: boolean;
  posterizeLevels: number;
  thresholdMode: boolean;
  thresholdValue: number;
  monochromeTint: boolean;
  tintColor: string;
  invert: boolean;
  transparentBg: boolean;
  ditherMode: boolean;
  edgeBoost: number;
};

const defaultSettings: Settings = {
  pixelSize: 12,
  scaleMultiplier: 1,
  grayscale: true,
  posterizeLevels: 4,
  thresholdMode: false,
  thresholdValue: 128,
  monochromeTint: true,
  tintColor: "#4c6fff",
  invert: false,
  transparentBg: false,
  ditherMode: false,
  edgeBoost: 0,
};

const presetMap: Record<PresetName, Partial<Settings>> = {
  blueBird: {
    pixelSize: 10,
    posterizeLevels: 3,
    grayscale: true,
    monochromeTint: true,
    tintColor: "#5c7cff",
    thresholdMode: false,
    ditherMode: false,
    edgeBoost: 12,
  },
  crtGhost: {
    pixelSize: 6,
    posterizeLevels: 4,
    grayscale: true,
    monochromeTint: true,
    tintColor: "#7df9c1",
    thresholdMode: false,
    ditherMode: true,
    edgeBoost: 18,
  },
  softMono: {
    pixelSize: 14,
    posterizeLevels: 5,
    grayscale: true,
    monochromeTint: false,
    thresholdMode: false,
    ditherMode: false,
    edgeBoost: 0,
  },
  hardStamp: {
    pixelSize: 12,
    posterizeLevels: 2,
    grayscale: true,
    monochromeTint: true,
    tintColor: "#ffffff",
    thresholdMode: true,
    thresholdValue: 128,
    transparentBg: true,
    ditherMode: false,
    edgeBoost: 22,
  },
};

function applyFloydSteinbergDither(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  levels: number
) {
  const work = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) work[i] = data[i];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;

      for (let channel = 0; channel < 3; channel++) {
        const oldValue = work[index + channel];
        const newValue = quantize(oldValue, levels);
        const error = oldValue - newValue;
        work[index + channel] = newValue;

        const distribute = (dx: number, dy: number, factor: number) => {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) return;
          const ni = (ny * width + nx) * 4 + channel;
          work[ni] += error * factor;
        };

        distribute(1, 0, 7 / 16);
        distribute(-1, 1, 3 / 16);
        distribute(0, 1, 5 / 16);
        distribute(1, 1, 1 / 16);
      }
    }
  }

  for (let i = 0; i < data.length; i += 4) {
    data[i] = clamp(Math.round(work[i]), 0, 255);
    data[i + 1] = clamp(Math.round(work[i + 1]), 0, 255);
    data[i + 2] = clamp(Math.round(work[i + 2]), 0, 255);
  }
}

export default function PixelLabV2() {
  const processedCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const [pixelSize, setPixelSize] = useState(defaultSettings.pixelSize);
  const [scaleMultiplier, setScaleMultiplier] = useState(defaultSettings.scaleMultiplier);
  const [grayscale, setGrayscale] = useState(defaultSettings.grayscale);
  const [posterizeLevels, setPosterizeLevels] = useState(defaultSettings.posterizeLevels);
  const [thresholdMode, setThresholdMode] = useState(defaultSettings.thresholdMode);
  const [thresholdValue, setThresholdValue] = useState(defaultSettings.thresholdValue);
  const [monochromeTint, setMonochromeTint] = useState(defaultSettings.monochromeTint);
  const [tintColor, setTintColor] = useState(defaultSettings.tintColor);
  const [invert, setInvert] = useState(defaultSettings.invert);
  const [transparentBg, setTransparentBg] = useState(defaultSettings.transparentBg);
  const [ditherMode, setDitherMode] = useState(defaultSettings.ditherMode);
  const [edgeBoost, setEdgeBoost] = useState(defaultSettings.edgeBoost);

  const [processingOpen, setProcessingOpen] = useState(true);
  const [presetsOpen, setPresetsOpen] = useState(true);

  useEffect(() => {
    if (!imageUrl) {
      setImageElement(null);
      return;
    }

    const img = new window.Image();
    img.onload = () => setImageElement(img);
    img.src = imageUrl;

    return () => {
      img.onload = null;
    };
  }, [imageUrl]);

  const controlSummary = useMemo(() => {
    return [
      `${pixelSize}px blocks`,
      `${posterizeLevels} levels`,
      thresholdMode ? `threshold ${thresholdValue}` : null,
      monochromeTint ? `tint` : null,
      ditherMode ? `dither` : null,
      edgeBoost > 0 ? `edge +${edgeBoost}` : null,
    ]
      .filter(Boolean)
      .join(" · ");
  }, [pixelSize, posterizeLevels, thresholdMode, thresholdValue, monochromeTint, ditherMode, edgeBoost]);

  useEffect(() => {
    if (!imageElement || !processedCanvasRef.current || !originalCanvasRef.current) return;

    const outputWidth = Math.max(1, Math.floor(imageElement.naturalWidth * scaleMultiplier));
    const outputHeight = Math.max(1, Math.floor(imageElement.naturalHeight * scaleMultiplier));

    const originalCanvas = originalCanvasRef.current;
    const originalCtx = originalCanvas.getContext("2d");
    if (!originalCtx) return;
    originalCanvas.width = outputWidth;
    originalCanvas.height = outputHeight;
    originalCtx.clearRect(0, 0, outputWidth, outputHeight);
    originalCtx.imageSmoothingEnabled = true;
    originalCtx.drawImage(imageElement, 0, 0, outputWidth, outputHeight);

    const canvas = processedCanvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    if (!transparentBg) {
      ctx.clearRect(0, 0, outputWidth, outputHeight);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, outputWidth, outputHeight);
    } else {
      ctx.clearRect(0, 0, outputWidth, outputHeight);
    }

    const smallCanvas = document.createElement("canvas");
    const smallCtx = smallCanvas.getContext("2d", { willReadFrequently: true });
    if (!smallCtx) return;

    const smallWidth = Math.max(1, Math.floor(outputWidth / pixelSize));
    const smallHeight = Math.max(1, Math.floor(outputHeight / pixelSize));

    smallCanvas.width = smallWidth;
    smallCanvas.height = smallHeight;

    smallCtx.imageSmoothingEnabled = false;
    smallCtx.drawImage(imageElement, 0, 0, smallWidth, smallHeight);

    const imageData = smallCtx.getImageData(0, 0, smallWidth, smallHeight);
    const data = imageData.data;
    const tint = hexToRgb(tintColor);

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      let a = data[i + 3];

      if (a === 0) continue;

      const baseLuma = 0.299 * r + 0.587 * g + 0.114 * b;
      const boosted = clamp(baseLuma + (baseLuma - 128) * (edgeBoost / 100), 0, 255);

      if (grayscale || monochromeTint || thresholdMode) {
        r = boosted;
        g = boosted;
        b = boosted;
      }

      if (!ditherMode) {
        r = quantize(r, posterizeLevels);
        g = quantize(g, posterizeLevels);
        b = quantize(b, posterizeLevels);
      }

      data[i] = clamp(Math.round(r), 0, 255);
      data[i + 1] = clamp(Math.round(g), 0, 255);
      data[i + 2] = clamp(Math.round(b), 0, 255);
      data[i + 3] = clamp(Math.round(a), 0, 255);
    }

    if (ditherMode) {
      applyFloydSteinbergDither(data, smallWidth, smallHeight, posterizeLevels);
    }

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      let a = data[i + 3];

      if (thresholdMode) {
        const v = r >= thresholdValue ? 255 : 0;
        r = v;
        g = v;
        b = v;
      }

      if (invert) {
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
      }

      if (monochromeTint) {
        const normalized = r / 255;
        r = tint.r * normalized;
        g = tint.g * normalized;
        b = tint.b * normalized;
      }

      if (transparentBg && thresholdMode && r === 0 && g === 0 && b === 0) {
        a = 0;
      }

      data[i] = clamp(Math.round(r), 0, 255);
      data[i + 1] = clamp(Math.round(g), 0, 255);
      data[i + 2] = clamp(Math.round(b), 0, 255);
      data[i + 3] = clamp(Math.round(a), 0, 255);
    }

    smallCtx.putImageData(imageData, 0, 0);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(smallCanvas, 0, 0, smallWidth, smallHeight, 0, 0, outputWidth, outputHeight);

    if (ditherMode) {
      ctx.save();
      ctx.globalAlpha = 0.08;
      for (let y = 0; y < outputHeight; y += 3) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, y, outputWidth, 1);
      }
      ctx.restore();
    }
  }, [
    imageElement,
    pixelSize,
    scaleMultiplier,
    grayscale,
    posterizeLevels,
    thresholdMode,
    thresholdValue,
    monochromeTint,
    tintColor,
    invert,
    transparentBg,
    ditherMode,
    edgeBoost,
  ]);

  function loadFile(file: File | null | undefined) {
    if (!file) return;
    const nextUrl = URL.createObjectURL(file);
    setImageUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return nextUrl;
    });
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    loadFile(event.target.files?.[0]);
  }

  function triggerUpload() {
    fileInputRef.current?.click();
  }

  function resetControls() {
    setPixelSize(defaultSettings.pixelSize);
    setScaleMultiplier(defaultSettings.scaleMultiplier);
    setGrayscale(defaultSettings.grayscale);
    setPosterizeLevels(defaultSettings.posterizeLevels);
    setThresholdMode(defaultSettings.thresholdMode);
    setThresholdValue(defaultSettings.thresholdValue);
    setMonochromeTint(defaultSettings.monochromeTint);
    setTintColor(defaultSettings.tintColor);
    setInvert(defaultSettings.invert);
    setTransparentBg(defaultSettings.transparentBg);
    setDitherMode(defaultSettings.ditherMode);
    setEdgeBoost(defaultSettings.edgeBoost);
  }

  function applyPreset(name: PresetName) {
    const preset = presetMap[name];
    const merged = { ...defaultSettings, ...preset };
    setPixelSize(merged.pixelSize);
    setScaleMultiplier(merged.scaleMultiplier);
    setGrayscale(merged.grayscale);
    setPosterizeLevels(merged.posterizeLevels);
    setThresholdMode(merged.thresholdMode);
    setThresholdValue(merged.thresholdValue);
    setMonochromeTint(merged.monochromeTint);
    setTintColor(merged.tintColor);
    setInvert(merged.invert);
    setTransparentBg(merged.transparentBg);
    setDitherMode(merged.ditherMode);
    setEdgeBoost(merged.edgeBoost);
  }

  function exportPng() {
    if (!processedCanvasRef.current) return;
    const url = processedCanvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "pixel-lab-v2-export.png";
    link.click();
  }

  function copyCurrentSettings() {
    const payload = JSON.stringify(
      {
        pixelSize,
        scaleMultiplier,
        grayscale,
        posterizeLevels,
        thresholdMode,
        thresholdValue,
        monochromeTint,
        tintColor,
        invert,
        transparentBg,
        ditherMode,
        edgeBoost,
      },
      null,
      2
    );
    navigator.clipboard.writeText(payload);
  }

  function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(true);
  }

  function onDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    loadFile(event.dataTransfer.files?.[0]);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020817] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(141,230,255,0.28),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(112,169,255,0.18),transparent_24%),radial-gradient(circle_at_72%_62%,rgba(124,240,255,0.14),transparent_22%),linear-gradient(180deg,#6ed7ff_0%,#59a8ff_18%,#1e3e7b_45%,#071738_70%,#020817_100%)]" />
        <div className="absolute left-[-8%] top-[14%] h-[280px] w-[280px] rounded-full bg-cyan-200/20 blur-[120px]" />
        <div className="absolute right-[-6%] top-[24%] h-[380px] w-[380px] rounded-full bg-blue-300/20 blur-[140px]" />
        <div className="absolute bottom-[-6%] left-[12%] h-[320px] w-[320px] rounded-full bg-sky-300/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.16),rgba(255,255,255,0.02)_10%,transparent_22%,transparent_78%,rgba(255,255,255,0.04))]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 py-8 md:px-6 lg:px-8">
        <header className="mb-8 rounded-[34px] border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.12)_42%,rgba(255,255,255,0.06))] px-6 py-5 shadow-[0_14px_60px_rgba(34,98,194,0.22),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl">
          <div className="absolute inset-x-10 top-0 h-px bg-white/60" />
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.55em] text-white/70">
                Pixel Laboratory
              </p>
              <h1 className="mt-2 text-3xl font-light tracking-[0.08em] text-white md:text-4xl">
                Prism Glass Studio
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/75">
                Upload an image, apply pixel treatments, and compare the untouched
                source against the processed output inside a glossy glass workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.25em] text-white/65">
            <span className="relative overflow-hidden rounded-full border border-white/20 px-4 py-2 backdrop-blur-xl">
              <span className="absolute inset-0 bg-[linear-gradient(90deg,red,orange,yellow,green,cyan,blue,violet,red)] bg-[length:200%_100%] animate-[rainbowShift_4s_linear_infinite] opacity-30" />
              <span className="absolute inset-0 bg-white/10" />
              <span className="relative z-10 text-white">Koyote Studio</span>
            </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">
                Drag & Drop Available!
              </span>
            </div>
          </div>
        </header>

        <div className="grid gap-7 xl:grid-cols-[370px_minmax(0,1fr)]">
          <section className="relative overflow-hidden rounded-[38px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08)_38%,rgba(255,255,255,0.04))] p-5 shadow-[0_18px_80px_rgba(30,77,167,0.24),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-white/70" />
            <div className="pointer-events-none absolute right-[-40px] top-10 h-28 w-28 rounded-full bg-cyan-200/20 blur-3xl" />
            <div className="pointer-events-none absolute left-[-30px] bottom-14 h-28 w-28 rounded-full bg-blue-200/20 blur-3xl" />

            <div className="relative z-10">

              <div className="mb-5 flex flex-wrap gap-3">
                <button
                  onClick={triggerUpload}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.32),rgba(255,255,255,0.1))] px-4 py-2.5 text-sm text-white shadow-[0_6px_24px_rgba(120,205,255,0.18),inset_0_1px_0_rgba(255,255,255,0.55)] transition duration-300 hover:scale-[1.02] hover:bg-white/20"
                >
                  <Upload className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  Upload
                </button>

                <button
                  onClick={exportPng}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-xl transition duration-300 hover:bg-white/15"
                >
                  <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  Export PNG
                </button>

                <button
                  onClick={copyCurrentSettings}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-xl transition duration-300 hover:bg-white/15"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>

                <button
                  onClick={resetControls}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-xl transition duration-300 hover:bg-white/15"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Reset
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />

              <div className="mb-6 rounded-[30px] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.45em] text-white/62">
                    Processing
                  </p>

                  <button
                    type="button"
                    onClick={() => setProcessingOpen((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/65 transition hover:bg-white/15"
                  >
                    {processingOpen ? "Minimize" : "Open"}
                    {processingOpen ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {processingOpen && (
                  <div className="space-y-5">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm text-white/78">
                        <label>Pixel size</label>
                        <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-white/70">
                          {pixelSize}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="40"
                        value={pixelSize}
                        onChange={(e) => setPixelSize(Number(e.target.value))}
                        className="w-full accent-cyan-200"
                      />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm text-white/78">
                        <label>Scale</label>
                        <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-white/70">
                          {scaleMultiplier.toFixed(1)}x
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="4"
                        step="0.25"
                        value={scaleMultiplier}
                        onChange={(e) => setScaleMultiplier(Number(e.target.value))}
                        className="w-full accent-cyan-200"
                      />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm text-white/78">
                        <label>Posterize levels</label>
                        <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-white/70">
                          {posterizeLevels}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="8"
                        value={posterizeLevels}
                        onChange={(e) => setPosterizeLevels(Number(e.target.value))}
                        className="w-full accent-cyan-200"
                      />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm text-white/78">
                        <label>Threshold</label>
                        <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-white/70">
                          {thresholdValue}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="255"
                        value={thresholdValue}
                        onChange={(e) => setThresholdValue(Number(e.target.value))}
                        className="w-full accent-cyan-200 disabled:opacity-40"
                        disabled={!thresholdMode}
                      />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm text-white/78">
                        <label>Edge boost</label>
                        <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-white/70">
                          {edgeBoost}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        value={edgeBoost}
                        onChange={(e) => setEdgeBoost(Number(e.target.value))}
                        className="w-full accent-cyan-200"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white/78">Tint color</label>
                      <div className="rounded-[22px] border border-white/15 bg-white/8 p-2">
                        <input
                          type="color"
                          value={tintColor}
                          onChange={(e) => setTintColor(e.target.value)}
                          className="h-12 w-full cursor-pointer rounded-[16px] border border-white/15 bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm text-white/80">
                      <label className="flex items-center gap-2 rounded-[20px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                        <input
                          type="checkbox"
                          checked={grayscale}
                          onChange={(e) => setGrayscale(e.target.checked)}
                          className="accent-cyan-200"
                        />
                        Grayscale
                      </label>

                      <label className="flex items-center gap-2 rounded-[20px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                        <input
                          type="checkbox"
                          checked={monochromeTint}
                          onChange={(e) => setMonochromeTint(e.target.checked)}
                          className="accent-cyan-200"
                        />
                        Tint
                      </label>

                      <label className="flex items-center gap-2 rounded-[20px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                        <input
                          type="checkbox"
                          checked={thresholdMode}
                          onChange={(e) => setThresholdMode(e.target.checked)}
                          className="accent-cyan-200"
                        />
                        Threshold
                      </label>

                      <label className="flex items-center gap-2 rounded-[20px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                        <input
                          type="checkbox"
                          checked={invert}
                          onChange={(e) => setInvert(e.target.checked)}
                          className="accent-cyan-200"
                        />
                        Invert
                      </label>

                      <label className="flex items-center gap-2 rounded-[20px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                        <input
                          type="checkbox"
                          checked={ditherMode}
                          onChange={(e) => setDitherMode(e.target.checked)}
                          className="accent-cyan-200"
                        />
                        Dither
                      </label>

                      <label className="flex items-center gap-2 rounded-[20px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                        <input
                          type="checkbox"
                          checked={transparentBg}
                          onChange={(e) => setTransparentBg(e.target.checked)}
                          className="accent-cyan-200"
                        />
                        Transparent bg
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-[30px] border border-white/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-[0.45em] text-white/62">
                    Presets
                  </p>

                  <button
                    type="button"
                    onClick={() => setPresetsOpen((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-white/65 transition hover:bg-white/15"
                  >
                    {presetsOpen ? "Minimize" : "Open"}
                    {presetsOpen ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {presetsOpen && (
                  <>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.45em] text-white/62">
                        Studio Looks
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => applyPreset("blueBird")}
                        className="group rounded-[24px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] px-3 py-4 text-left shadow-[0_8px_28px_rgba(110,197,255,0.12),inset_0_1px_0_rgba(255,255,255,0.5)] transition duration-300 hover:translate-y-[-2px] hover:bg-white/18"
                      >
                        <div className="mb-2 flex items-center gap-2 text-sm text-white">
                          <Wand2 className="h-4 w-4 text-cyan-100" />
                          Blue Bird
                        </div>
                        <div className="mb-3 h-10 rounded-full bg-[linear-gradient(90deg,rgba(215,245,255,0.95),rgba(115,178,255,0.75),rgba(30,78,184,0.9))]" />
                        <p className="text-xs leading-relaxed text-white/60">
                          IBM Flat blue monochrome icon treatment.
                        </p>
                      </button>

                      <button
                        onClick={() => applyPreset("crtGhost")}
                        className="group rounded-[24px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] px-3 py-4 text-left shadow-[0_8px_28px_rgba(110,197,255,0.12),inset_0_1px_0_rgba(255,255,255,0.5)] transition duration-300 hover:translate-y-[-2px] hover:bg-white/18"
                      >
                        <div className="mb-2 flex items-center gap-2 text-sm text-white">
                          <Wand2 className="h-4 w-4 text-cyan-100" />
                          CRT Ghost
                        </div>
                        <div className="mb-3 h-10 rounded-full bg-[linear-gradient(90deg,rgba(230,255,251,0.95),rgba(125,249,193,0.76),rgba(11,88,76,0.9))]" />
                        <p className="text-xs leading-relaxed text-white/60">
                          Green puke retro screen with dither.
                        </p>
                      </button>

                      <button
                        onClick={() => applyPreset("softMono")}
                        className="group rounded-[24px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] px-3 py-4 text-left shadow-[0_8px_28px_rgba(110,197,255,0.12),inset_0_1px_0_rgba(255,255,255,0.5)] transition duration-300 hover:translate-y-[-2px] hover:bg-white/18"
                      >
                        <div className="mb-2 flex items-center gap-2 text-sm text-white">
                          <Wand2 className="h-4 w-4 text-cyan-100" />
                          Soft Mono
                        </div>
                        <div className="mb-3 h-10 rounded-full bg-[linear-gradient(90deg,rgba(250,250,255,0.94),rgba(188,205,230,0.72),rgba(98,122,156,0.9))]" />
                        <p className="text-xs leading-relaxed text-white/60">
                          Muted grayscale blocks.
                        </p>
                      </button>

                      <button
                        onClick={() => applyPreset("hardStamp")}
                        className="group rounded-[24px] border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] px-3 py-4 text-left shadow-[0_8px_28px_rgba(110,197,255,0.12),inset_0_1px_0_rgba(255,255,255,0.5)] transition duration-300 hover:translate-y-[-2px] hover:bg-white/18"
                      >
                        <div className="mb-2 flex items-center gap-2 text-sm text-white">
                          <Wand2 className="h-4 w-4 text-cyan-100" />
                          Hard Stamp
                        </div>
                        <div className="mb-3 h-10 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,1),rgba(165,210,255,0.78),rgba(30,60,120,0.88))]" />
                        <p className="text-xs leading-relaxed text-white/60">
                          High-contrast cutout with transparency.
                        </p>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          <section
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`relative overflow-hidden rounded-[42px] border p-5 shadow-[0_22px_90px_rgba(25,77,187,0.28),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-2xl transition duration-300 ${
              dragActive
                ? "border-cyan-100/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(255,255,255,0.13)_45%,rgba(255,255,255,0.06))]"
                : "border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.05))]"
            }`}
          >
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/70" />
            <div className="pointer-events-none absolute left-[5%] top-[8%] h-40 w-40 rounded-full bg-cyan-200/20 blur-[90px]" />
            <div className="pointer-events-none absolute right-[6%] top-[20%] h-48 w-48 rounded-full bg-blue-300/20 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-[8%] left-[28%] h-44 w-44 rounded-full bg-sky-200/14 blur-[100px]" />

            {imageElement ? (
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="relative overflow-hidden rounded-[30px] border border-white/16 bg-[linear-gradient(180deg,rgba(8,18,44,0.92),rgba(4,11,28,0.96))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
                  <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/35" />
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/52">
                      Original
                    </p>
                    <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/45">
                      Source
                    </span>
                  </div>
                  <div className="flex min-h-[65vh] items-center justify-center rounded-[22px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(120,220,255,0.08),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-3">
                    <canvas
                      ref={originalCanvasRef}
                      className="max-h-[65vh] max-w-full object-contain"
                    />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[30px] border border-white/16 bg-[linear-gradient(180deg,rgba(8,18,44,0.92),rgba(4,11,28,0.96))] p-4 shadow-[0_0_40px_rgba(108,220,255,0.08),inset_0_1px_0_rgba(255,255,255,0.18)]">
                  <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/35" />
                  <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_50%_40%,rgba(114,230,255,0.12),transparent_42%)]" />
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/52">
                      Processed
                    </p>
                    <span className="rounded-full border border-cyan-100/15 bg-cyan-100/8 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-50/70">
                      Output
                    </span>
                  </div>
                  <div className="relative flex min-h-[65vh] items-center justify-center rounded-[22px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(133,240,255,0.12),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-3">
                    <div className="pointer-events-none absolute inset-0 rounded-[22px] shadow-[inset_0_0_80px_rgba(92,210,255,0.06)]" />
                    <canvas
                      ref={processedCanvasRef}
                      className="relative z-10 max-h-[65vh] max-w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden rounded-[30px] border border-dashed border-white/18 bg-[linear-gradient(180deg,rgba(8,18,44,0.85),rgba(4,11,28,0.92))] px-6 text-center">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(116,230,255,0.14),transparent_38%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
                <div className="relative z-10">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.24),rgba(255,255,255,0.08))] shadow-[0_12px_35px_rgba(111,202,255,0.22),inset_0_1px_0_rgba(255,255,255,0.55)]">
                    <ImageIcon className="h-9 w-9 text-cyan-100/85" />
                  </div>
                  <p className="text-xl font-light tracking-[0.08em] text-white">
                    No image loaded
                  </p>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/58">
                    Upload or drag in a PNG, JPG, or WEBP. 
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-30">
        <Link
          href="/portfolio"
          aria-label="Return to portfolio"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0.1))] shadow-[0_8px_28px_rgba(120,205,255,0.22),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-white/20"
        >
          <House
            className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110"
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </main>
  );
}