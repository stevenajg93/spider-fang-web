import { NextResponse } from "next/server";

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

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const now = new Date();
    const start = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
    const end = new Date(start.getTime() + 30 * 60 * 1000); // +30 min

    const event = {
      summary: "Spider Fang Test Event",
      description: "Testing Google Calendar + Meet integration",
      start: { dateTime: start.toISOString(), timeZone: "Europe/London" },
      end: { dateTime: end.toISOString(), timeZone: "Europe/London" },
      attendees: [{ email: "lead@example.com" }],
      conferenceData: { createRequest: { requestId: `spiderfang-${Date.now()}` } }
    };

    const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Calendar create failed");

    return NextResponse.json({
      ok: true,
      eventId: data.id,
      htmlLink: data.htmlLink,
      meetLink: data.hangoutLink || data.conferenceData?.entryPoints?.find((e: any) => e.entryPointType === "video")?.uri
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || "Error" }, { status: 500 });
  }
}
