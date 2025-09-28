"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const items = [
  { title: "Looks sell", body: "Good design builds trust. Trust converts visits into sales and inquiries." },
  { title: "Clarity converts", body: "Clear messaging and fast loading reduce friction and raise conversion rates." },
  { title: "Own your brand", body: "A sharp website becomes your best salesperson, 24/7." },
]

export default function WhyItWorks() {
  return (
    <section id="why-it-works" className="relative scroll-mt-24 md:scroll-mt-28 border-t bg-background">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(800px_400px_at_20%_-10%,hsl(var(--primary)/.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[clamp(1.5rem,4.6vw,2.5rem)] font-bold tracking-tight">Why It Works</h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            A modern, fast, focused website raises trust and conversions.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border border-white/10 bg-card/70 backdrop-blur-md">
                <CardContent className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold">{it.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
