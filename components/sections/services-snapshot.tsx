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
    <section className="bg-gray-900/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-bebas mb-4 text-4xl tracking-wide text-white sm:text-5xl">
            What We Do
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            End-to-end web solutions that drive results
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 5).map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <Card
                key={service.id}
                className={`stagger-item glossy border-red-900/20 bg-black/50 transition-all duration-300 hover:border-red-600/50`}
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600/20">
                      <Icon className="h-6 w-6 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  </div>
                  <p className="mb-4 text-gray-400">{service.description}</p>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <span className="mr-2 h-1 w-1 rounded-full bg-red-400" />
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
