import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { Courses } from "@/components/sections/courses"
import { Testimonials } from "@/components/sections/testimonials"
import { Stats } from "@/components/sections/stats"
import { CTA } from "@/components/sections/cta"
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
