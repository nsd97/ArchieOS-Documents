"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DocumentPreviewCardProps {
  title: string
  status?: "pending" | "ready" | "approved"
  className?: string
}

export function DocumentPreviewCard({
  title,
  status = "ready",
  className,
}: DocumentPreviewCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4 flex gap-4">
        {/* Abstract document preview - lines representing text */}
        <div className="w-16 h-20 bg-neutral-50 rounded-md border border-black/5 p-2 shrink-0 flex flex-col gap-1.5">
          {/* Header line - bolder, shorter */}
          <div className="h-1.5 bg-neutral-300 rounded-full w-3/4" />
          {/* Body lines */}
          <div className="h-1 bg-neutral-200 rounded-full w-full" />
          <div className="h-1 bg-neutral-200 rounded-full w-full" />
          <div className="h-1 bg-neutral-200 rounded-full w-4/5" />
          <div className="h-1 bg-neutral-200 rounded-full w-full mt-auto" />
          <div className="h-1 bg-neutral-200 rounded-full w-2/3" />
        </div>

        {/* Document info */}
        <div className="flex flex-col justify-center min-w-0">
          <h4 className="font-medium text-sm md:text-base truncate">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">
            {status === "pending" && "Pending review"}
            {status === "ready" && "Ready for approval"}
            {status === "approved" && "Approved"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
