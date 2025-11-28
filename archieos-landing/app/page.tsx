import { Header } from "@/components/layout/Header"
import { HeroSection } from "@/components/landing/sections/HeroSection"

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {/* Future sections added here */}
      </main>
    </>
  )
}
