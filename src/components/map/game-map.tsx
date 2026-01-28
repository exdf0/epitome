'use client'

import { useEffect, useMemo } from 'react'
import { MapContainer, ImageOverlay, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MARKER_TYPES, MarkerType } from './map-filter-sidebar'
import Link from 'next/link'

// Map configuration - adjust these based on your map image dimensions
const MAP_CONFIG = {
  imageUrl: '/game-images/interactive-map/world-map.png',
  // Bounds for the image overlay (in pixels, converted to lat/lng with CRS.Simple)
  bounds: [[0, 0], [2048, 2048]] as L.LatLngBoundsExpression,
  center: [1024, 1024] as L.LatLngExpression,
  minZoom: -2,
  maxZoom: 2,
  defaultZoom: 0,
}

// Create custom marker icons from images
const createMarkerIcon = (iconUrl: string, size: [number, number] = [32, 32]) => {
  return L.icon({
    iconUrl,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1] / 2],
    popupAnchor: [0, -size[1] / 2],
  })
}

// Fallback div icons for markers without images
const createFallbackIcon = (color: string, label: string, isHighlighted: boolean = false) => {
  const highlightStyle = isHighlighted
    ? 'animation: pulse 1.5s ease-in-out infinite; box-shadow: 0 0 20px rgba(255,215,0,0.8);'
    : ''
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="width: 28px; height: 28px; background: ${color}; border-radius: 50%; border: 2px solid ${isHighlighted ? 'gold' : 'white'}; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.3); ${highlightStyle}">${label}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  })
}

// Default icons for each marker type
const getMarkerIcon = (type: MarkerType, isHighlighted: boolean = false): L.Icon | L.DivIcon => {
  const typeInfo = MARKER_TYPES[type]
  if (typeInfo?.icon && !isHighlighted) {
    try {
      return createMarkerIcon(typeInfo.icon)
    } catch {
      // Fall through to fallback
    }
  }

  // Fallback icons based on category
  const fallbacks: Record<string, { color: string; label: string }> = {
    SPAWN_GENERAL: { color: '#ef4444', label: 'M' },
    SPAWN_MINI_BOSS: { color: '#a855f7', label: 'MB' },
    SPAWN_BOSS: { color: '#f59e0b', label: 'B' },
    SPAWN_TAMEABLE: { color: '#22c55e', label: 'T' },
    POI_NODE: { color: '#3b82f6', label: 'N' },
    POI_DUNGEON: { color: '#6366f1', label: 'D' },
    POI_SHRINE: { color: '#8b5cf6', label: 'S' },
    POI_DOMINATION: { color: '#ec4899', label: 'DZ' },
    POI_QUEST: { color: '#f59e0b', label: 'Q' },
    POI_EVENT: { color: '#14b8a6', label: 'E' },
    NPC_QUEST_GIVER: { color: '#f59e0b', label: '?' },
    NPC_VENDOR: { color: '#22c55e', label: 'V' },
    NPC_BLACKSMITH: { color: '#64748b', label: 'BS' },
    NPC_STABLEMAN: { color: '#92400e', label: 'ST' },
    NPC_VAULTKEEPER: { color: '#7c3aed', label: 'VK' },
    NPC_FISHERMAN: { color: '#0ea5e9', label: 'F' },
    NPC_MASTER_TRADITION: { color: '#d946ef', label: 'MT' },
    NPC_ARMOR_DEALER: { color: '#64748b', label: 'AD' },
    NPC_WEAPON_DEALER: { color: '#dc2626', label: 'WD' },
    NPC_BIOLOGIST: { color: '#16a34a', label: 'BI' },
    NPC_BOTANIST: { color: '#22c55e', label: 'BO' },
    NPC_GEOLOGIST: { color: '#78716c', label: 'GE' },
    NPC_ZOOLOGIST: { color: '#ea580c', label: 'ZO' },
    NPC_HYDROLOGIST: { color: '#06b6d4', label: 'HY' },
  }

  const fallback = fallbacks[type] || { color: '#6b7280', label: '?' }
  return createFallbackIcon(fallback.color, fallback.label, isHighlighted)
}

export interface MapMarker {
  id: string
  name: string
  description?: string
  type: MarkerType
  x: number
  y: number
  iconUrl?: string
  metadata?: any
  mob?: {
    id: string
    name: string
    slug: string
    level: number
    xpReward: number
    respawnTime: number
    mobType: string
    category: string
    imageUrl?: string
    stats: Record<string, number>
    drops: Array<{
      itemId: string
      itemName: string
      dropRate: number
      rarity: string
    }>
  }
}

interface GameMapProps {
  markers: MapMarker[]
  selectedTypes: MarkerType[]
  levelRange: [number, number]
  onMapClick?: (x: number, y: number) => void
  isAdmin?: boolean
  highlightedMobId?: string | null
}

// Component to handle map events
function MapEventHandler({ onMapClick }: { onMapClick?: (x: number, y: number) => void }) {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e.latlng.lng, e.latlng.lat)
      }
    },
  })
  return null
}

// Component to fit map bounds
function MapBoundsHandler() {
  const map = useMap()

  useEffect(() => {
    map.fitBounds(MAP_CONFIG.bounds)
  }, [map])

  return null
}

// Component to focus on a specific marker (for "View on Map" functionality)
function MapFocusHandler({ markers, highlightedMobId }: { markers: MapMarker[], highlightedMobId: string }) {
  const map = useMap()

  useEffect(() => {
    const targetMarker = markers.find(m => m.mob?.id === highlightedMobId)
    if (targetMarker) {
      // Fly to the marker position with a good zoom level
      map.flyTo([targetMarker.y, targetMarker.x], 1, { duration: 1 })
    }
  }, [map, markers, highlightedMobId])

  return null
}

// Marker popup content
function MarkerPopup({ marker }: { marker: MapMarker }) {
  const isSpawn = marker.type.startsWith('SPAWN_')
  const mob = marker.mob

  if (isSpawn && mob) {
    return (
      <div className="min-w-[250px] max-w-[300px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">{mob.name}</h3>
          <Link
            href={`/mobs/${mob.slug}`}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            View Details
          </Link>
        </div>

        {/* Mob Info */}
        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <p><span className="font-medium">Type:</span> {mob.mobType}</p>
          <p><span className="font-medium">Category:</span> {mob.category}</p>
          <p><span className="font-medium">Level:</span> {mob.level}</p>
          <p><span className="font-medium">XP Reward:</span> {mob.xpReward}</p>
          <p><span className="font-medium">Respawn:</span> {formatRespawnTime(mob.respawnTime)}</p>
        </div>

        {/* Drops */}
        {mob.drops && mob.drops.length > 0 && (
          <div>
            <p className="font-medium text-gray-900 mb-1">Possible Loot:</p>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {mob.drops.slice(0, 5).map((drop, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs bg-gray-50 px-2 py-1 rounded">
                  <span className={getRarityColor(drop.rarity)}>{drop.itemName}</span>
                  <span className="text-gray-500">{drop.dropRate}%</span>
                </div>
              ))}
              {mob.drops.length > 5 && (
                <p className="text-xs text-gray-400">+{mob.drops.length - 5} more items</p>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Non-spawn marker popup
  return (
    <div className="min-w-[150px]">
      <h3 className="font-bold text-gray-900 mb-1">{marker.name}</h3>
      <p className="text-sm text-gray-600">{MARKER_TYPES[marker.type]?.label || marker.type}</p>
      {marker.description && (
        <p className="text-sm text-gray-500 mt-1">{marker.description}</p>
      )}
    </div>
  )
}

function formatRespawnTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${mins}m`
}

function getRarityColor(rarity: string): string {
  const colors: Record<string, string> = {
    COMMON: 'text-gray-600',
    UNCOMMON: 'text-green-600',
    RARE: 'text-blue-600',
    EPIC: 'text-purple-600',
    LEGENDARY: 'text-orange-600',
    MYTHIC: 'text-red-600',
  }
  return colors[rarity] || 'text-gray-600'
}

export default function GameMap({
  markers,
  selectedTypes,
  levelRange,
  onMapClick,
  isAdmin = false,
  highlightedMobId,
}: GameMapProps) {
  // Filter markers based on selected types and level range
  const filteredMarkers = useMemo(() => {
    return markers.filter((marker) => {
      // Check if type is selected
      if (!selectedTypes.includes(marker.type)) {
        return false
      }

      // For spawn markers with mobs, check level range
      if (marker.type.startsWith('SPAWN_') && marker.mob) {
        if (marker.mob.level < levelRange[0] || marker.mob.level > levelRange[1]) {
          return false
        }
      }

      return true
    })
  }, [markers, selectedTypes, levelRange])

  return (
    <div className="h-full w-full">
      <MapContainer
        center={MAP_CONFIG.center}
        zoom={MAP_CONFIG.defaultZoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        crs={L.CRS.Simple}
        className="h-full w-full"
        style={{ background: '#0a0a0f' }}
        maxBounds={MAP_CONFIG.bounds}
        maxBoundsViscosity={1.0}
        attributionControl={false}
      >
        {/* Map Image */}
        <ImageOverlay
          url={MAP_CONFIG.imageUrl}
          bounds={MAP_CONFIG.bounds}
        />

        {/* Fit bounds on load */}
        <MapBoundsHandler />

        {/* Focus on highlighted mob if provided */}
        {highlightedMobId && (
          <MapFocusHandler markers={markers} highlightedMobId={highlightedMobId} />
        )}

        {/* Click handler for admin mode */}
        {isAdmin && onMapClick && <MapEventHandler onMapClick={onMapClick} />}

        {/* Markers */}
        {filteredMarkers.map((marker) => {
          const isHighlighted = highlightedMobId && marker.mob?.id === highlightedMobId
          return (
            <Marker
              key={marker.id}
              position={[marker.y, marker.x]}
              icon={marker.iconUrl && !isHighlighted
                ? createMarkerIcon(marker.iconUrl)
                : getMarkerIcon(marker.type, isHighlighted)}
              zIndexOffset={isHighlighted ? 1000 : 0}
            >
              <Popup>
                <MarkerPopup marker={marker} />
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
