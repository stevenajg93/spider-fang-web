"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group inline-flex items-center gap-3">
          {/* Fang mark */}
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10">
            <span className="absolute h-3.5 w-3.5 rounded-full bg-[hsl(var(--primary))] opacity-90"></span>
            <span className="absolute inset-0 rounded-md ring-1 ring-[hsl(var(--primary)/.4)] group-hover:ring-[hsl(var(--primary)/.7)] transition" />
          </span>

          {/* Brand */}
          <div className="leading-tight">
            <motion.div
              className="text-[15px] font-bold tracking-wide uppercase"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              SPIDER FANG
            </motion.div>
            <motion.div
              className="text-[10px] tracking-[0.22em] text-muted-foreground uppercase"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              APEX WEB
            </motion.div>
          </div>
        </Link>

        <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
          <Link href="#free-design" className="hover:text-foreground transition">Free Design</Link>
          <Link href="#why-it-works" className="hover:text-foreground transition">Why It Works</Link>
          <Link href="#packages" className="hover:text-foreground transition">Packages</Link>
        </nav>

        <div className="text-xs text-muted-foreground md:text-sm">
          DEMO MODE
        </div>
      </div>
    </header>
  )
}
