import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Star, Clock, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Намерете перфектния треньор за вас</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            SportFit свързва клиенти с най-добрите персонални треньори в България. Резервирайте тренировки онлайн и
            постигнете целите си.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/find">Започнете сега</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white text-blue-600">
              <Link href="/trainers">Разгледайте треньори</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Защо SportFit?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Star className="h-10 w-10 text-yellow-500 mb-4" />
                <CardTitle>Проверени треньори</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Всички треньори са проверени и сертифицирани професионалисти</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-blue-500 mb-4" />
                <CardTitle>Лесно резервиране</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Резервирайте тренировки с няколко клика в удобно за вас време</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-green-500 mb-4" />
                <CardTitle>Сигурни плащания</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Всички плащания са защитени и обработвани сигурно</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Готови да започнете?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Отговорете на няколко въпроса и ще ви препоръчаме най-подходящите треньори
          </p>
          <Button asChild size="lg">
            <Link href="/find">Започнете сега</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
