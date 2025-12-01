import { Header } from "@/components/layout/Header"
import { HeroSection } from "@/components/landing/sections/HeroSection"
import { ShortcutSection } from "@/components/landing/sections/ShortcutSection"
import { TasksSection } from "@/components/landing/sections/TasksSection"
import { FeatureTabsSection } from "@/components/landing/sections/FeatureTabsSection"
import { ContactsSection } from "@/components/landing/sections/ContactsSection"

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ShortcutSection />
        <TasksSection />
        <FeatureTabsSection />
        <ContactsSection />
      </main>
    </>
  )
}
