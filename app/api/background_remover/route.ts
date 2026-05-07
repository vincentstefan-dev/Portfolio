import { NextResponse } from "next/server";
import path from "path";
import os from "os";
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

function getSafeBaseName(fileName: string) {
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[^\w-]/g, "_")
    .slice(0, 80);
}

function getSafeExtension(fileName: string, mimeType: string) {
  const ext = path.extname(fileName).toLowerCase();

  if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".webp") {
    return ext;
  }

  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/jpeg") return ".jpg";
  if (mimeType === "image/webp") return ".webp";

  return ".png";
}

function runPythonScript(
  scriptPath: string,
  inputPath: string,
  outputPath: string,
  originalFileName: string
) {
  return new Promise<void>((resolve, reject) => {
    const pythonProcess = spawn("python", [scriptPath, inputPath, outputPath]);

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
        return;
      }

      reject(
        new Error(
          `Python failed for ${originalFileName} with code ${code}\nSTDOUT:\n${stdout}\nSTDERR:\n${stderr}`
        )
      );
    });

    pythonProcess.on("error", (error) => {
      reject(error);
    });
  });
}

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

    /*
      Vercel production filesystem rule:
      - process.cwd() points to the deployed app directory, usually /var/task
      - /var/task is read-only
      - /tmp is writable, temporary, and safe for short-lived processing
    */
    const tempDir = os.tmpdir();

    const scriptPath = path.join(
      process.cwd(),
      "app",
      "scripts",
      "remove_bg.py"
    );

    console.log("Resolved script path:", scriptPath);
    console.log("Script exists:", fsSync.existsSync(scriptPath));
    console.log("Temp directory:", tempDir);

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

      const safeBaseName = getSafeBaseName(image.name);
      const safeExtension = getSafeExtension(image.name, image.type);

      const inputPath = path.join(
        tempDir,
        `${safeBaseName}-${timestamp}${safeExtension}`
      );

      const outputPath = path.join(
        tempDir,
        `${safeBaseName}-${timestamp}-removed.png`
      );

      tempFiles.push(inputPath, outputPath);

      await fs.writeFile(inputPath, buffer);

      await runPythonScript(scriptPath, inputPath, outputPath, image.name);

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