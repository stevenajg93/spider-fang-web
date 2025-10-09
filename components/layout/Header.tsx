"use client"

import Link from "next/link"

import ThemeToggle from "@/components/ThemeToggle"

export default function Header() {
  return (
    <header className="border-border bg-background/70 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight">
          SPIDER FANG
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
