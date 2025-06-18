import { Card, CardContent } from "@/components/ui/card"
import { AvatarFallback,Avatar, AvatarImage } from "../ui/avatar"
import { Star, Quote } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  content: string
  achievement: string
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      content:
        "This platform made learning Japanese so much easier! The interactive lessons and spaced repetition system helped me pass JLPT N4 in just 6 months.",
      achievement: "Passed JLPT N4",
    },
    {
      id: "2",
      name: "Mike Chen",
      role: "Business Analyst",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      content:
        "The conversation practice with native speakers was a game-changer. I went from being afraid to speak to having confident conversations in Japanese.",
      achievement: "Fluent Speaker",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      role: "Student",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      content:
        "I love how the app adapts to my learning pace. The kanji learning system with mnemonics made memorizing characters so much more enjoyable.",
      achievement: "1000+ Kanji Learned",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful Japanese learners who achieved their goals with our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-red-200" />
                  <p className="text-gray-700 leading-relaxed pl-6">{testimonial.content}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <div className="text-sm text-red-600 font-medium">{testimonial.achievement}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
