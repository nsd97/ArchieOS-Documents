"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { IMessageBubble } from "@/components/landing/feature-tabs/IMessageBubble"
import { Square } from "lucide-react"

const missingFields = [
  "Square footage",
  "Lot size",
  "Year built",
  "Inclusions",
  "Tenant lease terms",
]

export function ClientFormTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Left Column: Details Needed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl">Details Needed</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {missingFields.map((field) => (
              <li key={field} className="flex items-center gap-3 text-sm">
                <Square className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{field}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Right Column: iMessage Sent */}
      <div className="flex items-center justify-center md:justify-end p-4 md:p-6">
        <IMessageBubble
          message="Hi Sarah! Quick form for 42 Maple—takes 2 min:"
          linkPreview={{
            domain: "archie.app",
            title: "Property Details Form",
          }}
          status="delivered"
        />
      </div>
    </div>
  )
}
