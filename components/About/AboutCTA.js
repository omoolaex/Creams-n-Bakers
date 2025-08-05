"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function AboutCTA() {
  return (
    <section className="relative w-full bg-gradient-to-r from-chocolate to-caramel text-milk py-16 text-center overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-serif font-bold mb-4"
        >
          Ready to Taste Happiness?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-milk/80 mb-6"
        >
          Visit our menu and order your favorite treats today.
        </motion.p>
        <Link
          href="/menu"
          className="px-6 py-3 bg-milk text-chocolate font-semibold rounded-lg shadow-md hover:bg-peach transition"
        >
          View Menu
        </Link>
      </div>
    </section>
  )
}