"use client"

import { useDebug } from "./DebugProvider"
import { cn } from "@/lib/utils"

interface DebugLabelProps {
  name: string
  /** Position of the label */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  /** Additional className */
  className?: string
}

export function DebugLabel({
  name,
  position = "top-left",
  className
}: DebugLabelProps) {
  const { debugMode } = useDebug()

  if (!debugMode) return null

  const positionClasses = {
    "top-left": "top-0 left-0 rounded-br",
    "top-right": "top-0 right-0 rounded-bl",
    "bottom-left": "bottom-0 left-0 rounded-tr",
    "bottom-right": "bottom-0 right-0 rounded-tl",
  }

  return (
    <div
      className={cn(
        "absolute z-[9999] bg-blue-500 text-white text-[10px] font-mono px-1.5 py-0.5",
        positionClasses[position],
        className
      )}
    >
      {name}
    </div>
  )
}

interface DebugWrapperProps {
  name: string
  children: React.ReactNode
  /** Show border around the component */
  showBorder?: boolean
  /** Position of the label */
  labelPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  /** Additional className for the wrapper */
  className?: string
}

/**
 * Wraps a component with debug label and optional border
 * Use this for components that don't have their own relative positioning
 */
export function DebugWrapper({
  name,
  children,
  showBorder = true,
  labelPosition = "top-left",
  className,
}: DebugWrapperProps) {
  const { debugMode } = useDebug()

  return (
    <div
      className={cn(
        "relative",
        debugMode && showBorder && "outline outline-1 outline-dashed outline-blue-500",
        className
      )}
    >
      <DebugLabel name={name} position={labelPosition} />
      {children}
    </div>
  )
}
