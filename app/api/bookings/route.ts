import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe, PLATFORM_FEE_PERCENT } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { slotId } = await request.json()

  const slot = await prisma.availabilitySlot.findUnique({
    where: { id: slotId },
    include: {
      trainer: {
        include: {
          user: true,
        },
      },
    },
  })

  if (!slot || slot.isBooked) {
    return NextResponse.json({ error: "Slot not available" }, { status: 400 })
  }

  const amount = Math.round(slot.trainer.ratePerHr * 100) // Convert to cents
  const platformFee = Math.round(amount * (PLATFORM_FEE_PERCENT / 100))

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "bgn",
      application_fee_amount: platformFee,
      transfer_data: {
        destination: slot.trainer.stripeAccountId!,
      },
      metadata: {
        slotId,
        clientId: session.user.id,
        trainerId: slot.trainer.id,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error("Stripe error:", error)
    return NextResponse.json({ error: "Payment failed" }, { status: 500 })
  }
}
