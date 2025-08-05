"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function MenuCategoriesClient({ categories }) {
  return (
    <section className="relative w-full bg-milk py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate">
            Explore Our Categories
          </h2>
          <p className="text-cocoa mt-2 max-w-md mx-auto">
            From fresh pastries to creamy desserts, find your perfect treat.
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto md:overflow-visible scrollbar-hide pb-2 snap-x snap-mandatory">
            {categories.map((category, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -3 }}
                className="flex-shrink-0 md:flex-shrink md:w-auto w-40 snap-start"
              >
                <Link
                  href={category.link}
                  className="block w-full h-full px-5 py-4 rounded-xl text-center font-medium
                             bg-white text-chocolate shadow-md border border-caramel/20
                             hover:bg-caramel hover:text-white transition"
                >
                  {category.name}
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-cocoa py-6">No categories available</p>
        )}
      </div>
    </section>
  );
}