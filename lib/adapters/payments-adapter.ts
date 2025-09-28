import { DEMO } from "@/lib/config"

export interface CheckoutSession {
  url: string
}

export interface CheckoutRequest {
  priceKey: string
  customer: {
    name: string
    email: string
    company?: string
  }
}

export async function createCheckoutSession(request: CheckoutRequest): Promise<CheckoutSession> {
  if (DEMO) {
    // Demo mode - return mock checkout URL
    await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate API delay
    return {
      url: "/services/success?demo=stripe",
    }
  }

  // Production mode would integrate with Stripe
  throw new Error("Stripe integration not configured. Set STRIPE_SECRET_KEY to enable.")
}

export async function handleWebhook(
  body: string,
  signature: string,
): Promise<{ success: boolean }> {
  if (DEMO) {
    // Demo mode - always return success
    return { success: true }
  }

  // Production mode would verify Stripe webhook signature and process events
  throw new Error("Stripe integration not configured. Set STRIPE_SECRET_KEY to enable.")
}
