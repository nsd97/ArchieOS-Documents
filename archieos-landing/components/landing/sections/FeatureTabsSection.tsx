"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Section } from "@/components/layout/Section"
import { InputBlock } from "@/components/landing/feature-tabs/InputBlock"
import { PhotographerTab } from "@/components/landing/feature-tabs/tabs/PhotographerTab"
import { ClientFormTab } from "@/components/landing/feature-tabs/tabs/ClientFormTab"
import { ListingTab } from "@/components/landing/feature-tabs/tabs/ListingTab"
import { PaperworkTab } from "@/components/landing/feature-tabs/tabs/PaperworkTab"
import { LiveTab } from "@/components/landing/feature-tabs/tabs/LiveTab"
import { useDebug } from "@/components/debug/DebugProvider"
import { cn } from "@/lib/utils"

// Debug label component
function DebugLabel({
  label,
  position = "top-left",
  color = "pink",
}: {
  label: string
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  color?: "pink" | "blue" | "green" | "orange" | "purple" | "cyan"
}) {
  const { debugMode } = useDebug()
  if (!debugMode) return null

  const colorClasses = {
    pink: "bg-pink-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
    cyan: "bg-cyan-500",
  }

  const positionClasses = {
    "top-left": "top-0 left-0 rounded-br",
    "top-right": "top-0 right-0 rounded-bl",
    "bottom-left": "bottom-0 left-0 rounded-tr",
    "bottom-right": "bottom-0 right-0 rounded-tl",
  }

  return (
    <div
      className={cn(
        "absolute z-[9999] text-white text-[10px] font-mono px-1.5 py-0.5",
        colorClasses[color],
        positionClasses[position]
      )}
    >
      {label}
    </div>
  )
}

// Spring physics constants - Apple-like feel
const springs = {
  tabIndicator: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  },
  contentEnter: {
    type: "spring" as const,
    stiffness: 300,
    damping: 28,
    mass: 1,
  },
}

const tabs = [
  { id: "photographer", label: "Photographer", shortLabel: "Photo" },
  { id: "client-form", label: "Client Form", shortLabel: "Form" },
  { id: "listing", label: "Listing", shortLabel: "List" },
  { id: "paperwork", label: "Paperwork", shortLabel: "Docs" },
  { id: "live", label: "Live", shortLabel: "Live" },
] as const

type TabId = (typeof tabs)[number]["id"]

export function FeatureTabsSection() {
  const [activeTab, setActiveTab] = useState<TabId>("photographer")
  const { debugMode } = useDebug()

  const goToNextTab = useCallback(() => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id)
    }
  }, [activeTab])

  const goToPreviousTab = useCallback(() => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id)
    }
  }, [activeTab])

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      const threshold = 50
      const velocity = info.velocity.x

      if (info.offset.x > threshold || velocity > 500) {
        goToPreviousTab()
      } else if (info.offset.x < -threshold || velocity < -500) {
        goToNextTab()
      }
    },
    [goToNextTab, goToPreviousTab]
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "photographer":
        return <PhotographerTab />
      case "client-form":
        return <ClientFormTab />
      case "listing":
        return <ListingTab />
      case "paperwork":
        return <PaperworkTab />
      case "live":
        return <LiveTab />
    }
  }

  return (
    <Section
      id="features"
      snapAlign="start"
      fullHeight
      componentName="<FeatureTabsSection>"
      className="flex flex-col py-12 md:py-16 lg:py-20"
    >
      {/* CONTAINER - max-w-5xl mx-auto */}
      <div
        className={cn(
          "relative w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col flex-1",
          debugMode && "border-2 border-dashed border-blue-500"
        )}
      >
        <DebugLabel label="CONTAINER max-w-5xl mx-auto flex-col flex-1" color="blue" />

        {/* Input Block - The "raw" voice memo */}
        <div
          className={cn(
            "relative mb-8 md:mb-10",
            debugMode && "border border-dashed border-orange-400"
          )}
        >
          {debugMode && (
            <span className="absolute -top-4 left-0 text-[9px] text-orange-500 font-mono z-[9999]">
              INPUT BLOCK mb-8→md:mb-10
            </span>
          )}
          <InputBlock />
        </div>

        {/* Tab Navigation */}
        <div
          role="tablist"
          aria-label="Feature demonstrations"
          className={cn(
            "relative flex overflow-x-auto scrollbar-hide mb-6 md:mb-8 border-b border-black/5",
            debugMode && "border-2 border-dashed border-green-500"
          )}
        >
          <DebugLabel label="TAB NAV overflow-x-auto mb-6→md:mb-8" color="green" position="top-right" />

          {/* Tab Buttons Container */}
          <div
            className={cn(
              "relative flex md:justify-center w-full min-w-max md:min-w-0 gap-1 md:gap-2",
              debugMode && "border border-dashed border-purple-400"
            )}
          >
            {debugMode && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-purple-500 font-mono whitespace-nowrap z-[9999]">
                TAB BUTTONS md:justify-center gap-1→md:gap-2
              </span>
            )}

            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") goToNextTab()
                  if (e.key === "ArrowLeft") goToPreviousTab()
                  if (e.key === "Home") setActiveTab(tabs[0].id)
                  if (e.key === "End") setActiveTab(tabs[tabs.length - 1].id)
                }}
                className={cn(
                  "relative px-3 md:px-4 py-3 min-h-[44px]",
                  "text-sm md:text-base font-medium whitespace-nowrap",
                  "transition-colors duration-200",
                  activeTab === tab.id
                    ? "text-black"
                    : "text-black/40 hover:text-black/60",
                  debugMode && "border border-dotted border-cyan-400"
                )}
              >
                {debugMode && (
                  <span className="absolute -bottom-5 left-0 text-[8px] text-cyan-500 font-mono z-[9999]">
                    btn[{index}]
                  </span>
                )}
                {/* Mobile: short labels, Desktop: full labels */}
                <span className="md:hidden">{tab.shortLabel}</span>
                <span className="hidden md:inline">{tab.label}</span>

                {/* Magic underline indicator */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black rounded-full"
                    transition={springs.tabIndicator}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content with AnimatePresence */}
        <div
          className={cn(
            "relative flex-1 min-h-0",
            debugMode && "border-2 border-dashed border-pink-500"
          )}
        >
          <DebugLabel label="TAB CONTENT AREA flex-1 min-h-0" color="pink" position="top-right" />

          {/* Active tab indicator */}
          {debugMode && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[9999] bg-cyan-500 text-white text-[10px] font-mono px-2 py-1 rounded">
              activeTab: {activeTab}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              role="tabpanel"
              id={`panel-${activeTab}`}
              aria-labelledby={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className={cn(
                "h-full cursor-grab active:cursor-grabbing",
                debugMode && "border border-dashed border-yellow-400"
              )}
            >
              {debugMode && (
                <span className="absolute -top-4 right-0 text-[8px] text-yellow-500 font-mono z-[9999]">
                  motion.div drag-x
                </span>
              )}
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
