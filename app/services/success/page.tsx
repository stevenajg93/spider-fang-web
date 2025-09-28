"use client"

import { useEffect, useState } from "react"

import { useSearchParams } from "next/navigation"

import { BookingDialog } from "@/components/booking/booking-dialog"
import { ChatWidget } from "@/components/chat/chat-widget"
import { Footer } from "@/components/layout/footer"
import { Navigation } from "@/components/layout/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"
import { packages } from "@/data/pricing"
import { useBookingDialog } from "@/hooks/use-booking-dialog"
import { CheckCircle, Calendar, CreditCard, MessageCircle, ArrowRight } from "lucide-react"

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
        <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-gray-900/50 to-black py-20">
          <div className="spider-web-bg absolute inset-0 opacity-20" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-600/20">
                <CheckCircle className="h-10 w-10 text-red-400" />
              </div>

              {isDemoStripe && (
                <>
                  <h1 className="font-bebas mb-6 text-5xl tracking-wide text-white sm:text-6xl">
                    Package Purchased Successfully!
                  </h1>
                  <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-300">
                    Thank you for choosing Spider Fang Web Services. We'll be in touch within 24
                    hours to kick off your project.
                  </p>
                </>
              )}

              {isDemoMeet && (
                <>
                  <h1 className="font-bebas mb-6 text-5xl tracking-wide text-white sm:text-6xl">
                    Consultation Booked!
                  </h1>
                  <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-300">
                    Your consultation has been scheduled successfully. We've sent you a confirmation
                    email with all the details.
                  </p>
                </>
              )}

              {!demo && (
                <>
                  <h1 className="font-bebas mb-6 text-5xl tracking-wide text-white sm:text-6xl">
                    Success!
                  </h1>
                  <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-300">
                    Thank you for your interest in Spider Fang Web Services. We'll be in touch soon.
                  </p>
                </>
              )}
            </div>

            {/* Package Summary */}
            {packageInfo && isDemoStripe && (
              <Card className="mx-auto mb-12 max-w-2xl border-red-900/20 bg-gray-900/50">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="font-bebas text-2xl tracking-wide text-white">
                        {packageInfo.name} Package
                      </h2>
                      <p className="text-gray-400">{packageInfo.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-red-400">
                        £{packageInfo.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-gray-800 pt-6">
                    <h3 className="mb-3 font-semibold text-white">What's Included:</h3>
                    <ul className="space-y-2">
                      {packageInfo.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-red-400" />
                          {feature}
                        </li>
                      ))}
                      {packageInfo.features.length > 4 && (
                        <li className="text-sm text-gray-400">
                          +{packageInfo.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* What Happens Next */}
            <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="border-red-900/20 bg-black/50 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/20">
                    <Calendar className="h-6 w-6 text-red-400" />
                  </div>
                  <h3 className="mb-2 font-semibold text-white">Kickoff Call</h3>
                  <p className="text-sm text-gray-400">
                    We'll schedule a detailed project kickoff call within 24 hours to discuss your
                    requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-900/20 bg-black/50 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/20">
                    <CreditCard className="h-6 w-6 text-red-400" />
                  </div>
                  <h3 className="mb-2 font-semibold text-white">Project Planning</h3>
                  <p className="text-sm text-gray-400">
                    Our team will create a detailed project plan and timeline tailored to your
                    specific needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-900/20 bg-black/50 text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/20">
                    <MessageCircle className="h-6 w-6 text-red-400" />
                  </div>
                  <h3 className="mb-2 font-semibold text-white">Regular Updates</h3>
                  <p className="text-sm text-gray-400">
                    You'll receive regular progress updates and have multiple opportunities for
                    feedback and revisions.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 text-center">
              {isDemoMeet && (
                <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700"
                    onClick={() =>
                      window.open("https://meet.google.com/demo-consultation", "_blank")
                    }
                  >
                    Join Meeting Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-xl border-red-600 bg-transparent px-8 py-3 text-red-400 hover:bg-red-600 hover:text-white"
                    onClick={() => window.open("/calendar-event.ics", "_blank")}
                  >
                    Add to Calendar
                  </Button>
                </div>
              )}

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700"
                  onClick={() => (window.location.href = "/")}
                >
                  Return to Homepage
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {!isDemoMeet && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-xl border-red-600 bg-transparent px-8 py-3 text-red-400 hover:bg-red-600 hover:text-white"
                    onClick={openDialog}
                  >
                    Book a Consultation
                  </Button>
                )}
              </div>

              <p className="mt-6 text-sm text-gray-500">
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
