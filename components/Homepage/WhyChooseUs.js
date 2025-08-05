"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const features = [
  {
    icon: "/icons/white-bread.png",
    title: "Freshly Baked Daily",
    desc: "Every product is baked with love each morning for maximum freshness.",
  },
  {
    icon: "/icons/blender.png",
    title: "Premium Ingredients",
    desc: "We use only the best butter, cream, and chocolates in every recipe.",
  },
  {
    icon: "/icons/black-forest.png",
    title: "Custom Cakes & Orders",
    desc: "Celebrate your moments with personalized cakes & treats.",
  },
  {
    icon: "/icons/cake (1).png",
    title: "Fast & Friendly Service",
    desc: "Quick order processing with a warm customer experience.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="relative w-full bg-white py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate">
            Why Choose Creams ’n’ Bakers?
          </h2>
          <p className="text-cocoa mt-2 max-w-xl mx-auto">
            We blend passion with perfection to bring joy in every bite.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center bg-milk rounded-xl p-6 shadow-sm hover:shadow-md transition"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 mb-4 relative">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-chocolate mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-cocoa">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle Floating Sprinkles */}
      {[...Array(6)].map((_, i) => {
        const size = 4 + Math.random() * 6
        const top = Math.random() * 100
        const left = Math.random() * 100
        const duration = 3 + Math.random() * 2

        return (
          <motion.div
            key={i}
            className="absolute bg-caramel rounded-full opacity-40"
            style={{ width: size, height: size, top: `${top}%`, left: `${left}%` }}
            animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
            transition={{ duration, repeat: Infinity, delay: Math.random() * 2 }}
          />
        )
      })}
    </section>
  )
}