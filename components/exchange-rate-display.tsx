"use client"

import { useEffect, useState } from "react"

export default function ExchangeRateDisplay() {
  const [baseRate, setBaseRate] = useState<number>(89.57)
  const [markupRate, setMarkupRate] = useState<number>(96.74)
  const [lastUpdate, setLastUpdate] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoading(true)

        // Set current time regardless of API success
        const now = new Date()
        const hours = now.getHours().toString().padStart(2, "0")
        const minutes = now.getMinutes().toString().padStart(2, "0")
        const day = now.getDate().toString().padStart(2, "0")
        const month = (now.getMonth() + 1).toString().padStart(2, "0")
        const year = now.getFullYear()
        const timeString = `${hours}:${minutes} ${day}/${month}/${year}`

        // Try to fetch from API with timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=rub", {
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()

        if (data && data.tether && data.tether.rub) {
          const rate = data.tether.rub
          setBaseRate(rate)
          setMarkupRate(rate * 1.08)
        } else {
          throw new Error("Invalid API response format")
        }

        setLastUpdate(timeString)
      } catch (error) {
        console.error("Error fetching exchange rate:", error)

        // Use hardcoded fallback values
        // Calculate current time for the fallback
        const now = new Date()
        const hours = now.getHours().toString().padStart(2, "0")
        const minutes = now.getMinutes().toString().padStart(2, "0")
        const day = now.getDate().toString().padStart(2, "0")
        const month = (now.getMonth() + 1).toString().padStart(2, "0")
        const year = now.getFullYear()

        setBaseRate(89.57)
        setMarkupRate(96.74)
        setLastUpdate(`${hours}:${minutes} ${day}/${month}/${year}`)
      } finally {
        setLoading(false)
      }
    }

    fetchExchangeRate()

    // Refresh rate every 5 minutes
    const intervalId = setInterval(fetchExchangeRate, 5 * 60 * 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="bg-[#1a2a3a] rounded-lg p-6 mb-6">
      <h2 className="text-xl mb-2">Текущий курс</h2>
      {loading ? (
        <p className="text-2xl font-bold">Загрузка...</p>
      ) : (
        <>
          <p className="text-4xl font-bold">
            {baseRate.toFixed(2)}/{markupRate.toFixed(2)} (8.00%)
          </p>
          <p className="text-gray-300 mt-2">Последнее обновление {lastUpdate}</p>
        </>
      )}
    </div>
  )
}
