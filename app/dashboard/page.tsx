import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DashboardTabs } from "@/components/ui/tabs"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/auth/signin")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      trainerProfile: true,
      appointments: {
        include: {
          slot: {
            include: {
              trainer: {
                include: {
                  user: true,
                },
              },
            },
          },
          review: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!user) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Табло</h1>
        <DashboardTabs user={user} />
      </div>
    </div>
  )
}
