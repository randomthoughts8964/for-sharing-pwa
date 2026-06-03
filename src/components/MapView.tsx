'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import type { Place } from '@/lib/types'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

type MapViewProps = {
  places: Place[]
}

function getMarkerColor(category?: string | null) {
  switch (category) {
    case 'coffee':
      return '#A47148'
    case 'bar':
      return '#7A1F2B'
    case 'kissaten':
      return '#1F3A5F'
    case 'wine':
      return '#6E3A8A'
    case 'food':
      return '#3F6B4A'
    default:
      return '#888888'
  }
}

export default function MapView({ places }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    if (!mapContainerRef.current) return
    if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return
    if (mapRef.current) return

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [139.6917, 35.6895],
      zoom: 4.5,
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    mapRef.current = map

    return () => {
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    const validPlaces = places.filter(
      (place) =>
        typeof place.latitude === 'number' &&
        typeof place.longitude === 'number'
    )

    validPlaces.forEach((place) => {
      const popupHtml = `
        <div style="color: #111; min-width: 180px;">
          <div style="font-weight: 600; font-size: 14px; margin-bottom: 6px;">
            ${place.name}
          </div>
          <div style="font-size: 12px; color: #555; margin-bottom: 8px;">
            ${place.city ?? ''}${place.area ? ` • ${place.area}` : ''}
          </div>
          ${
            place.google_maps_url
              ? `<a href="${place.google_maps_url}" target="_blank" rel="noopener noreferrer" style="font-size: 12px; color: #2563eb;">Open in Google Maps</a>`
              : ''
          }
        </div>
      `

      const marker = new mapboxgl.Marker({
        color: getMarkerColor(place.category_main),
      })
        .setLngLat([place.longitude as number, place.latitude as number])
        .setPopup(new mapboxgl.Popup({ offset: 18 }).setHTML(popupHtml))
        .addTo(map)

      markersRef.current.push(marker)
    })

    if (validPlaces.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()

      validPlaces.forEach((place) => {
        bounds.extend([place.longitude as number, place.latitude as number])
      })

      map.fitBounds(bounds, {
        padding: 60,
        maxZoom: 13,
        duration: 800,
      })
    }
  }, [places])

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800">
      {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN ? (
        <div className="bg-neutral-900 p-6 text-sm text-red-400">
          Missing NEXT_PUBLIC_MAPBOX_TOKEN in .env.local
        </div>
      ) : (
        <div ref={mapContainerRef} className="h-[60vh] w-full" />
      )}
    </div>
  )
}