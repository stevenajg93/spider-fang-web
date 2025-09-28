import type React from "react"
import { vi } from "vitest"

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}))

// Mock Framer Motion
vi.mock("framer-motion", () => ({
  motion: {
    div: "div",
    section: "section",
    h1: "h1",
    p: "p",
    button: "button",
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))
