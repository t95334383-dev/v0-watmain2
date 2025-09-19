"use client"

import { X, Search, Filter } from "lucide-react"
import { useTheme } from "./theme-context"

interface EmptyStateProps {
  message?: string
  showSearch?: boolean
  showFilter?: boolean
}

export default function EmptyState({
  message = "Не найдено записей",
  showSearch = false,
  showFilter = false,
}: EmptyStateProps) {
  const { theme } = useTheme()

  return (
    <div className={`p-6 rounded-lg shadow-lg ${theme === "dark" ? "bg-[#1e2a3a]" : "bg-white"}`}>
      {(showSearch || showFilter) && (
        <div className="flex items-center gap-4 mb-6">
          {showSearch && (
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
                size={20}
              />
              <input
                type="text"
                placeholder="Поиск"
                className={`w-full border-0 rounded-lg pl-10 pr-4 py-3 placeholder-gray-400 ${
                  theme === "dark" ? "bg-[#2a3441] text-white" : "bg-gray-100 text-black"
                }`}
              />
            </div>
          )}
          {showFilter && (
            <button
              className={`text-orange-500 p-2 rounded-lg ${
                theme === "dark" ? "hover:bg-[#2a3441]" : "hover:bg-gray-100"
              }`}
            >
              <Filter size={20} />
            </button>
          )}
        </div>
      )}

      <div className="text-center py-12">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            theme === "dark" ? "bg-[#2a3441]" : "bg-gray-200"
          }`}
        >
          <X className="text-orange-500" size={24} />
        </div>
        <p className={`text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>{message}</p>
      </div>
    </div>
  )
}
