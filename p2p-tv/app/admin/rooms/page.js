import { supabaseAdmin as db } from '@/lib/supabaseAdmin'
import { PageHeader, Panel, Badge, ErrorNote, DataTable } from '@/components/ui'

export default async function RoomsPage() {
  const [rooms, examRooms] = await Promise.all([
    db.from('rooms').select('id, room_number, block_name, capacity, is_available').order('room_number'),
    db.from('exam_rooms').select('room_id'),
  ])
  const error = [rooms, examRooms].find((r) => r.error)?.error?.message
  const rows = (rooms.data ?? []).map((r) => ({
    ...r,
    exams: (examRooms.data ?? []).filter((e) => e.room_id === r.id).length,
  }))
  const seats = rows.reduce((sum, r) => sum + r.capacity, 0)

  return (
    <>
      <PageHeader title="Rooms" subtitle={`${rows.length} rooms, ${seats} seats in total.`} />
      <ErrorNote message={error} />
      <Panel>
        <DataTable
          rows={rows}
          empty="No rooms yet."
          columns={[
            { key: 'room_number', label: 'Room' },
            { key: 'block_name', label: 'Block' },
            { key: 'capacity', label: 'Capacity', right: true },
            { key: 'exams', label: 'Assigned to', right: true, render: (r) => `${r.exams} exam${r.exams === 1 ? '' : 's'}` },
            { key: 'avail', label: 'Availability', render: (r) => <Badge tone={r.is_available ? 'green' : 'red'}>{r.is_available ? 'Available' : 'Unavailable'}</Badge> },
          ]}
        />
      </Panel>
    </>
  )
}
