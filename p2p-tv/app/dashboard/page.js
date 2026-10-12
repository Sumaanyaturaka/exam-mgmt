import { redirect } from 'next/navigation'
import { getProfile, homeFor } from '@/lib/auth'

// Sends each user to the area for their own role.
export default async function Dashboard() {
  const result = await getProfile()
  if (result.status === 'anonymous') redirect('/login')
  if (result.status !== 'ok') redirect('/auth/signout?reason=not_registered')
  redirect(homeFor(result.profile.role))
}
