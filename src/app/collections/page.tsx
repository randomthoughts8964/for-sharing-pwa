import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Collection } from '@/lib/types'

export default async function CollectionsPage() {
  const { data: collections, error } = await supabase
    .from('collections')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <h1 className="text-2xl font-bold">Collections Error</h1>
        <pre className="mt-4 whitespace-pre-wrap text-red-400">
          {error.message}
        </pre>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <header className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
          Collections
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Curated Guides
        </h1>
        <p className="mt-3 text-neutral-300">
          Explore curated coffee and bar lists by city, mood, and category.
        </p>
      </header>

      <section className="space-y-4">
        {(collections as Collection[] | null)?.map((collection) => (
          <Link
            key={collection.collection_id}
            href={`/collections/${collection.slug}`}
            className="block rounded-2xl border border-neutral-800 bg-neutral-900 p-5 transition hover:border-neutral-700"
          >
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
              {collection.city} {collection.category ? `• ${collection.category}` : ''}
            </p>

            <h2 className="mt-2 text-2xl font-medium">
              {collection.title}
            </h2>

            {collection.description_en && (
              <p className="mt-3 text-sm leading-6 text-neutral-300">
                {collection.description_en}
              </p>
            )}
          </Link>
        ))}
      </section>
    </main>
  )
}