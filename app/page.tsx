"use client"

import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { ServicesSnapshot } from "@/components/sections/services-snapshot"
import { PricingTeaser } from "@/components/sections/pricing-teaser"
import { ProcessTimeline } from "@/components/sections/process-timeline"
import { PortfolioPreview } from "@/components/sections/portfolio-preview"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FaqSection } from "@/components/sections/faq-section"
import { FinalCta } from "@/components/sections/final-cta"
import { BookingDialog } from "@/components/booking/booking-dialog"
import { ChatWidget } from "@/components/chat/chat-widget"
import { useBookingDialog } from "@/hooks/use-booking-dialog"
import { Toaster } from "@/components/ui/toaster"

export default function HomePage() {
  const { isOpen, closeDialog } = useBookingDialog()

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSnapshot />
        <PricingTeaser />
        <ProcessTimeline />
        <PortfolioPreview />
        <TestimonialsSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <BookingDialog open={isOpen} onOpenChange={closeDialog} />
      <ChatWidget />
      <Toaster />
    </div>
  )
}
