"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const packages = [
  {
    slug: "landing-page",
    title: "Landing Page",
    price: "£500",
    desc: "A high-impact, single-page site designed to convert visitors.",
  },
  {
    slug: "three-page",
    title: "3 Page Website",
    price: "£1110",
    desc: "Homepage, About, and Contact — built for clarity and trust.",
  },
  {
    slug: "five-page",
    title: "5 Page Website",
    price: "£1440",
    desc: "Ideal for small businesses who need multiple services shown clearly.",
  },
  {
    slug: "custom",
    title: "Custom / Apps",
    price: "Ask",
    desc: "Enterprise-level builds, Web3, AI solutions, or mobile apps.",
  },
]

export default function Packages() {
  return (
    <section id="packages" className="relative scroll-mt-24 md:scroll-mt-28 border-t bg-background">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_-10%,hsl(var(--primary)/.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[clamp(1.5rem,4.6vw,2.5rem)] font-bold tracking-tight">Packages</h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Choose a starting point or scale to a full solution.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border border-white/10 bg-card/70 backdrop-blur-md">
                <CardContent className="p-5 sm:p-6 flex flex-col items-center text-center">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-xl font-bold text-[hsl(var(--primary))]">{p.price}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <Button asChild className="mt-4 w-full sm:w-auto">
                    <Link href={`/purchase/${p.slug}`}>Select</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
