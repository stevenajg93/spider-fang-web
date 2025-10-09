import { NextResponse } from "next/server"

async function getAccessToken() {
  const body = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
    grant_type: "refresh_token",
  })

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Failed to refresh access token")
  return data.access_token as string
}

function iso(date: Date) {
  return date.toISOString()
}

export async function GET() {
  try {
    const accessToken = await getAccessToken()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const days: Array<{ date: string; slots: unknown[] }> = []

    for (let i = 0; i < 7; i++) {
      const d = new Date(today.getTime() + i * 24 * 60 * 60 * 1000)

      // window: 11:00 → 22:00 UK
      const startLocal = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 11, 0, 0, 0)
      const endLocal = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 22, 0, 0, 0)

      const fbRes = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          timeMin: iso(startLocal),
          timeMax: iso(endLocal),
          items: [{ id: "primary" }],
        }),
      })

      const fb = await fbRes.json()
      if (!fbRes.ok) throw new Error(fb.error?.message || "freeBusy failed")

      const busy: Array<{ start: string; end: string }> = fb.calendars?.primary?.busy || []
      const busyRanges = busy.map((b) => ({ start: new Date(b.start), end: new Date(b.end) }))

      const slots: Array<{ startISO: string; endISO: string; label: string }> = []
      let cur = new Date(startLocal)

      while (cur < endLocal) {
        const next = new Date(cur.getTime() + 30 * 60 * 1000)
        const overlaps = busyRanges.some((b) => b.start < next && b.end > cur)
        if (!overlaps) {
          const label = cur.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: "Europe/London",
          })
          slots.push({ startISO: iso(cur), endISO: iso(next), label })
        }
        cur = next
      }

      const yyyy = d.getFullYear()
      const mm = String(d.getMonth() + 1).padStart(2, "0")
      const dd = String(d.getDate()).padStart(2, "0")

      days.push({ date: `${yyyy}-${mm}-${dd}`, slots })
    }

    return NextResponse.json({ ok: true, days })
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: e.message || "Error" }, { status: 500 })
  }
}
