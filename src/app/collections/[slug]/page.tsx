import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params

  const { data: collection, error: collectionError } = await supabase
    .from('collections')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (collectionError || !collection) {
    notFound()
  }

  const { data: collectionPlaces, error: placesError } = await supabase
    .from('collection_places')
    .select(`
      sort_order,
      editor_note,
      places (*)
    `)
    .eq('collection_id', collection.collection_id)
    .order('sort_order', { ascending: true })

  if (placesError) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <h1 className="text-2xl font-bold">Collection Error</h1>
        <pre className="mt-4 whitespace-pre-wrap text-red-400">
          {placesError.message}
        </pre>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <header className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
          {collection.city} {collection.category ? `• ${collection.category}` : ''}
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          {collection.title}
        </h1>
        {collection.description_en && (
          <p className="mt-3 max-w-xl text-neutral-300">
            {collection.description_en}
          </p>
        )}
      </header>

      <section className="space-y-4">
        {collectionPlaces?.map((item) => {
          const place = Array.isArray(item.places) ? item.places[0] : item.places

          if (!place) return null

          return (
            <article
              key={place.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                #{item.sort_order} {place.city} {place.area ? `• ${place.area}` : ''}
              </p>

              <h2 className="mt-2 text-xl font-medium">
                {place.name}
              </h2>

              {place.short_description_en && (
                <p className="mt-2 text-sm leading-6 text-neutral-300">
                  {place.short_description_en}
                </p>
              )}

              {item.editor_note && (
                <p className="mt-3 text-sm italic text-neutral-400">
                  {item.editor_note}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {place.category_main && (
                  <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
                    {place.category_main}
                  </span>
                )}

                {place.price_level && (
                  <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
                    {place.price_level}
                  </span>
                )}

                {place.solo_friendly && (
                  <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
                    Solo-friendly
                  </span>
                )}

                {place.late_night && (
                  <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
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
          )
        })}
      </section>
    </main>
  )
}
