import { type NextRequest, NextResponse } from "next/server"
import { createConsultationEvent } from "@/lib/adapters/calendar-adapter"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, company, phone, budget, timeline, services, goals, preferredDate, preferredTime } = body

    // Validate required fields
    if (!name || !email || !budget || !timeline || !services?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // If a specific time slot is requested, create calendar event
    let calendarResult = null
    if (preferredDate && preferredTime) {
      const startDateTime = new Date(`${preferredDate}T${preferredTime}:00`)
      const endDateTime = new Date(startDateTime.getTime() + 30 * 60000) // 30 minutes

      calendarResult = await createConsultationEvent({
        name,
        email,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        timezone: "Europe/London",
        notes: `Budget: ${budget}, Timeline: ${timeline}, Services: ${services.join(", ")}, Goals: ${goals || "Not specified"}`,
        company,
      })
    }

    // In production, save to database
    // For now, we'll just return success

    return NextResponse.json({
      success: true,
      message: calendarResult ? "Consultation booked successfully" : "Consultation request received",
      calendarResult,
    })
  } catch (error) {
    console.error("Consultation API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
