type GtagFn = (command: "event", eventName: string, params?: Record<string, unknown>) => void

declare global {
  interface Window {
    gtag?: GtagFn
  }
}

/** Safe GA4 event fire (no crashes if gtag is missing) */
export function gaSafe(event: string, params: Record<string, unknown> = {}): void {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", event, params)
    }
  } catch {
    /* no-op */
  }
}
