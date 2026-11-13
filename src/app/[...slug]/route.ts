import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MIME_TYPES: Record<string, string> = {
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".html": "text/html; charset=utf-8"
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Check if there is an actual static file in public/
  if (pathname && pathname !== "/") {
    const publicPath = path.join(process.cwd(), "public", pathname.replace(/^\//, ""));
    if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
      const ext = path.extname(publicPath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      const fileBuffer = fs.readFileSync(publicPath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
  }

  // Fallback to public/index.html for client-side routing
  const filePath = path.join(process.cwd(), "public", "index.html");
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, "utf8");
    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }
  return new NextResponse("Index file not found", { status: 404 });
}
