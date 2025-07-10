import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Pin = {
  id: string
  nickname: string
  city: string
  state: string
  parent_email?: string
  ip_address?: string
  user_agent?: string
  approved: boolean
  created_at: string
  updated_at: string
}