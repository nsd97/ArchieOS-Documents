"use client"

import { useEffect, useRef, useState } from "react"
import { Section } from "@/components/layout/Section"
import { LiveWaveform } from "@/components/ui/waveform"
import { TaskCard, type TaskStatus } from "@/components/landing/TaskCard"
import { cn } from "@/lib/utils"

interface Task {
  task: string
  status: TaskStatus
  isDocument?: boolean
}

// 20 tasks: 5 document deliverables + 15 regular tasks
const tasks: Task[] = [
  // Document Deliverables (5)
  { task: "Listing draft", status: "created", isDocument: true },
  { task: "Comparative market analysis", status: "drafted", isDocument: true },
  { task: "Offer presentation deck", status: "prepared", isDocument: true },
  { task: "Neighborhood guide", status: "created", isDocument: true },
  { task: "Disclosure documents", status: "ready", isDocument: true },

  // Regular Tasks (15)
  { task: "Photographer outreach", status: "prepared" },
  { task: "Seller update email", status: "drafted" },
  { task: "Staging coordination", status: "in_progress" },
  { task: "MLS data entry", status: "ready" },
  { task: "Virtual tour booking", status: "created" },
  { task: "Contract preparation", status: "prepared" },
  { task: "Showing feedback summary", status: "created" },
  { task: "Inspection scheduling", status: "in_progress" },
  { task: "Title company coordination", status: "prepared" },
  { task: "Buyer qualification", status: "ready" },
  { task: "Social media posts", status: "created" },
  { task: "Property video edit", status: "in_progress" },
  { task: "Move-in timeline", status: "drafted" },
  { task: "Key handoff coordination", status: "ready" },
  { task: "Post-close survey", status: "created" },
]

// Seeded pseudo-random for deterministic "randomness" (SSR safe)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

// Round to fixed decimals for SSR/client hydration consistency
function round(value: number, decimals: number = 2): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

// Calculate organic position for each card
function getCardPosition(index: number, totalCards: number, isDocument: boolean) {
  // Grid-like base with randomized offsets
  const columns = 4
  const baseColumn = index % columns
  const row = Math.floor(index / columns)
  const totalRows = Math.ceil(totalCards / columns)

  // Base X position (spread across container width)
  const columnWidth = 100 / columns
  const baseX = baseColumn * columnWidth + columnWidth / 2

  // Add randomized offset to X (±15% of column width)
  const xOffset = (seededRandom(index * 7) - 0.5) * columnWidth * 0.6
  const x = round(Math.max(5, Math.min(75, baseX + xOffset))) // Keep within bounds

  // Y position: taller rows to accommodate document cards
  const baseY = row * 140 // Increased to accommodate document previews
  const yOffset = seededRandom(index * 13) * 40 // Random offset 0-40px
  const y = round(baseY + yOffset)

  // Documents get less rotation (more "stable" feel)
  const maxRotation = isDocument ? 2 : 4
  const rotation = round((seededRandom(index * 17) - 0.5) * maxRotation)

  // Z-index: earlier rows on top (so previews don't get clipped)
  const zIndex = totalRows - row

  return { x, y, rotation, zIndex }
}

// Number of cards to show on mobile vs desktop
const MOBILE_CARD_COUNT = 8
const DESKTOP_CARD_COUNT = tasks.length

export function StreamSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  // Get the cards to display based on screen size
  const displayedCards = isMobile ? tasks.slice(0, MOBILE_CARD_COUNT) : tasks

  // Staggered card appearance with variable timing for organic feel
  useEffect(() => {
    if (!isVisible) return

    const timeouts: NodeJS.Timeout[] = []
    const cardCount = isMobile ? MOBILE_CARD_COUNT : DESKTOP_CARD_COUNT

    // Start showing cards after section is visible
    const initialDelay = setTimeout(() => {
      let cumulativeDelay = 0
      for (let index = 0; index < cardCount; index++) {
        // Variable interval: 100-160ms for snappy appearance
        const interval = 100 + (index % 3) * 30
        cumulativeDelay += interval

        const timeout = setTimeout(() => {
          setVisibleCards((prev) => [...prev, index])
        }, cumulativeDelay)

        timeouts.push(timeout)
      }
    }, 200)

    timeouts.push(initialDelay)

    return () => timeouts.forEach(clearTimeout)
  }, [isVisible, isMobile])

  return (
    <Section
      id="stream"
      className="py-24 md:py-32"
    >
      <div ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            What if you could just talk...
          </h2>
        </div>

        {/* Full-width streaming waveform */}
        <div className="w-full mb-12 md:mb-16">
          <LiveWaveform
            active={isVisible}
            mode="scrolling"
            prefill={true}
            minHeight={0.15}
            speed={isVisible ? 35 : 0}
            height={100}
            barCount={80}
            barWidth={3}
            barGap={4}
            barColor="#000000"
            fadeEdges={true}
            fadeWidth={48}
          />
        </div>

        {/* Task cards - grid on mobile, cascade on desktop */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
          <div
            className={cn(
              // Mobile: 2-column grid
              "grid grid-cols-2 gap-3",
              // Desktop: relative container for absolute positioning
              "md:block md:relative"
            )}
            style={!isMobile ? { minHeight: `${Math.ceil(displayedCards.length / 4) * 140 + 60}px` } : undefined}
          >
            {displayedCards.map((task, index) => {
              const { x, y, rotation, zIndex } = getCardPosition(index, displayedCards.length, task.isDocument || false)

              return (
                <TaskCard
                  key={task.task}
                  task={task.task}
                  status={task.status}
                  isDocument={task.isDocument}
                  className={cn(
                    // Mobile: full width within grid cell
                    "w-full",
                    // Desktop: absolute positioning with fixed width
                    "md:absolute md:w-[240px]",
                    // Animation states
                    "opacity-0 translate-y-4",
                    visibleCards.includes(index) && "opacity-100 translate-y-0"
                  )}
                  style={{
                    // Only apply cascade positioning on desktop
                    ...(isMobile ? {} : {
                      left: `${x}%`,
                      top: `${y}px`,
                      transform: `rotate(${rotation}deg)`,
                      zIndex,
                    }),
                    transitionProperty: "opacity, transform",
                    transitionDuration: "500ms",
                    transitionTimingFunction: "ease-out",
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* Closing line */}
        <div className="text-center mt-6 md:mt-8">
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-text-secondary">
            ...and the work gets done.
          </p>
        </div>
      </div>
    </Section>
  )
}
