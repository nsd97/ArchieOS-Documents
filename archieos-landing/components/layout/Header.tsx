"use client"

import Image from "next/image"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-10 md:h-12 px-4 md:px-6">
        <Image
          src="/Archie-Logo.svg"
          alt="Archie"
          width={120}
          height={40}
          className="rounded w-[100px] md:w-[120px] h-auto"
          priority
        />
        <button className="bg-black text-white text-sm font-medium px-4 py-1.5 rounded-full hover:bg-neutral-800 transition-colors">
          Join Waitlist
        </button>
      </div>
    </header>
  )
}
