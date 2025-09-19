"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileLayout from "@/components/mobile-layout"
import { createBrowserClient } from "@/lib/supabase/client"

export default function CreateRequisite() {
  const router = useRouter()
  const [cardNumber, setCardNumber] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [description, setDescription] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentRegion, setPaymentRegion] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")
  const [maxActiveOrders, setMaxActiveOrders] = useState("")
  const [maxCompletedOrders, setMaxCompletedOrders] = useState("")
  const [timeBetweenOrders, setTimeBetweenOrders] = useState("")
  const [balanceLimit, setBalanceLimit] = useState("")
  const [dayLimit, setDayLimit] = useState("")
  const [monthLimit, setMonthLimit] = useState("")
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const bankOptions = [
    { id: "alfa", name: "Альфа-Банк" },
    { id: "sber", name: "Сбербанк" },
    { id: "tbank", name: "Т-Банк" },
    { id: "vtb", name: "ВТБ" },
    { id: "gazprom", name: "Газпромбанк" },
  ]

  const handleCancel = () => {
    router.back()
  }

  const handleCreate = async () => {
    if (!cardNumber || !phoneNumber || !paymentMethod || !paymentRegion || !balanceLimit || !dayLimit || !monthLimit) {
      alert("Пожалуйста, заполните все обязательные поля")
      return
    }

    if (paymentMethod === "sbp" && !selectedBank) {
      alert("Пожалуйста, выберите банк для СБП")
      return
    }

    setIsLoading(true)
    try {
      const supabase = createBrowserClient()

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) {
        alert("Необходимо войти в систему")
        return
      }

      const requisiteData = {
        user_id: user.id,
        card_number: cardNumber,
        phone: phoneNumber,
        description: description || null,
        payment_method: paymentMethod,
        payment_region: paymentRegion,
        bank_id: selectedBank ? bankOptions.find((b) => b.id === selectedBank)?.name : null,
        min_order_amount: minAmount ? Number.parseFloat(minAmount) : null,
        max_order_amount: maxAmount ? Number.parseFloat(maxAmount) : null,
        max_active_orders: maxActiveOrders ? Number.parseInt(maxActiveOrders) : null,
        max_finished_orders_per_day: maxCompletedOrders ? Number.parseInt(maxCompletedOrders) : null,
        delay_between_orders: timeBetweenOrders ? Number.parseInt(timeBetweenOrders) : null,
        balance_limit: Number.parseFloat(balanceLimit),
        limit_per_day: Number.parseFloat(dayLimit),
        limit_per_month: Number.parseFloat(monthLimit),
        is_active: isActive,
      }

      const { error } = await supabase.from("requisites").insert([requisiteData])

      if (error) {
        console.error("Error creating requisite:", error)
        alert("Ошибка при создании реквизита")
        return
      }

      router.push("/requisites")
    } catch (error) {
      console.error("Error:", error)
      alert("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateAndMore = async () => {
    if (!cardNumber || !phoneNumber || !paymentMethod || !paymentRegion || !balanceLimit || !dayLimit || !monthLimit) {
      alert("Пожалуйста, заполните все обязательные поля")
      return
    }

    if (paymentMethod === "sbp" && !selectedBank) {
      alert("Пожалуйста, выберите банк для СБП")
      return
    }

    setIsLoading(true)
    try {
      const supabase = createBrowserClient()

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) {
        alert("Необходимо войти в систему")
        return
      }

      const requisiteData = {
        user_id: user.id,
        card_number: cardNumber,
        phone: phoneNumber,
        description: description || null,
        payment_method: paymentMethod,
        payment_region: paymentRegion,
        bank_id: selectedBank ? bankOptions.find((b) => b.id === selectedBank)?.name : null,
        min_order_amount: minAmount ? Number.parseFloat(minAmount) : null,
        max_order_amount: maxAmount ? Number.parseFloat(maxAmount) : null,
        max_active_orders: maxActiveOrders ? Number.parseInt(maxActiveOrders) : null,
        max_finished_orders_per_day: maxCompletedOrders ? Number.parseInt(maxCompletedOrders) : null,
        delay_between_orders: timeBetweenOrders ? Number.parseInt(timeBetweenOrders) : null,
        balance_limit: Number.parseFloat(balanceLimit),
        limit_per_day: Number.parseFloat(dayLimit),
        limit_per_month: Number.parseFloat(monthLimit),
        is_active: isActive,
      }

      const { error } = await supabase.from("requisites").insert([requisiteData])

      if (error) {
        console.error("Error creating requisite:", error)
        alert("Ошибка при создании реквизита")
        return
      }

      setCardNumber("")
      setPhoneNumber("")
      setDescription("")
      setPaymentMethod("")
      setPaymentRegion("")
      setSelectedBank("")
      setMinAmount("")
      setMaxAmount("")
      setMaxActiveOrders("")
      setMaxCompletedOrders("")
      setTimeBetweenOrders("")
      setBalanceLimit("")
      setDayLimit("")
      setMonthLimit("")
      setIsActive(false)

      alert("Реквизит успешно создан!")
    } catch (error) {
      console.error("Error:", error)
      alert("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  const isSBPMethod = paymentMethod === "sbp" || paymentMethod.startsWith("sbp-")

  return (
    <MobileLayout title="Создать Реквизит">
      <div className="bg-gray-800 border border-gray-600 p-6 rounded-xl">
        <div className="space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              {isSBPMethod ? "Номер телефона СБП" : "Номер карты"} <sup className="text-red-400 text-xs ml-1">*</sup>
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder={isSBPMethod ? "+79001112233" : "1111222233334444"}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              Номер для СМС <sup className="text-red-400 text-xs ml-1">*</sup>
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+79001112233"
              maxLength={255}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Описание реквизита, любая информация полезная для Вас
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={45}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              Метод платежа <sup className="text-red-400 text-xs ml-1">*</sup>
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: "right 8px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "24px 24px",
                paddingRight: "40px",
              }}
            >
              <option value="">Выберите вариант</option>
              <option value="card">CARD</option>
              <option value="sbp">SBP</option>
              <option value="sbp-alfa">Альфа-Альфа СБП</option>
              <option value="sbp-sber">Сбер-Сбер СБП</option>
              <option value="sbp-tbank">Тбанк-Тбанк СБП</option>
              <option value="sbp-ozon">Озон-Озон СБП</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              Регион платежа <sup className="text-red-400 text-xs ml-1">*</sup>
            </label>
            <select
              value={paymentRegion}
              onChange={(e) => setPaymentRegion(e.target.value)}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: "right 8px center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "24px 24px",
                paddingRight: "40px",
              }}
            >
              <option value="">Выберите вариант</option>
              <option value="ru">РФ</option>
            </select>
          </div>

          {isSBPMethod && (
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                Выберите банк для СБП <sup className="text-red-400 text-xs ml-1">*</sup>
              </label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: "right 8px center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "24px 24px",
                  paddingRight: "40px",
                }}
              >
                <option value="">Выберите банк</option>
                {bankOptions.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Минимальная сумма заказа</label>
            <input
              type="text"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="Оставьте пустым, если не нужно"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Максимальная сумма заказа</label>
            <input
              type="text"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="Оставьте пустым, если не нужно"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Максимальное количество активных заявок
            </label>
            <input
              type="text"
              value={maxActiveOrders}
              onChange={(e) => setMaxActiveOrders(e.target.value)}
              placeholder="Оставьте пустым, если не нужно"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Максимальное количество завершённых заявок в сутки с 00 до 24
            </label>
            <input
              type="text"
              value={maxCompletedOrders}
              onChange={(e) => setMaxCompletedOrders(e.target.value)}
              placeholder="Оставьте пустым, если не нужно"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Время между заказами в минутах (если стоит 5, заказ пришёл в 16.05, следующий может только в 16.10)
            </label>
            <input
              type="text"
              value={timeBetweenOrders}
              onChange={(e) => setTimeBetweenOrders(e.target.value)}
              placeholder="Оставьте пустым, если не нужно"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              Лимит баланса <sup className="text-red-400 text-xs ml-1">*</sup>
            </label>
            <input
              type="text"
              value={balanceLimit}
              onChange={(e) => setBalanceLimit(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              Лимит в день (с 00 до 24) <sup className="text-red-400 text-xs ml-1">*</sup>
            </label>
            <input
              type="text"
              value={dayLimit}
              onChange={(e) => setDayLimit(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              Лимит в месяц <sup className="text-red-400 text-xs ml-1">*</sup>
            </label>
            <input
              type="text"
              value={monthLimit}
              onChange={(e) => setMonthLimit(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                isActive ? "bg-amber-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  isActive ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className="ml-3 text-sm font-medium text-gray-300">Выкл/Вкл</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={handleCreate}
            disabled={isLoading}
            className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-medium px-4 py-2 rounded-lg min-h-9 flex items-center gap-2 transition-colors"
          >
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            )}
            <span>Создать</span>
          </button>

          <button
            onClick={handleCreateAndMore}
            disabled={isLoading}
            className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300 font-medium px-4 py-2 rounded-lg min-h-9 transition-colors"
          >
            Создать и Создать еще
          </button>

          <button
            onClick={handleCancel}
            className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300 font-medium px-4 py-2 rounded-lg min-h-9 transition-colors"
          >
            Отмена
          </button>
        </div>
      </div>
    </MobileLayout>
  )
}
