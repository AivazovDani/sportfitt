import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, MessageCircle } from "lucide-react"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import type { TrainerWithUser } from "@/lib/types"

interface TrainerCardProps {
  trainer: TrainerWithUser
}

export function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={trainer.user.image || ""} />
            <AvatarFallback>{trainer.user.name?.charAt(0) || "T"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{trainer.user.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              {trainer.city}
            </div>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm">{trainer.avgRating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {trainer.specialties.slice(0, 2).map((specialty) => (
            <Badge key={specialty} variant="secondary">
              {specialty}
            </Badge>
          ))}
          {trainer.specialties.length > 2 && <Badge variant="outline">+{trainer.specialties.length - 2}</Badge>}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{trainer.bio}</p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{formatPrice(trainer.ratePerHr)}/час</span>
        </div>

        <div className="flex space-x-2">
          <Button asChild className="flex-1">
            <Link href={`/trainers/${trainer.id}`}>Резервирай</Link>
          </Button>
          <Button variant="outline" size="icon">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
