import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
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
  return new NextResponse("Root index file not found", { status: 404 });
}
