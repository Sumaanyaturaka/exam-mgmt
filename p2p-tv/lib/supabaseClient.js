import { createBrowserClient } from '@supabase/ssr'

// Browser client. Stores the login session in cookies so server code can read it.
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
