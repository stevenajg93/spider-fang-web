"use client"

import { BookingDialog } from "@/components/booking/booking-dialog"
import { ChatWidget } from "@/components/chat/chat-widget"
import { Footer } from "@/components/layout/footer"
import { Navigation } from "@/components/layout/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"
import { packages } from "@/data/pricing"
import { services } from "@/data/services"
import { useBookingDialog } from "@/hooks/use-booking-dialog"
import { useToast } from "@/hooks/use-toast"
import { createCheckoutSession } from "@/lib/adapters/payments-adapter"
import { Check, Star, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  const { isOpen, closeDialog, openDialog } = useBookingDialog()
  const { toast } = useToast()

  const handlePurchase = async (packageId: string, priceKey: string) => {
    try {
      const result = await createCheckoutSession({
        priceKey,
        customer: {
          // In a real app, this would come from user context
          name: "",
          email: "",
          company: "",
        },
      })

      // Redirect to Stripe checkout or demo success page
      window.location.href = result.url
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout Error",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-gray-900/50 to-black py-20">
          <div className="spider-web-bg absolute inset-0 opacity-20" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="font-bebas mb-6 text-5xl tracking-wide text-white sm:text-6xl">
              Our Services
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-300">
              Choose the perfect package for your business needs. From quick launches to
              comprehensive solutions.
            </p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="bg-gray-900/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="font-bebas mb-4 text-4xl tracking-wide text-white">What We Deliver</h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-400">
                End-to-end web solutions designed to drive conversions and business growth
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Card
                  key={service.id}
                  className="stagger-item glossy border-red-900/20 bg-black/50 transition-all duration-300 hover:border-red-600/50"
                >
                  <CardContent className="p-6">
                    <h3 className="mb-3 text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mb-4 text-gray-400">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <Check className="mr-2 h-4 w-4 flex-shrink-0 text-red-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Packages */}
        <section className="bg-black py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="font-bebas mb-4 text-4xl tracking-wide text-white sm:text-5xl">
                Choose Your Package
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-400">
                Transparent pricing with no hidden fees. All packages include our quality guarantee.
              </p>
            </div>

            <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {packages.map((pkg, index) => (
                <Card
                  key={pkg.id}
                  className={`relative border-red-900/20 bg-gray-900/50 transition-all duration-300 hover:border-red-600/50 ${
                    pkg.popular ? "scale-105 ring-2 ring-red-600/50 lg:scale-110" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                      <Badge className="bg-red-600 px-4 py-1 text-sm font-semibold text-white">
                        <Star className="mr-1 h-3 w-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="pb-4 text-center">
                    <h3 className="font-bebas mb-2 text-3xl tracking-wide text-white">
                      {pkg.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-red-400">
                        £{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500">+</span>
                    </div>
                    <p className="text-gray-400">{pkg.description}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="mb-8 space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-300">
                          <Check className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-3">
                      <Button
                        className={`w-full rounded-xl py-3 font-semibold transition-all duration-300 ${
                          pkg.popular
                            ? "bg-red-600 text-white shadow-lg hover:bg-red-700 hover:shadow-xl"
                            : "border border-gray-700 bg-gray-800 text-white hover:border-red-600 hover:bg-red-600"
                        }`}
                        onClick={() => handlePurchase(pkg.id, pkg.priceKey)}
                      >
                        Buy {pkg.name} Package
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-red-600/50 bg-transparent text-red-400 hover:border-red-600 hover:bg-red-600/10"
                        onClick={openDialog}
                      >
                        Discuss This Package
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <div className="text-center">
              <div className="mx-auto max-w-4xl rounded-2xl bg-gray-900/50 p-8">
                <h3 className="font-bebas mb-4 text-2xl tracking-wide text-white">
                  Need Something Custom?
                </h3>
                <p className="mb-6 text-gray-400">
                  Every business is unique. If our packages don't quite fit your needs, let's
                  discuss a custom solution tailored specifically for your goals.
                </p>
                <Button
                  size="lg"
                  className="rounded-xl bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700"
                  onClick={openDialog}
                >
                  Book Custom Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Process Overview */}
        <section className="bg-gray-900/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="font-bebas mb-4 text-4xl tracking-wide text-white">
                What Happens Next?
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-400">
                Our streamlined process ensures your project launches on time and exceeds
                expectations
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Purchase & Kickoff",
                  description:
                    "Secure your package and we'll schedule a detailed project kickoff call within 24 hours.",
                },
                {
                  step: "02",
                  title: "Strategy & Planning",
                  description:
                    "We analyze your business, competitors, and audience to create a winning strategy.",
                },
                {
                  step: "03",
                  title: "Design & Build",
                  description:
                    "Our team designs and develops your website with regular updates and feedback loops.",
                },
                {
                  step: "04",
                  title: "Launch & Support",
                  description:
                    "We launch your site, provide training, and offer ongoing support as included.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20">
                    <span className="font-bebas text-xl text-red-400">{item.step}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-black py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="font-bebas mb-4 text-4xl tracking-wide text-white">
                Package Questions
              </h2>
              <p className="text-xl text-gray-400">Common questions about our service packages</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {[
                {
                  question: "What's included in support?",
                  answer:
                    "All packages include bug fixes, security updates, and basic content changes for the specified period.",
                },
                {
                  question: "Can I upgrade my package?",
                  answer:
                    "Yes! You can upgrade at any time during the project. We'll adjust pricing and timeline accordingly.",
                },
                {
                  question: "What if I need revisions?",
                  answer:
                    "All packages include multiple revision rounds. We work with you until you're completely satisfied.",
                },
                {
                  question: "Do you provide hosting?",
                  answer:
                    "We can recommend hosting solutions and help with setup, or work with your existing provider.",
                },
              ].map((faq, index) => (
                <Card key={index} className="border-red-900/20 bg-gray-900/50">
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold text-white">{faq.question}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
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
