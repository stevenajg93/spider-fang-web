"use client"

import { motion } from "framer-motion"

export default function Spider() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className="absolute left-0 top-10 h-16 w-16 text-white"
      initial={{ x: "-10%", y: "-10%", rotate: 0, opacity: 0 }}
      animate={{ x: "110%", y: "110%", rotate: 15, opacity: 1 }}
      transition={{ duration: 30, repeat: Infinity, repeatType: "loop", ease: "linear" }}
      aria-hidden
    >
      {/* Body */}
      <circle cx="32" cy="32" r="10" fill="black" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="20" r="6" fill="black" stroke="currentColor" strokeWidth="2" />

      {/* Fangs (fang-red glow) */}
      <circle cx="28" cy="40" r="2" fill="hsl(var(--primary))" />
      <circle cx="36" cy="40" r="2" fill="hsl(var(--primary))" />

      {/* Legs (subtle wiggle) */}
      <line x1="22" y1="28" x2="8" y2="16" stroke="currentColor" strokeWidth="2">
        <animate attributeName="y2" values="16;14;16" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="22" y1="36" x2="6" y2="36" stroke="currentColor" strokeWidth="2">
        <animate attributeName="x2" values="6;4;6" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="22" y1="44" x2="8" y2="52" stroke="currentColor" strokeWidth="2">
        <animate attributeName="y2" values="52;54;52" dur="1s" repeatCount="indefinite" />
      </line>

      <line x1="42" y1="28" x2="56" y2="16" stroke="currentColor" strokeWidth="2">
        <animate attributeName="y2" values="16;14;16" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="42" y1="36" x2="58" y2="36" stroke="currentColor" strokeWidth="2">
        <animate attributeName="x2" values="58;60;58" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="42" y1="44" x2="56" y2="52" stroke="currentColor" strokeWidth="2">
        <animate attributeName="y2" values="52;54;52" dur="1s" repeatCount="indefinite" />
      </line>
    </motion.svg>
  )
}
