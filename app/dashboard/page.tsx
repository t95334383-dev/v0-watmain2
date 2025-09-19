"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import MobileLayout from "@/components/mobile-layout"
import { useTheme } from "@/components/theme-context"

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const { theme } = useTheme()

  const depositAddress = "TPCPnFHeiL3UJ5ptSWPAeJJbhLoT3Vq5tg"
  const balance = "0 usdt"
  const insuranceDeposit = "0.00/1500 usdt"
  const exchangeRate = "84.2/90.09 (7.00%)"
  const lastUpdate = "19:50 19/09/2025"

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true"
    const storedUsername = sessionStorage.getItem("username")

    if (!loggedIn || !storedUsername) {
      window.location.href = "/login"
      return
    }

    setIsLoggedIn(true)
    setUsername(storedUsername)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn")
    sessionStorage.removeItem("username")
    window.location.href = "/login"
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[rgb(17,24,39)] flex items-center justify-center text-white">Загрузка...</div>
    )
  }

  return (
    <MobileLayout title="Дашборд">
      {/* Welcome Card */}
      <div className="bg-[rgb(31,41,55)] rounded-xl p-2 shadow-lg w-full mb-4">
        <div className="p-4">
          <div className="flex items-center h-12">
            <div
              className="w-10 h-10 rounded-full bg-[rgb(17,24,39)] flex-shrink-0"
              style={{
                backgroundImage: "url('https://ui-avatars.com/api/?name=m&color=FFFFFF&background=111827')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="ml-4">
              <h2 className="text-xl font-bold tracking-tight text-white">Добро пожаловать, {username}</h2>
              <button onClick={handleLogout} className="text-sm text-[rgb(209,213,219)] hover:opacity-80">
                Выход
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Address - Full Width with Overflow */}
      <div className="w-full bg-[rgb(31,41,55)] rounded-2xl p-6 shadow-lg mb-4 overflow-hidden">
        <div className="flex items-center text-sm font-medium text-[rgb(229,231,235)] mb-2">
          <span>Адрес для депозита</span>
        </div>
        <div className="text-3xl text-white whitespace-nowrap overflow-x-auto scrollbar-hide">{depositAddress}</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Balance */}
        <div className="bg-[rgb(31,41,55)] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center text-sm font-medium text-[rgb(229,231,235)] mb-2">
            <span>Баланс</span>
          </div>
          <div className="text-3xl text-white">{balance}</div>
        </div>

        {/* Insurance Deposit */}
        <div className="bg-[rgb(31,41,55)] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center text-sm font-medium text-[rgb(229,231,235)] mb-2">
            <span>Страховой депозит</span>
          </div>
          <div className="text-3xl text-white">{insuranceDeposit}</div>
        </div>

        {/* Exchange Rate */}
        <div className="bg-[rgb(31,41,55)] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center text-sm font-medium text-[rgb(229,231,235)] mb-2">
            <span>Текущий курс</span>
          </div>
          <div className="text-3xl text-white">{exchangeRate}</div>
          <div className="flex items-center text-sm font-medium text-gray-300 mt-2">
            <span>Последнее обновление {lastUpdate}</span>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
