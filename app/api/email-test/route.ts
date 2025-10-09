import { NextResponse } from "next/server"

import { Resend } from "resend"

export async function GET() {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!)
    const from = process.env.FROM_EMAIL!
    const to = process.env.OWNER_EMAIL!

    const res = await resend.emails.send({
      from,
      to,
      subject: "Test email from Spider Fang",
      html: "<p>✅ If you see this, Resend is working!</p>",
    })

    return NextResponse.json({ ok: true, id: res.id })
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
