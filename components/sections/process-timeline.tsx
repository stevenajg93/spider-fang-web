import { Card, CardContent } from "@/components/ui/card"
import { Search, Sprout } from "lucide-react"

const processSteps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "We dive deep into your business, audience, and goals to create a strategic foundation.",
    features: ["Business analysis", "Competitor research", "User journey mapping"],
  },
  {
    icon: Sprout,
    title: "Grow",
    description:
      "We design, build, and optimize your website to drive conversions and business growth.",
    features: ["Custom design", "Development", "Launch & optimization"],
  },
]

export function ProcessTimeline() {
  return (
    <section className="bg-gray-900/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-bebas mb-4 text-4xl tracking-wide text-white sm:text-5xl">
            Our Process
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            From strategy to success in two focused phases
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card
                key={index}
                className="stagger-item glossy border-red-900/20 bg-black/50 transition-all duration-300 hover:border-red-600/50"
              >
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center">
                    <div className="mr-6 flex h-16 w-16 items-center justify-center rounded-xl bg-red-600/20">
                      <Icon className="h-8 w-8 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-bebas text-3xl tracking-wide text-white">{step.title}</h3>
                      <div className="mt-1 h-1 w-12 bg-red-600" />
                    </div>
                  </div>
                  <p className="mb-6 text-lg leading-relaxed text-gray-400">{step.description}</p>
                  <ul className="space-y-3">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <span className="mr-3 h-2 w-2 rounded-full bg-red-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
