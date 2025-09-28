"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, CreditCard, MessageCircle, ArrowRight } from "lucide-react"
import { packages } from "@/data/pricing"
import { useBookingDialog } from "@/hooks/use-booking-dialog"
import { BookingDialog } from "@/components/booking/booking-dialog"
import { ChatWidget } from "@/components/chat/chat-widget"
import { Toaster } from "@/components/ui/toaster"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const { isOpen, closeDialog, openDialog } = useBookingDialog()
  const [packageInfo, setPackageInfo] = useState<(typeof packages)[0] | null>(null)

  const demo = searchParams.get("demo")
  const packageId = searchParams.get("package")

  useEffect(() => {
    if (packageId) {
      const pkg = packages.find((p) => p.priceKey === packageId)
      if (pkg) {
        setPackageInfo(pkg)
      }
    }
  }, [packageId])

  const isDemoStripe = demo === "stripe"
  const isDemoMeet = demo === "meet"

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black relative overflow-hidden min-h-screen flex items-center">
          <div className="absolute inset-0 spider-web-bg opacity-20" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-red-400" />
              </div>

              {isDemoStripe && (
                <>
                  <h1 className="font-bebas text-5xl sm:text-6xl text-white mb-6 tracking-wide">
                    Package Purchased Successfully!
                  </h1>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Thank you for choosing Spider Fang Web Services. We'll be in touch within 24 hours to kick off your
                    project.
                  </p>
                </>
              )}

              {isDemoMeet && (
                <>
                  <h1 className="font-bebas text-5xl sm:text-6xl text-white mb-6 tracking-wide">
                    Consultation Booked!
                  </h1>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Your consultation has been scheduled successfully. We've sent you a confirmation email with all the
                    details.
                  </p>
                </>
              )}

              {!demo && (
                <>
                  <h1 className="font-bebas text-5xl sm:text-6xl text-white mb-6 tracking-wide">Success!</h1>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Thank you for your interest in Spider Fang Web Services. We'll be in touch soon.
                  </p>
                </>
              )}
            </div>

            {/* Package Summary */}
            {packageInfo && isDemoStripe && (
              <Card className="bg-gray-900/50 border-red-900/20 mb-12 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-bebas text-2xl text-white tracking-wide">{packageInfo.name} Package</h2>
                      <p className="text-gray-400">{packageInfo.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-red-400">£{packageInfo.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 pt-6">
                    <h3 className="font-semibold text-white mb-3">What's Included:</h3>
                    <ul className="space-y-2">
                      {packageInfo.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="text-gray-300 flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {packageInfo.features.length > 4 && (
                        <li className="text-gray-400 text-sm">+{packageInfo.features.length - 4} more features</li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* What Happens Next */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-black/50 border-red-900/20 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Kickoff Call</h3>
                  <p className="text-gray-400 text-sm">
                    We'll schedule a detailed project kickoff call within 24 hours to discuss your requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-red-900/20 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Project Planning</h3>
                  <p className="text-gray-400 text-sm">
                    Our team will create a detailed project plan and timeline tailored to your specific needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/50 border-red-900/20 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Regular Updates</h3>
                  <p className="text-gray-400 text-sm">
                    You'll receive regular progress updates and have multiple opportunities for feedback and revisions.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              {isDemoMeet && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-xl"
                    onClick={() => window.open("https://meet.google.com/demo-consultation", "_blank")}
                  >
                    Join Meeting Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent px-8 py-3 rounded-xl"
                    onClick={() => window.open("/calendar-event.ics", "_blank")}
                  >
                    Add to Calendar
                  </Button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-xl"
                  onClick={() => (window.location.href = "/")}
                >
                  Return to Homepage
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {!isDemoMeet && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent px-8 py-3 rounded-xl"
                    onClick={openDialog}
                  >
                    Book a Consultation
                  </Button>
                )}
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Questions? Email us at{" "}
                <a href="mailto:hello@spiderfang.co.uk" className="text-red-400 hover:text-red-300">
                  hello@spiderfang.co.uk
                </a>{" "}
                or call us directly.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BookingDialog open={isOpen} onOpenChange={closeDialog} />
      <ChatWidget />
      <Toaster />
    </div>
  )
}
