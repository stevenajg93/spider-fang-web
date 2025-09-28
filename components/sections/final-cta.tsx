"use client"

import { Button } from "@/components/ui/button"
import { useBookingDialog } from "@/hooks/use-booking-dialog"

export function FinalCta() {
  const { openDialog } = useBookingDialog()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-900/50 to-black py-20">
      {/* Background Pattern */}
      <div className="spider-web-bg absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-bebas mb-6 text-4xl tracking-wide text-white sm:text-6xl">
          Ready to Bite Back?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-300">
          Let's discuss your project and create a website that drives real results for your
          business.
        </p>
        <Button
          size="lg"
          className="transform rounded-2xl bg-red-600 px-12 py-6 text-xl font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-red-600/25"
          onClick={openDialog}
        >
          Book Your Free Consultation
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          No commitment • 30-minute strategy session • Free project estimate
        </p>
      </div>
    </section>
  )
}
