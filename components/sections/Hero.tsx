"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section
      id="free-design"
      className="relative overflow-hidden border-b bg-background"
      aria-label="Hero offer"
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_70%_-10%,hsl(var(--primary)/.18),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-28 pb-20 text-center md:pt-36 md:pb-28">
        {/* Brand */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-extrabold tracking-[0.18em] text-[hsl(var(--primary))] sm:text-6xl md:text-7xl">
            SPIDER FANG
          </h1>
          <p className="mt-2 text-sm tracking-[0.42em] text-muted-foreground md:text-base">
            APEX WEB
          </p>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-balance text-3xl font-bold leading-tight text-[hsl(var(--foreground))] sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Get a{" "}
          <motion.span
            className="relative text-[hsl(var(--primary))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            100% Free
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] w-full bg-[hsl(var(--primary))]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
          </motion.span>{" "}
          Website Design worth{" "}
          <motion.span
            className="relative text-[hsl(var(--primary))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            £500
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] w-full bg-[hsl(var(--primary))]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
          </motion.span>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          We will design your homepage free of charge. It is yours to keep, worth £500.
          If you love it, we will launch the full site. No upfront costs. No risk.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <Button asChild size="lg" className="px-8 text-base">
            <Link href="#free-design">Claim My Free Design</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 text-base">
            <Link href="#why-it-works">See Why It Works</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
