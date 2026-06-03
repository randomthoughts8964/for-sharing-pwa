export type Place = {
    id: string
    name: string
    name_jp?: string | null
    city?: string | null
    area?: string | null
    category_main?: string | null
    category_sub?: string | null
    google_maps_url?: string | null
    instagram_url?: string | null
    website_url?: string | null
    image_url?: string | null
    short_description_en?: string | null
    short_description_jp?: string | null
    vibe_tags?: string | null
    feature_tags?: string | null
    best_for?: string | null
    price_level?: string | null
    solo_friendly?: boolean | null
    tourist_friendly?: boolean | null
    quiet?: boolean | null
    late_night?: boolean | null
    priority_score?: number | null
    editor_pick?: boolean | null
    latitude?: number | null
    longitude?: number | null
    status?: string | null
    relationship?: string | null
  }
  
  export type Collection = {
    collection_id: string
    title: string
    slug: string
    city?: string | null
    category?: string | null
    description_en?: string | null
    description_jp?: string | null
    cover_image_url?: string | null
    status?: string | null
    sort_order?: number | null
  }