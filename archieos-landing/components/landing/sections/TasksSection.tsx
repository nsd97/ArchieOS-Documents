"use client"

import { useEffect, useRef, useState } from "react"
import { Section } from "@/components/layout/Section"
import { TaskCard, type TaskStatus } from "@/components/landing/TaskCard"
import { useDebug } from "@/components/debug/DebugProvider"
import { cn } from "@/lib/utils"

interface Task {
  task: string
  status: TaskStatus
  isDocument?: boolean
}

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

// 45 tasks: document deliverables + regular tasks for various screen sizes
const tasks: Task[] = [
  // Document Deliverables (10)
  { task: "Listing draft", status: "created", isDocument: true },
  { task: "Comparative market analysis", status: "drafted", isDocument: true },
  { task: "Offer presentation deck", status: "prepared", isDocument: true },
  { task: "Neighborhood guide", status: "created", isDocument: true },
  { task: "Disclosure documents", status: "ready", isDocument: true },
  { task: "Purchase agreement", status: "drafted", isDocument: true },
  { task: "Property brochure", status: "created", isDocument: true },
  { task: "Buyer's net sheet", status: "prepared", isDocument: true },
  { task: "Seller's net sheet", status: "ready", isDocument: true },
  { task: "Home warranty info", status: "created", isDocument: true },

  // Regular Tasks (35)
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
  { task: "Open house prep", status: "in_progress" },
  { task: "Lockbox setup", status: "ready" },
  { task: "Sign installation", status: "prepared" },
  { task: "Flyer distribution", status: "created" },
  { task: "Agent tour invite", status: "drafted" },
  { task: "Price adjustment memo", status: "in_progress" },
  { task: "Escrow opening", status: "ready" },
  { task: "Appraisal coordination", status: "prepared" },
  { task: "Lender follow-up", status: "drafted" },
  { task: "HOA document request", status: "created" },
  { task: "Termite inspection", status: "in_progress" },
  { task: "Repair negotiations", status: "prepared" },
  { task: "Contingency removal", status: "ready" },
  { task: "Final walkthrough", status: "drafted" },
  { task: "Closing coordination", status: "in_progress" },
  { task: "Utility transfer guide", status: "created" },
  { task: "Moving company referral", status: "prepared" },
  { task: "Address change checklist", status: "ready" },
  { task: "Welcome gift ordering", status: "drafted" },
  { task: "Testimonial request", status: "created" },
]

// SSR-safe window width detection
function useWindowWidth() {
  const [width, setWidth] = useState<number | null>(null)

  useEffect(() => {
    setWidth(window.innerWidth)

    function handleResize() {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return width
}

// Card count formula based on Tailwind breakpoints
function getCardCount(width: number | null): number {
  if (width === null) return 20 // SSR default

  if (width < 640) return 12 // Mobile
  if (width < 768) return 15 // SM
  if (width < 1024) return 20 // MD (tablet)
  if (width < 1280) return 28 // LG
  if (width < 1536) return 35 // XL
  return 45 // 2XL+
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Seeded pseudo-random for deterministic positioning (SSR safe)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

// Calculate organic scattered position for each card
function getCardPosition(index: number, totalCards: number, isDocument: boolean) {
  const columns = 5 // More columns for wider canvas
  const baseColumn = index % columns
  const row = Math.floor(index / columns)
  const totalRows = Math.ceil(totalCards / columns)

  // Distribute across 15-85% of container width (200vw canvas)
  const columnWidth = 70 / columns
  const baseX = 15 + baseColumn * columnWidth + columnWidth / 2
  const xOffset = (seededRandom(index * 7) - 0.5) * columnWidth * 0.8
  const x = Math.max(8, Math.min(92, baseX + xOffset))

  // Y positioning with organic offset
  const baseY = row * 140
  const yOffset = seededRandom(index * 13) * 50
  const y = baseY + yOffset

  // Rotation for organic feel (-4 to +4 degrees, less for documents)
  const maxRotation = isDocument ? 2 : 4
  const rotation = (seededRandom(index * 17) - 0.5) * maxRotation

  // Z-index: earlier rows on top
  const zIndex = totalRows - row + 1

  return { x, y, rotation, zIndex }
}

export function TasksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [shuffledTasks, setShuffledTasks] = useState<Task[]>(tasks)
  const [isHydrated, setIsHydrated] = useState(false)
  const windowWidth = useWindowWidth()
  const cardCount = getCardCount(windowWidth)
  const { debugMode } = useDebug()

  // Mark as hydrated after client mount to avoid SSR/client mismatch
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Shuffle on client mount (SSR-safe two-pass rendering)
  useEffect(() => {
    setShuffledTasks(shuffleArray(tasks))
  }, [])

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  // Get displayed tasks based on screen size
  const displayedTasks = shuffledTasks.slice(0, cardCount)

  // Staggered card appearance - "drop in" effect
  useEffect(() => {
    if (!isVisible) return

    // Reset visible cards when card count changes
    setVisibleCards([])

    const timeouts: NodeJS.Timeout[] = []

    // Start showing cards after section is visible
    const initialDelay = setTimeout(() => {
      displayedTasks.forEach((_, index) => {
        const timeout = setTimeout(() => {
          setVisibleCards((prev) => [...prev, index])
        }, index * 60) // 60ms stagger for snappy appearance

        timeouts.push(timeout)
      })
    }, 200)

    timeouts.push(initialDelay)

    return () => timeouts.forEach(clearTimeout)
  }, [isVisible, displayedTasks.length])

  return (
    <Section
      id="tasks"
      snapAlign="start"
      className="h-screen flex flex-col overflow-clip"
      componentName="<TasksSection>"
    >
      {/* SECTION INNER - flex-col flex-1 */}
      <div
        ref={sectionRef}
        className={cn(
          "relative flex flex-col flex-1 overflow-hidden",
          debugMode && "border-2 border-dashed border-blue-500"
        )}
      >
        <DebugLabel label="SECTION INNER flex-col flex-1 overflow-hidden" color="blue" />

        {/* Header */}
        <div
          className={cn(
            "relative text-center pt-24 md:pt-32 mb-12 md:mb-16",
            debugMode && "border-2 border-dashed border-orange-500"
          )}
        >
          <DebugLabel label="HEADER pt-24→md:pt-32 mb-12→md:mb-16" color="orange" position="top-right" />
          <p
            className={cn(
              "relative text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-text-secondary",
              debugMode && "border border-dashed border-purple-400"
            )}
          >
            {debugMode && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-purple-500 font-mono">
                p.headline
              </span>
            )}
            ...and the work gets done.
          </p>
        </div>

        {/* Task cards container - scattered layout */}
        <div
          className={cn(
            "relative flex-1 w-[200vw] -ml-[50vw]",
            debugMode && "border-2 border-dashed border-green-500"
          )}
        >
          <DebugLabel label="CARDS CONTAINER w-[200vw] -ml-[50vw] flex-1" color="green" />

          {/* Debug info overlay */}
          {debugMode && (
            <div className="absolute top-2 left-[50vw] z-[9999] bg-cyan-500 text-white text-[10px] font-mono px-2 py-1 rounded">
              cards: {displayedTasks.length} | visible: {visibleCards.length} | width: {windowWidth}px | hydrated: {isHydrated ? "yes" : "no"}
            </div>
          )}

          {isHydrated && displayedTasks.map((task, index) => {
            const { x, y, rotation, zIndex } = getCardPosition(
              index,
              displayedTasks.length,
              task.isDocument || false
            )

            return (
              <TaskCard
                key={task.task}
                task={task.task}
                status={task.status}
                isDocument={task.isDocument}
                className={cn(
                  "absolute",
                  "w-[140px] md:w-[200px]",
                  "opacity-0 scale-95 translate-y-4",
                  visibleCards.includes(index) && "opacity-100 scale-100 translate-y-0"
                )}
                style={{
                  left: `${x}%`,
                  top: `${y}px`,
                  transform: `rotate(${rotation}deg)`,
                  zIndex,
                  transitionProperty: "opacity, transform",
                  transitionDuration: "500ms",
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
            )
          })}
        </div>
      </div>
    </Section>
  )
}
