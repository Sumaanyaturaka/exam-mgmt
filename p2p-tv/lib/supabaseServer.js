import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Server client that reads the logged-in user from cookies.
export async function createSupabaseServer() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => {
          try {
            list.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component: cookies can't be set here. Safe to ignore.
          }
        },
      },
    }
  )
}
