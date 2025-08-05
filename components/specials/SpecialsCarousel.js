// components/specials/SpecialsCarousel.jsx
"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function SpecialsCarousel({ specials }) {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef(null)

  const changeSlide = () => {
    setCurrent((prev) => (prev + 1) % specials.length)
  }

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (specials.length > 1) {
      intervalRef.current = setInterval(changeSlide, 5000)
      return () => clearInterval(intervalRef.current)
    }
  }, [specials])

  // Pause on hover
  const handleMouseEnter = () => clearInterval(intervalRef.current)
  const handleMouseLeave = () => {
    if (specials.length > 1) {
      intervalRef.current = setInterval(changeSlide, 5000)
    }
  }

  const currentSpecial = specials[current]

  return (
    <div
      className="relative w-full flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        {/* Image */}
        <motion.div
          key={currentSpecial._id + "-image"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="relative w-full md:w-1/2 aspect-[4/3] flex-shrink-0"
        >
          <Image
            src={currentSpecial.image}
            alt={currentSpecial.name}
            fill
            priority
            className="object-cover rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          key={currentSpecial._id + "-text"}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-center md:text-left px-2"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate mb-4 leading-tight">
            {currentSpecial.name}
          </h2>
          <p className="text-cocoa/80 mb-4 text-base md:text-lg">
            {currentSpecial.description}
          </p>
          <p className="text-xl font-bold text-caramel mb-6">
            ₦{currentSpecial.price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </p>
          <a
            href={`/order?product=${encodeURIComponent(currentSpecial.name)}&price=${currentSpecial.price}`}
            className="inline-block px-6 py-3 bg-caramel text-chocolate rounded-full shadow-md hover:bg-chocolate hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
          >
            Order Now
          </a>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {specials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-caramel scale-125"
                : "bg-cocoa/30 hover:bg-cocoa/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}