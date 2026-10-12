import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabaseServer'

// Logout, and the exit for accounts that are not on the approved list.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const reason = searchParams.get('reason')
  const supabase = await createSupabaseServer()
  await supabase.auth.signOut()
  const target = reason ? `/login?error=${encodeURIComponent(reason)}` : '/login'
  return NextResponse.redirect(`${origin}${target}`)
}
