import { DEMO } from "@/lib/config"

export interface ConsultationEvent {
  eventId: string
  meetLink: string
  htmlLink: string
}

export interface TimeSlot {
  start: string // ISO string
  end: string // ISO string
}

export interface ConsultationRequest {
  name: string
  email: string
  start: string // ISO string
  end: string // ISO string
  timezone: string
  notes?: string
  company?: string
}

export async function createConsultationEvent(request: ConsultationRequest): Promise<ConsultationEvent> {
  if (DEMO) {
    // Demo mode - return mock data
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
    return {
      eventId: "demo_evt_123",
      meetLink: "https://meet.google.com/demo-demo",
      htmlLink: "/services/success?demo=meet",
    }
  }

  // Production mode would integrate with Google Calendar API
  throw new Error("Calendar integration not configured. Set GOOGLE_REFRESH_TOKEN to enable.")
}

export async function getAvailableSlots(date: string): Promise<TimeSlot[]> {
  if (DEMO) {
    // Demo mode - return mock available slots
    await new Promise((resolve) => setTimeout(resolve, 500))
    const baseDate = new Date(date)
    return [
      {
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 9, 0).toISOString(),
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 10, 0).toISOString(),
      },
      {
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 14, 0).toISOString(),
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 15, 0).toISOString(),
      },
      {
        start: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 16, 0).toISOString(),
        end: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 17, 0).toISOString(),
      },
    ]
  }

  // Production mode would check Google Calendar availability
  throw new Error("Calendar integration not configured. Set GOOGLE_REFRESH_TOKEN to enable.")
}
