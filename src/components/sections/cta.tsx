import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <BookOpen className="h-16 w-16 mx-auto mb-6 text-red-200" />
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Ready to Start Your Japanese Journey?</h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Join over 100,000 learners who are already mastering Japanese. Start with our free lessons today and see
              the difference.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-8">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-red-200"
            />
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 whitespace-nowrap">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="text-red-200 text-sm">No credit card required • 7-day free trial • Cancel anytime</div>
        </div>
      </div>
    </section>
  )
}
