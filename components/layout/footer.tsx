import Link from "next/link"
import { BRAND, DEMO } from "@/lib/config"

export function Footer() {
  return (
    <footer className="bg-black border-t border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <span className="font-bebas text-xl text-white tracking-wide">{BRAND.name}</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {BRAND.tagline} {BRAND.subhead} High-conversion websites for ambitious businesses.
            </p>
            <p className="text-sm text-gray-500">© 2025 Spider Fang Web Services. All rights reserved.</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-red-400 transition-colors">
                  Web Design
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-red-400 transition-colors">
                  Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-red-400 transition-colors">
                  Strategy
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-red-400 transition-colors">
                  Optimization
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-red-400 transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-red-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-gray-400 hover:text-red-400 transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <a href="mailto:hello@spiderfang.co.uk" className="text-gray-400 hover:text-red-400 transition-colors">
                  hello@spiderfang.co.uk
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 sm:mb-0">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-red-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-red-400 transition-colors">
                Terms of Service
              </Link>
              {DEMO && <span className="text-sm text-fang-red font-medium">Demo Mode</span>}
            </div>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/spiderfang"
                className="text-gray-500 hover:text-red-400 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com/spiderfangweb"
                className="text-gray-500 hover:text-red-400 transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
