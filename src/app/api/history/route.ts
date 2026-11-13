import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || undefined;
  const category = searchParams.get("category") || "all";
  const format = searchParams.get("format") || "all";
  const query = (searchParams.get("q") || "").toLowerCase().trim();

  try {
    const [assignments, letters, scrollLetters, canvasDesigns] = await Promise.all([
      category === "all" || category === "assignments"
        ? prisma.assignment.findMany({
            where: {
              ...(userId ? { userId } : {}),
              ...(format !== "all" ? { exportFormat: format } : {}),
            },
            orderBy: { createdAt: "desc" },
          })
        : [],
      category === "all" || category === "letters"
        ? prisma.letter.findMany({
            where: {
              ...(userId ? { userId } : {}),
              ...(format !== "all" ? { exportFormat: format } : {}),
            },
            orderBy: { createdAt: "desc" },
          })
        : [],
      category === "all" || category === "scrollLetters"
        ? prisma.scrollLetter.findMany({
            where: {
              ...(userId ? { userId } : {}),
              ...(format !== "all" ? { exportFormat: format } : {}),
            },
            orderBy: { createdAt: "desc" },
          })
        : [],
      category === "all" || category === "canvasDesigns"
        ? prisma.canvasDesign.findMany({
            where: {
              ...(userId ? { userId } : {}),
              ...(format !== "all" ? { exportFormat: format } : {}),
            },
            orderBy: { createdAt: "desc" },
          })
        : [],
    ]);

    // Map into normalized history item shape
    const normalized = [
      ...assignments.map((a) => ({
        id: a.id,
        type: "assignment",
        title: a.title,
        fileName: a.fileName,
        preview: a.contentPreview || a.content.slice(0, 140),
        format: a.exportFormat,
        pageCount: a.pageCount,
        fontFamily: a.fontFamily,
        inkColor: a.inkColor,
        paperTemplate: a.paperTemplate,
        createdAt: a.createdAt,
        raw: a,
      })),
      ...letters.map((l) => ({
        id: l.id,
        type: "letter",
        title: l.title,
        fileName: l.fileName,
        preview: `${l.salutation} ${l.body.slice(0, 100)}...`,
        format: l.exportFormat,
        pageCount: 1,
        fontFamily: l.fontFamily,
        inkColor: l.inkColor,
        stationery: l.stationery,
        createdAt: l.createdAt,
        raw: l,
      })),
      ...scrollLetters.map((s) => ({
        id: s.id,
        type: "scrollLetter",
        title: s.title,
        fileName: s.fileName,
        preview: s.body.slice(0, 120),
        format: s.exportFormat,
        pageCount: 1,
        fontFamily: s.fontFamily,
        inkColor: s.inkColor,
        createdAt: s.createdAt,
        raw: s,
      })),
      ...canvasDesigns.map((c) => ({
        id: c.id,
        type: "canvasDesign",
        title: c.title,
        fileName: c.fileName,
        preview: "Canvas Layout & Graphic Elements",
        format: c.exportFormat,
        pageCount: 1,
        createdAt: c.createdAt,
        raw: c,
      })),
    ];

    // Filter by search query if present
    const filtered = query
      ? normalized.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.fileName.toLowerCase().includes(query) ||
            item.preview.toLowerCase().includes(query)
        )
      : normalized;

    // Sort descending by date
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      total: filtered.length,
      items: filtered,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

