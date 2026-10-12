import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabaseServer'

// Google sends the user back here after sign-in.
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  if (code) {
    const supabase = await createSupabaseServer()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) return NextResponse.redirect(`${origin}/login?error=google`)
  }
  return NextResponse.redirect(`${origin}/dashboard`)
}
