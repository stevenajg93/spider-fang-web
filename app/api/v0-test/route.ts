import { NextResponse } from "next/server";

export async function GET() {
  try {
    const keyPresent = !!process.env.V0_API_KEY;
    const { createClient } = await import("v0-sdk");
    const v0 = createClient({ apiKey: process.env.V0_API_KEY! });

    const chat: any = await v0.chats.create({
      message: "Generate a minimal landing page with hero + CTA.",
      metadata: { source: "diagnostic-route" },
    });

    const demo =
      chat?.demo || chat?.links?.demo || chat?.previewUrl || chat?.preview_url;

    return NextResponse.json({
      ok: true,
      keyPresent,
      demo: demo ?? null,
      keys: Object.keys(chat || {}),
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 },
    );
  }
}
