"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function StickyCTA() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden"
      role="region"
      aria-label="Sticky call to action"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm">
          Get a £500 Website Design. <strong>100% Free.</strong>
        </span>
        <Button asChild size="sm" className="shrink-0">
          <Link href="#free-design">Claim My Free Design</Link>
        </Button>
      </div>
    </div>
  )
}
