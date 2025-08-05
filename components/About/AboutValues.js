"use client"

import { motion } from "framer-motion"
import { Heart, Star, Smile } from "lucide-react"

const values = [
  { icon: Heart, title: "Made with Love", desc: "Every treat is crafted with passion and attention to detail." },
  { icon: Star, title: "Premium Quality", desc: "We use only the finest ingredients for an unforgettable taste." },
  { icon: Smile, title: "Customer Happiness", desc: "Your delight is our mission in every bite." },
]

export default function AboutValues() {
  return (
    <section className="relative w-full bg-milk py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-chocolate mb-10">
          Our Mission & Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <value.icon className="mx-auto text-caramel w-12 h-12 mb-3" />
              <h3 className="text-lg font-semibold text-chocolate mb-2">{value.title}</h3>
              <p className="text-cocoa text-sm">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}