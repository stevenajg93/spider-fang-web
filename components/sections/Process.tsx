"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

const steps = [
  {
    title: "Submit your vision",
    text: "Tell us about your business, your audience, and the look you want. Attach any files or screenshots.",
  },
  {
    title: "We design your homepage",
    text: "Within 48 hours you receive a custom homepage worth £500 - completely free, no obligation.",
  },
  {
    title: "Launch if you love it",
    text: "If you’re happy with the free design we build the full site from £500. If not, you still keep the design.",
  },
]

export default function Process() {
  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">How it works</h2>
          <p className="mt-3 text-muted-foreground md:text-lg">
            Three simple steps. Zero risk. Keep the £500 design regardless.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center">
                <CheckCircle className="h-10 w-10 text-primary" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
