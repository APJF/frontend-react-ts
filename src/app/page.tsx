import { Hero } from "@/components/sections/common/hero"
import { Features } from "@/components/sections/common/features"
import { Courses } from "@/components/sections/common/courses"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/Footer"


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header/>
      <Hero />
      <Features />
      <Courses />
      <Footer/>
    </main>
  )
}
