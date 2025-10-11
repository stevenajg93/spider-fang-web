import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { checkEmail, checkIp } from "@/lib/ratelimit";
import { validatePrompt } from "@/lib/guardrails";
import { createV0Preview } from "@/lib/v0";
import { instantDemoEmail } from "@/app/emails/instant-demo";
import { randomBytes } from "crypto";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  company: z.string().optional(),
  prompt: z.string().min(10).max(2000),
});

function getClientIp(req: NextRequest): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  const xri = req.headers.get("x-real-ip");
  if (xri) return xri.trim();
  // @ts-ignore
  return (req as any).ip || "unknown";
}

function genPid(): string {
  return randomBytes(12).toString("hex"); // 24-char hex
}

async function maybeSendEmail(to: string, previewUrl: string, name?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;
  if (!apiKey || !from) return;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const tpl = instantDemoEmail({ name, previewUrl });
    await resend.emails.send({
      from,
      to,
      subject: tpl.subject,
      html: tpl.html,
      text: tpl.text,
    });
  } catch {
    console.warn("[resend] email send failed");
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const ipCheck = checkIp(ip);
    if (!ipCheck.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }

    const json = await req.json().catch(() => ({}));
    const parse = schema.safeParse(json);
    if (!parse.success) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }

    const { name, email, company, prompt } = parse.data;

    const emailCheck = checkEmail(email);
    if (!emailCheck.ok) {
      return NextResponse.json(
        { ok: false, error: "Too many requests for this email. Please try later." },
        { status: 429 }
      );
    }

    const guard = validatePrompt(prompt);
    if (!guard.ok) {
      return NextResponse.json({ ok: false, error: guard.reason }, { status: 400 });
    }

    const existing = await prisma.demoRequest.findUnique({
      where: { email: email.toLowerCase() },
      select: { pid: true },
    });

    if (existing?.pid) {
      const base = process.env.NEXT_PUBLIC_BASE_URL || "";
      const wl = `${base}/api/preview?pid=${existing.pid}`;
      const fallback = `/api/preview?pid=${existing.pid}`;
      return NextResponse.json({
        ok: true,
        previewUrl: base ? wl : fallback,
        alreadyGenerated: true,
      });
    }

    let v0Url: string | undefined = undefined;
    try {
      const result = await createV0Preview({ prompt, name, email, company });
      v0Url = result.previewUrl;
    } catch {
      return NextResponse.json(
        { ok: false, error: "Failed to generate preview. Please try again later." },
        { status: 502 }
      );
    }

    if (!v0Url) {
      return NextResponse.json(
        { ok: false, error: "Preview not available yet. Please try again shortly." },
        { status: 502 }
      );
    }

    const pid = genPid();
    await prisma.demoRequest.create({
      data: {
        email: email.toLowerCase(),
        name,
        company,
        prompt,
        pid,
        previewUrl: v0Url,
      },
    });

    const base = process.env.NEXT_PUBLIC_BASE_URL || "";
    const wl = base ? `${base}/api/preview?pid=${pid}` : `/api/preview?pid=${pid}`;

    await maybeSendEmail(email, wl, name);

    return NextResponse.json({ ok: true, previewUrl: wl });
  } catch (e) {
    console.error("generate error:", e);
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}
