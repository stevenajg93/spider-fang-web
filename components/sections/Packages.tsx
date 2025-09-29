"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"

type Pkg = {
  slug: string
  name: string
  oldPrice?: string
  newPrice: string
  blurb: string
  limited?: boolean
}

const packages: Pkg[] = [
  {
    slug: "landing-page",
    name: "Landing Page",
    oldPrice: "£500",
    newPrice: "FREE",
    blurb:
      "We’ll design a homepage you can keep, no strings attached. Normally £500, yours free — perfect to test our style and value before you commit.",
    limited: true,
  },
  {
    slug: "three-page",
    name: "3 Page Website",
    oldPrice: "£1000",
    newPrice: "£800",
    blurb:
      "A professional three page website ideal for businesses ready to showcase who they are and connect with customers.",
    limited: true,
  },
  {
    slug: "five-page",
    name: "5 Page Website",
    oldPrice: "£1500",
    newPrice: "£990",
    blurb:
      "A complete showcase to look professional and attract clients. Includes free SSL and hosting setup, SEO-ready structure, and ongoing support.",
    limited: true,
  },
  {
    slug: "custom-apps",
    name: "Custom / Apps",
    newPrice: "Ask",
    blurb:
      "Enterprise builds, Web3, AI, or mobile apps. We’ll scope a proposal after your free homepage design and roadmap call.",
    limited: false,
  },
]

function Price({ oldPrice, newPrice }: { oldPrice?: string; newPrice: string }) {
  // Landing page shows FREE (positive, green)
  if (newPrice === "FREE") {
    return (
      <div className="flex items-baseline gap-3">
        <span className="relative text-3xl md:text-4xl font-bold text-white/90">
          {oldPrice}
          <span
            aria-hidden
            className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rotate-[-5deg] bg-red-400/80"
          />
        </span>
        <span className="text-2xl md:text-3xl font-extrabold text-green-500">FREE</span>
      </div>
    )
  }

  if (!oldPrice) {
    return <span className="text-2xl md:text-3xl font-bold text-foreground">{newPrice}</span>
  }

  return (
    <div className="flex items-baseline gap-3" aria-label={`Price reduced from ${oldPrice} to ${newPrice}`}>
      {/* Old price: larger, white, with subtle red score */}
      <span className="relative text-3xl md:text-4xl font-bold text-white">
        {oldPrice}
        <span
          aria-hidden
          className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rotate-[-5deg] bg-red-400/80"
        />
      </span>
      {/* New price: slightly smaller, positive green */}
      <span className="text-2xl md:text-3xl font-extrabold text-green-500">{newPrice}</span>
    </div>
  )
}

export default function Packages() {
  return (
    <section id="packages" className="py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-[clamp(1.5rem,4.6vw,2.5rem)] font-bold tracking-tight">Our Packages</h2>
          <p className="mt-3 text-muted-foreground">
            Start with a free £500 homepage design, then choose the package that fits your next step.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 * i }}
            >
              <Card className="h-full overflow-hidden border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                    {p.limited && (
                      <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-1 text-[11px] font-semibold text-red-600 ring-1 ring-inset ring-red-500/20">
                        Limited Offer
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <Price oldPrice={p.oldPrice} newPrice={p.newPrice} />
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>

                  {/* spacer to push the button to the bottom for perfect alignment across cards */}
                  <div className="mt-6 flex-1" />

                  <motion.div
                    className="pt-2"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                  >
                    <Link
                      href={`/purchase/${p.slug}`}
                      className="inline-flex w-full items-center justify-center rounded-md bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/60"
                    >
                      Select
                    </Link>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
