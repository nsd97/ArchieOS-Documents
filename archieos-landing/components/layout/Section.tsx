"use client"

import { cn } from "@/lib/utils"
import { useDebug } from "@/components/debug/DebugProvider"

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
  fullHeight?: boolean
  /** Component name for debug display */
  componentName?: string
  /** Scroll snap alignment: start, center, end, or none */
  snapAlign?: "start" | "center" | "end" | "none"
}

export function Section({
  id,
  children,
  className,
  fullHeight = false,
  componentName,
  snapAlign = "start",
}: SectionProps) {
  const { debugMode } = useDebug()

  return (
    <section
      id={id}
      className={cn(
        "relative",
        fullHeight && "min-h-screen",
        // Scroll snap alignment (Tailwind v4 built-in utilities)
        snapAlign === "start" && "snap-start",
        snapAlign === "center" && "snap-center",
        snapAlign === "end" && "snap-end",
        snapAlign === "none" && "snap-none",
        // Account for fixed header height
        "scroll-mt-12",
        debugMode && "border-2 border-dashed border-pink-500",
        className
      )}
    >
      {/* Debug label */}
      {debugMode && (
        <div className="absolute top-0 left-0 z-[9999] bg-pink-500 text-white text-xs font-mono px-2 py-1 rounded-br">
          {componentName || `<Section id="${id}">`}
        </div>
      )}
      {/* Debug divider line at top */}
      {debugMode && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-pink-500" />
      )}
      {children}
    </section>
  )
}
