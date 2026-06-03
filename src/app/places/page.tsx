import { supabase } from '@/lib/supabase'
import type { Place } from '@/lib/types'

export default async function PlacesPage() {
  const { data: places, error } = await supabase
    .from('places')
    .select('*')
    .eq('status', 'published')
    .order('priority_score', { ascending: false })

  if (error) {
    return (
      <main className="min-h-screen bg-black px-5 pb-24 pt-8 text-white">
        <h1 className="text-2xl font-bold">Places Error</h1>
        <pre className="mt-4 whitespace-pre-wrap text-red-400">
          {error.message}
        </pre>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black px-5 pb-24 pt-8 text-white">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          Places
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          All Places
        </h1>
        <p className="mt-4 text-sm leading-7 text-neutral-300">
          Browse all curated coffee shops, bars, and local spots currently featured in the guide.
        </p>
      </header>

      <section className="space-y-4">
        {(places as Place[] | null)?.map((place) => (
          <article
            key={place.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  {place.city}
                  {place.area ? ` • ${place.area}` : ''}
                </p>

                <h2 className="mt-2 text-xl font-medium tracking-tight">
                  {place.name}
                </h2>

                {place.short_description_en && (
                  <p className="mt-3 text-sm leading-6 text-neutral-300">
                    {place.short_description_en}
                  </p>
                )}
              </div>

              {place.category_main && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-300">
                  {place.category_main}
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {place.price_level && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-300">
                  {place.price_level}
                </span>
              )}

              {place.solo_friendly && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-300">
                  Solo-friendly
                </span>
              )}

              {place.quiet && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-300">
                  Quiet
                </span>
              )}

              {place.late_night && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-300">
                  Late night
                </span>
              )}
            </div>

            {place.google_maps_url && (
              <a
                href={place.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
              >
                Open in Google Maps
              </a>
            )}
          </article>
        ))}
      </section>
    </main>
  )
}