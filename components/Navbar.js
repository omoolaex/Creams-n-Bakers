"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const leftMenu = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Specials", path: "/specials" },
  ]

  const rightMenu = [
    { name: "About", path: "/about" },
    { name: "Order", path: "/order" },
    { name: "Contact", path: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-milk/70 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between relative">

        {/* Mobile / Tablet Logo */}
        <Link href="/" className="flex-shrink-0 md:hidden" aria-label="Go to homepage">
          <Image
            src="/logo.png"
            alt="Creams 'n' Bakers Logo"
            width={70}
            height={70}
            priority
            className="object-contain transition-all duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Menus with Centered Logo */}
        <div className="hidden md:flex items-center justify-center flex-1">
          {/* Left Menu */}
          <div
            className="flex gap-10 pr-16 font-medium transition-colors duration-300"
            style={{ color: "#5C3D2E" }}
          >
            {leftMenu.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="hover:text-caramel transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Center Logo for Desktop */}
          <Link href="/" className="mx-12" aria-label="Go to homepage">
            <Image
              src="/logo.png"
              alt="Creams 'n' Bakers Logo"
              width={80}
              height={80}
              priority
              className="object-contain transition-all duration-300 hover:scale-105"
            />
          </Link>

          {/* Right Menu */}
          <div
            className="flex gap-10 pl-16 font-medium transition-colors duration-300"
            style={{ color: "#5C3D2E" }}
          >
            {rightMenu.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="hover:text-caramel transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className={`md:hidden text-xl transition-colors duration-300 text-chocolate`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-lg py-4 flex flex-col gap-4 text-chocolate text-left px-6 animate-slideDown">
          {[...leftMenu, ...rightMenu].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="hover:text-caramel transition font-medium py-2 border-b border-milk/40"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}