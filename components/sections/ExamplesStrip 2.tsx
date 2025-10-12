"use client"
import { useRef, KeyboardEvent } from "react"

import Link from "next/link"

import { gaSafe } from "@/lib/ga"


const SHOW = process.env.NEXT_PUBLIC_SHOW_EXAMPLES === "1" // OFF by default

type ExampleItem = {
  title: string
  href: string // internal route only
  img?: { src: string; alt: string; width: number; height: number }
  tag?: string
}

const ITEMS: ExampleItem[] = [
  { title: "SaaS Landing", href: "/examples/saas-landing", tag: "Web" },
  { title: "Cafe & Bakery", href: "/examples/cafe", tag: "Local" },
  { title: "Creator Portfolio", href: "/examples/creator", tag: "Portfolio" },
  { title: "Event Microsite", href: "/examples/event", tag: "Promo" },
  { title: "Agency Site", href: "/examples/agency", tag: "B2B" },
]

function ExampleTile({ item }: { item: ExampleItem }) {
  const handleClick = () => gaSafe("examples_click", { item: item.title })
  const W = 288,
    H = 180 // fixed dims for CLS
  return (
    <li className="shrink-0" style={{ width: W, height: H }}>
      <Link
        href={item.href}
        aria-label={`Open example: ${item.title}`}
        onClick={handleClick}
        className="group block h-full w-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60 focus-visible:ring-offset-2 dark:bg-neutral-900 dark:ring-white/10 dark:focus-visible:ring-white/60"
      >
        <div className="flex h-full w-full items-center justify-between p-4">
          <div>
            <p className="text-sm opacity-70">{item.tag ?? "Example"}</p>
            <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
          </div>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-6 w-6 opacity-60 transition-transform group-hover:translate-x-0.5"
          >
            <path
              fill="currentColor"
              d="M13.2 5.2a1 1 0 0 1 1.6 0l6 7.5a1 1 0 0 1 0 1.3l-6 7.5a1 1 0 1 1-1.6-1.2L18.9 14H4a1 1 0 0 1 0-2h14.9l-5.7-6.3a1 1 0 0 1 0-1.5z"
            />
          </svg>
        </div>
      </Link>
    </li>
  )
}

export default function ExamplesStrip() {
  if (!SHOW) return null // hidden unless NEXT_PUBLIC_SHOW_EXAMPLES=1
  const scrollerRef = useRef<HTMLUListElement>(null)

  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const el = scrollerRef.current
    if (!el) return
    const delta = 240
    if (e.key === "ArrowRight") {
      el.scrollBy({ left: delta, behavior: "smooth" })
      e.preventDefault()
    } else if (e.key === "ArrowLeft") {
      el.scrollBy({ left: -delta, behavior: "smooth" })
      e.preventDefault()
    } else if (e.key === "Home") {
      el.scrollTo({ left: 0, behavior: "smooth" })
      e.preventDefault()
    } else if (e.key === "End") {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" })
      e.preventDefault()
    }
  }

  return (
    <section aria-labelledby="examples-heading" className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="examples-heading" className="text-lg font-semibold tracking-tight">
          Examples
        </h2>
        <ul
          ref={scrollerRef}
          role="list"
          aria-label="Examples carousel"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="mt-4 flex scroll-p-4 gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ITEMS.map((it) => (
            <ExampleTile key={it.title} item={it} />
          ))}
        </ul>
      </div>
    </section>
  )
}
