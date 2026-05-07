"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { House, Upload, Trash2, Scissors, FileImage } from "lucide-react";
import UpdatePopup from "@/app/components/ui/UpdatePopup";

export default function RemoveBgPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ============================
  // FRONTEND SAFEGUARDS
  // ============================

  const MAX_FILES = 10;
  const MAX_FILE_SIZE_MB = 8;
  const MAX_TOTAL_SIZE_MB = 40;

  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
  const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;

  // ============================
  // FILE INPUT HANDLER
  // ============================

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length === 0) {
      setFiles([]);
      setStatus("");
      return;
    }

    if (selectedFiles.length > MAX_FILES) {
      setFiles([]);
      setStatus(`You can upload up to ${MAX_FILES} images at a time.`);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const oversizedFile = selectedFiles.find(
      (file) => file.size > MAX_FILE_SIZE_BYTES
    );

    if (oversizedFile) {
      setFiles([]);
      setStatus(
        `"${oversizedFile.name}" exceeds the ${MAX_FILE_SIZE_MB} MB per-file limit.`
      );

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      setFiles([]);
      setStatus(
        `Total upload size exceeds ${MAX_TOTAL_SIZE_MB} MB. Please select fewer or smaller images.`
      );

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setFiles(selectedFiles);
    setStatus("");
  };

  // ============================
  // DELETE / CLEAN SELECTION
  // ============================

  const handleDeleteAll = () => {
    setFiles([]);
    setStatus("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ============================
  // UPLOAD + API CALL
  // ============================

  const handleUpload = async () => {
    if (files.length === 0) {
      setStatus("Please select at least one image.");
      return;
    }

    if (files.length > MAX_FILES) {
      setStatus(`You can upload up to ${MAX_FILES} images at a time.`);
      return;
    }

    const oversizedFile = files.find((file) => file.size > MAX_FILE_SIZE_BYTES);
    if (oversizedFile) {
      setStatus(
        `"${oversizedFile.name}" exceeds the ${MAX_FILE_SIZE_MB} MB per-file limit.`
      );
      return;
    }

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      setStatus(
        `Total upload size exceeds ${MAX_TOTAL_SIZE_MB} MB. Please select fewer or smaller images.`
      );
      return;
    }

    setIsLoading(true);
    setStatus("Processing images...");

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("/api/background_remover", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(`Upload failed: ${errorText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "removed-background.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      setStatus("Images processed successfully.");
    } catch (error) {
      console.error(error);
      setStatus(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

          <UpdatePopup
      id="background-remover-warning"
      title="Background Remover"
      message="This tool is currently unstable in production. The original version used a Python script to remove backgrounds,
       but Vercel does not support running that local Python process inside this Next.js route. I am replacing it with an external API version so the tool can work reliably online."
       
              />

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/aboutmebackground.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 animate-[bgPulse_10s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_45%,rgba(94,234,212,0.08),transparent_36%),radial-gradient(circle_at_60%_55%,rgba(34,211,238,0.06),transparent_26%),radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.04),transparent_24%)] blur-2xl" />

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.18),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),rgba(0,0,0,0.62))]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
        <div className="h-[200%] w-full animate-[scanDrift_14s_linear_infinite] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[length:100%_4px]" />
      </div>

      <div className="pointer-events-none absolute inset-6 rounded-[34px] border border-cyan-100/10 shadow-[0_0_80px_rgba(34,211,238,0.08)]" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-10 md:py-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-100/50">
              Koyote inc.
            </p>

            <h1 className="mt-2 animate-[titleGlow_5.5s_ease-in-out_infinite] text-3xl font-light tracking-tight text-white/90 md:text-5xl">
              Background Remover
            </h1>
          </div>

          <div className="rounded-full border border-cyan-100/15 bg-black/20 px-4 py-2 backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-100/55">
              Utility 01
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="grid w-full max-w-6xl gap-8 md:grid-cols-[1.15fr_0.55fr]">
            <div className="group relative animate-[panelFloat_0s_ease-in-out_infinite] overflow-hidden rounded-[28px] border border-cyan-100/15 bg-black/20 p-6 shadow-[0_0_50px_rgba(34,211,238,0.08)] backdrop-blur-md md:p-10">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(103,232,249,0.08),transparent_40%,rgba(255,255,255,0.02))]" />
              <div className="absolute -left-8 top-8 h-24 w-24 rounded-full bg-cyan-300/10 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-cyan-200/10 blur-3xl" />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(135deg,rgba(255,120,160,0.05),transparent_18%,transparent_55%,rgba(120,240,255,0.06),rgba(255,220,120,0.04))]" />
                <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,120,180,0.12),transparent_62%)] blur-2xl" />
                <div className="absolute -right-10 top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(120,220,255,0.14),transparent_62%)] blur-2xl" />
                <div className="absolute bottom-0 left-1/4 h-20 w-40 bg-[linear-gradient(90deg,rgba(255,160,120,0.06),rgba(120,255,240,0.08),rgba(255,220,140,0.05),transparent)] blur-2xl" />
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition duration-700 group-hover:opacity-100">
                <div className="absolute inset-[1px] rounded-[27px] border border-white/[0.04]" />
                <div className="absolute left-0 top-0 h-20 w-28 rounded-tl-[28px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),rgba(255,120,120,0.05),transparent_72%)] blur-xl" />
                <div className="absolute bottom-0 right-0 h-20 w-28 rounded-br-[28px] bg-[radial-gradient(circle_at_bottom_right,rgba(120,220,255,0.12),rgba(255,255,255,0.05),transparent_72%)] blur-xl" />
              </div>

              <div className="relative z-10">
                <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-100/50">
                  Image Input
                </p>

                <div className="mt-6">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-200/20 bg-cyan-300/10 px-5 py-3 text-sm text-cyan-50 transition duration-300 hover:scale-[1.02] hover:bg-cyan-300/15 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_30px_rgba(103,232,249,0.18)]" />
                    <Upload className="relative z-10 h-4 w-4" strokeWidth={1.75} />
                    <span className="relative z-10">Select Images</span>
                  </button>

                  <p className="mt-4 text-sm text-white/70">
                    {files.length > 0
                      ? `${files.length} file(s) selected`
                      : "No files selected"}
                  </p>

                  <p className="mt-2 text-xs text-cyan-100/45">
                    Limit: {MAX_FILES} images, {MAX_FILE_SIZE_MB} MB each,{" "}
                    {MAX_TOTAL_SIZE_MB} MB total
                  </p>
                </div>

                <div className="mt-8 h-px w-full bg-gradient-to-r from-cyan-200/25 via-cyan-100/10 to-transparent" />

                <div className="relative mt-6 min-h-[140px] overflow-hidden rounded-[22px] border border-cyan-100/10 bg-black/15 p-5">
                  {isLoading && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div className="absolute inset-y-0 -left-1/2 w-1/2 animate-[shimmer_2.4s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(125,211,252,0.08),rgba(255,255,255,0.08),transparent)] blur-md" />
                    </div>
                  )}

                  <div className="relative z-10 mb-4 flex items-center gap-2">
                    <FileImage className="h-4 w-4 text-cyan-100/65" />
                    <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-100/50">
                      Selected Files
                    </p>
                  </div>

                  <div className="relative z-10">
                    {files.length > 0 ? (
                      <ul className="space-y-2 text-sm text-white/75">
                        {files.map((file, index) => (
                          <li
                            key={`${file.name}-${index}`}
                            className="truncate border-b border-white/5 pb-2 last:border-b-0"
                          >
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-white/40">
                        Waiting for image input.
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={isLoading}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-200/20 bg-white/10 px-5 py-3 text-sm text-white transition duration-300 hover:scale-[1.02] hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_34px_rgba(103,232,249,0.22)]" />
                    <Scissors className="relative z-10 h-4 w-4" strokeWidth={1.75} />
                    <span className="relative z-10">
                      {isLoading ? "Processing..." : "Remove Background"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDeleteAll}
                    disabled={files.length === 0 || isLoading}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-cyan-100/15 bg-black/20 px-5 py-3 text-sm text-white/85 transition duration-300 hover:scale-[1.02] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_28px_rgba(103,232,249,0.14)]" />
                    <Trash2 className="relative z-10 h-4 w-4" strokeWidth={1.75} />
                    <span className="relative z-10">Delete</span>
                  </button>
                </div>

                <div className="mt-6 min-h-[24px]">
                  {status && (
                    <p
                      className={`text-sm ${
                        isLoading
                          ? "animate-pulse text-cyan-100/80"
                          : "text-white/70"
                      }`}
                    >
                      {status}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative w-full">
                <div className="mb-4 flex justify-end">
                  <div
                    className={`group relative overflow-hidden rounded-[22px] border border-cyan-100/15 bg-black/20 backdrop-blur-md transition-all duration-500 ${
                      isInfoOpen
                        ? "w-full max-w-[420px] p-5"
                        : "w-auto px-4 py-3"
                    }`}
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                      <div className="absolute inset-0 rounded-[22px] bg-[linear-gradient(145deg,rgba(255,170,120,0.04),transparent_22%,transparent_60%,rgba(120,220,255,0.06),rgba(255,120,200,0.04))]" />
                      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(120,220,255,0.14),transparent_62%)] blur-2xl" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setIsInfoOpen((prev) => !prev)}
                          className="text-left"
                        >
                          <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-100/50">
                            Utility Info
                          </p>
                          <p className="mt-1 text-sm text-white/85">
                            {isInfoOpen ? "Minimize" : "Expand details"}
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsInfoOpen((prev) => !prev)}
                          className="rounded-full border border-cyan-100/15 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-100/60 transition hover:bg-white/10"
                        >
                          {isInfoOpen ? "–" : "+"}
                        </button>
                      </div>

                      <div
                        className={`grid transition-all duration-500 ${
                          isInfoOpen
                            ? "mt-4 grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="h-px w-full bg-gradient-to-r from-cyan-200/20 to-transparent" />
                          <p className="mt-4 text-sm leading-6 text-white/72">
                            Upload images in batch or individually and export
                            the processed files as a compressed ZIP package.
                            Only allows PNG/JPEG/WEBP
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative w-full animate-[panelFloat_10s_ease-in-out_infinite] overflow-hidden rounded-[28px] border border-cyan-100/15 bg-black/20 p-6 backdrop-blur-md [animation-delay:0.7s]">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(145deg,rgba(255,170,120,0.04),transparent_22%,transparent_60%,rgba(120,220,255,0.06),rgba(255,120,200,0.04))]" />
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(120,220,255,0.14),transparent_62%)] blur-2xl" />
                    <div className="absolute -left-8 bottom-0 h-20 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,150,120,0.1),transparent_62%)] blur-2xl" />
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition duration-700 group-hover:opacity-100">
                    <div className="absolute inset-[1px] rounded-[27px] border border-white/[0.035]" />
                    <div className="absolute left-0 top-0 h-16 w-24 rounded-tl-[28px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),rgba(255,120,120,0.05),transparent_72%)] blur-xl" />
                    <div className="absolute bottom-0 right-0 h-16 w-24 rounded-br-[28px] bg-[radial-gradient(circle_at_bottom_right,rgba(120,220,255,0.12),rgba(255,255,255,0.05),transparent_72%)] blur-xl" />
                  </div>

                  <div className="relative z-10">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-100/50">
                      Process
                    </p>

                    <div className="mt-6 flex flex-col gap-4">
                      <div className="opacity-90">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-100/45">
                          01
                        </p>
                        <p className="mt-1 text-sm text-white/85">
                          Select images
                        </p>
                      </div>

                      <div className="opacity-90">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-100/45">
                          02
                        </p>
                        <p className="mt-1 text-sm text-white/85">
                          Send to remover
                        </p>
                      </div>

                      <div className="opacity-90">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-100/45">
                          03
                        </p>
                        <p className="mt-1 text-sm text-white/85">
                          Download ZIP package
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 h-px w-full bg-gradient-to-r from-cyan-200/20 to-transparent" />

                    <div className="mt-6">
                      <p
                        className={`text-[10px] uppercase tracking-[0.28em] ${
                          isLoading
                            ? "animate-[statusPulse_1.6s_ease-in-out_infinite] text-cyan-100/70"
                            : "animate-[statusPulse_3.6s_ease-in-out_infinite] text-cyan-100/45"
                        }`}
                      >
                        Status
                      </p>

                      <p
                        className={`mt-2 text-sm ${
                          isLoading
                            ? "animate-[statusPulse_1.6s_ease-in-out_infinite] text-cyan-50/90"
                            : "text-white/75"
                        }`}
                      >
                        {isLoading
                          ? "Processing request..."
                          : files.length > 0
                          ? "Ready for execution"
                          : "Awaiting input"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-100/30">
            Designed by Vincent Lambour.
          </p>

          <Link
            href="/coolstuff"
            aria-label="Return to coolstuff"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-cyan-100/15 bg-black/20 backdrop-blur-md transition duration-300 hover:scale-[1.03] hover:bg-white/10 hover:shadow-[0_0_20px_rgba(103,232,249,0.14)]"
          >
            <House
              className="h-5 w-5 text-white/85 transition-transform duration-100 group-hover:scale-110"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes panelFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes titleGlow {
          0%,
          100% {
            opacity: 0.94;
            text-shadow: 0 0 0px rgba(103, 232, 249, 0);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 20px rgba(103, 232, 249, 0.16),
              0 0 34px rgba(103, 232, 249, 0.08);
          }
        }

        @keyframes scanDrift {
          0% {
            transform: translateY(-25%);
          }
          100% {
            transform: translateY(0%);
          }
        }

        @keyframes statusPulse {
          0%,
          100% {
            opacity: 0.72;
            text-shadow: 0 0 0px rgba(103, 232, 249, 0);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 14px rgba(103, 232, 249, 0.18);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(320%);
          }
        }

        @keyframes bgPulse {
          0%,
          100% {
            transform: scale(1) translateY(0px);
            opacity: 0.72;
            filter: blur(18px);
          }
          50% {
            transform: scale(1.02) translateY(-3px);
            opacity: 1;
            filter: blur(24px);
          }
        }
      `}</style>
    </main>
  );
}