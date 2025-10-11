import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email")?.toLowerCase();

  try {
    if (email) {
      const del = await prisma.demoRequest.deleteMany({
        where: { email, previewUrl: { startsWith: "mock:" } },
      });
      return NextResponse.json({ ok: true, deleted: del.count, scopedTo: email });
    }
    const del = await prisma.demoRequest.deleteMany({
      where: { previewUrl: { startsWith: "mock:" } },
    });
    return NextResponse.json({ ok: true, deleted: del.count });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "cleanup failed" }, { status: 500 });
  }
}
