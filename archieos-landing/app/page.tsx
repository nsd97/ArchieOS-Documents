import { Header } from "@/components/layout/Header"
import { HeroSection } from "@/components/landing/sections/HeroSection"
import { ShortcutSection } from "@/components/landing/sections/ShortcutSection"
import { TasksSection } from "@/components/landing/sections/TasksSection"

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ShortcutSection />
        <TasksSection />
      </main>
    </>
  )
}
