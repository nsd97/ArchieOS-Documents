import { Header } from "@/components/layout/Header"
import { HeroSection } from "@/components/landing/sections/HeroSection"
import { StreamSection } from "@/components/landing/sections/StreamSection"

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StreamSection />
      </main>
    </>
  )
}
