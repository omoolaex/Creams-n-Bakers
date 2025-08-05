"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function PageHero({ title, subtitle, image, overlay = true }) {
  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
      
      {/* Background Image */}
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      )}

      {/* Optional Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10"></div>
      )}

      {/* Content */}
      <div className="relative z-20 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-serif font-bold text-white mb-3"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white/90 max-w-xl mx-auto text-sm md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
