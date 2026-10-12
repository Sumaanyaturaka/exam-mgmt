export function PageHeader({ title, subtitle }) {
  return (
    <header className="mb-8">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">Examination Section</p>
      <h1 className="mt-1 text-4xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-2 text-lg text-[var(--muted)]">{subtitle}</p>}
    </header>
  )
}

export function StatCard({ label, value, icon, hint, tone }) {
  const valueColor = tone === 'bad' ? 'text-red-600' : tone === 'good' ? 'text-emerald-600' : ''
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[15px] text-[var(--muted)]">{label}</p>
        <span aria-hidden="true" className="text-2xl">{icon}</span>
      </div>
      <p className={'mt-5 text-4xl font-bold ' + valueColor}>{value}</p>
      {hint && <p className="mt-1 text-sm text-[var(--muted)]">{hint}</p>}
    </div>
  )
}

export function Panel({ title, note, children }) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      {note && <p className="mt-1 text-[15px] text-[var(--muted)]">{note}</p>}
      <div className={title ? 'mt-4' : ''}>{children}</div>
    </section>
  )
}

const TONES = {
  green: 'bg-emerald-50 text-emerald-700',
  red: 'bg-red-50 text-red-700',
  amber: 'bg-amber-50 text-amber-700',
  gray: 'bg-slate-100 text-slate-600',
  indigo: 'bg-[var(--accent-bg)] text-[var(--accent)]',
}
export function Badge({ tone = 'gray', children }) {
  return <span className={'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ' + TONES[tone]}>{children}</span>
}

export function ErrorNote({ message }) {
  if (!message) return null
  return (
    <p role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      Could not load some data: {message}
    </p>
  )
}

export function DataTable({ columns, rows, empty = 'Nothing to show yet.' }) {
  if (!rows.length) return <p className="text-[15px] text-[var(--muted)]">{empty}</p>
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-[15px]">
        <thead>
          <tr className="border-b border-[var(--line)] text-sm text-[var(--muted)]">
            {columns.map((c) => (
              <th key={c.key} className={'px-3 py-2 font-medium ' + (c.right ? 'text-right' : '')}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i} className="border-b border-slate-100 last:border-0">
              {columns.map((c) => (
                <td key={c.key} className={'px-3 py-2.5 ' + (c.right ? 'text-right tabular-nums' : '')}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function formatDate(d) {
  if (!d) return ''
  return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function ComingNext({ title, stage, what }) {
  return (
    <>
      <PageHeader title={title} />
      <Panel>
        <p className="text-[15px]">{what}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">This page is built in {stage}.</p>
      </Panel>
    </>
  )
}
