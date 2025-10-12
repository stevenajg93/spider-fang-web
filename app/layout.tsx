import "../styles/globals.css"
import "@/styles/light-theme.css"
import { Inter } from "next/font/google"

import RemoveBottomCta from "@/components/util/RemoveBottomCta"
import ReorderSections from "@/components/util/ReorderSections"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Spider Fang Apex Web",
  description: "Launch a polished website that wins clients.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-black text-white antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RemoveBottomCta /> <ReorderSections />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
