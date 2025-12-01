"use client"

import { Section } from "@/components/layout/Section"
import { useDebug } from "@/components/debug/DebugProvider"
import { cn } from "@/lib/utils"

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

export function HeroSection() {
  const { debugMode } = useDebug()

  return (
    <Section
      id="hero"
      fullHeight
      snapAlign="start"
      className="flex flex-col items-center justify-center px-6"
      componentName="<HeroSection>"
    >
      {/* CONTENT WRAPPER */}
      <div
        className={cn(
          "relative flex flex-col items-center",
          debugMode && "border-2 border-dashed border-blue-500"
        )}
      >
        <DebugLabel label="CONTENT WRAPPER flex-col items-center" color="blue" />

        {/* Main headline - two lines */}
        <h1
          className={cn(
            "relative text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center leading-tight",
            debugMode && "border border-dashed border-orange-400"
          )}
        >
          {debugMode && (
            <span className="absolute -top-5 left-0 text-[9px] text-orange-500 font-mono">
              h1.headline
            </span>
          )}
          <span
            className={cn(
              "relative block",
              debugMode && "border border-dotted border-purple-400"
            )}
          >
            {debugMode && (
              <span className="absolute -top-3 right-0 text-[8px] text-purple-500 font-mono">
                span.line-1
              </span>
            )}
            Tired of pulling out your laptop
          </span>
          <span
            className={cn(
              "relative block",
              debugMode && "border border-dotted border-purple-400"
            )}
          >
            {debugMode && (
              <span className="absolute -top-3 right-0 text-[8px] text-purple-500 font-mono">
                span.line-2
              </span>
            )}
            while driving?
          </span>
        </h1>

        {/* Subhead */}
        <p
          className={cn(
            "relative mt-6 text-lg md:text-xl lg:text-2xl text-center max-w-xl text-text-secondary",
            debugMode && "border border-dashed border-green-400"
          )}
        >
          {debugMode && (
            <span className="absolute -top-4 left-0 text-[9px] text-green-500 font-mono">
              p.subhead max-w-xl
            </span>
          )}
          The first AI that handles the{" "}
          <strong
            className={cn(
              "relative font-semibold text-foreground",
              debugMode && "border border-dotted border-cyan-400"
            )}
          >
            {debugMode && (
              <span className="absolute -bottom-4 left-0 text-[8px] text-cyan-500 font-mono">
                strong
              </span>
            )}
            entire
          </strong>{" "}
          back office.
        </p>
      </div>

      {/* Scroll prompt */}
      <p
        className={cn(
          "relative absolute bottom-8 text-xs tracking-[0.2em] uppercase text-text-secondary",
          debugMode && "border border-dashed border-pink-400"
        )}
      >
        {debugMode && (
          <span className="absolute -top-4 left-0 text-[9px] text-pink-500 font-mono">
            p.scroll-prompt absolute bottom-8
          </span>
        )}
        Scroll to witness
      </p>
    </Section>
  )
}
