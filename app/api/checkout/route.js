import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { formData, items, totalItems, totalPrice, shipping, finalTotal } = body;

    const TELEGRAM_BOT_TOKEN = "8585003789:AAEy1EKCRthuCRTzRWoPL5Wo0iqmBEp-Xgc";
    const TELEGRAM_CHAT_ID = "8723653493";

    // Format the message
    let message = `🚨 *NEW ORDER RECEIVED - MIVERON* 🚨\n\n`;

    message += `👤 *Customer Info*\n`;
    message += `Name: ${formData.firstName} ${formData.lastName}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Address: ${formData.address}, ${formData.city}, ${formData.governorate}\n\n`;

    message += `📦 *Order Summary (${totalItems} items)*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Qty: ${item.quantity} | EGP ${item.price.toLocaleString()}\n`;
      if (item.color) message += `   Color: ${item.color}\n`;
      message += `   Link: https://miveron.com/product/${item.id}\n\n`;
    });

    message += `\n💰 *Payment Details*\n`;
    message += `Subtotal: EGP ${totalPrice.toLocaleString()}\n`;
    message += `Shipping: EGP ${shipping.toLocaleString()}\n`;
    message += `*Grand Total: EGP ${finalTotal.toLocaleString()}*\n`;

    // Send to Telegram
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description || "Failed to send telegram message");
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process order." },
      { status: 500 }
    );
  }
}
