import type React from "react"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Spider Fang Web Services",
  description: "Manage leads, consultations, and track performance",
  robots: "noindex, nofollow", // Prevent search engine indexing
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
