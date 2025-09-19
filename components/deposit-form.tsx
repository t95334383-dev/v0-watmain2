"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function DepositForm() {
  const [amount, setAmount] = useState("")
  const [txHash, setTxHash] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !txHash) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Success notification
    toast({
      title: "Заявка отправлена",
      description: "Ваша заявка на пополнение баланса отправлена на проверку",
    })

    // Reset form
    setAmount("")
    setTxHash("")
    setIsSubmitting(false)
  }

  return (
    <div className="bg-[#1a2a3a] rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Пополнение баланса USDT</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium mb-1">
            Сумма USDT
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="Введите сумму"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-[#1e2f3f] border-0 text-white"
            min="1"
            step="any"
            required
          />
        </div>

        <div>
          <label htmlFor="txHash" className="block text-sm font-medium mb-1">
            Хеш транзакции
          </label>
          <Input
            id="txHash"
            type="text"
            placeholder="Введите хеш транзакции"
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            className="bg-[#1e2f3f] border-0 text-white font-mono"
            required
          />
          <p className="text-xs text-gray-400 mt-1">Укажите хеш транзакции после отправки USDT на указанный адрес</p>
        </div>

        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={isSubmitting}>
          {isSubmitting ? "Отправка..." : "Отправить заявку"}
        </Button>
      </form>
    </div>
  )
}
