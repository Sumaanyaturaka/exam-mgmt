import SidebarNav from './SidebarNav'

// Dark sidebar + light content area. Used by all three roles.
export default function Shell({ items, profile, children }) {
  return (
    <div className="min-h-screen lg:flex">
      <aside className="flex flex-col gap-6 bg-[#050a18] p-5 text-slate-200 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:p-7">
        <div>
          <p className="text-3xl font-bold tracking-tight text-white">Academix</p>
          <p className="mt-1 text-sm text-slate-400">Examination Management</p>
        </div>
        <SidebarNav items={items} />
        <div className="mt-auto border-t border-slate-800 pt-4 text-sm">
          <p className="font-medium text-white">{profile.full_name}</p>
          <p className="text-slate-400">{profile.role}</p>
          <a href="/auth/signout" className="mt-3 inline-block rounded-lg border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-[#111a2b]">
            Log out
          </a>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-5 py-8 lg:px-12 lg:py-10">{children}</main>
    </div>
  )
}
