import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Headphones, MessageCircle, Brain, Target, Trophy } from "lucide-react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

export function Features() {
  const features: Feature[] = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Interactive Lessons",
      description: "Learn through engaging, bite-sized lessons designed by Japanese language experts.",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Audio Pronunciation",
      description: "Perfect your pronunciation with native speaker audio and speech recognition.",
      color: "text-green-600 bg-green-100",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Conversation Practice",
      description: "Practice real conversations with AI tutors and native Japanese speakers.",
      color: "text-purple-600 bg-purple-100",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Spaced Repetition",
      description: "Optimize your learning with scientifically-proven spaced repetition system.",
      color: "text-orange-600 bg-orange-100",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Personalized Path",
      description: "Get a customized learning path based on your goals and current level.",
      color: "text-red-600 bg-red-100",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Progress Tracking",
      description: "Track your progress with detailed analytics and achievement badges.",
      color: "text-yellow-600 bg-yellow-100",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the most effective way to learn Japanese with our innovative features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
