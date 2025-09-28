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
    <section className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-4xl sm:text-5xl text-white mb-4 tracking-wide">What Clients Say</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Real feedback from real businesses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-black/50 border-red-900/20 hover:border-red-600/50 transition-all duration-300 stagger-item glossy"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-red-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">
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
