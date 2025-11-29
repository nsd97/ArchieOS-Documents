"use client"

import { ShortcutButton } from "./ShortcutButton"
import { LiveWaveform } from "@/components/ui/waveform"
import { cn } from "@/lib/utils"

type AnimationState = "idle" | "visible" | "buttonPressed" | "listening"

interface Props {
  animationState: AnimationState
}

export function IPhoneMockup({ animationState }: Props) {
  const isVisible = animationState !== "idle"
  const isListening = animationState === "listening"

  return (
    <div className={cn(
      "w-[280px] md:w-[320px]",
      "transition-all duration-700 ease-out",
      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
    )}>
      {/* iPhone Frame */}
      <div className="relative bg-neutral-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="w-24 h-7 bg-black rounded-full" />
        </div>

        {/* Screen */}
        <div className={cn(
          "relative bg-white rounded-[2.5rem] overflow-hidden",
          "aspect-[9/19.5]",
          "flex flex-col items-center justify-center",
          "pt-16 pb-8 px-6"
        )}>
          {/* Shortcut Button */}
          <ShortcutButton isPressed={animationState === "buttonPressed"} />

          {/* Waveform */}
          <div className={cn(
            "absolute bottom-12 left-6 right-6",
            "transition-opacity duration-500",
            isListening ? "opacity-100" : "opacity-0"
          )}>
            <LiveWaveform
              active={isListening}
              mode="scrolling"
              prefill={true}
              minHeight={0.15}
              speed={isListening ? 35 : 0}
              height={48}
              barCount={30}
              barWidth={3}
              barGap={3}
              barColor="#000000"
              fadeEdges={true}
              fadeWidth={20}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
