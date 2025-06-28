import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star } from "lucide-react"
import { Image } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  level: string
  duration: string
  students: number
  rating: number
  price: string
  image: string
  features: string[]
}

export function Courses() {
  const courses: Course[] = [
    {
      id: "1",
      title: "Hiragana & Katakana Mastery",
      description: "Master the fundamental Japanese writing systems with interactive exercises and mnemonics.",
      level: "Beginner",
      duration: "4 weeks",
      students: 15420,
      rating: 4.9,
      price: "Free",
      image: "/placeholder.svg?height=200&width=300",
      features: ["46 Characters Each", "Writing Practice", "Audio Pronunciation", "Memory Games"],
    },
    {
      id: "2",
      title: "Essential Kanji for Daily Life",
      description: "Learn the most important 1000 Kanji characters used in everyday Japanese communication.",
      level: "Intermediate",
      duration: "12 weeks",
      students: 8930,
      rating: 4.8,
      price: "$29/month",
      image: "/placeholder.svg?height=200&width=300",
      features: ["1000+ Kanji", "Stroke Order", "Radical System", "Context Examples"],
    },
    {
      id: "3",
      title: "Japanese Grammar Complete",
      description: "Comprehensive grammar course covering all JLPT levels from N5 to N1.",
      level: "All Levels",
      duration: "24 weeks",
      students: 12650,
      rating: 4.9,
      price: "$49/month",
      image: "/placeholder.svg?height=200&width=300",
      features: ["JLPT N5-N1", "Grammar Patterns", "Example Sentences", "Practice Tests"],
    },
  ]

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Popular Courses</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our carefully crafted courses designed to take you from beginner to fluent
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                />

                <Badge
                  className="absolute top-4 left-4"
                  variant={
                    course.level === "Beginner"
                      ? "secondary"
                      : course.level === "Intermediate"
                        ? "default"
                        : "destructive"
                  }
                >
                  {course.level}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <p className="text-gray-600">{course.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">What you'll learn:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="text-2xl font-bold text-red-600">{course.price}</div>
                  <Button className="bg-red-600 hover:bg-red-700">
                    {course.price === "Free" ? "Start Free" : "Enroll Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/courselist"><Button variant="outline" size="lg">
            View All Courses
          </Button></a>
        </div>
      </div>
    </section>
  )
}
