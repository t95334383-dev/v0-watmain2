"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { createBrowserClient } from "@/lib/supabase/client"

interface Requisite {
  id: string
  card_number: string
  phone: string
  description: string | null
  payment_method: string
  is_active: boolean
  min_order_amount: number | null
  max_order_amount: number | null
  balance_limit: number
  limit_per_day: number
  limit_per_month: number
  created_at: string
}

export default function Requisites() {
  const router = useRouter()
  const [requisites, setRequisites] = useState<Requisite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("")
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  const handleCreateClick = () => {
    router.push("/requisites/create")
  }

  useEffect(() => {
    loadRequisites()
  }, [])

  const loadRequisites = async () => {
    try {
      const supabase = createBrowserClient()

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) {
        console.error("User not authenticated")
        return
      }

      const { data, error } = await supabase
        .from("requisites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading requisites:", error)
        return
      }

      setRequisites(data || [])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredRequisites = requisites.filter((requisite) => {
    const matchesSearch =
      searchQuery === "" ||
      requisite.card_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      requisite.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (requisite.description && requisite.description.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter =
      activeFilter === "" ||
      (activeFilter === "true" && requisite.is_active) ||
      (activeFilter === "false" && !requisite.is_active)

    return matchesSearch && matchesFilter
  })

  const formatAmount = (amount: number | null) => {
    if (amount === null) return "∞"
    return new Intl.NumberFormat("ru-RU").format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
  }

  const handleFilterClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowFilterDropdown(!showFilterDropdown)
  }

  const handleFilterSelect = (value: string) => {
    setActiveFilter(value)
    setShowFilterDropdown(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(".filter-dropdown-container")) {
        setShowFilterDropdown(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  if (isLoading) {
    return (
      <MobileLayout title="Реквизиты">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-amber-500 border-t-transparent"></div>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout title="Реквизиты">
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold tracking-tight mb-3">Реквизиты</h1>
        <button
          onClick={handleCreateClick}
          className="bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          Создать
        </button>
      </div>

      <div className="sticky top-16 bg-[rgb(17,24,39)] z-10 pb-4">
        <div className="bg-gray-800 border border-gray-600 rounded-xl shadow-sm">
          <div className="p-2 flex items-center justify-between h-14">
            <div className="flex items-center gap-2 flex-1 justify-end">
              {/* Search Input */}
              <div className="relative w-72">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-9 pr-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors text-sm h-9"
                />
              </div>
            </div>

            {/* Filter Button */}
            <div className="flex-shrink-0 relative filter-dropdown-container">
              <button
                onClick={handleFilterClick}
                className="p-2 text-amber-500 hover:text-amber-400 transition-colors rounded-full w-10 h-10 flex items-center justify-center"
                title="Фильтр"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 top-12 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-600 z-30">
                  <div className="p-4">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Active</label>
                        <select
                          value={activeFilter}
                          onChange={(e) => handleFilterSelect(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm"
                        >
                          <option value="">Все</option>
                          <option value="true">Активные</option>
                          <option value="false">Неактивные</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-right mt-6">
                      <button
                        onClick={() => {
                          setActiveFilter("")
                          setSearchQuery("")
                          setShowFilterDropdown(false)
                        }}
                        className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors"
                      >
                        Сбросить фильтры
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-gray-800 border border-gray-600 rounded-xl shadow-sm">
          <div className="border-t border-gray-600 relative overflow-x-auto">
            {filteredRequisites.length === 0 ? (
              <div className="p-4 flex justify-center items-center">
                <div className="bg-gray-800 text-center py-6 flex flex-col items-center justify-center flex-1 max-w-md mx-auto">
                  <div className="bg-gray-600 text-amber-500 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="mb-0 max-w-112">
                    <h2 className="text-white text-xl font-bold tracking-tight mb-1">Не найдено записей</h2>
                    <p className="text-gray-400 text-sm font-medium leading-5 whitespace-normal mt-1 mb-0"></p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">{/* Table content would go here when there are requisites */}</div>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
