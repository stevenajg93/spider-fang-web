import { type NextRequest, NextResponse } from "next/server"

import { createCheckoutSession } from "@/lib/adapters/payments-adapter"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { priceKey, customer } = body

    if (!priceKey) {
      return NextResponse.json({ error: "Price key is required" }, { status: 400 })
    }

    const result = await createCheckoutSession({
      priceKey,
      customer: customer || {},
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Checkout API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
