import { Card, CardContent } from "@/components/ui/card"
import { Search, Sprout } from "lucide-react"

const processSteps = [
  {
    icon: Search,
    title: "Discover",
    description: "We dive deep into your business, audience, and goals to create a strategic foundation.",
    features: ["Business analysis", "Competitor research", "User journey mapping"],
  },
  {
    icon: Sprout,
    title: "Grow",
    description: "We design, build, and optimize your website to drive conversions and business growth.",
    features: ["Custom design", "Development", "Launch & optimization"],
  },
]

export function ProcessTimeline() {
  return (
    <section className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-4xl sm:text-5xl text-white mb-4 tracking-wide">Our Process</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">From strategy to success in two focused phases</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card
                key={index}
                className="bg-black/50 border-red-900/20 hover:border-red-600/50 transition-all duration-300 stagger-item glossy"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-red-600/20 rounded-xl flex items-center justify-center mr-6">
                      <Icon className="w-8 h-8 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-bebas text-3xl text-white tracking-wide">{step.title}</h3>
                      <div className="w-12 h-1 bg-red-600 mt-1" />
                    </div>
                  </div>
                  <p className="text-gray-400 mb-6 text-lg leading-relaxed">{step.description}</p>
                  <ul className="space-y-3">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 flex items-center">
                        <span className="w-2 h-2 bg-red-400 rounded-full mr-3" />
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
