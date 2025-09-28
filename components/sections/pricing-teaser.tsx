"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { packages } from "@/data/pricing"
import { useToast } from "@/hooks/use-toast"
import { createCheckoutSession } from "@/lib/adapters/payments-adapter"

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
    <section className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-bebas mb-4 text-4xl tracking-wide text-white sm:text-5xl">
            Launch from £500
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Choose the perfect package for your business
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <Card
              key={pkg.id}
              className={`stagger-item border-red-900/20 bg-gray-900/50 transition-all duration-300 hover:border-red-600/50 ${
                pkg.popular ? "scale-105 ring-2 ring-red-600/50" : ""
              }`}
            >
              <CardContent className="p-6 text-center">
                {pkg.popular && (
                  <div className="mb-4 inline-block rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="font-bebas mb-2 text-2xl tracking-wide text-white">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-red-400">
                    £{pkg.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500">+</span>
                </div>
                <p className="mb-6 text-sm text-gray-400">{pkg.description}</p>
                <ul className="mb-6 space-y-2">
                  {pkg.features.slice(0, 3).map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-center text-sm text-gray-300"
                    >
                      <span className="mr-2 h-1 w-1 rounded-full bg-red-400" />
                      {feature}
                    </li>
                  ))}
                  {pkg.features.length > 3 && (
                    <li className="text-sm text-gray-500">
                      +{pkg.features.length - 3} more features
                    </li>
                  )}
                </ul>
                <Button
                  className="mb-2 w-full bg-red-600 font-semibold text-white hover:bg-red-700"
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
            className="rounded-2xl bg-red-600 px-8 py-4 text-lg font-semibold text-white hover:bg-red-700"
            onClick={() => (window.location.href = "/services")}
          >
            Compare Packages
          </Button>
        </div>
      </div>
    </section>
  )
}
