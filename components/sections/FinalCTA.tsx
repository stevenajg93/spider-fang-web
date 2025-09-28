"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function FinalCTA() {
  return (
    <section className="relative py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            href="#free-design"
            className="px-8 py-4 text-lg font-bold rounded-lg shadow-lg text-white bg-green-600 animate-bounce"
          >
            Claim Free Design
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
