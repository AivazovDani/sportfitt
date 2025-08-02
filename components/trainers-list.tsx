import { prisma } from "@/lib/prisma"
import { TrainerCard } from "./trainer-card"

interface TrainersListProps {
  searchParams?: {
    specialties?: string
    city?: string
    venueType?: string
    page?: string
  }
}

export async function TrainersList({ searchParams }: TrainersListProps) {
  const specialties = searchParams?.specialties?.split(",") || []
  const city = searchParams?.city
  const venueType = searchParams?.venueType
  const page = Number.parseInt(searchParams?.page || "1")
  const limit = 12

  const where: any = {
    isApproved: true,
  }

  if (specialties.length > 0) {
    where.specialties = {
      hasSome: specialties,
    }
  }

  if (city) {
    where.city = city
  }

  if (venueType) {
    where.venueType = venueType
  }

  const trainers = await prisma.trainerProfile.findMany({
    where,
    include: {
      user: true,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      avgRating: "desc",
    },
  })

  if (trainers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Няма намерени треньори с тези критерии.</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainers.map((trainer) => (
        <TrainerCard key={trainer.id} trainer={trainer} />
      ))}
    </div>
  )
}
