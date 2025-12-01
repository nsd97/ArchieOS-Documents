"use client"

import { useEffect, useRef, useState } from "react"
import { Section } from "@/components/layout/Section"
import { IPhoneMockup } from "@/components/landing/iphone/IPhoneMockup"
import { useDebug } from "@/components/debug/DebugProvider"
import { cn } from "@/lib/utils"

type AnimationState = "idle" | "visible" | "buttonPressed" | "listening"

// Debug label component
function DebugLabel({
  label,
  position = "top-left",
  color = "pink",
}: {
  label: string
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  color?: "pink" | "blue" | "green" | "orange" | "purple" | "cyan"
}) {
  const { debugMode } = useDebug()
  if (!debugMode) return null

  const colorClasses = {
    pink: "bg-pink-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
    cyan: "bg-cyan-500",
  }

  const positionClasses = {
    "top-left": "top-0 left-0 rounded-br",
    "top-right": "top-0 right-0 rounded-bl",
    "bottom-left": "bottom-0 left-0 rounded-tr",
    "bottom-right": "bottom-0 right-0 rounded-tl",
  }

  return (
    <div
      className={cn(
        "absolute z-[9999] text-white text-[10px] font-mono px-1.5 py-0.5",
        colorClasses[color],
        positionClasses[position]
      )}
    >
      {label}
    </div>
  )
}

export function ShortcutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<AnimationState>("idle")
  const { debugMode } = useDebug()

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
    <Section
      id="shortcut"
      fullHeight
      snapAlign="start"
      className="flex flex-col items-center justify-center"
      componentName="<ShortcutSection>"
    >
      {/* CONTENT CONTAINER */}
      <div
        ref={sectionRef}
        className={cn(
          "relative flex flex-col items-center px-4",
          debugMode && "border-2 border-dashed border-blue-500"
        )}
      >
        <DebugLabel label="CONTENT CONTAINER flex-col items-center px-4" color="blue" />

        {/* Headline */}
        <h2
          className={cn(
            "relative text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-8 md:mb-12",
            debugMode && "border border-dashed border-orange-400"
          )}
        >
          {debugMode && (
            <span className="absolute -top-5 left-0 text-[9px] text-orange-500 font-mono">
              h2.headline mb-8→md:mb-12
            </span>
          )}
          What if you could just talk...
        </h2>

        {/* iPhone Mockup Wrapper */}
        <div
          className={cn(
            "relative",
            debugMode && "border-2 border-dashed border-green-500"
          )}
        >
          <DebugLabel label="iPHONE MOCKUP WRAPPER" color="green" position="top-right" />
          {debugMode && (
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-green-500 font-mono whitespace-nowrap">
              state: {state}
            </span>
          )}
          <IPhoneMockup animationState={state} />
        </div>

        {/* Instruction text */}
        <p
          className={cn(
            "relative mt-8 text-lg md:text-xl text-text-secondary text-center",
            "transition-opacity duration-500",
            state === "listening" ? "opacity-100" : "opacity-0",
            debugMode && "border border-dashed border-pink-400"
          )}
        >
          {debugMode && (
            <span className="absolute -top-4 left-0 text-[9px] text-pink-500 font-mono">
              p.instruction opacity-transition
            </span>
          )}
          Just press and speak
        </p>
      </div>
    </Section>
  )
}
