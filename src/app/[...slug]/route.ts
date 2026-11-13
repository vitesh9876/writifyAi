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
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

const VALID_APP_ROUTES = new Set([
  "",
  "editor",
  "letters",
  "letter-editor",
  "scroll-letter-editor",
  "letter-presets",
  "history",
  "canvas",
  "create",
  "text-to-handwriting",
  "handwriting-generator",
  "ai-handwriting-generator",
  "assignment-generator",
  "pdf-to-handwriting",
  "notebook-generator",
  "cursive-generator",
  "privacy",
  "terms",
  "about",
  "faq",
  "pricing",
  "sitemap",
  "languages",
  "templates",
  "examples",
  "our-users",
  "users",
  "login",
  "signup",
  "forgot-password",
  "pro",
  "account",
  "api",
  "assets"
]);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const cleanPath = pathname.replace(/^\//, "");
  const firstSegment = cleanPath.split("/")[0] || "";

  // 1. Static file in public directory
  if (pathname && pathname !== "/") {
    const publicPath = path.join(process.cwd(), "public", cleanPath);
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

  // 2. Known Valid Client Routes: Serve SPA entry
  if (VALID_APP_ROUTES.has(firstSegment)) {
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
  }

  // 3. Custom 404 Response for invalid / unknown routes
  const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>404: Page Not Found | Writify</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="/assets/luxury-theme.css">
  <style>
    body { background: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; margin: 0; padding: 24px; text-align: center; color: #09090b; }
    .box { max-width: 440px; background: #ffffff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px; padding: 48px 32px; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
    h1 { font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 800; margin: 0 0 12px; }
    p { font-size: 14px; color: #52525b; line-height: 1.5; margin: 0 0 24px; }
    .btn { display: inline-block; background: #09090b; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; padding: 10px 20px; border-radius: 8px; transition: background 0.15s ease; }
    .btn:hover { background: #18181b; }
  </style>
</head>
<body>
  <div class="box">
    <h1>404: Page Not Found</h1>
    <p>The page you requested does not exist or has been moved. You can return to the home page or open the handwriting studio.</p>
    <a href="/" class="btn">Return to Home</a>
  </div>
</body>
</html>`;

  return new NextResponse(notFoundHtml, {
    status: 404,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
