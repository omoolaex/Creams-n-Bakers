"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function OrderForm() {
  const searchParams = useSearchParams();
  const [hydrated, setHydrated] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    item: "",
    unitPrice: 0,
    quantity: 1,
    note: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  // ✅ Hydrate prefilled values only on the client to prevent SSR mismatch
  useEffect(() => {
    setHydrated(true);
    const prefillProduct = searchParams.get("product") || "";
    const prefillPrice = parseFloat(searchParams.get("price") || "0");
    setForm((prev) => ({
      ...prev,
      item: prefillProduct,
      unitPrice: prefillPrice,
    }));
  }, [searchParams]);

  const totalPrice = form.unitPrice * form.quantity;
  const formattedTotal = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(totalPrice);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "quantity" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ message: "", type: "" });

    const orderData = {
      ...form,
      totalPrice: totalPrice.toFixed(2),
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();
      if (result.success) {
        setToast({
          message: "✅ Order submitted! Confirmation email sent.",
          type: "success",
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          item: "",
          unitPrice: 0,
          quantity: 1,
          note: "",
        });
      } else {
        setToast({
          message: "❌ Failed to submit order. Please try again.",
          type: "error",
        });
      }
    } catch {
      setToast({ message: "❌ Network error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ message: "", type: "" }), 5000);
    }
  };

  if (!hydrated) {
    return (
      <section className="bg-milk py-16 text-center">
        <p className="text-cocoa">Loading order form...</p>
      </section>
    );
  }

  return (
    <section className="bg-milk py-16 relative">
      <div className="max-w-xl mx-auto px-6 bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-serif font-bold text-chocolate mb-6 text-center">
          Quick Order Form
        </h2>

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
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 border border-caramel/30 rounded-lg focus:ring-2 focus:ring-caramel outline-none"
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full px-4 py-3 border border-caramel/30 rounded-lg focus:ring-2 focus:ring-caramel outline-none"
          />
          <input
            type="text"
            name="item"
            value={form.item}
            onChange={handleChange}
            placeholder="Item Name"
            required
            className="w-full px-4 py-3 border border-caramel/30 rounded-lg focus:ring-2 focus:ring-caramel outline-none"
          />

          <input
            type="number"
            name="quantity"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
            className="w-full px-4 py-3 border border-caramel/30 rounded-lg focus:ring-2 focus:ring-caramel outline-none"
          />

          {/* Formatted Total Price */}
          <input
            type="text"
            value={formattedTotal}
            readOnly
            className="w-full px-4 py-3 border border-caramel/30 rounded-lg bg-milk/50 text-gray-500"
          />

          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Additional Notes (optional)"
            rows="3"
            className="w-full px-4 py-3 border border-caramel/30 rounded-lg focus:ring-2 focus:ring-caramel outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg shadow-md transition text-chocolate font-semibold
              ${loading ? "bg-caramel/60 cursor-not-allowed" : "bg-caramel hover:bg-chocolate"}`}
          >
            {loading ? "Submitting..." : "Submit Order"}
          </button>
        </form>
      </div>

      {toast.message && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg text-white 
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
          role="alert"
        >
          {toast.message}
        </div>
      )}
    </section>
  );
}
