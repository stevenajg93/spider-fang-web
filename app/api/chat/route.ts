import { type NextRequest, NextResponse } from "next/server"
import { chat, type ChatMessage, type ChatContext } from "@/lib/adapters/ai-adapter"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, context }: { messages: ChatMessage[]; context: ChatContext } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 })
    }

    const response = await chat(messages, context || { mode: "quick" })

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
