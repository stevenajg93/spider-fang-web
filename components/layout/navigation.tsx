"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Settings } from "lucide-react"
import { DEMO } from "@/lib/config"
import { useBookingDialog } from "@/hooks/use-booking-dialog"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { openDialog } = useBookingDialog()

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <span className="font-bebas text-xl text-white tracking-wide">Spider Fang</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-red-400 transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6" onClick={openDialog}>
              Book Consultation
            </Button>
            {/* Admin Link */}
            <Link
              href="/admin/connected"
              className="text-gray-400 hover:text-red-400 transition-colors duration-200"
              title="Admin Dashboard"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-red-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 rounded-lg mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-red-400 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold mb-2"
                  onClick={() => {
                    setIsOpen(false)
                    openDialog()
                  }}
                >
                  Book Consultation
                </Button>
                <Link
                  href="/admin/connected"
                  className="block w-full text-center py-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Demo Badge */}
      {DEMO && (
        <div className="absolute top-20 right-4 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-semibold">
          Demo Mode
        </div>
      )}
    </nav>
  )
}
