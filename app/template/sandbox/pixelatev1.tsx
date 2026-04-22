"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Download, Image as ImageIcon, RefreshCcw, Upload } from "lucide-react";

/**
 * Keep a value inside a valid range.
 */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Convert a HEX color string into RGB values.
 * Example: "#4c6fff" -> { r: 76, g: 111, b: 255 }
 */
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

/**
 * Reduce the amount of color levels.
 * This creates a more posterized / pixel-art look.
 */
function quantize(value: number, levels: number) {
  if (levels <= 1) return value >= 128 ? 255 : 0;
  const step = 255 / (levels - 1);
  return Math.round(value / step) * step;
}

export default function PixelLabV1() {
  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Image source state
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );

  // Controls
  const [pixelSize, setPixelSize] = useState(12);
  const [scaleMultiplier, setScaleMultiplier] = useState(1);
  const [grayscale, setGrayscale] = useState(true);
  const [posterizeLevels, setPosterizeLevels] = useState(4);
  const [thresholdMode, setThresholdMode] = useState(false);
  const [thresholdValue, setThresholdValue] = useState(128);
  const [monochromeTint, setMonochromeTint] = useState(true);
  const [tintColor, setTintColor] = useState("#4c6fff");
  const [invert, setInvert] = useState(false);
  const [transparentBg, setTransparentBg] = useState(false);

  /**
   * Load the chosen image into memory whenever imageUrl changes.
   */
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

  /**
   * Small summary label shown in the preview panel.
   */
  const controlSummary = useMemo(() => {
    return `${pixelSize}px blocks · ${posterizeLevels} levels${
      thresholdMode ? ` · threshold ${thresholdValue}` : ""
    }${monochromeTint ? " · tinted" : ""}`;
  }, [
    pixelSize,
    posterizeLevels,
    thresholdMode,
    thresholdValue,
    monochromeTint,
  ]);

  /**
   * Main pixel-processing pipeline.
   * Runs whenever the image or controls change.
   */
  useEffect(() => {
    if (!imageElement || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const outputWidth = Math.max(
      1,
      Math.floor(imageElement.naturalWidth * scaleMultiplier)
    );
    const outputHeight = Math.max(
      1,
      Math.floor(imageElement.naturalHeight * scaleMultiplier)
    );

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    if (!transparentBg) {
      ctx.clearRect(0, 0, outputWidth, outputHeight);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, outputWidth, outputHeight);
    } else {
      ctx.clearRect(0, 0, outputWidth, outputHeight);
    }

    // Temporary low-resolution canvas used to create the pixelation effect
    const smallCanvas = document.createElement("canvas");
    const smallCtx = smallCanvas.getContext("2d", {
      willReadFrequently: true,
    });
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

      // Convert to grayscale when needed
      if (grayscale || monochromeTint || thresholdMode) {
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;
        r = luma;
        g = luma;
        b = luma;
      }

      // Reduce color steps
      r = quantize(r, posterizeLevels);
      g = quantize(g, posterizeLevels);
      b = quantize(b, posterizeLevels);

      // Pure black / white threshold mode
      if (thresholdMode) {
        const v = r >= thresholdValue ? 255 : 0;
        r = v;
        g = v;
        b = v;
      }

      // Invert colors if enabled
      if (invert) {
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
      }

      // Apply tint color to grayscale result
      if (monochromeTint) {
        const normalized = r / 255;
        r = tint.r * normalized;
        g = tint.g * normalized;
        b = tint.b * normalized;
      }

      // Make black pixels transparent when threshold mode is active
      if (transparentBg && thresholdMode && r === 0 && g === 0 && b === 0) {
        a = 0;
      }

      data[i] = clamp(Math.round(r), 0, 255);
      data[i + 1] = clamp(Math.round(g), 0, 255);
      data[i + 2] = clamp(Math.round(b), 0, 255);
      data[i + 3] = clamp(Math.round(a), 0, 255);
    }

    smallCtx.putImageData(imageData, 0, 0);

    // Draw the tiny processed image back up at full size
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      smallCanvas,
      0,
      0,
      smallWidth,
      smallHeight,
      0,
      0,
      outputWidth,
      outputHeight
    );
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
  ]);

  /**
   * Handle image uploads.
   */
  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const nextUrl = URL.createObjectURL(file);

    setImageUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return nextUrl;
    });
  }

  /**
   * Open hidden file input.
   */
  function triggerUpload() {
    fileInputRef.current?.click();
  }

  /**
   * Reset controls to defaults.
   */
  function resetControls() {
    setPixelSize(12);
    setScaleMultiplier(1);
    setGrayscale(true);
    setPosterizeLevels(4);
    setThresholdMode(false);
    setThresholdValue(128);
    setMonochromeTint(true);
    setTintColor("#4c6fff");
    setInvert(false);
    setTransparentBg(false);
  }

  /**
   * Export the canvas as a PNG file.
   */
  function exportPng() {
    if (!canvasRef.current) return;

    const url = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "pixel-lab-export.png";
    link.click();
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
              Pixel Lab
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Canvas utility v1
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Client-side image pixelation and stylization. No Python. No API
              route.
            </p>
          </div>

          <div className="mb-5 flex flex-wrap gap-3">
            <button
              onClick={triggerUpload}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/15"
            >
              <Upload className="h-4 w-4" />
              Upload image
            </button>

            <button
              onClick={exportPng}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/15"
            >
              <Download className="h-4 w-4" />
              Export PNG
            </button>

            <button
              onClick={resetControls}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/15"
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

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm text-white/70">
                Pixel size: {pixelSize}
              </label>
              <input
                type="range"
                min="2"
                max="40"
                value={pixelSize}
                onChange={(e) => setPixelSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Scale: {scaleMultiplier.toFixed(1)}x
              </label>
              <input
                type="range"
                min="1"
                max="4"
                step="0.25"
                value={scaleMultiplier}
                onChange={(e) => setScaleMultiplier(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Posterize levels: {posterizeLevels}
              </label>
              <input
                type="range"
                min="2"
                max="8"
                value={posterizeLevels}
                onChange={(e) => setPosterizeLevels(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Threshold: {thresholdValue}
              </label>
              <input
                type="range"
                min="0"
                max="255"
                value={thresholdValue}
                onChange={(e) => setThresholdValue(Number(e.target.value))}
                className="w-full"
                disabled={!thresholdMode}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Tint color
              </label>
              <input
                type="color"
                value={tintColor}
                onChange={(e) => setTintColor(e.target.value)}
                className="h-11 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-white/75">
              <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <input
                  type="checkbox"
                  checked={grayscale}
                  onChange={(e) => setGrayscale(e.target.checked)}
                />
                Grayscale
              </label>

              <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <input
                  type="checkbox"
                  checked={monochromeTint}
                  onChange={(e) => setMonochromeTint(e.target.checked)}
                />
                Monochrome tint
              </label>

              <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <input
                  type="checkbox"
                  checked={thresholdMode}
                  onChange={(e) => setThresholdMode(e.target.checked)}
                />
                Threshold mode
              </label>

              <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <input
                  type="checkbox"
                  checked={invert}
                  onChange={(e) => setInvert(e.target.checked)}
                />
                Invert
              </label>

              <label className="col-span-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <input
                  type="checkbox"
                  checked={transparentBg}
                  onChange={(e) => setTransparentBg(e.target.checked)}
                />
                Transparent black pixels when threshold is enabled
              </label>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                Preview
              </p>
              <p className="mt-2 text-sm text-white/65">
                {imageElement
                  ? controlSummary
                  : "Upload an image to begin."}
              </p>
            </div>
          </div>

          <div className="flex min-h-[70vh] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[#02040b]">
            {imageElement ? (
              <canvas
                ref={canvasRef}
                className="max-h-[70vh] max-w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center px-6 text-center text-white/45">
                <ImageIcon className="mb-3 h-10 w-10" />
                <p className="text-base">No image loaded</p>
                <p className="mt-2 text-sm">
                  Upload a PNG, JPG, or WEBP file and start pushing it into
                  pixel-art territory.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}