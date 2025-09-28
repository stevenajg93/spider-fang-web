"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"


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
    <section
      id="packages"
      className="sf-grid sf-noise relative scroll-mt-24 bg-transparent md:scroll-mt-28"
    >
      <div aria-hidden className="sf-radial absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[clamp(1.5rem,4.6vw,2.5rem)] font-bold tracking-tight">
            Our Packages
          </h2>
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
              transition={{ delay: 0.08 * i, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border border-white/10 bg-card/70 backdrop-blur-md">
                <CardContent className="flex h-full flex-col items-center p-5 text-center sm:p-6">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-2xl font-bold text-emerald-500">{p.price}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-auto flex w-full justify-center">
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: i * 0.12,
                      }}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        asChild
                        className="mt-4 w-full border border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
                      >
                        <Link href={`/purchase/${p.slug}`}>Select</Link>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
