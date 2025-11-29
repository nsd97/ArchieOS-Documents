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
}

export function Section({
  id,
  children,
  className,
  fullHeight = false,
  componentName,
}: SectionProps) {
  const { debugMode } = useDebug()

  return (
    <section
      id={id}
      className={cn(
        "relative",
        fullHeight && "min-h-screen",
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
