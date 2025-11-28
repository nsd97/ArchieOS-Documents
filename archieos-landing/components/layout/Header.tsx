"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { useScrollPosition } from "@/hooks/useScrollPosition"

export function Header() {
  const { isScrolled } = useScrollPosition(50)

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
      style={isScrolled ? { backgroundColor: 'rgba(250, 249, 245, 0.8)' } : undefined}
    >
      <div className="flex items-center h-14 md:h-16 px-4 md:px-6">
        <Image
          src="/Archie-Logo.svg"
          alt="Archie"
          width={40}
          height={40}
          className="rounded"
          priority
        />
      </div>
    </header>
  )
}
