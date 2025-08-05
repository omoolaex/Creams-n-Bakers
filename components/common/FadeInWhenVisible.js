// components/common/FadeInWhenVisible.jsx
"use client"

import { motion } from "framer-motion"

export default function FadeInWhenVisible({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}
