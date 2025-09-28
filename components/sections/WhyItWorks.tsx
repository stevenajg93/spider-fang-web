"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const items = [
  {
    title: "Design That Converts",
    body: "Great design builds trust. Trust plus clarity turns visits into sales.",
  },
  { title: "Own Your Brand", body: "A sharp website becomes your best salesperson, 24/7." },
  {
    title: "Proven ROI",
    body: "Studies show businesses investing in modern websites see up to 200%+ higher returns.",
  },
  {
    title: "Elite Leadership",
    body: "Industry veterans in blockchain, XR, and AI, with top-level big tech experience.",
  },
  {
    title: "Global Talent",
    body: "The best raw talent from across the globe, with a point to prove, guided by experts.",
  },
  {
    title: "Perfect Formula",
    body: "Leadership plus global drive = affordable, world-class results you can trust.",
  },
]

export default function WhyItWorks() {
  return (
    <section
      id="why-it-works"
      className="sf-grid sf-noise relative scroll-mt-24 bg-transparent md:scroll-mt-28"
    >
      <div aria-hidden className="sf-radial absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[clamp(1.5rem,4.6vw,2.5rem)] font-bold tracking-tight">
            Why It Works
          </h2>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            A modern, fast, focused website raises trust and conversions. And Spider Fang makes it
            possible at a level no one else can.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border border-white/10 bg-card/70 backdrop-blur-md">
                <CardContent className="p-5 text-center sm:p-6">
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
