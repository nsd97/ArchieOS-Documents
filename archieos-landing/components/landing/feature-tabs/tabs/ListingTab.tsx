"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { PhotoPlaceholder } from "@/components/landing/feature-tabs/PhotoPlaceholder"

const photos = [
  { extractedTag: "Open concept" },
  { extractedTag: "Updated kitchen" },
  { extractedTag: "4 bedrooms" },
  { extractedTag: undefined },
  { extractedTag: "Large lot" },
  { extractedTag: undefined },
]

export function ListingTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Left Column: Photo Gallery (narrower on desktop) */}
      <div className="lg:col-span-1">
        {/* Mobile: Horizontal scroll */}
        <div className="lg:hidden">
          <ScrollArea className="w-full whitespace-nowrap pb-2">
            <div className="flex gap-3">
              {photos.map((photo, i) => (
                <PhotoPlaceholder
                  key={i}
                  index={i}
                  extractedTag={photo.extractedTag}
                  className="w-40 shrink-0"
                  aspectRatio="4/3"
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Desktop: Vertical stack */}
        <div className="hidden lg:block space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
          {photos.map((photo, i) => (
            <PhotoPlaceholder
              key={i}
              index={i}
              extractedTag={photo.extractedTag}
              aspectRatio="4/3"
            />
          ))}
        </div>
      </div>

      {/* Right Column: Listing Draft (wider on desktop) */}
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-4 md:p-6">
            {/* Horizontal photo carousel at top of card */}
            <ScrollArea className="w-full whitespace-nowrap mb-4">
              <div className="flex gap-2">
                {photos.slice(0, 4).map((_, i) => (
                  <PhotoPlaceholder
                    key={i}
                    index={i}
                    className="w-24 h-16 shrink-0"
                    aspectRatio="3/2"
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* Listing content */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold">
                  42 Maple Drive
                </h2>
                <p className="text-sm text-muted-foreground">
                  Toronto, ON M4E 2T5
                </p>
              </div>

              <p className="text-2xl md:text-3xl font-semibold">$1,249,000</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>4 bed</span>
                <span>·</span>
                <span>3 bath</span>
                <span>·</span>
                <span>2,400 sq ft</span>
              </div>

              <Separator />

              <div className="space-y-3 text-sm leading-relaxed">
                <p>
                  Welcome to this stunning detached family home in the heart of
                  the Beaches. Featuring an open-concept main floor, updated
                  kitchen with quartz countertops, and a spacious primary suite
                  with ensuite bath.
                </p>
                <p>
                  The private backyard offers the perfect space for
                  entertaining, while the finished basement provides additional
                  living space.
                </p>
                <p className="text-muted-foreground italic">
                  Current tenant in place until December 15th.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t px-4 md:px-6 py-3 flex items-center gap-2">
            <Badge variant="outline">DRAFT</Badge>
            <span className="text-sm text-muted-foreground">
              Ready for review
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
