import { Suspense } from "react"
import { TrainersList }    from "../../components/trainers-list"
import { TrainersFilters } from "../../components/trainers-filters"

export default function TrainersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Персонални треньори</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <TrainersFilters />
          </div>

          <div className="lg:col-span-3">
            <Suspense fallback={<div>Зареждане...</div>}>
              <TrainersList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
