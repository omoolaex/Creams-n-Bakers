"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import { ShoppingCart } from "lucide-react";

export default function MenuItemsByCategoryClient({ menuData }) {
  const loading = menuData.length === 0;

  return (
    <section className="relative w-full bg-gradient-to-b from-white to-milk py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 space-y-20">

        {/* Loading Skeleton */}
        {loading &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="space-y-4 animate-pulse">
              <div className="h-6 w-40 bg-milk rounded mx-auto" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
                {Array.from({ length: 3 }).map((__, i) => (
                  <div key={i} className="bg-milk h-64 rounded-xl shadow-md" />
                ))}
              </div>
            </div>
          ))}

        {/* Dynamic Menu Rendering */}
        {!loading && menuData.length > 0 ? (
          menuData.map((category) => (
            <div key={category._id} id={category.id}>
              {/* Category Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-chocolate">
                  {category.name}
                </h2>
                <div className="w-16 h-1 bg-caramel mx-auto mt-2 rounded" />
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {category.products?.length > 0 ? (
                  category.products.map((item, i) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group flex flex-col"
                    >
                      {/* Product Image */}
                      <div className="relative w-full h-52 overflow-hidden">
                        {item.image ? (
                          <Image
                            src={urlFor(item.image).width(500).height(400).url()}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-110 transition duration-500"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-cocoa/50 bg-milk">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold text-chocolate mb-1">
                          {item.name}
                        </h3>
                        <span className="inline-block bg-caramel/10 text-caramel font-bold px-3 py-1 rounded-full w-fit mx-auto mb-4">
                          ₦{Number(item.price).toLocaleString()}
                        </span>

                        {/* Order Button */}
                        <Link
                          href={`/order?product=${encodeURIComponent(
                            item.name
                          )}&price=${encodeURIComponent(item.price)}`}
                          className="mt-auto inline-flex items-center justify-center w-full gap-2 px-4 py-3 bg-caramel text-chocolate rounded-lg 
                                     hover:bg-chocolate transition font-medium"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Order Now
                        </Link>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-cocoa col-span-3">
                    No items available in this category.
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center text-cocoa">
              No menu categories available at the moment.
            </p>
          )
        )}
      </div>
    </section>
  );
}