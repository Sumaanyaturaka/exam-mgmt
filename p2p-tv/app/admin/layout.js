import { requireRole } from '@/lib/auth'
import Shell from '@/components/Shell'

const NAV = [
  { label: 'Dashboard', href: '/admin', exact: true },
  { label: 'Examinations', href: '/admin/examinations' },
  { label: 'Students', href: '/admin/students' },
  { label: 'Rooms', href: '/admin/rooms' },
  { label: 'Allocations', href: '/admin/allocations' },
  { label: 'Attendance', href: '/admin/attendance' },
  { label: 'Reports', href: '/admin/reports' },
]

export default async function AdminLayout({ children }) {
  const profile = await requireRole('admin')
  return <Shell items={NAV} profile={profile}>{children}</Shell>
}
