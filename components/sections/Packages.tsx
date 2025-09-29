"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Card } from "@/components/ui/card"

type Pkg = {
  slug: string
  name: string
  price: string
  blurb: string
}

const packages: Pkg[] = [
  {
    slug: "landing-page",
    name: "Landing Page",
    price: "£450",
    blurb:
      "A focused single page designed to make an impact fast. Perfect for startups, events, or campaigns that need a clear online presence right away.",
  },
  {
    slug: "three-page",
    name: "3 Page Website",
    price: "£800",
    blurb:
      "A professional three page website ideal for businesses ready to showcase who they are and connect with customers.",
  },
  {
    slug: "five-page",
    name: "5 Page Website",
    price: "£1000",
    blurb:
      "A complete showcase to look professional and attract clients. Includes free SSL and hosting setup, SEO-ready structure, and ongoing support.",
  },
]

export default function Packages() {
  return (
    <section id="packages" className="py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-[clamp(1.5rem,4.6vw,2.5rem)] font-bold tracking-tight">
            Our Packages
          </h2>
          <p className="mt-3 text-muted-foreground">
            Choose a starting point now—your free £500 homepage design helps you decide with confidence.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                  <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                  <div className="mt-2 text-3xl font-bold">{p.price}</div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.blurb}</p>

                  <div className="mt-6 pt-4">
                    <motion.div
                      className="inline-block"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    >
                      <Link
                        href={`/purchase/${p.slug}`}
                        className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold text-white bg-green-600 shadow hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/60"
                      >
                        Select
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
