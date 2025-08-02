import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const specialties = searchParams.get("specialties")?.split(",") || []
  const city = searchParams.get("city")
  const venueType = searchParams.get("venueType")
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")

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

  const [trainers, total] = await Promise.all([
    prisma.trainerProfile.findMany({
      where,
      include: {
        user: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        avgRating: "desc",
      },
    }),
    prisma.trainerProfile.count({ where }),
  ])

  return NextResponse.json({
    trainers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  })
}
