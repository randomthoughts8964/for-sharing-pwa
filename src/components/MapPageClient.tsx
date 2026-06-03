'use client'

import { useMemo, useState } from 'react'
import type { Place } from '@/lib/types'
import MapView from '@/components/MapView'

type MapPageClientProps = {
  places: Place[]
}

type CategoryFilter = 'all' | 'coffee' | 'bar'
type CityFilter = 'all' | 'Tokyo' | 'Osaka'

export default function MapPageClient({ places }: MapPageClientProps) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [cityFilter, setCityFilter] = useState<CityFilter>('all')

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const categoryMatch =
        categoryFilter === 'all' ? true : place.category_main === categoryFilter

      const cityMatch =
        cityFilter === 'all' ? true : place.city === cityFilter

      return categoryMatch && cityMatch
    })
  }, [places, categoryFilter, cityFilter])

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.15em] text-neutral-500">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {(['all', 'coffee', 'bar'] as const).map((value) => {
              const active = categoryFilter === value

              return (
                <button
                  key={value}
                  onClick={() => setCategoryFilter(value)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? 'bg-white text-black'
                      : 'bg-neutral-900 text-neutral-300 border border-neutral-800'
                  }`}
                >
                  {value === 'all'
                    ? 'All'
                    : value === 'coffee'
                    ? 'Coffee'
                    : 'Bars'}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.15em] text-neutral-500">
            City
          </p>
          <div className="flex flex-wrap gap-2">
            {(['all', 'Tokyo', 'Osaka'] as const).map((value) => {
              const active = cityFilter === value

              return (
                <button
                  key={value}
                  onClick={() => setCityFilter(value)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? 'bg-white text-black'
                      : 'bg-neutral-900 text-neutral-300 border border-neutral-800'
                  }`}
                >
                  {value === 'all' ? 'All Cities' : value}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <MapView places={filteredPlaces} />

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium">Visible Places</h2>
          <p className="text-sm text-neutral-400">
            {filteredPlaces.length} result{filteredPlaces.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="space-y-4">
          {filteredPlaces.map((place) => (
            <article
              key={place.id}
              className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                    {place.city}
                    {place.area ? ` • ${place.area}` : ''}
                  </p>

                  <h3 className="mt-2 text-xl font-medium">
                    {place.name}
                  </h3>

                  {place.short_description_en && (
                    <p className="mt-2 text-sm leading-6 text-neutral-300">
                      {place.short_description_en}
                    </p>
                  )}
                </div>

                {place.category_main && (
                  <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
                    {place.category_main}
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
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
                {place.quiet && (
                  <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
                    Quiet
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
          ))}
        </div>
      </section>
    </div>
  )
}