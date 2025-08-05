"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-chocolate to-caramel text-milk pt-12 pb-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
        
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/logo.png"
              alt="Creams 'n' Bakers Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <span className="font-serif text-xl font-bold">Creams ’n’ Bakers</span>
          </div>
          <p className="text-sm text-milk/80 max-w-xs">
            Delight in Every Bite – where passion meets perfection in every pastry.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2 text-milk/80">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/menu" className="hover:text-white transition">Menu</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/order" className="hover:text-white transition">Order</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Contact Us</h4>
          <ul className="space-y-2 text-milk/80 text-sm">
            <li>123 Bakery Street, Sweet City</li>
            <li>
              <a href="tel:+2348000000000" className="hover:text-white transition">
                +234 800 000 0000
              </a>
            </li>
            <li>
              <a href="mailto:info@creamsnbakers.com" className="hover:text-white transition">
                info@creamsnbakers.com
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Follow Us</h4>
          <div className="flex gap-4 text-milk/80 text-xl">
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="hover:text-white transition"
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="hover:text-white transition"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2 }}
              className="hover:text-white transition"
            >
              <FaWhatsapp />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-milk/20 mt-6 pt-4 text-center text-sm text-milk/70">
        © {new Date().getFullYear()} Creams ’n’ Bakers. All Rights Reserved.  
        <br className="md:hidden" /> Designed by <span className="text-white">OmoolaEx</span>
      </div>

      {/* Floating Dots for Decoration */}
      {[...Array(8)].map((_, i) => {
        const size = 4 + Math.random() * 6
        const top = Math.random() * 100
        const left = Math.random() * 100
        const duration = 3 + Math.random() * 2

        return (
          <motion.div
            key={i}
            className="absolute bg-peach rounded-full opacity-20"
            style={{ width: size, height: size, top: `${top}%`, left: `${left}%` }}
            animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
            transition={{ duration, repeat: Infinity, delay: Math.random() * 2 }}
          />
        )
      })}
    </footer>
  )
}