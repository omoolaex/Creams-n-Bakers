"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" })
  const [status, setStatus] = useState({ loading: false, success: false, error: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: "" })

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Submission failed")

      setForm({ name: "", contact: "", message: "" })
      setStatus({ loading: false, success: true, error: "" })
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Failed to send message. Try again later." })
    }
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-xl mx-auto px-6 bg-milk rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-serif font-bold text-chocolate mb-6 text-center">
          Send Us a Message
        </h2>

        {status.success ? (
          <p className="text-green-600 font-semibold text-center">
            ✅ Thank you! We'll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 border border-caramel/30 rounded-lg focus:ring-2 focus:ring-caramel outline-none"
            />
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Phone or Email"
              required
              className="w-full px-4 py-3 border border-caramel/30 rounded-lg focus:ring-2 focus:ring-caramel outline-none"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              required
              className="w-full px-4 py-3 border border-caramel/30 rounded-lg focus:ring-2 focus:ring-caramel outline-none"
            />

            <motion.button
              type="submit"
              className="w-full py-3 bg-caramel text-chocolate font-medium rounded-lg shadow-md hover:bg-chocolate transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={status.loading}
            >
              {status.loading ? "Sending..." : "Send Message"}
            </motion.button>

            {status.error && <p className="text-red-600 text-center mt-2">{status.error}</p>}
          </form>
        )}
      </div>
    </section>
  )
}