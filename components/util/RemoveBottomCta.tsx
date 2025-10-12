"use client"
import { useEffect } from "react"

/**
 * Removes the bottom CTA section titled "Ready to move fast".
 * Non-destructive DOM cleanup so the page ends after the form.
 */
export default function RemoveBottomCta() {
  useEffect(() => {
    const doc = document
    const heads = Array.from(doc.querySelectorAll("h1,h2,h3"))
    const targetHead = heads.find((h) =>
      h.textContent?.trim().toLowerCase().includes("ready to move fast"),
    ) as HTMLElement | undefined

    if (!targetHead) return

    // Prefer nearest <section>; else remove the heading's immediate block container.
    let el: HTMLElement | null = targetHead
    while (el && el.parentElement && el.tagName.toLowerCase() !== "section") {
      el = el.parentElement as HTMLElement
      if (el?.tagName.toLowerCase() === "main") break
    }
    ;(el ?? targetHead).remove()
  }, [])

  return null
}
