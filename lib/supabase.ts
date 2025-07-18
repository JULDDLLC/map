import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Mock Supabase client for demo mode
const mockSupabase = {
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null })
        }),
        limit: () => Promise.resolve({ data: [], error: null })
      }),
      order: () => ({
        limit: () => Promise.resolve({ data: [], error: null })
      }),
      limit: () => Promise.resolve({ data: [], error: null })
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => ({
      eq: () => Promise.resolve({ data: null, error: null })
    }),
    delete: () => ({
      eq: () => Promise.resolve({ data: null, error: null })
    })
  }),
  channel: () => ({
    on: () => ({
      subscribe: () => Promise.resolve()
    })
  }),
  removeChannel: () => {}
}

// Use real Supabase if credentials are available, otherwise use mock
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : mockSupabase

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