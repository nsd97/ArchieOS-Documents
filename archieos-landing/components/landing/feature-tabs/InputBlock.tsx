"use client"

import { StaticWaveform } from "@/components/ui/waveform"
import { cn } from "@/lib/utils"

interface InputBlockProps {
  className?: string
}

const transcript = `"Just hung up with Sarah Chen she wants to list 42 Maple probably 1.2 maybe 1.3 detached four bed three bath she's flexible but wants photos this week oh and she's got a tenant until the 15th..."`

export function InputBlock({ className }: InputBlockProps) {
  return (
    <div
      role="region"
      aria-label="Voice memo input that generated all outputs"
      className={cn(
        // Raw, imperfect aesthetic - contrast with polished outputs
        "bg-black/[0.02] border border-dashed border-black/10 rounded-xl",
        "p-4 md:p-5 lg:p-6",
        className
      )}
    >
      {/* Waveform with duration */}
      <div className="flex items-center gap-3">
        <StaticWaveform
          bars={50}
          seed={42}
          barColor="#999999"
          barWidth={2}
          barGap={2}
          barRadius={1}
          height={40}
          fadeEdges={false}
          className="flex-1"
        />
        <span className="text-xs text-muted-foreground font-mono shrink-0 tabular-nums">
          0:34
        </span>
      </div>

      {/* Transcript - messy, real, human */}
      <p className="mt-3 text-sm md:text-base text-muted-foreground font-mono leading-relaxed">
        {transcript}
      </p>
    </div>
  )
}
