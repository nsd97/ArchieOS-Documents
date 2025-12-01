"use client"

import { DocumentPreviewCard } from "@/components/landing/feature-tabs/DocumentPreviewCard"

const documents = [
  { title: "Listing Agreement", status: "ready" as const },
  { title: "Data Input Form", status: "ready" as const },
  { title: "FINTRAC Verification", status: "ready" as const },
  { title: "Seller Disclosure", status: "ready" as const },
  { title: "Agency Agreement", status: "ready" as const },
]

export function PaperworkTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
      {/* Left Column: Section Header */}
      <div className="lg:col-span-1 space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground">
          42 Maple Drive
        </h3>
        <h2 className="text-xl md:text-2xl font-semibold">Documents</h2>
        <p className="text-sm text-muted-foreground">5 files ready</p>
      </div>

      {/* Right Column: Document Cards */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {documents.map((doc) => (
            <DocumentPreviewCard
              key={doc.title}
              title={doc.title}
              status={doc.status}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
