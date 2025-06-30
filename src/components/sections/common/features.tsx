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
      title: "Bài học tương tác",
      description: "Học thông qua các bài học hấp dẫn, ngắn gọn được thiết kế bởi các chuyên gia tiếng Nhật.",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Phát âm bằng âm thanh",
      description: "Hoàn thiện cách phát âm của bạn với công nghệ nhận dạng giọng nói và âm thanh của người bản xứ.",
      color: "text-green-600 bg-green-100",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Thực hành đàm thoại",
      description: "Thực hành các cuộc trò chuyện thực tế với gia sư AI và người bản ngữ Nhật Bản.",
      color: "text-purple-600 bg-purple-100",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Lặp lại cách quãng",
      description: "Tối ưu hóa việc học của bạn với hệ thống lặp lại giãn cách đã được chứng minh khoa học.",
      color: "text-orange-600 bg-orange-100",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Đường dẫn cá nhân",
      description: "Nhận lộ trình học tập tùy chỉnh dựa trên mục tiêu và trình độ hiện tại của bạn.",
      color: "text-red-600 bg-red-100",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Theo dõi tiến trình",
      description: "Theo dõi tiến trình của bạn với phân tích chi tiết và huy hiệu thành tích.",
      color: "text-yellow-600 bg-yellow-100",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Tại sao nên chọn nền tảng của chúng tôi?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trải nghiệm cách học tiếng Nhật hiệu quả nhất với các tính năng cải tiến của chúng tôi
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
