"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function Urgency() {
  const [spots, setSpots] = useState(0)

  useEffect(() => {
    // Demo: always show 0 (fully booked)
    setSpots(0)
  }, [])

  return (
    <section className="sf-grid sf-noise relative scroll-mt-24 border-t bg-transparent md:scroll-mt-28">
      <div aria-hidden className="sf-radial absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[clamp(1.5rem,4.6vw,2.5rem)] font-bold tracking-tight text-red-600">
            This Month’s Free Designs Are Fully Booked
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            We only take on <strong>10 free homepage designs</strong> each month. All spots for this
            month have been filled.
          </p>
          <Card className="mt-8 inline-block w-full border border-red-500/40 bg-card/70 backdrop-blur-md sm:w-auto">
            <CardContent className="p-6">
              <p className="text-xl font-semibold text-muted-foreground">
                Don’t worry, you can still <strong>secure your spot</strong> for next month’s run.
              </p>
              <div className="mt-6">
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                >
                  <Button
                    asChild
                    className="border border-emerald-600 bg-emerald-600 px-8 text-base text-white hover:bg-emerald-700"
                    size="lg"
                  >
                    <Link href="#free-design">Join Next Month’s Waitlist</Link>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
