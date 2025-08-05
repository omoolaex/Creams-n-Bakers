"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function MenuCTA() {
  return (
    <section className="relative w-full bg-gradient-to-r from-chocolate to-caramel text-milk py-16 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-serif font-bold mb-4"
        >
          Craving Something Sweet?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-milk/80 max-w-xl mx-auto mb-6"
        >
          Place your order now and enjoy freshly baked treats delivered to your doorstep.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Link
            href="/order"
            className="px-8 py-4 bg-milk text-chocolate font-semibold rounded-lg shadow-md hover:bg-peach transition"
          >
            Order Now
          </Link>
        </motion.div>
      </div>

      {/* Floating Decorative Elements */}
      {[...Array(6)].map((_, i) => {
        const size = 6 + Math.random() * 8
        const top = Math.random() * 100
        const left = Math.random() * 100
        const duration = 4 + Math.random() * 3

        return (
          <motion.div
            key={i}
            className="absolute bg-peach rounded-full opacity-20 blur-md"
            style={{ width: size, height: size, top: `${top}%`, left: `${left}%` }}
            animate={{ y: [0, -15, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration, repeat: Infinity, delay: Math.random() * 2 }}
          />
        )
      })}
    </section>
  )
}