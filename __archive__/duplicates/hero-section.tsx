"use client"

import { Button } from "@/components/ui/button"
import { useBookingDialog } from "@/hooks/use-booking-dialog"
import { BRAND } from "@/lib/config"

export function HeroSection() {
  const { openDialog } = useBookingDialog()

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Spider Web Background */}
      <div className="spider-web-bg absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="stagger-item">
          <h1 className="font-bebas mb-6 text-6xl tracking-wide text-white sm:text-7xl lg:text-8xl">
            {BRAND.tagline}
          </h1>
        </div>

        <div className="stagger-item">
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-300 sm:text-2xl">
            {BRAND.subhead} High-conversion websites for ambitious businesses.
          </p>
        </div>

        <div className="stagger-item flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="rounded-2xl bg-red-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl"
            onClick={openDialog}
          >
            Book Consultation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl border-red-600 bg-transparent px-8 py-4 text-lg font-semibold text-red-400 transition-all duration-300 hover:bg-red-600 hover:text-white"
            onClick={() =>
              document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            See Work
          </Button>
        </div>

        <div className="stagger-item mt-12">
          <p className="text-sm uppercase tracking-wider text-gray-500">{BRAND.pricingStrap}</p>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
    </section>
  )
}
