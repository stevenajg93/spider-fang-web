"use client"

import { useState } from "react"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { portfolioItems } from "@/data/portfolio"
import { ExternalLink } from "lucide-react"

export function PortfolioPreview() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <section id="portfolio" className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-bebas mb-4 text-4xl tracking-wide text-white sm:text-5xl">
            Our Work
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Real results for real businesses
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <Card
              key={item.id}
              className="stagger-item group cursor-pointer overflow-hidden border-red-900/20 bg-gray-900/50 transition-all duration-300 hover:border-red-600/50"
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
                <div className="absolute right-4 top-4">
                  <ExternalLink className="h-5 w-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <span className="rounded bg-red-400/10 px-2 py-1 text-xs text-red-400">
                    {item.category}
                  </span>
                </div>
                <p className="mb-3 text-sm text-gray-400">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-red-400">{item.outcome}</span>
                  <div className="flex gap-1">
                    {item.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-500"
                      >
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
            className="rounded-2xl border-red-600 bg-transparent px-8 py-4 text-lg font-semibold text-red-400 hover:bg-red-600 hover:text-white"
            onClick={() => (window.location.href = "/work")}
          >
            View All Work
          </Button>
        </div>
      </div>
    </section>
  )
}
