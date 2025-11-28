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

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function StreamSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [shuffledTasks, setShuffledTasks] = useState<Task[]>(tasks)

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
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  // Staggered card appearance
  useEffect(() => {
    if (!isVisible) return

    const timeouts: NodeJS.Timeout[] = []

    // Start showing cards after section is visible
    const initialDelay = setTimeout(() => {
      shuffledTasks.forEach((_, index) => {
        const timeout = setTimeout(() => {
          setVisibleCards((prev) => [...prev, index])
        }, index * 80) // 80ms stagger for snappy appearance

        timeouts.push(timeout)
      })
    }, 200)

    timeouts.push(initialDelay)

    return () => timeouts.forEach(clearTimeout)
  }, [isVisible, shuffledTasks])

  return (
    <Section
      id="stream"
      className="py-24 md:py-32 overflow-x-hidden"
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

        {/* Task cards - horizontal overflow */}
        <div className="flex gap-3 md:gap-4 py-4 w-max">
          {shuffledTasks.map((task, index) => (
            <TaskCard
              key={task.task}
              task={task.task}
              status={task.status}
              isDocument={task.isDocument}
              className={cn(
                "shrink-0",
                "w-[140px] md:w-[200px]",
                "opacity-0 translate-y-4",
                visibleCards.includes(index) && "opacity-100 translate-y-0"
              )}
              style={{
                transform: `translateY(${index % 2 === 0 ? -3 : 3}px) rotate(${(index % 3 - 1) * 0.6}deg)`,
                transitionProperty: "opacity, transform",
                transitionDuration: "400ms",
                transitionTimingFunction: "ease-out",
              }}
            />
          ))}
        </div>

        {/* Closing line */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-text-secondary">
            ...and the work gets done.
          </p>
        </div>
      </div>
    </Section>
  )
}
