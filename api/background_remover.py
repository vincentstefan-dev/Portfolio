from http.server import BaseHTTPRequestHandler
from email.parser import BytesParser
from email.policy import default
import io
import json
import re
import zipfile
import traceback


MAX_FILES = 3
MAX_FILE_SIZE_MB = 4
MAX_TOTAL_SIZE_MB = 10

MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024

ALLOWED_MIME_TYPES = {
    "image/png",
    "image/jpeg",
    "image/webp",
}


def get_safe_base_name(file_name):
    if not file_name:
        return "image"

    name = re.sub(r"\.[^/.]+$", "", file_name)
    name = re.sub(r"[^\w-]", "_", name)
    name = name[:80]

    return name or "image"


def parse_multipart_form(headers, body):
    content_type = headers.get("Content-Type")

    if not content_type:
        raise ValueError("Missing Content-Type header.")

    fake_message = (
        f"Content-Type: {content_type}\r\n"
        "MIME-Version: 1.0\r\n"
        "\r\n"
    ).encode("utf-8") + body

    message = BytesParser(policy=default).parsebytes(fake_message)

    files = []

    if not message.is_multipart():
        raise ValueError("Request is not multipart/form-data.")

    for part in message.iter_parts():
        content_disposition = part.get("Content-Disposition", "")

        if "form-data" not in content_disposition:
            continue

        field_name = part.get_param("name", header="content-disposition")
        file_name = part.get_param("filename", header="content-disposition")

        if field_name != "images" or not file_name:
            continue

        file_bytes = part.get_payload(decode=True)
        mime_type = part.get_content_type()

        files.append(
            {
                "file_name": file_name,
                "mime_type": mime_type,
                "bytes": file_bytes,
            }
        )

    return files


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_json(
            {
                "ok": True,
                "message": "background_remover Python function is alive"
            },
            200,
        )

    def do_POST(self):
        try:
            content_length = self.headers.get("Content-Length")

            if not content_length:
                self.send_json_error("Missing Content-Length header.", 400)
                return

            body = self.rfile.read(int(content_length))
            image_files = parse_multipart_form(self.headers, body)

            if len(image_files) == 0:
                self.send_json_error("No valid image files received.", 400)
                return

            if len(image_files) > MAX_FILES:
                self.send_json_error(
                    f"Too many files. Maximum allowed is {MAX_FILES}.",
                    400,
                )
                return

            total_size = 0
            processed_files = []

            # Import rembg INSIDE the request handler
            try:
                from rembg import remove
            except Exception as import_error:
                self.send_json_error(
                    f"Failed to import rembg: {str(import_error)}",
                    500,
                )
                return

            for image in image_files:
                file_name = image["file_name"]
                mime_type = image["mime_type"]
                input_bytes = image["bytes"]

                if mime_type not in ALLOWED_MIME_TYPES:
                    self.send_json_error(
                        f'Unsupported file type for "{file_name}". Allowed types: PNG, JPEG, WEBP.',
                        400,
                    )
                    return

                file_size = len(input_bytes)

                if file_size == 0:
                    self.send_json_error(f'"{file_name}" is empty.', 400)
                    return

                if file_size > MAX_FILE_SIZE_BYTES:
                    self.send_json_error(
                        f'"{file_name}" exceeds the {MAX_FILE_SIZE_MB} MB per-file limit.',
                        400,
                    )
                    return

                total_size += file_size

                if total_size > MAX_TOTAL_SIZE_BYTES:
                    self.send_json_error(
                        f"Total upload size exceeds the {MAX_TOTAL_SIZE_MB} MB batch limit.",
                        400,
                    )
                    return

                try:
                    output_bytes = remove(input_bytes)
                except Exception as processing_error:
                    self.send_json_error(
                        f'Background removal failed for "{file_name}": {str(processing_error)}',
                        500,
                    )
                    return

                safe_base_name = get_safe_base_name(file_name)

                processed_files.append(
                    (
                        f"{safe_base_name}-removed.png",
                        output_bytes,
                    )
                )

            zip_buffer = io.BytesIO()

            with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
                for output_file_name, output_bytes in processed_files:
                    zip_file.writestr(output_file_name, output_bytes)

            zip_bytes = zip_buffer.getvalue()

            self.send_response(200)
            self.send_header("Content-Type", "application/zip")
            self.send_header(
                "Content-Disposition",
                'attachment; filename="removed-backgrounds.zip"',
            )
            self.send_header("Content-Length", str(len(zip_bytes)))
            self.end_headers()
            self.wfile.write(zip_bytes)

        except Exception as error:
            print("PYTHON API ERROR:")
            print(traceback.format_exc())
            self.send_json_error(str(error), 500)

    def send_json(self, payload, status_code):
        response = json.dumps(payload).encode("utf-8")

        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(response)))
        self.end_headers()
        self.wfile.write(response)

    def send_json_error(self, message, status_code):
        self.send_json({"error": message}, status_code)