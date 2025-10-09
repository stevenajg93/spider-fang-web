"use client"

import Link from "next/link"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

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

export default function Packages() {
  return (
    <section id="packages" className="sf-grid sf-noise relative border-t bg-transparent">
      <div aria-hidden className="sf-radial absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-foreground text-[clamp(1.6rem,4.6vw,2.6rem)] font-bold tracking-tight">
            Our Packages
          </h2>
          <p className="text-muted-foreground mt-3">
            Choose a starting point or scale to a full solution.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="border-border/60 bg-card/70 group flex h-full flex-col justify-between rounded-2xl border p-6 backdrop-blur-sm">
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="text-foreground text-lg font-semibold">{p.name}</h3>
                    {p.limited && (
                      <span className="rounded-full border border-red-500/40 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-600">
                        Limited Offer
                      </span>
                    )}
                  </div>

                  {/* Pricing block: visible in light & dark */}
                  <div className="mt-4">
                    {p.oldPrice ? (
                      <div className="flex items-baseline gap-3">
                        <span className="text-[clamp(1.6rem,4.5vw,2.25rem)] font-extrabold leading-none text-gray-900 line-through decoration-red-500/70 decoration-2 dark:text-white">
                          {p.oldPrice}
                        </span>
                        <span className="text-[clamp(1.2rem,4vw,1.6rem)] font-bold leading-none text-emerald-600">
                          {p.newPrice}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-3">
                        <span className="text-[clamp(1.6rem,4.5vw,2.25rem)] font-extrabold leading-none text-gray-900 dark:text-white">
                          {p.newPrice}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground mt-4 text-sm">{p.blurb}</p>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/purchase/${p.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-lg border border-emerald-600 bg-emerald-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 md:py-3"
                  >
                    Select
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
