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
import { cn } from "@/lib/utils"

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
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col flex-1">
        {/* Input Block - The "raw" voice memo */}
        <InputBlock className="mb-8 md:mb-10" />

        {/* Tab Navigation */}
        <div
          role="tablist"
          aria-label="Feature demonstrations"
          className="relative flex overflow-x-auto scrollbar-hide mb-6 md:mb-8 border-b border-black/5"
        >
          <div className="flex md:justify-center w-full min-w-max md:min-w-0 gap-1 md:gap-2">
            {tabs.map((tab) => (
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
                    : "text-black/40 hover:text-black/60"
                )}
              >
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
        <div className="flex-1 min-h-0">
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
              className="h-full cursor-grab active:cursor-grabbing"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
