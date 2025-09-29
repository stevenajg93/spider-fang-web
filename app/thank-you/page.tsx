"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

function ThankYouInner() {
  const params = useSearchParams()
  const name = params.get("name") || "Friend"

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Thanks, {name}! 🎉</h1>
      <p className="text-muted-foreground max-w-xl">
        Your request is in. Check your email for a link to book a quick Google Meet so we can
        kick things off and design your homepage — normally £500, yours free.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow hover:opacity-90"
      >
        Back to Home
      </Link>
    </main>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<main className="min-h-[60vh] flex items-center justify-center">Loading…</main>}>
      <ThankYouInner />
    </Suspense>
  )
}
