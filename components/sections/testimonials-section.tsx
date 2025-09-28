import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechStart Ltd",
    role: "CEO",
    content:
      "Spider Fang transformed our online presence completely. Our conversion rate increased by 340% within the first month.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    company: "GrowthCorp",
    role: "Marketing Director",
    content:
      "The team's attention to detail and strategic approach delivered results beyond our expectations. Highly recommended.",
    rating: 5,
  },
  {
    name: "Emma Williams",
    company: "Innovate Solutions",
    role: "Founder",
    content:
      "Professional, fast, and incredibly effective. They understood our vision and brought it to life perfectly.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-gray-900/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-bebas mb-4 text-4xl tracking-wide text-white sm:text-5xl">
            What Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Real feedback from real businesses
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="stagger-item glossy border-red-900/20 bg-black/50 transition-all duration-300 hover:border-red-600/50"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-red-400" />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-gray-300">"{testimonial.content}"</p>
                <div className="border-t border-gray-800 pt-4">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
