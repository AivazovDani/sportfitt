"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { OnboardingData } from "@/lib/types"

const specialties = [
  { id: "FitnessCoach", label: "Фитнес треньор" },
  { id: "HealthCoach", label: "Здравен консултант" },
  { id: "LifeCoach", label: "Лайф коуч" },
  { id: "PersonalTrainer", label: "Персонален треньор" },
  { id: "GroupInstructor", label: "Групов инструктор" },
]

const cities = ["София", "Пловдив", "Варна", "Бургас", "Русе", "Стара Загора", "Плевен", "Добрич"]

const venueTypes = [
  { id: "Gym", label: "Фитнес зала" },
  { id: "Studio", label: "Студио" },
  { id: "Outdoor", label: "На открито" },
  { id: "Home", label: "У дома" },
]

export default function FindPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<OnboardingData>({
    specialties: [],
    city: "",
    venueType: "",
  })

  const handleSpecialtyChange = (specialtyId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      specialties: checked ? [...prev.specialties, specialtyId] : prev.specialties.filter((id) => id !== specialtyId),
    }))
  }

  const handleSubmit = () => {
    const params = new URLSearchParams({
      specialties: formData.specialties.join(","),
      city: formData.city,
      venueType: formData.venueType,
    })
    router.push(`/trainers?${params.toString()}`)
  }

  const isValid = formData.specialties.length > 0 && formData.city && formData.venueType

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Намерете перфектния треньор</CardTitle>
            <CardDescription>
              Отговорете на няколко въпроса за да ви препоръчаме най-подходящите треньори
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Specialties */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Какъв тип треньор търсите?</h3>
              <div className="grid grid-cols-1 gap-3">
                {specialties.map((specialty) => (
                  <div key={specialty.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={specialty.id}
                      checked={formData.specialties.includes(specialty.id)}
                      onCheckedChange={(checked) => handleSpecialtyChange(specialty.id, checked as boolean)}
                    />
                    <label htmlFor={specialty.id} className="text-sm font-medium">
                      {specialty.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* City */}
            <div>
              <h3 className="text-lg font-semibold mb-3">В кой град?</h3>
              <Select
                value={formData.city}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Изберете град" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Venue Type */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Къде предпочитате да тренирате?</h3>
              <Select
                value={formData.venueType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, venueType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Изберете място" />
                </SelectTrigger>
                <SelectContent>
                  {venueTypes.map((venue) => (
                    <SelectItem key={venue.id} value={venue.id}>
                      {venue.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSubmit} disabled={!isValid} className="w-full" size="lg">
              Намерете треньори
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
