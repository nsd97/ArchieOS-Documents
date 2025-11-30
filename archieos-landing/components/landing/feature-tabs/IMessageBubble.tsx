"use client"

import { cn } from "@/lib/utils"

interface LinkPreview {
  domain: string
  title: string
}

interface IMessageBubbleProps {
  message: string
  linkPreview?: LinkPreview
  status?: "sending" | "delivered" | "read"
  className?: string
}

export function IMessageBubble({
  message,
  linkPreview,
  status = "delivered",
  className,
}: IMessageBubbleProps) {
  return (
    <div className={cn("flex flex-col items-end gap-1", className)}>
      {/* Message bubble - high-fidelity iOS styling */}
      <div
        className={cn(
          "max-w-[280px]",
          // Exact iOS blue
          "bg-[#007AFF]",
          "text-white",
          // iOS message bubble shape with tail
          "rounded-[18px] rounded-br-[4px]",
          "px-4 py-2.5",
          // iOS typography
          "text-[15px] leading-[20px]",
          "font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text',sans-serif]"
        )}
      >
        <p>{message}</p>

        {/* Link preview card */}
        {linkPreview && (
          <div
            className={cn(
              "mt-2 -mx-2 -mb-1",
              "bg-white/20",
              "backdrop-blur-sm",
              "rounded-xl",
              "overflow-hidden"
            )}
          >
            <div className="px-3 py-2.5">
              <p className="text-[11px] text-white/70 uppercase tracking-wide">
                {linkPreview.domain}
              </p>
              <p className="text-[15px] font-medium mt-0.5">{linkPreview.title}</p>
            </div>
          </div>
        )}
      </div>

      {/* Delivery status */}
      <span className="text-[11px] text-muted-foreground mr-1 font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text',sans-serif]">
        {status === "sending" && "Sending..."}
        {status === "delivered" && "Delivered"}
        {status === "read" && "Read"}
      </span>
    </div>
  )
}
