import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { TrainerProfile } from "@/components/trainer-card"
import { BookingCalendar } from "@/components/booking-calendar"

interface TrainerPageProps {
  params: {
    id: string
  }
}

async function getTrainer(id: string) {
  const trainer = await prisma.trainerProfile.findUnique({
    where: { id },
    include: {
      user: true,
      availabilitySlots: {
        where: {
          startAt: {
            gte: new Date(),
          },
          isBooked: false,
        },
        orderBy: {
          startAt: "asc",
        },
      },
    },
  })

  return trainer
}

export default async function TrainerPage({ params }: TrainerPageProps) {
  const trainer = await getTrainer(params.id)

  if (!trainer) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TrainerProfile trainer={trainer} />
          </div>

          <div className="lg:col-span-1">
            <BookingCalendar trainerId={trainer.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
