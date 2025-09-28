"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const MEET_LINK = process.env.NEXT_PUBLIC_MEET_LINK || "#"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <motion.div
        className="mx-auto max-w-6xl px-6 py-12 text-center md:py-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold md:text-3xl">
          Ready to see your business online in its best light?
        </h2>
        <p className="mt-2 text-muted-foreground">
          We will design your homepage for free. It is worth £500 and it is yours to keep.
        </p>

        <motion.div
          className="mt-6 flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button asChild size="lg">
            <Link href="#free-design">Claim My Free Design</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={MEET_LINK} target="_blank" rel="noreferrer">
              Book a Call
            </Link>
          </Button>
        </motion.div>

        <p className="mt-8 text-xs text-muted-foreground">
          Built with Next.js, Tailwind, and shadcn/ui. Hosted on Vercel.
        </p>
      </motion.div>
    </footer>
  )
}
