"use client"

import React from "react"

import { motion } from "framer-motion"

/**
 * Fierce spider silhouette with red glowing fangs that crawls diagonally across the hero.
 * - Pure SVG (crisp at any size)
 * - Framer Motion path animation (slow, predatory crawl)
 * - Subtle leg “life” via scale/rotate micro-motions
 */
export default function SpiderCrawl() {
  // Slow, predatory crawl loop:
  // off-screen top-left -> pause center -> off-screen bottom-right -> repeat
  const crawl = {
    initial: { x: "-20vw", y: "-20vh", rotate: -10, opacity: 0.0 },
    animate: {
      x: ["-20vw", "25vw", "110vw"],
      y: ["-20vh", "20vh", "110vh"],
      rotate: [-10, 3, 12],
      opacity: [0, 1, 1],
      transition: {
        times: [0, 0.55, 1],
        duration: 45, // cinematic pace
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 6,
      },
    },
  }

  // Micro “alive” motion to avoid feeling static
  const alive = {
    animate: {
      scale: [1, 1.03, 1],
      rotate: [0, 0.5, 0],
      transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
    },
  }

  return (
    <motion.div className="pointer-events-none absolute left-0 top-0 z-20" aria-hidden {...crawl}>
      <motion.svg
        width="180"
        height="180"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...alive}
      >
        {/* Filters: red glow for fangs + soft drop shadow */}
        <defs>
          <filter id="fangGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="redOnly"
            />
            <feMerge>
              <feMergeNode in="redOnly" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Shadow ellipse under spider for depth */}
        <ellipse cx="100" cy="148" rx="46" ry="10" fill="black" opacity="0.35" />

        <g filter="url(#shadow)" stroke="currentColor" strokeWidth="4" color="white">
          {/* Abdomen (rear) */}
          <ellipse cx="110" cy="92" rx="34" ry="38" fill="black" />
          {/* Cephalothorax (front) */}
          <ellipse cx="72" cy="92" rx="24" ry="22" fill="black" />

          {/* Legs — angular, aggressive stance */}
          {/* Left side legs */}
          <path d="M64 82 L36 66 L14 62" />
          <path d="M68 94 L38 92 L12 100" />
          <path d="M68 104 L38 114 L10 132" />
          <path d="M72 112 L46 134 L18 160" />

          {/* Right side legs */}
          <path d="M80 82 L108 66 L130 60" />
          <path d="M82 94 L116 92 L148 98" />
          <path d="M82 104 L118 114 L156 130" />
          <path d="M84 112 L122 134 L170 160" />

          {/* Head ridge for menace */}
          <path d="M58 80 C70 70, 82 70, 94 80" fill="none" />
        </g>

        {/* Fangs — glowing fang red */}
        <g filter="url(#fangGlow)">
          <path d="M64 112 L60 124 L68 120 Z" fill="hsl(var(--primary))" />
          <path d="M80 112 L84 124 L76 120 Z" fill="hsl(var(--primary))" />
        </g>
      </motion.svg>
    </motion.div>
  )
}
