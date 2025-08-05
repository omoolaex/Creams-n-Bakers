"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

const confettiIcons = [
  { src: "/icons/parfait.png", size: 16 },
  { src: "/icons/cake.png", size: 18 },
  { src: "/icons/bakery.png", size: 12 },
  { src: "/icons/donut.png", size: 20 },
  { src: "/icons/muffin.png", size: 22 },
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollY } = useScroll()

  // Parallax transforms
  const yImage = useTransform(scrollY, [0, 300], [0, 50])
  const yBlob1 = useTransform(scrollY, [0, 300], [0, 40])
  const yBlob2 = useTransform(scrollY, [0, 300], [0, -40])

  // Hover tilt
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateY = ((x / rect.width) - 0.5) * 15
    const rotateX = -((y / rect.height) - 0.5) * 15
    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 })

  return (
    <section
      ref={ref}
      className="relative w-full bg-white overflow-hidden pt-24 md:pt-40 pb-16"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center relative z-10">
        
        {/* Product Image with Tilt + Auto-Float */}
        <motion.div
          style={{ y: yImage }}
          className="w-full md:w-1/2 flex justify-center relative mb-10 md:mb-0 perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              transformStyle: "preserve-3d",
            }}
            animate={{
              y: [0, -12, 0],
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
            }}
            transition={{
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotateX: { type: "spring", stiffness: 150, damping: 20 },
              rotateY: { type: "spring", stiffness: 150, damping: 20 },
            }}
            className="relative z-10"
          >
            <Image
              src="/hero-product-2.png"
              alt="Delicious cake"
              width={500}
              height={500}
              priority
              className="object-contain drop-shadow-xl"
            />
          </motion.div>

          {/* Glow behind product */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1 }}
            className="absolute w-72 h-72 md:w-[28rem] md:h-[28rem] bg-peach/40 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 text-left"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-chocolate mb-4 leading-tight">
            Delight in Every Bite
          </h1>
          <p className="text-lg md:text-xl text-cocoa mb-6 max-w-md">
            Fresh cakes, pastries, and yogurt – crafted daily with love and care.  
            The taste you’ll always come back for.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2, delayChildren: 0.5 },
              },
            }}
            className="flex items-center gap-6"
          >
            {/* Primary CTA: Brand Button */}
            <motion.a
              href="/order"
              className="px-6 py-3 rounded-xl shadow-lg font-medium text-chocolate
                         bg-gradient-to-r from-caramel to-chocolate
                         hover:from-chocolate hover:to-caramel transition"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 8px 25px rgba(92,61,46,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Order Now
            </motion.a>

            {/* Secondary CTA: Text + Icon */}
            <motion.a
              href="/menu"
              className="flex items-center gap-2 text-caramel font-medium hover:text-chocolate transition"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ x: 4 }}
            >
              View Menu <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Decorative Blobs */}
      <motion.div
        style={{ y: yBlob1 }}
        className="absolute top-12 left-6 w-16 h-16 bg-peach/30 rounded-full blur-2xl"
      />
      <motion.div
        style={{ y: yBlob2 }}
        className="absolute bottom-12 right-10 w-24 h-24 bg-caramel/20 rounded-full blur-2xl hidden sm:block"
      />
      <motion.div
        className="absolute top-20 right-1/3 w-20 h-20 bg-cocoa/20 rounded-full blur-xl hidden sm:block"
      />

      {/* Bakery-Themed Confetti */}
      {Array.from({ length: 15 }).map((_, i) => {
        const icon = confettiIcons[Math.floor(Math.random() * confettiIcons.length)]
        const delay = Math.random() * 2
        const duration = 3 + Math.random() * 2
        const left = Math.random() * 100
        const top = Math.random() * 100
        const rotate = Math.random() * 360

        return (
          <motion.div
            key={i}
            className="absolute opacity-70 sm:opacity-100"
            style={{ top: `${top}%`, left: `${left}%` }}
            animate={{
              y: [0, -30, 0],
              rotate: [rotate, rotate + 45, rotate],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          >
            <Image
              src={icon.src}
              alt="Confetti"
              width={icon.size}
              height={icon.size}
              className="object-contain"
            />
          </motion.div>
        )
      })}
    </section>
  )
}