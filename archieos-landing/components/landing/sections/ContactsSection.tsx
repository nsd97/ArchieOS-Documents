"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "motion/react"
import { DeviceFrameset } from "react-device-frameset"
import { Section } from "@/components/layout/Section"
import { useDebug } from "@/components/debug/DebugProvider"
import { cn } from "@/lib/utils"

// Spring physics for Apple-like animations
const springs = {
  content: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 1,
  },
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

export function ContactsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const { debugMode } = useDebug()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Debug border helper
  const debugBorder = (color: string) =>
    debugMode ? `border-2 border-dashed border-${color}-500` : ""

  return (
    <Section
      id="contacts"
      snapAlign="start"
      fullHeight
      componentName="<ContactsSection>"
      className="flex items-center justify-center overflow-hidden"
    >
      {/* CONTAINER - max-w-5xl mx-auto */}
      <div
        ref={sectionRef}
        className={cn(
          "relative w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8",
          debugMode && "border-2 border-dashed border-blue-500"
        )}
      >
        <DebugLabel label="CONTAINER max-w-5xl" color="blue" />

        {/* CONTENT ROW - flex-col lg:flex-row */}
        <div
          className={cn(
            "relative flex flex-col lg:flex-row lg:items-center lg:gap-8",
            debugMode && "border-2 border-dashed border-green-500"
          )}
        >
          <DebugLabel
            label="CONTENT ROW flex-col→lg:flex-row"
            position="top-right"
            color="green"
          />

          {/* COPY BLOCK - lg:w-1/2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springs.content, delay: 0 }}
            className={cn(
              "relative lg:w-1/2 lg:max-w-[480px]",
              debugMode && "border-2 border-dashed border-orange-500"
            )}
          >
            <DebugLabel label="COPY BLOCK lg:w-1/2" color="orange" />

            {/* Eyebrow */}
            <p
              className={cn(
                "relative text-xs md:text-sm font-semibold uppercase tracking-[0.05em] text-black/50 mb-4 md:mb-5",
                debugMode && "border border-dashed border-purple-400"
              )}
            >
              {debugMode && (
                <span className="absolute -top-4 left-0 text-[9px] text-purple-500 font-mono">
                  EYEBROW
                </span>
              )}
              Contacts
            </p>

            {/* Headline */}
            <h2
              className={cn(
                "relative text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground mb-6 md:mb-8 lg:mb-10",
                debugMode && "border border-dashed border-purple-400"
              )}
            >
              {debugMode && (
                <span className="absolute -top-4 left-0 text-[9px] text-purple-500 font-mono">
                  HEADLINE h2
                </span>
              )}
              Why rebuild
              <br />
              what&apos;s already perfect?
            </h2>

            {/* Body Copy Container */}
            <div
              className={cn(
                "relative flex flex-col gap-5",
                debugMode && "border-2 border-dashed border-cyan-500"
              )}
            >
              <DebugLabel label="BODY COPY flex-col gap-5" color="cyan" />

              <p
                className={cn(
                  "relative text-base md:text-lg leading-[1.65] text-text-secondary",
                  debugMode && "border border-dotted border-gray-400"
                )}
              >
                {debugMode && (
                  <span className="absolute -top-3 left-0 text-[8px] text-gray-500 font-mono">
                    p.intro
                  </span>
                )}
                Apple built the best address book on earth. Then every CRM asked
                you to abandon it and start over in their database.
              </p>

              <p
                className={cn(
                  "relative text-base md:text-lg leading-[1.65] font-semibold text-foreground",
                  debugMode && "border border-dotted border-gray-400"
                )}
              >
                {debugMode && (
                  <span className="absolute -top-3 left-0 text-[8px] text-gray-500 font-mono">
                    p.emphasis
                  </span>
                )}
                That&apos;s not innovation. That&apos;s ego.
              </p>

              <p
                className={cn(
                  "relative text-base md:text-lg leading-[1.65] text-text-secondary",
                  debugMode && "border border-dotted border-gray-400"
                )}
              >
                {debugMode && (
                  <span className="absolute -top-3 left-0 text-[8px] text-gray-500 font-mono">
                    p.main
                  </span>
                )}
                Archie doesn&apos;t replace your Contacts. It{" "}
                <em className="font-semibold">awakens</em> them. Every name,
                every note, every relationship—now connected to listings, deals,
                and history. Automatically. Natively. Without leaving the apps
                you already live in.
              </p>

              <p
                className={cn(
                  "relative text-sm md:text-base italic text-foreground/50 mt-2",
                  debugMode && "border border-dotted border-gray-400"
                )}
              >
                {debugMode && (
                  <span className="absolute -top-3 left-0 text-[8px] text-gray-500 font-mono">
                    p.tagline
                  </span>
                )}
                The best integration is the one you never notice.
              </p>
            </div>
          </motion.div>

          {/* DEVICES AREA - flex-1, relative for positioning */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springs.content, delay: 0.15 }}
            className={cn(
              "relative flex-1 min-h-[450px] lg:min-h-[550px] mt-12 lg:mt-0",
              debugMode && "border-2 border-dashed border-pink-500"
            )}
          >
            <DebugLabel
              label="DEVICES AREA flex-1 relative"
              position="top-right"
              color="pink"
            />

            {/* iPhone Positioning Wrapper */}
            <div
              className={cn(
                "relative lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-20 flex justify-center lg:justify-start",
                debugMode && "border-2 border-dashed border-green-400"
              )}
            >
              <DebugLabel
                label="iPHONE WRAPPER lg:left-0 z-20"
                color="green"
                position="bottom-left"
              />

              {/* iPhone Shadow Wrapper */}
              <div
                className={cn(
                  "relative [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.12))]",
                  debugMode && "border border-dashed border-yellow-400"
                )}
              >
                {debugMode && (
                  <span className="absolute -top-4 left-0 text-[8px] text-yellow-600 font-mono z-[9999]">
                    shadow
                  </span>
                )}
                <DeviceFrameset device="iPhone X" zoom={0.55}>
                  <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">
                      iPhone Screenshot
                    </span>
                  </div>
                </DeviceFrameset>
              </div>
            </div>

            {/* MacBook Positioning Wrapper */}
            <div
              className={cn(
                "hidden lg:block absolute left-[120px] top-1/2 -translate-y-1/2 z-10",
                debugMode &&
                  "lg:border-2 lg:border-dashed lg:border-blue-400"
              )}
            >
              <DebugLabel
                label="MacBook WRAPPER left-[120px] z-10"
                color="blue"
                position="bottom-right"
              />

              {/* MacBook Shadow Wrapper */}
              <div
                className={cn(
                  "relative [filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.12))]",
                  debugMode && "border border-dashed border-yellow-400"
                )}
              >
                {debugMode && (
                  <span className="absolute -top-4 right-0 text-[8px] text-yellow-600 font-mono z-[9999]">
                    shadow
                  </span>
                )}
                <DeviceFrameset device="MacBook Pro" zoom={0.55}>
                  <img
                    src="/archie-contacts-interface.png"
                    alt="Archie Contacts interface showing contact details and CRM features"
                    className="w-full h-full object-cover object-top"
                  />
                </DeviceFrameset>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
