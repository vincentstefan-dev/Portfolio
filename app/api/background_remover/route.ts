import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import fsSync from "fs";
import { spawn } from "child_process";
import JSZip from "jszip";

const MAX_FILES = 15;
const MAX_FILE_SIZE_MB = 12;
const MAX_TOTAL_SIZE_MB = 120;

const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
]);

export async function POST(request: Request) {
  const tempFiles: string[] = [];

  try {
    const formData = await request.formData();
    const images = formData.getAll("images");

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "No images received." },
        { status: 400 }
      );
    }

    const validImages = images.filter(
      (item): item is File => item instanceof File
    );

    if (validImages.length === 0) {
      return NextResponse.json(
        { error: "No valid image files received." },
        { status: 400 }
      );
    }

    if (validImages.length > MAX_FILES) {
      return NextResponse.json(
        {
          error: `Too many files. Maximum allowed is ${MAX_FILES}.`,
        },
        { status: 400 }
      );
    }

    let totalSize = 0;

    for (const image of validImages) {
      if (!ALLOWED_MIME_TYPES.has(image.type)) {
        return NextResponse.json(
          {
            error: `Unsupported file type for "${image.name}". Allowed types: PNG, JPEG, WEBP.`,
          },
          { status: 400 }
        );
      }

      if (image.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          {
            error: `"${image.name}" exceeds the ${MAX_FILE_SIZE_MB} MB per-file limit.`,
          },
          { status: 400 }
        );
      }

      totalSize += image.size;
    }

    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      return NextResponse.json(
        {
          error: `Total upload size exceeds the ${MAX_TOTAL_SIZE_MB} MB batch limit.`,
        },
        { status: 400 }
      );
    }

    const tempDir = path.join(process.cwd(), "temp");
    await fs.mkdir(tempDir, { recursive: true });

    const scriptPath = path.join(
      process.cwd(),
      "app",
      "scripts",
      "remove_bg.py"
    );

    console.log("Resolved script path:", scriptPath);
    console.log("Script exists:", fsSync.existsSync(scriptPath));

    if (!fsSync.existsSync(scriptPath)) {
      return NextResponse.json(
        { error: "Python script not found." },
        { status: 500 }
      );
    }

    const zip = new JSZip();

    for (const image of validImages) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const timestamp = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;

      const safeBaseName = image.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^\w-]/g, "_")
        .slice(0, 80);

      const inputPath = path.join(tempDir, `${safeBaseName}-${timestamp}.png`);
      const outputPath = path.join(
        tempDir,
        `${safeBaseName}-${timestamp}-removed.png`
      );

      tempFiles.push(inputPath, outputPath);

      await fs.writeFile(inputPath, buffer);

      await new Promise<void>((resolve, reject) => {
        const pythonProcess = spawn("python", [
          scriptPath,
          inputPath,
          outputPath,
        ]);

        let stdout = "";
        let stderr = "";

        pythonProcess.stdout.on("data", (data) => {
          stdout += data.toString();
        });

        pythonProcess.stderr.on("data", (data) => {
          stderr += data.toString();
        });

        pythonProcess.on("close", (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(
              new Error(
                `Python failed for ${image.name} with code ${code}\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`
              )
            );
          }
        });

        pythonProcess.on("error", (error) => {
          reject(error);
        });
      });

      const outputExists = fsSync.existsSync(outputPath);
      if (!outputExists) {
        throw new Error(`Processed output was not created for "${image.name}".`);
      }

      const outputBuffer = await fs.readFile(outputPath);
      zip.file(`${safeBaseName}-removed.png`, outputBuffer);
    }

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
    const zipBytes = new Uint8Array(zipBuffer);

    return new NextResponse(zipBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="removed-backgrounds.zip"',
      },
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process images.",
      },
      { status: 500 }
    );
  } finally {
    for (const filePath of tempFiles) {
      await fs.unlink(filePath).catch(() => {});
    }
  }
}