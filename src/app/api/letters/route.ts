import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || undefined;

  try {
    const letters = await prisma.letter.findMany({
      where: userId ? { userId } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, items: letters });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId = "usr_handify_pro_demo",
      title = "Heartfelt Letter",
      fileName = "handwritten-letter.pdf",
      category = "Love & Romance",
      templateId,
      salutation = "Dearest,",
      dateText = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      body: letterBody = "",
      closing = "With all my heart,\nAlways yours",
      fontFamily = "darlington",
      inkColor = "#1e3a8a",
      stationery = "stationery_rose",
      stamp = "stamp-royal-rose",
      exportFormat = "pdf",
    } = body;

    const letter = await prisma.letter.create({
      data: {
        userId,
        title,
        fileName,
        category,
        templateId,
        salutation,
        dateText,
        body: letterBody,
        closing,
        fontFamily,
        inkColor,
        stationery,
        stamp,
        exportFormat,
      },
    });

    return NextResponse.json({
      success: true,
      documentId: letter.id,
      path: `letters/${exportFormat}/items`,
      letter,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

