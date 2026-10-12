import { supabaseAdmin as db } from '@/lib/supabaseAdmin'
import { PageHeader, Panel, Badge, ErrorNote, DataTable } from '@/components/ui'

export default async function StudentsPage() {
  const { data, error } = await db
    .from('students')
    .select('id, roll_number, full_name, year_of_study, section, profile_id, departments(department_code)')
    .order('roll_number')
    .limit(1000)
  const rows = data ?? []

  return (
    <>
      <PageHeader title="Students" subtitle={`${rows.length} student records.`} />
      <ErrorNote message={error?.message} />
      <Panel>
        <DataTable
          rows={rows}
          empty="No students yet."
          columns={[
            { key: 'roll_number', label: 'Roll number' },
            { key: 'full_name', label: 'Name' },
            { key: 'dept', label: 'Department', render: (r) => r.departments?.department_code },
            { key: 'year_of_study', label: 'Year' },
            { key: 'section', label: 'Section' },
            { key: 'login', label: 'Login', render: (r) => <Badge tone={r.profile_id ? 'green' : 'gray'}>{r.profile_id ? 'Linked' : 'Not linked'}</Badge> },
          ]}
        />
      </Panel>
    </>
  )
}
