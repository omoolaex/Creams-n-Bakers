"use client"

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ContactInfo() {
  return (
    <section className="bg-milk py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center">
          <MapPin className="text-caramel w-8 h-8 mb-3" />
          <p className="text-chocolate font-medium">123 Bakery Street, Sweet City</p>
        </div>
        <div className="flex flex-col items-center">
          <Phone className="text-caramel w-8 h-8 mb-3" />
          <Link href="tel:+2348000000000" className="text-chocolate font-medium hover:text-caramel transition">
            +234 800 000 0000
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <Mail className="text-caramel w-8 h-8 mb-3" />
          <Link href="mailto:info@creamsnbakers.com" className="text-chocolate font-medium hover:text-caramel transition">
            info@creamsnbakers.com
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <MessageCircle className="text-caramel w-8 h-8 mb-3" />
          <Link href="https://wa.me/2348000000000" target="_blank" className="text-chocolate font-medium hover:text-caramel transition">
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </section>
  )
}
