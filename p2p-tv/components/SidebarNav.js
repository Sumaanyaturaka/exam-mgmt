'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SidebarNav({ items }) {
  const pathname = usePathname()
  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible" aria-label="Main">
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            aria-current={active ? 'page' : undefined}
            className={
              'whitespace-nowrap rounded-xl px-4 py-2.5 text-[15px] transition-colors ' +
              (active ? 'bg-[#172033] text-white' : 'text-slate-300 hover:bg-[#111a2b] hover:text-white')
            }
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
