"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useMemo } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useSearchParams } from "next/navigation"

const MEET_LINK = process.env.NEXT_PUBLIC_MEET_LINK || "#"

export default function ThankYouPage() {
  const { toast } = useToast()
  const params = useSearchParams()
  const via = params.get("via") // "purchase" | "free" | null
  const pkg = params.get("pkg")

  const content = useMemo(() => {
    if (via === "purchase") {
      return {
        title: `Thanks — your ${pkg ? pkg : "package"} request is noted`,
        desc:
          "We will reach out shortly to confirm details and set up your build schedule. No payment taken yet — this is demo mode.",
        primaryHref: "/",
        primaryText: "Back to site",
        secondaryHref: MEET_LINK,
        secondaryText: "Book a Call (optional)",
      }
    }
    return {
      title: "Thanks — your free prototype request is in",
      desc:
        "Next step: book your kickoff call so we can understand your vision and start your free £500 homepage prototype.",
      primaryHref: MEET_LINK,
      primaryText: "Book Your Kickoff Call",
      secondaryHref: "/",
      secondaryText: "Back to site",
    }
  }, [via, pkg])

  useEffect(() => {
    toast({
      title: via === "purchase" ? "Package enquiry received" : "Free prototype request received",
      description:
        via === "purchase"
          ? `We will confirm your ${pkg ? pkg : "package"} and next steps by email.`
          : "Please book your kickoff call to begin the free design.",
    })
  }, [toast, via, pkg])

  return (
    <main className="min-h-[70vh] place-content-center px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl"
      >
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
          {content.title}
        </h1>
        <p className="mt-4 text-muted-foreground md:text-lg">{content.desc}</p>

        <div className="mt-8 flex justify-center gap-3">
          <Button asChild size="lg">
            <Link
              href={content.primaryHref}
              target={content.primaryHref.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {content.primaryText}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link
              href={content.secondaryHref}
              target={content.secondaryHref.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {content.secondaryText}
            </Link>
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
