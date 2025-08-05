import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

// Import Global Components
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Creams ’n’ Bakers | Delight in Every Bite",
  description:
    "Creams ’n’ Bakers brings you freshly baked cakes, pastries, and desserts crafted daily with love and passion. Order now for a taste of happiness!",
  keywords: [
    "cakes",
    "pastries",
    "bakery",
    "desserts",
    "custom cakes",
    "Creams n Bakers",
  ],
  authors: [{ name: "OmoolaEx" }],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navbar is fixed and overlays content */}
        <Navbar />

        {/* Remove top padding, let Hero go under navbar */}
        <main className="relative">{children}</main>

        <Footer />
      </body>
    </html>
  )
}