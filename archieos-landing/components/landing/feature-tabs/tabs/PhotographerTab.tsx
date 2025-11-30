"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star } from "lucide-react"

export function PhotographerTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Left Column: Vendor Contact Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl">
            Sarah&apos;s Lens Photography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              12 shoots together
            </span>
          </div>

          {/* Contact info */}
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">(416) 555-0142</p>
            <p className="text-muted-foreground">sarah@sarahslens.com</p>
          </div>

          {/* Preferred vendor badge */}
          <Badge variant="secondary">Preferred vendor</Badge>
        </CardContent>
      </Card>

      {/* Right Column: Booking Confirmation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Booking Confirmed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-medium">Sarah&apos;s Lens Photography</p>
            <p className="text-sm text-muted-foreground">
              Thursday, Dec 5 · 2:00 PM
            </p>
            <p className="text-sm text-muted-foreground">42 Maple Drive</p>
          </div>

          {/* Reply quote */}
          <blockquote className="border-l-2 border-black/10 pl-3 italic text-sm text-muted-foreground">
            &quot;See you then!&quot; — Sarah
          </blockquote>
        </CardContent>
      </Card>
    </div>
  )
}
