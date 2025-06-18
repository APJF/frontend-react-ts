import { Button } from "@/components/ui/button"
import { Play, Star, Users, BookOpen } from "lucide-react"
import { Image } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-pink-50 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">あ</div>
        <div className="absolute top-32 right-20 text-4xl">漢</div>
        <div className="absolute bottom-20 left-20 text-5xl">カ</div>
        <div className="absolute bottom-32 right-10 text-3xl">字</div>
      </div>

      <div className="container relative w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center justify-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                <Star className="h-4 w-4" />
                <span>Trusted by 100,000+ learners</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Master{" "}
                <span className="text-red-600 relative">
                  Japanese
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-red-200"
                    viewBox="0 0 200 12"
                    fill="currentColor"
                  >
                    <path d="M0,8 Q50,0 100,8 T200,8 L200,12 L0,12 Z" />
                  </svg>
                </span>{" "}
                with Confidence
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Learn Japanese through interactive lessons, practice with native speakers, and master Hiragana,
                Katakana, and Kanji with our comprehensive platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Learning Free
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">100,000+ Students</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-600 ml-2">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="Japanese Learning Platform"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl"
                />
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 z-20">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">
                  あ
                </div>
                <div>
                  <div className="text-sm font-medium">Hiragana</div>
                  <div className="text-xs text-gray-500">Basic Characters</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 z-20">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  漢
                </div>
                <div>
                  <div className="text-sm font-medium">Kanji</div>
                  <div className="text-xs text-gray-500">Advanced Writing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
