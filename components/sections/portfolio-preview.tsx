"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { portfolioItems } from "@/data/portfolio"
import { ExternalLink } from "lucide-react"

export function PortfolioPreview() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <section id="portfolio" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-4xl sm:text-5xl text-white mb-4 tracking-wide">Our Work</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Real results for real businesses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {portfolioItems.map((item, index) => (
            <Card
              key={item.id}
              className="bg-gray-900/50 border-red-900/20 hover:border-red-600/50 transition-all duration-300 stagger-item overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={hoveredItem === item.id ? item.video : item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-white text-lg">{item.title}</h3>
                  <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">{item.category}</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-red-400 font-semibold text-sm">{item.outcome}</span>
                  <div className="flex gap-1">
                    {item.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white font-semibold px-8 py-4 text-lg rounded-2xl bg-transparent"
            onClick={() => (window.location.href = "/work")}
          >
            View All Work
          </Button>
        </div>
      </div>
    </section>
  )
}
