import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("Free design submission:", data);
    // TODO: send email (Resend/SendGrid/Nodemailer) or save to DB
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Submission error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
