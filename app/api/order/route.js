import nodemailer from "nodemailer"

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, phone, item, unitPrice, quantity, totalPrice, note } = body

    // ✅ Validate required fields
    if (!name || !phone || !item || !email) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400 }
      )
    }

    // -------------------------
    // Normalize Phone
    // -------------------------
    const formatPhone = (number) => {
      const cleaned = number.replace(/\D/g, "")
      if (cleaned.startsWith("234")) return cleaned
      return `234${cleaned.replace(/^0/, "")}`
    }

    const customerPhone = formatPhone(phone)
    const adminPhone = process.env.ADMIN_WHATSAPP

    // -------------------------
    // Message Templates
    // -------------------------
    const messageToAdmin = `📢 New Order Received
Name: ${name}
Email: ${email}
Phone: ${phone}
Item: ${item}
Unit Price: ₦${unitPrice || 0}
Quantity: ${quantity}
Total: ₦${totalPrice || 0}
Note: ${note || "None"}`

    const messageToCustomer = `Hi ${name}, your order for ${item} x${quantity} has been received! ✅
Total: ₦${totalPrice}.
We will contact you shortly. Thank you for choosing Creams ’n’ Bakers.`

    // -------------------------
    // WhatsApp (Optional)
    // -------------------------
    if (
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.WHATSAPP_ACCESS_TOKEN &&
      adminPhone
    ) {
      const whatsappURL = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`
      try {
        // Admin
        await fetch(whatsappURL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: adminPhone,
            type: "text",
            text: { body: messageToAdmin },
          }),
        })

        // Customer
        await fetch(whatsappURL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: customerPhone,
            type: "text",
            text: { body: messageToCustomer },
          }),
        })
      } catch (whatsappError) {
        console.warn("WhatsApp API skipped or failed:", whatsappError.message)
      }
    }

    // -------------------------
    // Email Setup
    // -------------------------
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // HTML Email Template for Admin
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color:#d2691e;">📢 New Order Received</h2>
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Additional Note:</strong> ${note || "None"}</p>

        <h3 style="margin-top:20px;">Order Details</h3>
        <table style="width:100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background:#f5f5f5;">
              <th style="border:1px solid #ddd; padding:8px;">Item</th>
              <th style="border:1px solid #ddd; padding:8px;">Unit Price</th>
              <th style="border:1px solid #ddd; padding:8px;">Quantity</th>
              <th style="border:1px solid #ddd; padding:8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border:1px solid #ddd; padding:8px;">${item}</td>
              <td style="border:1px solid #ddd; padding:8px;">₦${unitPrice}</td>
              <td style="border:1px solid #ddd; padding:8px;">${quantity}</td>
              <td style="border:1px solid #ddd; padding:8px;">₦${totalPrice}</td>
            </tr>
          </tbody>
        </table>

        <p style="margin-top:20px;">💡 Please follow up with the customer as soon as possible.</p>
      </div>
    `

    // HTML Email Template for Customer
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color:#d2691e;">Hi ${name},</h2>
        <p>Thank you for ordering from <strong>Creams ’n’ Bakers</strong>! 🎉</p>
        <p>We have received your order and will contact you soon.</p>

        <h3 style="margin-top:20px;">Your Order Summary</h3>
        <table style="width:100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background:#f5f5f5;">
              <th style="border:1px solid #ddd; padding:8px;">Item</th>
              <th style="border:1px solid #ddd; padding:8px;">Unit Price</th>
              <th style="border:1px solid #ddd; padding:8px;">Quantity</th>
              <th style="border:1px solid #ddd; padding:8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border:1px solid #ddd; padding:8px;">${item}</td>
              <td style="border:1px solid #ddd; padding:8px;">₦${unitPrice}</td>
              <td style="border:1px solid #ddd; padding:8px;">${quantity}</td>
              <td style="border:1px solid #ddd; padding:8px;">₦${totalPrice}</td>
            </tr>
          </tbody>
        </table>

        <p style="margin-top:20px;">We will reach out to confirm and deliver your order.</p>
        <p style="margin-top:10px;">Thank you for trusting us! 💛</p>
      </div>
    `

    // Send Admin Email
    await transporter.sendMail({
      from: `"Creams ’n’ Bakers" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Order from ${name}`,
      text: messageToAdmin,
      html: adminHtml,
    })

    // Send Customer Email
    await transporter.sendMail({
      from: `"Creams ’n’ Bakers" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your Order Confirmation - Creams ’n’ Bakers`,
      text: messageToCustomer,
      html: customerHtml,
    })

    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    console.error("Order error:", error)
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    })
  }
}