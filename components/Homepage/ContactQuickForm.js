"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactQuickForm() {
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" })
  const [status, setStatus] = useState({ loading: false, success: false, error: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: "" })

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Submission failed")

      // Reset form
      setFormData({ name: "", contact: "", message: "" })
      setStatus({ loading: false, success: true, error: "" })

      // Auto-hide success after 5s
      setTimeout(() => setStatus({ loading: false, success: false, error: "" }), 5000)
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Failed to send message. Try again later." })
    }
  }

  return (
    <section className="relative w-full bg-peach py-16 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate mb-4">
          Have a Sweet Craving?
        </h2>
        <p className="text-cocoa mb-8">
          Reach out for custom orders, inquiries, or to place your delicious request.
        </p>

        <AnimatePresence>
          {status.success && (
            <motion.p
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-green-700 font-semibold mb-4"
            >
              ✅ Thank you! We’ll get back to you shortly.
            </motion.p>
          )}
        </AnimatePresence>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-milk rounded-lg focus:ring-2 focus:ring-caramel focus:outline-none"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Phone or Email"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-milk rounded-lg focus:ring-2 focus:ring-caramel focus:outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Your message or order request..."
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border border-milk rounded-lg focus:ring-2 focus:ring-caramel focus:outline-none"
            required
          ></textarea>

          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-caramel to-chocolate text-chocolate font-medium rounded-lg shadow-md hover:from-chocolate hover:to-caramel transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={status.loading}
          >
            {status.loading ? "Sending..." : "Send Message"}
          </motion.button>

          {status.error && <p className="text-red-600 mt-2">{status.error}</p>}
        </motion.form>
      </div>
    </section>
  )
}