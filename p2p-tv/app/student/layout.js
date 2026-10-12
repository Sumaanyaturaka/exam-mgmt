import { requireRole } from '@/lib/auth'
import Shell from '@/components/Shell'

const NAV = [{ label: 'My examinations', href: '/student', exact: true }]

export default async function StudentLayout({ children }) {
  const profile = await requireRole('student')
  return <Shell items={NAV} profile={profile}>{children}</Shell>
}
