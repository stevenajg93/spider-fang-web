"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { packages } from "@/data/pricing"
import { createCheckoutSession } from "@/lib/adapters/payments-adapter"
import { useToast } from "@/hooks/use-toast"

export function PricingTeaser() {
  const { toast } = useToast()

  const handleQuickPurchase = async (packageId: string, priceKey: string) => {
    try {
      const result = await createCheckoutSession({
        priceKey,
        customer: {},
      })
      window.location.href = result.url
    } catch (error) {
      console.error("Quick purchase error:", error)
      toast({
        title: "Purchase Error",
        description: "Something went wrong. Please try again or visit our services page.",
        variant: "destructive",
      })
    }
  }

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-4xl sm:text-5xl text-white mb-4 tracking-wide">Launch from £500</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Choose the perfect package for your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <Card
              key={pkg.id}
              className={`bg-gray-900/50 border-red-900/20 hover:border-red-600/50 transition-all duration-300 stagger-item ${
                pkg.popular ? "ring-2 ring-red-600/50 scale-105" : ""
              }`}
            >
              <CardContent className="p-6 text-center">
                {pkg.popular && (
                  <div className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">
                    Most Popular
                  </div>
                )}
                <h3 className="font-bebas text-2xl text-white mb-2 tracking-wide">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-red-400">£{pkg.price.toLocaleString()}</span>
                  <span className="text-gray-500">+</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-center justify-center">
                      <span className="w-1 h-1 bg-red-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                  {pkg.features.length > 3 && (
                    <li className="text-sm text-gray-500">+{pkg.features.length - 3} more features</li>
                  )}
                </ul>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold mb-2"
                  onClick={() => handleQuickPurchase(pkg.id, pkg.priceKey)}
                >
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 text-lg rounded-2xl"
            onClick={() => (window.location.href = "/services")}
          >
            Compare Packages
          </Button>
        </div>
      </div>
    </section>
  )
}
