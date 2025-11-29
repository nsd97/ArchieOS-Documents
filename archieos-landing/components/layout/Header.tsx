"use client"

import Image from "next/image"
import { useDebug } from "@/components/debug/DebugProvider"
import { DebugLabel } from "@/components/debug/DebugLabel"

export function Header() {
  const { debugMode, toggleDebugMode } = useDebug()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <DebugLabel name="<Header>" />
      <div className="flex items-center justify-between h-10 md:h-12 px-4 md:px-6">
        <Image
          src="/Archie-Logo.svg"
          alt="Archie"
          width={120}
          height={40}
          className="rounded w-[100px] md:w-[120px] h-auto"
          priority
        />
        <div className="flex items-center gap-3">
          {/* Debug Mode Toggle - only visible in development */}
          {process.env.NODE_ENV === "development" && (
            <button
              onClick={toggleDebugMode}
              className={`text-xs font-mono px-2 py-1 rounded transition-colors ${
                debugMode
                  ? "bg-pink-500 text-white"
                  : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
              }`}
            >
              {debugMode ? "DEBUG ON" : "DEBUG"}
            </button>
          )}
          <button className="bg-black text-white text-sm font-medium px-4 py-1.5 rounded-full hover:bg-neutral-800 transition-colors">
            Join Waitlist
          </button>
        </div>
      </div>
    </header>
  )
}
