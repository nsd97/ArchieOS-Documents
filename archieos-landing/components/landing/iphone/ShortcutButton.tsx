"use client"

import { cn } from "@/lib/utils"

interface Props {
  isPressed: boolean
}

export function ShortcutButton({ isPressed }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* The Button */}
      <div className={cn(
        "w-16 h-16 rounded-2xl",
        "bg-gradient-to-br from-[#FF6B6B] via-[#FF3366] to-[#E6194B]",
        "flex items-center justify-center",
        "transition-all duration-150 ease-out",
        isPressed ? "scale-90 shadow-md" : "scale-100 shadow-lg"
      )}>
        {/* Microphone Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      </div>

      {/* Label */}
      <span className="text-xs text-neutral-500 font-medium">
        Archie
      </span>
    </div>
  )
}
