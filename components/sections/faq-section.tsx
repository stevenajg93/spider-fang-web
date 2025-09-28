"use client"

import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { faqs } from "@/data/faq"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FaqSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  return (
    <section className="bg-black py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="font-bebas mb-4 text-4xl tracking-wide text-white sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400">Everything you need to know</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="border-red-900/20 bg-gray-900/50 transition-all duration-300 hover:border-red-600/50"
            >
              <CardContent className="p-0">
                <button
                  className="flex w-full items-center justify-between p-6 text-left transition-colors duration-200 hover:bg-red-600/5"
                  onClick={() => toggleItem(index)}
                >
                  <h3 className="pr-4 text-lg font-semibold text-white">{faq.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0 text-red-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-red-400" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="leading-relaxed text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
