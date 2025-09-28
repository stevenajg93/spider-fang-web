import { Card, CardContent } from "@/components/ui/card"
import { services } from "@/data/services"
import { Target, Palette, Code, TrendingUp, Shield } from "lucide-react"

const iconMap = {
  target: Target,
  palette: Palette,
  code: Code,
  "trending-up": TrendingUp,
  shield: Shield,
}

export function ServicesSnapshot() {
  return (
    <section className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-4xl sm:text-5xl text-white mb-4 tracking-wide">What We Do</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">End-to-end web solutions that drive results</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 5).map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <Card
                key={service.id}
                className={`bg-black/50 border-red-900/20 hover:border-red-600/50 transition-all duration-300 stagger-item glossy`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="font-semibold text-white text-lg">{service.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <span className="w-1 h-1 bg-red-400 rounded-full mr-2" />
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
