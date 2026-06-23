// app/coolstuff/gameboy-portrait/page.tsx

"use client";

import { useRef, useState } from "react";

const MONO_PALETTE = [
  [0, 0, 0],          // black
  [85, 85, 85],       // dark gray
  [170, 170, 170],    // light gray
  [255, 255, 255],    // white
];

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export default function GameboyPortraitPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [fileName, setFileName] = useState("mono-bit-portrait.png");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name.replace(/\.[^/.]+$/, "") + "-mono-bit.png");

    const url = URL.createObjectURL(file);
    setPreview(url);
    setResult(null);
  }

  function generateMonoBitPortrait() {
    if (!preview) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = preview;

    img.onload = () => {
      const sourceSize = Math.min(img.width, img.height);

      const sourceX = (img.width - sourceSize) / 2;
      const sourceY = (img.height - sourceSize) / 2;

      const pixelSize = 160;
      const outputSize = 1024;

      const lowCanvas = document.createElement("canvas");
      lowCanvas.width = pixelSize;
      lowCanvas.height = pixelSize;

      const lowCtx = lowCanvas.getContext("2d");
      if (!lowCtx) return;

      lowCtx.imageSmoothingEnabled = true;

      lowCtx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        pixelSize,
        pixelSize
      );

      const imageData = lowCtx.getImageData(0, 0, pixelSize, pixelSize);
      const data = imageData.data;

      for (let y = 0; y < pixelSize; y++) {
        for (let x = 0; x < pixelSize; x++) {
          const index = (y * pixelSize + x) * 4;

          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];

          let gray = 0.299 * r + 0.587 * g + 0.114 * b;

          // Same general Game Boy-style contrast structure,
          // but slightly softened so dark clothing/backgrounds do not destroy the portrait.
          gray = (gray - 128) * 1.25 + 138;

          const threshold = (BAYER_4X4[y % 4][x % 4] / 15 - 0.5) * 38;
          gray += threshold;

          gray = Math.max(0, Math.min(255, gray));

          let paletteIndex = 0;

          if (gray > 192) paletteIndex = 3;
          else if (gray > 128) paletteIndex = 2;
          else if (gray > 64) paletteIndex = 1;
          else paletteIndex = 0;

          const color = MONO_PALETTE[paletteIndex];

          data[index] = color[0];
          data[index + 1] = color[1];
          data[index + 2] = color[2];
          data[index + 3] = 255;
        }
      }

      lowCtx.putImageData(imageData, 0, 0);

      const outputCanvas = canvasRef.current;
      if (!outputCanvas) return;

      outputCanvas.width = outputSize;
      outputCanvas.height = outputSize;

      const outputCtx = outputCanvas.getContext("2d");
      if (!outputCtx) return;

      outputCtx.imageSmoothingEnabled = false;

      outputCtx.fillStyle = "rgb(255, 255, 255)";
      outputCtx.fillRect(0, 0, outputSize, outputSize);

      outputCtx.drawImage(lowCanvas, 0, 0, outputSize, outputSize);

      const dataUrl = outputCanvas.toDataURL("image/png");
      setResult(dataUrl);
    };
  }

  function downloadImage() {
    if (!result) return;

    const link = document.createElement("a");
    link.href = result;
    link.download = fileName;
    link.click();
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black">
      <section className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-black/60">
            Koyote Tool
          </p>

          <h1 className="text-5xl font-black uppercase tracking-tight sm:text-7xl">
            Mono Bit Portrait
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-black/70">
            Upload a portrait and convert it locally into a black-and-white
            Game Boy-style pixel image. No GPT, no API call, no backend.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-black/20 bg-white p-5 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.25em]">
                Input
              </h2>

              <button
                onClick={() => inputRef.current?.click()}
                className="rounded-full border border-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
              >
                Upload
              </button>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.5rem] border border-black/15 bg-[#f5f5f5]">
              {preview ? (
                <img
                  src={preview}
                  alt="Uploaded portrait preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <p className="px-6 text-center text-sm text-black/45">
                  Upload an image.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/20 bg-white p-5 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.25em]">
                Output
              </h2>

              <button
                onClick={downloadImage}
                disabled={!result}
                className="rounded-full border border-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Download
              </button>
            </div>

            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.5rem] border border-black/15 bg-white">
              {result ? (
                <img
                  src={result}
                  alt="Generated mono bit portrait"
                  className="h-full w-full object-cover"
                />
              ) : (
                <p className="px-6 text-center text-sm text-black/45">
                  Generated portrait appears here.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={generateMonoBitPortrait}
            disabled={!preview}
            className="rounded-full bg-black px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-white transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Generate Mono Bit Portrait
          </button>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </section>
    </main>
  );
}