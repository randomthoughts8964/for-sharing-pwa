import { supabase } from '@/lib/supabase'
import type { Place } from '@/lib/types'
import MapPageClient from '@/components/MapPageClient'

export default async function MapPage() {
  const { data: places, error } = await supabase
    .from('places')
    .select('*')
    .eq('status', 'published')
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white p-6 pb-24">
        <h1 className="text-2xl font-bold">Map Error</h1>
        <pre className="mt-4 whitespace-pre-wrap text-red-400">
          {error.message}
        </pre>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 pb-24">
      <header className="mb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
          Map
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Map View
        </h1>
        <p className="mt-3 max-w-xl text-neutral-300">
          Explore curated coffee shops and bars across Japan.
        </p>
      </header>

      <MapPageClient places={(places as Place[] | null) ?? []} />
    </main>
  )
}