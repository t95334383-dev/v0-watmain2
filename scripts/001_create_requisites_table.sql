-- Create requisites table for storing user payment requisites
CREATE TABLE IF NOT EXISTS public.requisites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_number TEXT NOT NULL,
  phone TEXT NOT NULL,
  description TEXT,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('card', 'sbp', 'sbp-alfa', 'sbp-sber', 'sbp-tbank')),
  payment_region TEXT NOT NULL DEFAULT 'ru',
  bank_id INTEGER,
  bank_bik TEXT,
  bank_fio TEXT,
  min_order_amount DECIMAL(15,2),
  max_order_amount DECIMAL(15,2),
  max_active_orders INTEGER,
  max_finished_orders_per_day INTEGER,
  delay_between_orders INTEGER,
  balance_limit DECIMAL(15,2) NOT NULL,
  limit_per_day DECIMAL(15,2) NOT NULL,
  limit_per_month DECIMAL(15,2) NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.requisites ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Users can view their own requisites" ON public.requisites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own requisites" ON public.requisites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own requisites" ON public.requisites
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own requisites" ON public.requisites
  FOR DELETE USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_requisites_user_id ON public.requisites(user_id);
CREATE INDEX IF NOT EXISTS idx_requisites_payment_method ON public.requisites(payment_method);
CREATE INDEX IF NOT EXISTS idx_requisites_is_active ON public.requisites(is_active);
