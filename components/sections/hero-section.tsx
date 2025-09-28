"use client"

import { Button } from "@/components/ui/button"
import { BRAND } from "@/lib/config"
import { useBookingDialog } from "@/hooks/use-booking-dialog"

export function HeroSection() {
  const { openDialog } = useBookingDialog()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Spider Web Background */}
      <div className="absolute inset-0 spider-web-bg" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="stagger-item">
          <h1 className="font-bebas text-6xl sm:text-7xl lg:text-8xl text-white mb-6 tracking-wide">{BRAND.tagline}</h1>
        </div>

        <div className="stagger-item">
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {BRAND.subhead} High-conversion websites for ambitious businesses.
          </p>
        </div>

        <div className="stagger-item flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={openDialog}
          >
            Book Consultation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white font-semibold px-8 py-4 text-lg rounded-2xl transition-all duration-300 bg-transparent"
            onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
          >
            See Work
          </Button>
        </div>

        <div className="stagger-item mt-12">
          <p className="text-sm text-gray-500 uppercase tracking-wider">{BRAND.pricingStrap}</p>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
    </section>
  )
}
