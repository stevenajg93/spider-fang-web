import { DEMO } from "@/lib/config"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp: number
}

export interface ChatContext {
  name?: string
  email?: string
  company?: string
  mode: "quick" | "scope"
}

const DEMO_RESPONSES = [
  "Demo mode — imagine me giving smart answers about web development, pricing, and project scoping. Try 'Book Consultation' or 'Compare Packages' for the full experience!",
  "In demo mode, I'd normally provide detailed insights about your project requirements, timeline estimates, and technology recommendations. The booking system and package comparison are fully functional!",
  "This is a demo response! In production, I'd analyze your specific needs and provide tailored advice about web development strategies, budget planning, and next steps.",
  "Demo mode active — I'd typically offer personalized recommendations based on your industry, goals, and technical requirements. Feel free to explore the booking and pricing features!",
]

export async function chat(messages: ChatMessage[], context: ChatContext): Promise<string> {
  if (DEMO) {
    // Demo mode - return canned responses
    await new Promise((resolve) => setTimeout(resolve, 1200)) // Simulate thinking time

    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || ""

    if (
      lastMessage.includes("price") ||
      lastMessage.includes("cost") ||
      lastMessage.includes("budget")
    ) {
      return "Demo mode — Our packages start from £500 for Strike (landing pages) up to £2500+ for Web (full applications). Each includes strategy, design, development, and launch support. Try 'Compare Packages' to see the full breakdown!"
    }

    if (
      lastMessage.includes("timeline") ||
      lastMessage.includes("how long") ||
      lastMessage.includes("when")
    ) {
      return "Demo mode — Typical timelines: Strike (1-2 weeks), Venom (2-4 weeks), Web (4-8 weeks). We work in focused sprints with regular check-ins. Book a consultation to discuss your specific timeline needs!"
    }

    if (
      lastMessage.includes("book") ||
      lastMessage.includes("consultation") ||
      lastMessage.includes("meeting")
    ) {
      return "Demo mode — I'd love to discuss your project! Click 'Book Consultation' below to schedule a free 30-minute strategy session. We'll cover your goals, timeline, and how we can help you succeed."
    }

    // Return random demo response
    return DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)]
  }

  // Production mode would integrate with OpenAI or other AI service
  throw new Error("AI integration not configured. Set OPENAI_API_KEY to enable.")
}
