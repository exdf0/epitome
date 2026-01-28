'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'
import { MapFilterSidebar, MARKER_TYPES, MarkerType } from '@/components/map/map-filter-sidebar'

// Dynamically import map component to avoid SSR issues with Leaflet
const GameMap = dynamic(() => import('@/components/map/game-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-bg-secondary flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
    </div>
  ),
})

interface MapMarker {
  id: string
  name: string
  description?: string
  type: MarkerType
  x: number
  y: number
  iconUrl?: string
  metadata?: any
  mob?: any
}

export default function MapPage() {
  const searchParams = useSearchParams()
  const mobIdFromUrl = searchParams.get('mob')

  const [markers, setMarkers] = useState<MapMarker[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTypes, setSelectedTypes] = useState<MarkerType[]>(
    Object.keys(MARKER_TYPES) as MarkerType[]
  )
  const [levelRange, setLevelRange] = useState<[number, number]>([1, 100])
  const [highlightedMobId, setHighlightedMobId] = useState<string | null>(mobIdFromUrl)

  // Fetch markers from API
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch('/api/map-markers')
        if (response.ok) {
          const data = await response.json()
          setMarkers(data.markers)
        }
      } catch (error) {
        console.error('Error fetching markers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMarkers()
  }, [])

  return (
    <div className="flex h-full">
      {/* Filter Sidebar */}
      <MapFilterSidebar
        selectedTypes={selectedTypes}
        onTypesChange={setSelectedTypes}
        levelRange={levelRange}
        onLevelRangeChange={setLevelRange}
      />

      {/* Map Container */}
      <div className="flex-1 relative">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-bg-primary">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-2" />
              <p className="text-text-secondary">Loading map...</p>
            </div>
          </div>
        ) : (
          <GameMap
            markers={markers}
            selectedTypes={selectedTypes}
            levelRange={levelRange}
            highlightedMobId={highlightedMobId}
          />
        )}

        {/* Marker Count Badge */}
        <div className="absolute top-4 right-4 bg-bg-secondary/90 backdrop-blur-sm border border-border-primary rounded-lg px-3 py-2 text-sm">
          <span className="text-text-secondary">Showing </span>
          <span className="text-text-primary font-medium">
            {markers.filter((m) => selectedTypes.includes(m.type)).length}
          </span>
          <span className="text-text-secondary"> markers</span>
        </div>

        {/* Map Controls Help */}
        <div className="absolute bottom-4 right-4 bg-bg-secondary/90 backdrop-blur-sm border border-border-primary rounded-lg px-3 py-2 text-xs text-text-muted">
          <p>Scroll to zoom | Drag to pan | Click markers for details</p>
        </div>
      </div>
    </div>
  )
}
