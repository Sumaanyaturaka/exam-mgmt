import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { createSupabaseServer } from '@/lib/supabaseServer'

export function homeFor(role) {
  return { admin: '/admin', incharge: '/incharge', student: '/student' }[role] || '/login'
}

// Finds who is logged in and what role they have.
// The role ALWAYS comes from the database, never from the browser.
export async function getProfile() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { status: 'anonymous' }

  // 1) Existing profile: use it.
  const { data: existing } = await supabaseAdmin
    .from('profiles').select('*').eq('id', user.id).maybeSingle()
  if (existing) return { status: 'ok', user, profile: existing }

  // 2) First login: look the email up in the admin's approved list.
  const email = (user.email || '').toLowerCase()
  const { data: allowed } = await supabaseAdmin
    .from('allowed_users').select('*').eq('email', email).maybeSingle()
  if (!allowed) return { status: 'not_registered', user }

  // 3) Approved: create the profile with the role from the list.
  const { data: profile, error } = await supabaseAdmin
    .from('profiles')
    .insert({ id: user.id, full_name: allowed.full_name, email, role: allowed.role })
    .select().single()
  if (error) return { status: 'error', user, message: error.message }

  // 4) Students: connect the login to their student record.
  if (allowed.role === 'student' && allowed.roll_number) {
    await supabaseAdmin.from('students')
      .update({ profile_id: user.id })
      .eq('roll_number', allowed.roll_number)
  }
  return { status: 'ok', user, profile }
}

// Call at the top of any protected area.
export async function requireRole(role) {
  const result = await getProfile()
  if (result.status === 'anonymous') redirect('/login')
  if (result.status === 'not_registered') redirect('/auth/signout?reason=not_registered')
  if (result.status === 'error') redirect('/auth/signout?reason=error')
  if (result.profile.role !== role) redirect(homeFor(result.profile.role))
  return result.profile
}
