"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BookingCalendarProps {
  trainerId: string
}

export function BookingCalendar({ trainerId }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Резервирайте час</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={(date) => date < new Date()}
          className="rounded-md border"
        />

        {selectedDate && (
          <div className="mt-4 space-y-2">
            <h4 className="font-semibold">Свободни часове</h4>
            {/* Time slots would be loaded here */}
            <Button className="w-full">Резервирай за {selectedDate.toLocaleDateString("bg-BG")}</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
