"use client"

import { useState } from "react"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useBookingDialog } from "@/hooks/use-booking-dialog"
import { DEMO } from "@/lib/config"
import { Menu, X, Settings } from "lucide-react"

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
    <nav className="sticky top-0 z-50 border-b border-red-900/20 bg-black/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-red-600">
              <span className="text-sm font-bold text-white">SF</span>
            </div>
            <span className="font-bebas text-xl tracking-wide text-white">Spider Fang</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium text-gray-300 transition-colors duration-200 hover:text-red-400"
              >
                {item.label}
              </Link>
            ))}
            <Button
              className="bg-red-600 px-6 font-semibold text-white hover:bg-red-700"
              onClick={openDialog}
            >
              Book Consultation
            </Button>
            {/* Admin Link */}
            <Link
              href="/admin/connected"
              className="text-gray-400 transition-colors duration-200 hover:text-red-400"
              title="Admin Dashboard"
            >
              <Settings className="h-5 w-5" />
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
            <div className="mt-2 space-y-1 rounded-lg bg-black/95 px-2 pb-3 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 transition-colors duration-200 hover:text-red-400"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button
                  className="mb-2 w-full bg-red-600 font-semibold text-white hover:bg-red-700"
                  onClick={() => {
                    setIsOpen(false)
                    openDialog()
                  }}
                >
                  Book Consultation
                </Button>
                <Link
                  href="/admin/connected"
                  className="block w-full py-2 text-center text-gray-400 transition-colors duration-200 hover:text-red-400"
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
        <div className="absolute right-4 top-20 rounded bg-yellow-500 px-2 py-1 text-xs font-semibold text-black">
          Demo Mode
        </div>
      )}
    </nav>
  )
}
