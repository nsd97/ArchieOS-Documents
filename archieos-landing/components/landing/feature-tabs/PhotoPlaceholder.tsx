"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Warm gradient palette matching ArchieOS brand
const gradients = [
  "from-amber-100 to-orange-50", // Warm living room feel
  "from-slate-100 to-zinc-50", // Modern kitchen
  "from-blue-50 to-indigo-100", // Bedroom tranquility
  "from-emerald-50 to-teal-100", // Backyard/garden
  "from-stone-100 to-neutral-50", // Exterior/neutral
  "from-rose-50 to-pink-100", // Bathroom warmth
]

interface PhotoPlaceholderProps {
  index?: number
  aspectRatio?: string
  extractedTag?: string
  className?: string
}

export function PhotoPlaceholder({
  index = 0,
  aspectRatio = "4/3",
  extractedTag,
  className,
}: PhotoPlaceholderProps) {
  const gradientClass = gradients[index % gradients.length]

  return (
    <div
      className={cn(
        "relative rounded-lg overflow-hidden",
        "bg-gradient-to-br",
        gradientClass,
        className
      )}
      style={{ aspectRatio }}
    >
      {/* Subtle noise texture overlay for richness */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Extracted tag badge */}
      {extractedTag && (
        <Badge
          variant="secondary"
          className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm text-xs font-normal"
        >
          {extractedTag}
        </Badge>
      )}
    </div>
  )
}
