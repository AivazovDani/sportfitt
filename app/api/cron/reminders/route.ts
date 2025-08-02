import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import { addHours } from "date-fns"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET() {
  const now = new Date()
  const in24Hours = addHours(now, 24)

  // Find appointments that need reminders
  const appointments = await prisma.appointment.findMany({
    where: {
      reminderSent: false,
      status: "BOOKED",
      slot: {
        startAt: {
          gte: now,
          lte: in24Hours,
        },
      },
    },
    include: {
      client: true,
      slot: {
        include: {
          trainer: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  })

  for (const appointment of appointments) {
    try {
      await resend.emails.send({
        from: "SportFit <noreply@sportfit.bg>",
        to: appointment.client.email,
        subject: "Напомняне за тренировка утре",
        html: `
          <h2>Напомняне за тренировка</h2>
          <p>Здравейте ${appointment.client.name},</p>
          <p>Напомняме ви, че утре имате тренировка с ${appointment.slot.trainer.user.name}.</p>
          <p><strong>Време:</strong> ${appointment.slot.startAt.toLocaleString("bg-BG")}</p>
          <p>Очакваме ви!</p>
        `,
      })

      await prisma.appointment.update({
        where: { id: appointment.id },
        data: { reminderSent: true },
      })
    } catch (error) {
      console.error("Failed to send reminder:", error)
    }
  }

  return NextResponse.json({ sent: appointments.length })
}
