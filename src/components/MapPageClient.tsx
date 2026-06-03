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
                      ? 'border border-[#8FAF8C]/40 bg-[#8FAF8C]/20 text-[#8FAF8C]'
                      : 'border border-neutral-800 bg-neutral-900 text-neutral-300'
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
                      ? 'border border-[#8FAF8C]/40 bg-[#8FAF8C]/20 text-[#8FAF8C]'
                      : 'border border-neutral-800 bg-neutral-900 text-neutral-300'
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
    </div>
  )
}