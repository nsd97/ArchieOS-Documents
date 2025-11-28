"use client"

import { useEffect, useRef, useState } from "react"
import { Section } from "@/components/layout/Section"
import { LiveWaveform } from "@/components/ui/waveform"
import { TaskCard, type TaskStatus } from "@/components/landing/TaskCard"
import { cn } from "@/lib/utils"

interface Task {
  task: string
  status: TaskStatus
}

const tasks: Task[] = [
  { task: "Listing draft", status: "created" },
  { task: "Photographer outreach", status: "prepared" },
  { task: "Seller update email", status: "drafted" },
  { task: "Staging tasks", status: "in_progress" },
  { task: "MLS data entry form", status: "ready" },
]

export function StreamSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])

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

    // Start showing cards after waveform has been visible for 500ms
    const initialDelay = setTimeout(() => {
      tasks.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index])
        }, index * 300) // 300ms stagger between cards
      })
    }, 500)

    return () => clearTimeout(initialDelay)
  }, [isVisible])

  return (
    <Section
      id="stream"
      className="py-24 md:py-32 overflow-hidden"
    >
      <div ref={sectionRef}>
        {/* Header */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center mb-12 md:mb-16">
          Just talk.
        </h2>

        {/* Full-width streaming waveform */}
        <div className="w-full">
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

        {/* Task cards - cascading diagonal layout */}
        <div className="max-w-2xl mx-auto px-6 mt-12 md:mt-16">
          <div className="relative min-h-[400px]">
            {tasks.map((task, index) => {
              const leftOffset = index * 40
              const topOffset = index * 70
              const delayMs = index * 100
              
              return (
                <TaskCard
                  key={task.task}
                  task={task.task}
                  status={task.status}
                  className={cn(
                    "absolute w-[280px] md:w-[320px]",
                    "opacity-0 translate-y-4",
                    visibleCards.includes(index) && "opacity-100 translate-y-0"
                  )}
                  style={{
                    left: leftOffset + "px",
                    top: topOffset + "px",
                    transitionDelay: delayMs + "ms",
                    transitionProperty: "opacity, transform",
                    transitionDuration: "500ms",
                    transitionTimingFunction: "ease-out",
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
