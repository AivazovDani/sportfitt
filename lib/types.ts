import type { User, TrainerProfile, Appointment, AvailabilitySlot, Review } from "@prisma/client"

export type UserWithProfile = User & {
  trainerProfile?: TrainerProfile
}

export type TrainerWithUser = TrainerProfile & {
  user: User
}

export type AppointmentWithDetails = Appointment & {
  slot: AvailabilitySlot & {
    trainer: TrainerProfile & {
      user: User
    }
  }
  client: User
  review?: Review
}

export interface OnboardingData {
  specialties: string[]
  city: string
  venueType: string
}
