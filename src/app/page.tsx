import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Collection, Place } from '@/lib/types'

export default async function HomePage() {
  const { data: collections } = await supabase
    .from('collections')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .limit(3)

  const { data: featuredPlaces } = await supabase
    .from('places')
    .select('*')
    .eq('status', 'published')
    .order('priority_score', { ascending: false })
    .limit(4)

  return (
    <main className="min-h-screen bg-black px-5 pb-24 pt-8 text-white">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          For Sharing
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight">
          Japan Coffee
          <br />
          & Bars
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-7 text-neutral-300">
          A curated guide to coffee shops, cocktail bars, kissaten, and hidden local spots across Japan.
        </p>
      </header>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium">Collections</h2>
          <Link href="/collections" className="text-sm text-neutral-500 hover:text-white">
            View all
          </Link>
        </div>

        <div className="space-y-4">
          {(collections as Collection[] | null)?.map((collection) => (
            <Link
              key={collection.collection_id}
              href={`/collections/${collection.slug}`}
              className="block rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/[0.08]"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                {collection.city} {collection.category ? `• ${collection.category}` : ''}
              </p>

              <h3 className="mt-2 text-2xl font-medium tracking-tight">
                {collection.title}
              </h3>

              {collection.description_en && (
                <p className="mt-3 text-sm leading-6 text-neutral-300">
                  {collection.description_en}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium">Featured Places</h2>
          <Link href="/places" className="text-sm text-neutral-500 hover:text-white">
            Browse all
          </Link>
        </div>

        <div className="space-y-4">
          {(featuredPlaces as Place[] | null)?.map((place) => (
            <article
              key={place.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                {place.city}
                {place.area ? ` • ${place.area}` : ''}
              </p>

              <h3 className="mt-2 text-xl font-medium tracking-tight">
                {place.name}
              </h3>

              {place.short_description_en && (
                <p className="mt-3 text-sm leading-6 text-neutral-300">
                  {place.short_description_en}
                </p>
              )}

              {place.google_maps_url && (
                <a
                  href={place.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
                >
                  Open in Google Maps
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}