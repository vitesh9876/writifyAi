import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text") || searchParams.get("prompt") || searchParams.get("content");
  const font = searchParams.get("font") || searchParams.get("style") || "Cursive_real";
  const ink = searchParams.get("ink") || searchParams.get("color") || "blue";
  const paper = searchParams.get("paper") || searchParams.get("template") || "classic2";
  const size = searchParams.get("size") || "22";

  // If text query is present, generate 1-click studio direct link for LLM agents
  if (text) {
    const encodedText = encodeURIComponent(text);
    const studioUrl = `https://writify-ai.vercel.app/editor?text=${encodedText}&font=${encodeURIComponent(font)}&ink=${encodeURIComponent(ink)}&paper=${encodeURIComponent(paper)}&size=${encodeURIComponent(size)}`;
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const estimatedPages = Math.max(1, Math.ceil(wordCount / 180));

    return NextResponse.json(
      {
        success: true,
        action: "convert_text_to_handwriting",
        studioUrl,
        wordCount,
        charCount: text.length,
        estimatedPages,
        parameters: {
          text,
          font,
          ink,
          paper,
          fontSize: Number(size) || 22,
          resolution: "300 DPI Vector PDF",
          watermark: "None (100% Free Forever)"
        }
      },
      { headers: CORS_HEADERS }
    );
  }

  // Otherwise list assignments from database
  const userId = searchParams.get("userId") || undefined;
  const limit = Number(searchParams.get("limit")) || 20;

  try {
    const assignments = await prisma.assignment.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return NextResponse.json({ success: true, items: assignments }, { headers: CORS_HEADERS });
  } catch (error: any) {
    // If DB is offline, return fallback empty array instead of 500 error
    return NextResponse.json({ success: true, items: [], note: "Database offline or empty" }, { headers: CORS_HEADERS });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId = "usr_writify_agent",
      title = "Handwritten Assignment",
      fileName = "handwritten-assignment.pdf",
      content = "",
      text = "",
      fontFamily = "Cursive_real",
      font = "",
      fontSize = 20,
      lineHeight = 1.8,
      letterSpacing = 1,
      wordSpacing = 2,
      inkColor = "#002060",
      ink = "",
      paperTemplate = "Classic White",
      paper = "",
      margins = { top: 80, bottom: 80, left: 80, right: 80 },
      scannerEffect = "none",
      shadowEffect = "none",
      exportFormat = "pdf",
      pageCount = 1,
      settings = {},
    } = body;

    const finalContent = content || text || "";
    const finalFont = font || fontFamily || "Cursive_real";
    const finalInk = ink || inkColor || "#002060";
    const finalPaper = paper || paperTemplate || "classic2";

    const words = finalContent.trim().split(/\s+/).filter(Boolean).length;
    const chars = finalContent.length;
    const preview = finalContent.slice(0, 180);
    const estimatedPages = Math.max(1, Math.ceil(words / 180));

    const encodedText = encodeURIComponent(finalContent);
    const studioUrl = `https://writify-ai.vercel.app/editor?text=${encodedText}&font=${encodeURIComponent(finalFont)}&ink=${encodeURIComponent(finalInk)}&paper=${encodeURIComponent(finalPaper)}&size=${encodeURIComponent(String(fontSize))}`;

    let assignmentRecord = null;
    try {
      assignmentRecord = await prisma.assignment.create({
        data: {
          userId,
          title,
          fileName,
          content: finalContent,
          contentPreview: preview,
          pageCount: pageCount || estimatedPages,
          wordCount: words,
          charCount: chars,
          fontFamily: finalFont,
          fontSize: Number(fontSize),
          lineHeight: Number(lineHeight),
          letterSpacing: Number(letterSpacing),
          wordSpacing: Number(wordSpacing),
          inkColor: finalInk,
          paperTemplate: finalPaper,
          margins: JSON.stringify(margins),
          scannerEffect,
          shadowEffect,
          exportFormat,
          settings: JSON.stringify(settings),
        },
      });
    } catch (dbErr) {
      // Continue even if DB write is unavailable in serverless edge mode
      console.warn("DB save skipped or offline:", dbErr);
    }

    return NextResponse.json(
      {
        success: true,
        documentId: assignmentRecord?.id || `doc_${Date.now()}`,
        studioUrl,
        format: exportFormat,
        wordCount: words,
        charCount: chars,
        estimatedPages,
        assignment: assignmentRecord,
      },
      { headers: CORS_HEADERS }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: CORS_HEADERS });
  }
}
