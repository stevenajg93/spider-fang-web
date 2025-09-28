"use client"

import { motion } from "framer-motion"

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="sf-grid sf-noise relative -mt-px bg-transparent">
      <div aria-hidden className="sf-radial absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 md:pb-24 md:pt-10">
        <motion.div
          className="grid gap-8 md:grid-cols-2 md:items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center md:text-left">
            <h2 className="text-[clamp(1.5rem,4.6vw,2.5rem)] font-bold tracking-tight">
              Who We Are
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Spider Fang is led by <strong>industry veterans in blockchain, XR, and AI</strong>. We
              combine deep technical leadership with a carefully selected network of{" "}
              <strong>affordable, ambitious global talent</strong>.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              This unique model lets us deliver <strong>world-class design and technology</strong>{" "}
              at <strong>competitive prices</strong> other agencies can’t match. Our clients get the
              best of both worlds: cutting-edge innovation with unbeatable value.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="h-48 w-48 rounded-full bg-gradient-to-r from-red-600 to-black opacity-90 shadow-xl" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
