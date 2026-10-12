import { createClient } from '@supabase/supabase-js'

// SERVER-ONLY. Full database access. Never import this into a 'use client' file.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
)
