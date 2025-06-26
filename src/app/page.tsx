import { Hero } from "@/components/sections/common/hero"
import { Features } from "@/components/sections/common/features"
import { Courses } from "@/components/sections/common/courses"
import { Testimonials } from "@/components/sections/common/testimonials"
import { Stats } from "@/components/sections/common/stats"
import { CTA } from "@/components/sections/common/cta"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/Footer"


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header/>
      <Hero />
      <Features />
      <Stats />
      <Courses />
      <Testimonials />
      <CTA />
      <Footer/>
    </main>
  )
}
