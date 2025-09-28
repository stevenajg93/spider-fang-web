import { describe, it, expect } from "vitest"
import { createConsultationEvent, getAvailableSlots } from "@/lib/adapters/calendar-adapter"
import { createCheckoutSession } from "@/lib/adapters/payments-adapter"
import { chat } from "@/lib/adapters/ai-adapter"

describe("Adapters (Demo Mode)", () => {
  describe("Calendar Adapter", () => {
    it("should create consultation event in demo mode", async () => {
      const result = await createConsultationEvent({
        name: "John Doe",
        email: "john@example.com",
        start: "2025-01-15T10:00:00Z",
        end: "2025-01-15T11:00:00Z",
        timezone: "Europe/London",
        notes: "Test consultation",
        company: "Test Company",
      })

      expect(result).toEqual({
        eventId: "demo_evt_123",
        meetLink: "https://meet.google.com/demo-demo",
        htmlLink: "/services/success?demo=meet",
      })
    })

    it("should return available slots in demo mode", async () => {
      const slots = await getAvailableSlots("2025-01-15")

      expect(slots).toHaveLength(3)
      expect(slots[0]).toHaveProperty("start")
      expect(slots[0]).toHaveProperty("end")
    })
  })

  describe("Payments Adapter", () => {
    it("should create checkout session in demo mode", async () => {
      const result = await createCheckoutSession({
        priceKey: "strike",
        customer: {
          name: "John Doe",
          email: "john@example.com",
          company: "Test Company",
        },
      })

      expect(result).toEqual({
        url: "/services/success?demo=stripe",
      })
    })
  })

  describe("AI Adapter", () => {
    it("should return demo response", async () => {
      const response = await chat([{ role: "user", content: "What are your prices?", timestamp: Date.now() }], {
        mode: "quick",
      })

      expect(typeof response).toBe("string")
      expect(response).toContain("Demo mode")
    })

    it("should handle pricing questions", async () => {
      const response = await chat([{ role: "user", content: "How much does a website cost?", timestamp: Date.now() }], {
        mode: "scope",
      })

      expect(response).toContain("£500")
      expect(response).toContain("packages")
    })
  })
})
