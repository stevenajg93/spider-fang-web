"use client"
import { useEffect } from "react"

/**
 * Finds the section headed "Why It Works" and moves it to appear
 * before the section headed "Claim Your FREE £500 Prototype".
 * Non-destructive: DOM-only, no content changes.
 */
export default function ReorderSections() {
  useEffect(() => {
    const doc = document

    const findSectionByHeading = (needle: string) => {
      const heads = Array.from(doc.querySelectorAll("h1,h2,h3"))
      const h = heads.find((el) => el.textContent?.trim().toLowerCase().includes(needle)) as
        | HTMLElement
        | undefined
      if (!h) return null

      // Prefer nearest <section>, otherwise the heading's parent block.
      let el: HTMLElement | null = h
      while (el && el.parentElement && el.tagName.toLowerCase() !== "section") {
        el = el.parentElement as HTMLElement
        if (el?.tagName.toLowerCase() === "main") break
      }
      return el ?? h
    }

    const why = findSectionByHeading("why it works")
    const claim = findSectionByHeading("claim your free £500 prototype")

    if (why && claim && claim.parentElement && why !== claim) {
      const parent = claim.parentElement
      if (why.nextElementSibling !== claim) {
        try {
          parent.insertBefore(why, claim)
        } catch (e) {
          /* ignore reorder failure */
        }
      }
    }
  }, [])

  return null
}
