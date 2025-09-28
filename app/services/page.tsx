"use client"

import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, ArrowRight } from "lucide-react"
import { packages } from "@/data/pricing"
import { services } from "@/data/services"
import { createCheckoutSession } from "@/lib/adapters/payments-adapter"
import { useBookingDialog } from "@/hooks/use-booking-dialog"
import { BookingDialog } from "@/components/booking/booking-dialog"
import { ChatWidget } from "@/components/chat/chat-widget"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

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
        <section className="py-20 bg-gradient-to-b from-gray-900/50 to-black relative overflow-hidden">
          <div className="absolute inset-0 spider-web-bg opacity-20" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-bebas text-5xl sm:text-6xl text-white mb-6 tracking-wide">Our Services</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Choose the perfect package for your business needs. From quick launches to comprehensive solutions.
            </p>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-bebas text-4xl text-white mb-4 tracking-wide">What We Deliver</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                End-to-end web solutions designed to drive conversions and business growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card
                  key={service.id}
                  className="bg-black/50 border-red-900/20 hover:border-red-600/50 transition-all duration-300 stagger-item glossy"
                >
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-white text-xl mb-3">{service.title}</h3>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-center">
                          <Check className="w-4 h-4 text-red-400 mr-2 flex-shrink-0" />
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
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-bebas text-4xl sm:text-5xl text-white mb-4 tracking-wide">Choose Your Package</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Transparent pricing with no hidden fees. All packages include our quality guarantee.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {packages.map((pkg, index) => (
                <Card
                  key={pkg.id}
                  className={`relative bg-gray-900/50 border-red-900/20 hover:border-red-600/50 transition-all duration-300 ${
                    pkg.popular ? "ring-2 ring-red-600/50 scale-105 lg:scale-110" : ""
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-red-600 text-white px-4 py-1 text-sm font-semibold">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <h3 className="font-bebas text-3xl text-white mb-2 tracking-wide">{pkg.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-red-400">£{pkg.price.toLocaleString()}</span>
                      <span className="text-gray-500 text-lg">+</span>
                    </div>
                    <p className="text-gray-400">{pkg.description}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start">
                          <Check className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-3">
                      <Button
                        className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 ${
                          pkg.popular
                            ? "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
                            : "bg-gray-800 hover:bg-red-600 text-white border border-gray-700 hover:border-red-600"
                        }`}
                        onClick={() => handlePurchase(pkg.id, pkg.priceKey)}
                      >
                        Buy {pkg.name} Package
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-red-600/50 text-red-400 hover:bg-red-600/10 hover:border-red-600 bg-transparent"
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
              <div className="bg-gray-900/50 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="font-bebas text-2xl text-white mb-4 tracking-wide">Need Something Custom?</h3>
                <p className="text-gray-400 mb-6">
                  Every business is unique. If our packages don't quite fit your needs, let's discuss a custom solution
                  tailored specifically for your goals.
                </p>
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-xl"
                  onClick={openDialog}
                >
                  Book Custom Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Process Overview */}
        <section className="py-20 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-bebas text-4xl text-white mb-4 tracking-wide">What Happens Next?</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Our streamlined process ensures your project launches on time and exceeds expectations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                  description: "We analyze your business, competitors, and audience to create a winning strategy.",
                },
                {
                  step: "03",
                  title: "Design & Build",
                  description: "Our team designs and develops your website with regular updates and feedback loops.",
                },
                {
                  step: "04",
                  title: "Launch & Support",
                  description: "We launch your site, provide training, and offer ongoing support as included.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="font-bebas text-xl text-red-400">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-bebas text-4xl text-white mb-4 tracking-wide">Package Questions</h2>
              <p className="text-xl text-gray-400">Common questions about our service packages</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <Card key={index} className="bg-gray-900/50 border-red-900/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
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
