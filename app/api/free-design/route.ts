import { NextRequest, NextResponse } from "next/server"

import { Resend } from "resend"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()

    const name = String(form.get("name") ?? "").trim()
    const email = String(form.get("email") ?? "").trim()
    const website = String(form.get("website") ?? "").trim()
    const vision = String(form.get("vision") ?? "").trim()
    const files = form.getAll("files").filter((f): f is File => f instanceof File)

    if (!name || !email || !vision) {
      return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 })
    }

    // Prepare optional attachments (best-effort; big files are skipped)
    const MAX_ATTACH = 10
    const MAX_MB = 5 // keep small to avoid email provider limits
    const attachments: { filename: string; content: Buffer }[] = []

    for (const f of files.slice(0, MAX_ATTACH)) {
      if (f.size > MAX_MB * 1024 * 1024) continue // skip large
      const buf = Buffer.from(await f.arrayBuffer())
      attachments.push({ filename: f.name || "file", content: buf })
    }

    // Send email via Resend (to you + optional user CC)
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const FROM_EMAIL = process.env.FROM_EMAIL // e.g. onboarding@resend.dev (or your domain)
    const OWNER_EMAIL = process.env.OWNER_EMAIL // s.gillespie@gecslabs.com

    if (!RESEND_API_KEY || !FROM_EMAIL || !OWNER_EMAIL) {
      return NextResponse.json(
        { ok: false, error: "Email service not configured." },
        { status: 500 },
      )
    }

    const resend = new Resend(RESEND_API_KEY)

    const subject = `New Free £500 Prototype Request — ${name}`
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      website ? `Website: ${website}` : `Website: (none)`,
      "",
      "Vision:",
      vision,
    ].join("\n")

    const html = `
      <h2>New Free £500 Prototype Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Website:</strong> ${escapeHtml(website || "(none)")}</p>
      <p><strong>Vision:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(vision)}</pre>
      <p style="opacity:.7">Attachments: ${attachments.length}</p>
    `

    await resend.emails.send({
      from: FROM_EMAIL,
      to: [OWNER_EMAIL],
      cc: email ? [email] : undefined, // optional courtesy copy to the lead
      subject,
      text,
      html,
      attachments: attachments.length
        ? attachments.map((a) => ({ filename: a.filename, content: a.content }))
        : undefined,
    })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error("free-design error:", err)
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 })
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}
