"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutStory() {
  return (
    <section className="relative w-full bg-white py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <Image
            src="/CEO (1).jpg"
            alt="Our Bakery Team"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-chocolate mb-4">
            Baking Memories Since Day One
          </h2>
          <p className="text-cocoa mb-5">
            Creams ’n’ Bakers started with a simple mission: to bring joy to every home through freshly baked treats.  
            Every cake, pastry, and dessert is made with love, care, and premium ingredients to ensure every bite is a moment of happiness.
          </p>
          <p className="text-cocoa">
            We’re not just baking desserts; we’re creating experiences that bring families and friends together.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
