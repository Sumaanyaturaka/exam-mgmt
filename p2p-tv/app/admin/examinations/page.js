import { supabaseAdmin as db } from '@/lib/supabaseAdmin'
import { PageHeader, Panel, Badge, ErrorNote, DataTable, formatDate } from '@/components/ui'

export default async function ExaminationsPage() {
  const [exams, eligible, allocations, examRooms] = await Promise.all([
    db.from('exams').select('id, exam_name, exam_date, session, year_of_study, section, is_published, courses(course_code, course_name), departments(department_code)').order('exam_date'),
    db.from('exam_students').select('exam_id'),
    db.from('allocations').select('exam_id'),
    db.from('exam_rooms').select('exam_id, submission_status'),
  ])
  const error = [exams, eligible, allocations, examRooms].find((r) => r.error)?.error?.message
  const count = (rows, id) => (rows.data ?? []).filter((r) => r.exam_id === id).length

  const rows = (exams.data ?? []).map((e) => ({
    ...e,
    eligible: count(eligible, e.id),
    allocated: count(allocations, e.id),
    rooms: count(examRooms, e.id),
    submitted: (examRooms.data ?? []).filter((r) => r.exam_id === e.id && r.submission_status === 'submitted').length,
  }))

  return (
    <>
      <PageHeader title="Examinations" subtitle={`${rows.length} examinations scheduled.`} />
      <ErrorNote message={error} />
      <Panel>
        <DataTable
          rows={rows}
          empty="No examinations yet."
          columns={[
            { key: 'exam_name', label: 'Examination' },
            { key: 'course', label: 'Course', render: (r) => `${r.courses?.course_code} · ${r.courses?.course_name}` },
            { key: 'date', label: 'Date', render: (r) => formatDate(r.exam_date) },
            { key: 'session', label: 'Session' },
            { key: 'class', label: 'Class', render: (r) => [r.departments?.department_code, r.year_of_study && `Year ${r.year_of_study}`, r.section && `Sec ${r.section}`].filter(Boolean).join(', ') },
            { key: 'eligible', label: 'Eligible', right: true },
            { key: 'allocated', label: 'Allocated', right: true },
            { key: 'rooms', label: 'Rooms', right: true, render: (r) => `${r.submitted} / ${r.rooms} submitted` },
            { key: 'pub', label: 'Status', render: (r) => <Badge tone={r.is_published ? 'green' : 'gray'}>{r.is_published ? 'Published' : 'Draft'}</Badge> },
          ]}
        />
      </Panel>
    </>
  )
}
