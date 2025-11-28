"use client"

import { useEffect, useRef, useState } from "react"
import { Section } from "@/components/layout/Section"
import { IPhoneMockup } from "@/components/landing/iphone/IPhoneMockup"
import { cn } from "@/lib/utils"

type AnimationState = "idle" | "visible" | "buttonPressed" | "listening"

export function ShortcutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<AnimationState>("idle")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && state === "idle") {
          setState("visible")
          // Button press after phone appears
          setTimeout(() => setState("buttonPressed"), 600)
          // Waveform after button press
          setTimeout(() => setState("listening"), 1000)
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [state])

  return (
    <Section id="shortcut" className="py-24 md:py-32">
      <div ref={sectionRef} className="flex flex-col items-center px-4">
        <IPhoneMockup animationState={state} />

        <p className={cn(
          "mt-8 text-lg md:text-xl text-text-secondary text-center",
          "transition-opacity duration-500",
          state === "listening" ? "opacity-100" : "opacity-0"
        )}>
          Just press and speak
        </p>
      </div>
    </Section>
  )
}
