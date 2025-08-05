"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { urlFor } from "@/sanity/image"

export default function MenuHighlightsClient({ products }) {
  return (
    <section className="relative w-full bg-milk py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate">
            Our Menu Highlights
          </h2>
          <p className="text-cocoa mt-2">
            Freshly baked delights you’ll fall in love with
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-4">
            {products.map((item) => (
              <motion.div
                key={item._id}
                className="bg-milk rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group"
                whileHover={{ y: -6 }}
              >
                <div className="relative w-full h-40 bg-milk flex items-center justify-center overflow-hidden">
                  {item.imageUrl ? (
                    <Image
                      src={urlFor(item.imageUrl).width(400).height(300).url()}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <span className="text-cocoa/60 text-sm">No image</span>
                  )}
                </div>

                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-chocolate mb-1">{item.name}</h3>
                  <p className="text-caramel mb-3">₦{Number(item.price).toLocaleString()}</p>
                  <Link
                    href={`/order?product=${encodeURIComponent(item.name)}&price=${encodeURIComponent(item.price)}`}
                    className="inline-flex items-center gap-1 mt-2 px-4 py-2 bg-caramel text-chocolate rounded-lg hover:bg-chocolate transition text-sm shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Order Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-cocoa py-6">
            No featured items at the moment.
          </p>
        )}

        {/* CTA Row */}
        <div className="flex justify-center gap-6 mt-10">
          <Link
            href="/menu"
            className="px-6 py-3 rounded-xl shadow-md font-medium text-chocolate
                       bg-gradient-to-r from-caramel to-chocolate
                       hover:from-chocolate hover:to-caramel transition"
          >
            View Full Menu
          </Link>
          <Link
            href="/order"
            className="flex items-center gap-2 text-caramel font-medium hover:text-chocolate transition"
          >
            Quick Order →
          </Link>
        </div>
      </div>

      {/* Floating Sprinkles */}
      {[...Array(8)].map((_, i) => {
        const size = 6 + Math.random() * 6
        const top = Math.random() * 100
        const left = Math.random() * 100
        const duration = 3 + Math.random() * 2

        return (
          <motion.div
            key={i}
            className="absolute bg-caramel rounded-full opacity-40"
            style={{ width: size, height: size, top: `${top}%`, left: `${left}%` }}
            animate={{ y: [0, -15, 0], opacity: [0, 1, 0] }}
            transition={{ duration, repeat: Infinity, delay: Math.random() * 2 }}
          />
        )
      })}
    </section>
  )
}