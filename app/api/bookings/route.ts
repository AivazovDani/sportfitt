import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

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

  // Payment disabled: respond with message
  return NextResponse.json({ message: "Booking request received" })
}
