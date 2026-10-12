'use server'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createSupabaseServer } from '@/lib/supabaseServer'

export async function signInWithPassword(formData) {
  const email = String(formData.get('email') || '').trim().toLowerCase()
  const password = String(formData.get('password') || '')
  if (!email || !password) redirect('/login?error=missing')

  const supabase = await createSupabaseServer()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect('/login?error=invalid')

  redirect('/dashboard')
}

export async function signInWithGoogle() {
  const h = await headers()
  const origin = h.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const supabase = await createSupabaseServer()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${origin}/auth/callback` },
  })
  if (error || !data?.url) redirect('/login?error=google')

  redirect(data.url)
}
