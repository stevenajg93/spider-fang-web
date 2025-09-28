"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const PACKAGE_COPY: Record<string, { title: string; price: string; points: string[] }> = {
  "landing-page": {
    title: "Landing Page",
    price: "£500",
    points: [
      "One focused page designed to convert",
      "Speed-optimised, mobile-first",
      "Built with Next.js + Tailwind on Vercel",
    ],
  },
  "3-pages": {
    title: "3 Pages",
    price: "£1110",
    points: [
      "Homepage + two essentials (e.g. About + Services)",
      "Clear structure and CTAs",
      "SEO-friendly, mobile-first",
    ],
  },
  "5-pages": {
    title: "5 Pages",
    price: "£1440",
    points: [
      "Full small business site",
      "Navigation + sections that sell",
      "Fast, secure, easy to update",
    ],
  },
  "custom": {
    title: "Custom Applications",
    price: "Bespoke",
    points: [
      "App Store / Play Store apps",
      "Web3 integrations or AI enterprise solutions",
      "Scoping session required",
    ],
  },
}

export default function PurchasePage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug
  const data = slug ? PACKAGE_COPY[slug] : undefined

  if (!data) {
    return (
      <main className="min-h-[60vh] place-content-center px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">Package not found</h1>
        <p className="mt-2 text-muted-foreground">Please choose a package again.</p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/#packages">Back to Packages</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[70vh] px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-muted-foreground">
            Step 2 of 2 — Confirm your selection (demo, no payment yet)
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
            {data.title} — {data.price}
          </h1>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {data.points.map((pt) => (
              <li key={pt} className="flex gap-2">
                <span>•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href={`/thank-you?via=purchase&pkg=${encodeURIComponent(data.title)}`}>
                Confirm & Continue
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#packages">Back to Packages</Link>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Demo mode: no checkout is connected. You&apos;ll be taken to a confirmation screen.
          </p>
        </motion.div>
      </div>
    </main>
  )
}
