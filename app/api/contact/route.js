// app/api/contact/route.js
import nodemailer from "nodemailer"

export async function POST(req) {
  try {
    const { name, contact, message } = await req.json()

    if (!name || !contact || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 })
    }

    // 1️⃣ Email Notification Only
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `Contact: ${contact}\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return new Response(JSON.stringify({ error: "Failed to send message" }), { status: 500 })
  }
}