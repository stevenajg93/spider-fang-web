"use client"

import { motion } from "framer-motion"

export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(255,0,0,0.16),transparent_60%)]" />

      {/* Slow conic sweep */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[150vmax] w-[150vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "conic-gradient(from 120deg at 50% 50%, rgba(255,0,0,0.14), transparent 18%, rgba(255,0,0,0.14) 30%, transparent 48%, rgba(255,0,0,0.14) 62%, transparent 80%, rgba(255,0,0,0.14))",
        }}
        initial={{ rotate: 0, opacity: 0.4 }}
        animate={{ rotate: 360, opacity: [0.32, 0.4, 0.32] }}
        transition={{
          rotate: { duration: 120, repeat: Infinity, ease: "linear" },
          opacity: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Gentle breathing radial pulse */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(60% 40% at 60% 0%, rgba(255,0,0,0.12), transparent 60%)",
        }}
      />
    </div>
  )
}
