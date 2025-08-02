import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object
    const { slotId, clientId } = paymentIntent.metadata

    // Create appointment and mark slot as booked
    await prisma.$transaction([
      prisma.appointment.create({
        data: {
          slotId,
          clientId,
          paymentIntent: paymentIntent.id,
        },
      }),
      prisma.availabilitySlot.update({
        where: { id: slotId },
        data: { isBooked: true },
      }),
    ])
  }

  return NextResponse.json({ received: true })
}
