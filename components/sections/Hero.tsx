"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section
      id="free-design"
      className="sf-grid sf-noise relative flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 py-24 text-center sm:px-6 sm:py-32 md:px-8 md:py-40"
      aria-label="Hero offer"
    >
      {/* Stronger radial glow behind hero */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.25),transparent_70%)]"
      />

      {/* Subtle animated streaks */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 rotate-12 bg-[conic-gradient(from_90deg_at_50%_50%,transparent,hsla(var(--primary),0.12)_10%,transparent_25%)] blur-3xl"
        initial={{ opacity: 0.25, rotate: 12 }}
        animate={{ opacity: [0.18, 0.25, 0.18], rotate: [12, 9, 12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Brand */}
      <motion.h1
        className="relative font-extrabold leading-tight tracking-tight"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="block text-[clamp(2.7rem,7vw,4.75rem)] text-[hsl(var(--primary))]">
          SPIDER FANG
        </span>
        <span className="mt-1 block text-[clamp(1.35rem,3.4vw,2.25rem)] text-foreground">
          APEX WEB SERVICES
        </span>
      </motion.h1>

      {/* Offer clarity */}
      <motion.div
        className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <p>We’ll design a homepage you can keep, no strings attached.</p>
        <p className="mt-2 text-xl font-semibold text-[hsl(var(--primary))] sm:text-2xl">
          Normally £500, yours free.
        </p>
      </motion.div>

      {/* Single CTA */}
      <motion.div
        className="mt-8 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <Button
            asChild
            size="lg"
            className="border border-emerald-600 bg-emerald-600 px-8 text-base text-white hover:bg-emerald-700"
          >
            <Link href="#free-design">Claim My Free Design</Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Supportive link */}
      <motion.div
        className="mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link
          href="#why-it-works"
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          See why it works
        </Link>
      </motion.div>

      {/* Trust signals */}
      <motion.ul
        className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <li>Fast turnaround</li>
        <li>Transparent pricing</li>
        <li>Built for scale</li>
      </motion.ul>
    </section>
  )
}
