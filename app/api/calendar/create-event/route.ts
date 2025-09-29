import { NextResponse } from "next/server";
import { Resend } from "resend";

async function getAccessToken() {
  const body = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
    grant_type: "refresh_token"
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to refresh access token");
  return data.access_token as string;
}

function formatICS({ uid, start, end, summary, description, location, meetLink }: {
  uid: string; start: Date; end: Date; summary: string; description: string; location?: string; meetLink?: string;
}) {
  const toUTC = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
  };
  const dtstamp = toUTC(new Date());
  const dtstart = toUTC(start);
  const dtend = toUTC(end);
  const safe = (s?: string) => (s || "").replace(/\r?\n/g, "\\n");
  const desc = safe([description, meetLink ? `Join: ${meetLink}` : ""].filter(Boolean).join("\n"));

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Spider Fang//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${safe(summary)}`,
    location ? `LOCATION:${safe(location)}` : "",
    `DESCRIPTION:${desc}`,
    meetLink ? `URL:${meetLink}` : "",
    "END:VEVENT",
    "END:VCALENDAR"
  ].filter(Boolean).join("\r\n");
}

export async function POST(request: Request) {
  try {
    const { name, email, website, vision, startISO } = await request.json();
    if (!name || !email || !startISO) throw new Error("Missing required fields");

    const accessToken = await getAccessToken();
    const start = new Date(startISO);
    const end = new Date(start.getTime() + 30 * 60 * 1000);

    const summary = "Kickoff: Free £500 Web Prototype";
    const description = [
      `Lead: ${name} <${email}>`,
      website ? `Website: ${website}` : null,
      "",
      "Vision / Notes:",
      vision || "(none provided)"
    ].filter(Boolean).join("\n");

    const eventBody = {
      summary,
      description,
      start: { dateTime: start.toISOString(), timeZone: "Europe/London" },
      end: { dateTime: end.toISOString(), timeZone: "Europe/London" },
      attendees: [{ email }],
      conferenceData: { createRequest: { requestId: `spiderfang-${Date.now()}` } }
    };

    const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(eventBody)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Calendar create failed");

    const meetLink = data.hangoutLink || data.conferenceData?.entryPoints?.find((e: any) => e.entryPointType === "video")?.uri || "";

    // Send confirmation email
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const from = process.env.FROM_EMAIL!;
    const owner = process.env.OWNER_EMAIL!;

    const whenUK = start.toLocaleString("en-GB", {
      weekday: "short", day: "2-digit", month: "short",
      hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/London"
    });

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 8px 0">You're booked ✅</h2>
        <p style="margin:0 0 12px 0"><strong>${summary}</strong></p>
        <p style="margin:0 0 8px 0">When: <strong>${whenUK} (UK time)</strong></p>
        ${website ? `<p style="margin:0 0 8px 0">Website: ${website}</p>` : ""}
        <p style="margin:0 0 12px 0">Vision/Notes:<br/>${(vision || "").replace(/\n/g,"<br/>")}</p>
        ${meetLink ? `<p style="margin:0 0 12px 0"><a href="${meetLink}">Join Google Meet</a></p>` : ""}
        <p style="margin:16px 0 0 0">This meeting was auto-scheduled by Spider Fang.</p>
      </div>
    `;

    const uid = `spiderfang-${data.id}-${Date.now()}`;
    const ics = formatICS({ uid, start, end, summary, description, location: website, meetLink });

    await resend.emails.send({
      from,
      to: [String(email)],
      bcc: owner ? [owner] : undefined,
      subject: `Booked: ${summary} — ${whenUK}`,
      html,
      attachments: [
        { filename: "invite.ics", content: ics }
      ]
    });

    return NextResponse.json({
      ok: true,
      eventId: data.id,
      htmlLink: data.htmlLink,
      meetLink
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || "Error" }, { status: 500 });
  }
}
