"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type TaskStatus = "created" | "prepared" | "drafted" | "in_progress" | "ready"

interface TaskCardProps {
  task: string
  status: TaskStatus
  isDocument?: boolean
  className?: string
  style?: React.CSSProperties
}

const statusConfig: Record<TaskStatus, { label: string; icon: string; variant: "default" | "secondary" | "outline" }> = {
  created: { label: "created", icon: "✓", variant: "default" },
  prepared: { label: "prepared", icon: "✓", variant: "default" },
  drafted: { label: "drafted", icon: "✓", variant: "default" },
  ready: { label: "ready", icon: "✓", variant: "default" },
  in_progress: { label: "in progress", icon: "◐", variant: "secondary" },
}

export function TaskCard({ task, status, isDocument = false, className, style }: TaskCardProps) {
  const config = statusConfig[status]

  return (
    <div className={className} style={style}>
      {/* Document Preview - always visible for document deliverables */}
      {isDocument && (
        <div className={cn(
          "bg-white/90 backdrop-blur-sm rounded-t-xl",
          "px-3 py-3 md:px-4 md:py-4 border-b border-neutral-100",
          "shadow-sm"
        )}>
          {/* Faux document lines */}
          <div className="space-y-1.5 md:space-y-2">
            <div className="h-1.5 md:h-2 bg-neutral-200/70 rounded-full w-2/3" />
            <div className="h-1.5 md:h-2 bg-neutral-200/70 rounded-full w-full" />
            <div className="h-1.5 md:h-2 bg-neutral-200/70 rounded-full w-4/5" />
            <div className="h-1.5 md:h-2 bg-neutral-200/70 rounded-full w-3/4" />
          </div>
        </div>
      )}

      {/* Main Card */}
      <Card
        className={cn(
          "bg-white/80 backdrop-blur-sm border-0 shadow-md py-3",
          "transition-all duration-300",
          isDocument && "rounded-t-none"
        )}
      >
        <CardContent className="px-3 md:px-4 py-0 flex items-center justify-between gap-2 md:gap-4">
          <span className="text-xs md:text-sm font-medium text-foreground truncate min-w-0">{task}</span>
          <Badge
            variant={config.variant}
            className={cn(
              "text-xs shrink-0",
              config.variant === "default" && "bg-black text-white",
              config.variant === "secondary" && "bg-neutral-200 text-neutral-700"
            )}
          >
            <span className="mr-1">{config.icon}</span>
            {config.label}
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
