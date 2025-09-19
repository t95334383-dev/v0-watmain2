"use client"

import MobileLayout from "@/components/mobile-layout"
import EmptyState from "@/components/empty-state"

export default function Payouts() {
  return (
    <MobileLayout title="Выплаты">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold tracking-tight mb-3">Выплаты</h1>
      </div>

      <EmptyState />
    </MobileLayout>
  )
}
