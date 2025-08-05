"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export default function AboutPreview() {
  return (
    <section className="relative w-full bg-milk py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10 relative z-10">
        
        {/* Left: Brand Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 flex justify-center relative"
        >
          <div className="w-80 h-80 md:w-[28rem] md:h-[28rem] relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/CEO (1).jpg"
              alt="Inside Creams 'n' Bakers"
              fill
              className="object-cover"
              priority={false}
            />
          </div>
        </motion.div>

        {/* Right: Brand Story */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-left"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate mb-4">
            A Taste of Happiness in Every Bite
          </h2>
          <p className="text-cocoa mb-6">
            At Creams ’n’ Bakers, we bring together passion, premium ingredients, 
            and expert craftsmanship to create cakes, pastries, and desserts that 
            spark joy. Every bite tells our story of love for baking and dedication 
            to our customers.
          </p>
          <Link
            href="/about"
            className="flex items-center gap-2 text-caramel font-medium hover:text-chocolate transition"
          >
            Learn More About Us →
          </Link>
        </motion.div>
      </div>

      {/* Floating Decorative Sprinkles */}
      {[...Array(6)].map((_, i) => {
        const size = 4 + Math.random() * 6
        const top = Math.random() * 100
        const left = Math.random() * 100
        const duration = 3 + Math.random() * 2

        return (
          <motion.div
            key={i}
            className="absolute bg-peach rounded-full opacity-30"
            style={{ width: size, height: size, top: `${top}%`, left: `${left}%` }}
            animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
            transition={{ duration, repeat: Infinity, delay: Math.random() * 2 }}
          />
        )
      })}
    </section>
  )
}