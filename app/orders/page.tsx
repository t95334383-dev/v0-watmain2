"use client"

import MobileLayout from "@/components/mobile-layout"
import EmptyState from "@/components/empty-state"

export default function Orders() {
  return (
    <MobileLayout title="Заказы">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold tracking-tight mb-3">Заказы</h1>
      </div>
      <EmptyState showSearch />
    </MobileLayout>
  )
}
