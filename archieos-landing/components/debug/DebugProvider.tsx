"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface DebugContextType {
  debugMode: boolean
  setDebugMode: (enabled: boolean) => void
  toggleDebugMode: () => void
}

const DebugContext = createContext<DebugContextType>({
  debugMode: false,
  setDebugMode: () => {},
  toggleDebugMode: () => {},
})

export function DebugProvider({ children }: { children: ReactNode }) {
  const [debugMode, setDebugMode] = useState(false)

  const toggleDebugMode = () => setDebugMode((prev) => !prev)

  return (
    <DebugContext.Provider value={{ debugMode, setDebugMode, toggleDebugMode }}>
      {children}
    </DebugContext.Provider>
  )
}

export function useDebug() {
  const context = useContext(DebugContext)
  if (!context) {
    throw new Error("useDebug must be used within a DebugProvider")
  }
  return context
}
