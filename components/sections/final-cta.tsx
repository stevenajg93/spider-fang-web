"use client"

import { Button } from "@/components/ui/button"
import { useBookingDialog } from "@/hooks/use-booking-dialog"

export function FinalCta() {
  const { openDialog } = useBookingDialog()

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 spider-web-bg opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-bebas text-4xl sm:text-6xl text-white mb-6 tracking-wide">Ready to Bite Back?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Let's discuss your project and create a website that drives real results for your business.
        </p>
        <Button
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-red-600/25 transition-all duration-300 transform hover:scale-105"
          onClick={openDialog}
        >
          Book Your Free Consultation
        </Button>
        <p className="text-sm text-gray-500 mt-4">No commitment • 30-minute strategy session • Free project estimate</p>
      </div>
    </section>
  )
}
