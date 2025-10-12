"use client"
import { useEffect, useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { gaSafe } from "@/lib/ga"

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "/availability"

function initDark(): boolean {
  // Prefer saved choice, else system preference, else current DOM state
  if (typeof window === "undefined") return false
  const saved = localStorage.getItem("theme")
  if (saved === "dark") return true
  if (saved === "light") return false
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return true
  }
  return document.documentElement.classList.contains("dark")
}

export default function Header() {
  const pathname = usePathname()
  const isInstantDemo = pathname?.startsWith("/instant-demo")

  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  // On mount, sync from storage/system and apply
  useEffect(() => {
    const startDark = initDark()
    setIsDark(startDark)
    const root = document.documentElement
    if (startDark) root.classList.add("dark")
    else root.classList.remove("dark")
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    const root = document.documentElement
    if (next) {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleHeaderCta = () => gaSafe("cta_click", { location: "header" })

  const emoji = isDark ? "☀️" : "🌙"
  const label = isDark ? "Switch to light mode" : "Switch to dark mode"

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Spider Fang
        </Link>
        <nav aria-label="Main" className="flex items-center gap-3">
          {!isInstantDemo && (
            <Link
              href="/instant-demo"
              className="inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium ring-1 ring-black/10 hover:ring-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-white/60"
            >
              Start Free Design
            </Link>
          )}
          <Link
            href={BOOKING_URL}
            onClick={handleHeaderCta}
            className="btn-primary inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70 focus-visible:ring-offset-2 dark:focus-visible:ring-white/70"
          >
            Book a Call
          </Link>

          {/* Top-right emoji theme toggle */}
          {mounted && (
            <button
              type="button"
              aria-label={label}
              title={label}
              onClick={toggleTheme}
              className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-black/10 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/70 focus-visible:ring-offset-2 dark:ring-white/10 dark:hover:bg-white/10 dark:focus-visible:ring-white/70"
            >
              <span className="text-lg leading-none">{emoji}</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
