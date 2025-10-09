"use client"

import * as React from "react"

import { useTheme } from "next-themes"

export default function ThemeToggle() {
  const { setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const handleClick = () => {
    const html = document.documentElement
    const isDark = html.classList.contains("dark")
    const next = isDark ? "light" : "dark"

    // Apply to next-themes state (persists to localStorage)
    setTheme(next)

    // Hard-apply to DOM immediately to avoid any stale state issues
    html.classList.toggle("dark", next === "dark")
  }

  // Render icon based on live DOM state (not hook)
  const isDark =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Toggle theme"
      aria-pressed={isDark}
      className="rounded-md border px-2 py-1 text-sm transition hover:bg-black/5 dark:hover:bg-white/10"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  )
}
