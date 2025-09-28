"use client"

import * as React from "react"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Why is the £500 design free?",
    a: "Because we are confident in our skills. The free homepage lets you see our work before you commit to anything.",
  },
  {
    q: "Do I keep the design if I don’t go ahead?",
    a: "Yes. The design is yours to keep whether you launch with us or not. No obligation.",
  },
  {
    q: "Are there hidden fees or subscriptions?",
    a: "No. If you choose to proceed, full sites start from £500 as a one-time cost. No subscriptions.",
  },
  {
    q: "How long does it take?",
    a: "We usually deliver your free homepage design within 48 hours of your submission.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="border-b py-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="mt-2 text-sm text-muted-foreground">{a}</p>}
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">Straight answers. No fine print.</p>
        </motion.div>

        <div className="mt-10">
          {faqs.map((f) => (
            <FAQItem key={f.q} {...f} />
          ))}
        </div>
      </div>
    </section>
  )
}
