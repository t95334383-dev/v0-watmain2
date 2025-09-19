export interface Requisite {
  id: string
  user_id: string
  card_number: string
  phone: string
  description?: string
  payment_method: "card" | "sbp" | "sbp-alfa" | "sbp-sber" | "sbp-tbank"
  payment_region: string
  bank_id?: number
  bank_bik?: string
  bank_fio?: string
  min_order_amount?: number
  max_order_amount?: number
  max_active_orders?: number
  max_finished_orders_per_day?: number
  delay_between_orders?: number
  balance_limit: number
  limit_per_day: number
  limit_per_month: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateRequisiteData {
  card_number: string
  phone: string
  description?: string
  payment_method: "card" | "sbp" | "sbp-alfa" | "sbp-sber" | "sbp-tbank"
  payment_region: string
  bank_id?: number
  bank_bik?: string
  bank_fio?: string
  min_order_amount?: number
  max_order_amount?: number
  max_active_orders?: number
  max_finished_orders_per_day?: number
  delay_between_orders?: number
  balance_limit: number
  limit_per_day: number
  limit_per_month: number
  is_active: boolean
}

export interface BankOption {
  id: number
  name: string
}
