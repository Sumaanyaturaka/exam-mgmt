import { supabaseAdmin as db } from '@/lib/supabaseAdmin'
import { PageHeader, StatCard, Panel, Badge, ErrorNote, DataTable, formatDate } from '@/components/ui'

async function loadDashboard() {
  const [exams, rooms, eligible, allocations, examRooms] = await Promise.all([
    db.from('exams').select('id, exam_name, exam_date, session, is_published, courses(course_code)').order('exam_date'),
    db.from('rooms').select('id, capacity'),
    db.from('exam_students').select('exam_id'),
    db.from('allocations').select('exam_id, room_id, attendance_status'),
    db.from('exam_rooms').select('exam_id, room_id, submission_status'),
  ])
  const error = [exams, rooms, eligible, allocations, examRooms].find((r) => r.error)?.error?.message

  const roomList = rooms.data ?? []
  const allocList = allocations.data ?? []
  const examRoomList = examRooms.data ?? []

  const capacityOf = Object.fromEntries(roomList.map((r) => [String(r.id), r.capacity]))
  const submitted = new Set(
    examRoomList.filter((r) => r.submission_status === 'submitted').map((r) => `${r.exam_id}:${r.room_id}`)
  )

  // Attendance totals count only rooms whose attendance is finalized (submitted).
  let present = 0, absent = 0
  const perRoom = {}
  for (const a of allocList) {
    const key = `${a.exam_id}:${a.room_id}`
    perRoom[key] = (perRoom[key] || 0) + 1
    if (submitted.has(key)) {
      if (a.attendance_status === 'present') present++
      if (a.attendance_status === 'absent') absent++
    }
  }
  const overCapacity = Object.entries(perRoom).filter(
    ([key, n]) => n > (capacityOf[key.split(':')[1]] ?? Infinity)
  ).length

  const eligibleList = eligible.data ?? []
  const perExam = (examId) => ({
    eligible: eligibleList.filter((e) => e.exam_id === examId).length,
    allocated: allocList.filter((a) => a.exam_id === examId).length,
    rooms: examRoomList.filter((r) => r.exam_id === examId).length,
    submitted: examRoomList.filter((r) => r.exam_id === examId && r.submission_status === 'submitted').length,
  })

  return {
    error,
    examCount: (exams.data ?? []).length,
    roomCount: roomList.length,
    seats: roomList.reduce((sum, r) => sum + r.capacity, 0),
    allocated: allocList.length,
    awaiting: Math.max(eligibleList.length - allocList.length, 0),
    overCapacity,
    roomsTotal: examRoomList.length,
    roomsSubmitted: submitted.size,
    roomsPending: examRoomList.length - submitted.size,
    present,
    absent,
    examRows: (exams.data ?? []).map((e) => ({ ...e, ...perExam(e.id) })),
  }
}

export default async function AdminDashboard() {
  const d = await loadDashboard()

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of your examination management system." />
      <ErrorNote message={d.error} />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Examinations" value={d.examCount} icon="📋" />
        <StatCard label="Rooms" value={d.roomCount} icon="🏫" hint={`${d.seats} seats in total`} />
        <StatCard label="Students allocated" value={d.allocated} icon="🎓" hint={`${d.awaiting} awaiting allocation`} />
        <StatCard label="Rooms over capacity" value={d.overCapacity} icon="🪑" hint="Always 0 when the rules are working" tone={d.overCapacity ? 'bad' : 'good'} />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Attendance submitted" value={`${d.roomsSubmitted} / ${d.roomsTotal}`} icon="✅" hint="Rooms with final attendance" />
        <StatCard label="Present (final)" value={d.present} icon="🙋" tone="good" />
        <StatCard label="Absent (final)" value={d.absent} icon="🚫" tone={d.absent ? 'bad' : undefined} />
        <StatCard label="Pending absentee statements" value={d.roomsPending} icon="⏳" hint="Rooms not yet submitted" />
      </div>

      <div className="mt-8">
        <Panel title="Examinations" note="Allocation and attendance progress for each examination.">
          <DataTable
            rows={d.examRows}
            empty="No examinations yet."
            columns={[
              { key: 'exam_name', label: 'Examination' },
              { key: 'course', label: 'Course', render: (r) => r.courses?.course_code },
              { key: 'date', label: 'Date', render: (r) => `${formatDate(r.exam_date)}, ${r.session}` },
              { key: 'alloc', label: 'Allocated', right: true, render: (r) => `${r.allocated} / ${r.eligible}` },
              { key: 'rooms', label: 'Rooms submitted', right: true, render: (r) => `${r.submitted} / ${r.rooms}` },
              { key: 'pub', label: 'Status', render: (r) => <Badge tone={r.is_published ? 'green' : 'gray'}>{r.is_published ? 'Published' : 'Draft'}</Badge> },
            ]}
          />
        </Panel>
      </div>
    </>
  )
}
