import { cn } from "@/lib/utils"

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
  fullHeight?: boolean
}

export function Section({
  id,
  children,
  className,
  fullHeight = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        fullHeight && "min-h-screen",
        className
      )}
    >
      {children}
    </section>
  )
}
