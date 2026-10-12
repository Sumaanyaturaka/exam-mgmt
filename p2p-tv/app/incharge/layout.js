import { requireRole } from '@/lib/auth'
import Shell from '@/components/Shell'

const NAV = [{ label: 'My rooms', href: '/incharge', exact: true }]

export default async function InchargeLayout({ children }) {
  const profile = await requireRole('incharge')
  return <Shell items={NAV} profile={profile}>{children}</Shell>
}
