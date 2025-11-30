"use client"

import { cn } from "@/lib/utils"

interface BrowserMockupProps {
  url: string
  children: React.ReactNode
  className?: string
}

export function BrowserMockup({ url, children, className }: BrowserMockupProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl overflow-hidden",
        "border border-black/10",
        "shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {/* Browser Chrome - Safari-style */}
      <div className="flex items-center gap-2 px-3 py-2.5 bg-neutral-100/80 border-b border-black/5">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/80 rounded-md text-xs text-muted-foreground max-w-md w-full">
            {/* Nav buttons */}
            <div className="flex items-center gap-1 text-black/30 shrink-0">
              <span>←</span>
              <span>→</span>
              <span className="ml-1">⟳</span>
            </div>
            {/* URL */}
            <span className="truncate text-black/50">{url}</span>
          </div>
        </div>

        {/* Spacer for balance */}
        <div className="w-[52px]" />
      </div>

      {/* Browser Content */}
      <div className="bg-white">{children}</div>
    </div>
  )
}
