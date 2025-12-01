"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { BrowserMockup } from "@/components/landing/feature-tabs/BrowserMockup"
import { PhotoPlaceholder } from "@/components/landing/feature-tabs/PhotoPlaceholder"
import { Heart, Share, Calendar } from "lucide-react"

export function LiveTab() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Browser Mockup */}
      <BrowserMockup
        url="realtor.ca/listing/42-maple-drive"
        className="max-w-2xl mx-auto"
      >
        {/* Hero image */}
        <PhotoPlaceholder
          index={0}
          aspectRatio="16/9"
          className="rounded-none"
        />

        {/* Listing info */}
        <div className="p-4 md:p-6 space-y-4">
          <div>
            <h1 className="text-lg md:text-xl font-semibold">42 Maple Drive</h1>
            <p className="text-sm text-muted-foreground">
              Toronto, ON M4E 2T5
            </p>
          </div>

          <p className="text-xl md:text-2xl font-semibold">$1,249,000</p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>4 bed</span>
            <span>·</span>
            <span>3 bath</span>
            <span>·</span>
            <span>2,400 sq ft</span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Heart className="w-4 h-4" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Share className="w-4 h-4" />
              Share
            </Button>
            <Button size="sm" className="gap-1.5">
              <Calendar className="w-4 h-4" />
              Book Tour
            </Button>
          </div>
        </div>
      </BrowserMockup>

      {/* The punchline - "Posted." */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-semibold text-center"
      >
        Posted.
      </motion.p>
    </div>
  )
}
