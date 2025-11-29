import { Section } from "@/components/layout/Section"

export function HeroSection() {
  return (
    <Section
      id="hero"
      fullHeight
      snapAlign="start"
      className="flex flex-col items-center justify-center px-6"
      componentName="<HeroSection>"
    >
      {/* Main headline - two lines */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center leading-tight">
        <span className="block">Tired of pulling out your laptop</span>
        <span className="block">while driving?</span>
      </h1>

      {/* Subhead */}
      <p className="mt-6 text-lg md:text-xl lg:text-2xl text-center max-w-xl text-text-secondary">
        The first AI that handles the <strong className="font-semibold text-foreground">entire</strong> back office.
      </p>

      {/* Scroll prompt */}
      <p className="absolute bottom-8 text-xs tracking-[0.2em] uppercase text-text-secondary">
        Scroll to witness
      </p>
    </Section>
  )
}
