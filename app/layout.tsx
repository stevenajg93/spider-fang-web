import type React from "react"
import type { Metadata } from "next"
import { Bebas_Neue, Inter } from "next/font/google"
import "./globals.css"
import { DemoNotice } from "@/components/layout/demo-notice"

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Spider Fang Web Services - Web that bites back",
  description: "From strategy to shipped — fast. High-conversion websites for ambitious businesses.",
  keywords: ["web design", "web development", "digital strategy", "conversion optimization"],
  authors: [{ name: "Spider Fang Web Services" }],
  openGraph: {
    title: "Spider Fang Web Services - Web that bites back",
    description: "From strategy to shipped — fast. High-conversion websites for ambitious businesses.",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spider Fang Web Services - Web that bites back",
    description: "From strategy to shipped — fast. High-conversion websites for ambitious businesses.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground font-inter">
        <DemoNotice />
        {children}
      </body>
    </html>
  )
}
