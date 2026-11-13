import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || undefined;
  const limit = Number(searchParams.get("limit")) || 20;

  try {
    const assignments = await prisma.assignment.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return NextResponse.json({ success: true, items: assignments });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId = "usr_handify_pro_demo",
      title = "Handwritten Assignment",
      fileName = "handwritten-assignment.pdf",
      content = "",
      fontFamily = "cursive_real",
      fontSize = 20,
      lineHeight = 1.8,
      letterSpacing = 1,
      wordSpacing = 2,
      inkColor = "#002f6c",
      paperTemplate = "Classic White",
      margins = { top: 80, bottom: 80, left: 80, right: 80 },
      scannerEffect = "none",
      shadowEffect = "none",
      exportFormat = "pdf",
      pageCount = 1,
      settings = {},
    } = body;

    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const chars = content.length;
    const preview = content.slice(0, 180);

    const assignment = await prisma.assignment.create({
      data: {
        userId,
        title,
        fileName,
        content,
        contentPreview: preview,
        pageCount,
        wordCount: words,
        charCount: chars,
        fontFamily,
        fontSize: Number(fontSize),
        lineHeight: Number(lineHeight),
        letterSpacing: Number(letterSpacing),
        wordSpacing: Number(wordSpacing),
        inkColor,
        paperTemplate,
        margins: JSON.stringify(margins),
        scannerEffect,
        shadowEffect,
        exportFormat,
        settings: JSON.stringify(settings),
      },
    });

    return NextResponse.json({
      success: true,
      documentId: assignment.id,
      path: `assignments/${exportFormat}/items`,
      format: exportFormat,
      isUpdated: false,
      assignment,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

