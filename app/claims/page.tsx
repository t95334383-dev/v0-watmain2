"use client"

import MobileLayout from "@/components/mobile-layout"
import EmptyState from "@/components/empty-state"

export default function Claims() {
  return (
    <MobileLayout title="Претензии">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold tracking-tight mb-3">Претензии</h1>
      </div>

      <EmptyState showFilter />
    </MobileLayout>
  )
}
