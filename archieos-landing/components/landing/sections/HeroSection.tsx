"use client"

import { Section } from "@/components/layout/Section"
import { LiveWaveform } from "@/components/ui/waveform"

export function HeroSection() {
  return (
    <Section
      id="hero"
      fullHeight
      className="flex flex-col items-center justify-center px-6"
    >
      {/* Relief. */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
        Relief.
      </h1>

      {/* Subhead */}
      <p className="mt-6 text-lg md:text-xl lg:text-2xl text-center max-w-xl">
        The first AI that handles the{" "}
        <em className="font-medium">entire</em> back office.
      </p>

      {/* Waveform */}
      <div className="mt-12 w-full max-w-md">
        <LiveWaveform
          active={true}
          mode="scrolling"
          prefill={true}
          minHeight={0.15}
          speed={25}
          height={80}
          barCount={40}
          barWidth={3}
          barGap={3}
          barColor="#000000"
          fadeEdges={true}
          fadeWidth={32}
        />
      </div>

      {/* Scroll prompt */}
      <p className="absolute bottom-8 text-xs tracking-[0.2em] uppercase" style={{ color: '#666666' }}>
        Scroll to witness
      </p>
    </Section>
  )
}
