import { supabaseAdmin } from '@/lib/supabaseAdmin'

export const dynamic = 'force-dynamic'

// TEMPORARY connection check. DELETE this folder before sharing the live link.
export default async function TestPage() {
  const { data, error } = await supabaseAdmin
    .from('rooms')
    .select('room_number, block_name, capacity')
    .order('room_number')
  return <pre className="p-6 text-sm">{JSON.stringify({ data, error }, null, 2)}</pre>
}
