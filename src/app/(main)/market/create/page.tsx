'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, Input, Button, Badge } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { ArrowLeft, Plus, Minus, Loader2, Search, X, Sparkles } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface Item {
  id: string
  name: string
  slug: string
  type: string
  rarity: string
  imageUrl?: string
  isGear: boolean
}

interface Enchantment {
  id: string
  name: string
  statKey: string
  minValue: number
  maxValue: number
}

interface SelectedEnchantment {
  id: string
  name: string
  statKey: string
  value: number
}

const itemTypes = [
  { value: 'WEAPON', label: 'Weapon' },
  { value: 'HELMET', label: 'Helmet' },
  { value: 'ARMOR', label: 'Armor' },
  { value: 'GLOVES', label: 'Gloves' },
  { value: 'BOOTS', label: 'Boots' },
  { value: 'SHIELD', label: 'Shield' },
  { value: 'EARRING', label: 'Earring' },
  { value: 'NECKLACE', label: 'Necklace' },
  { value: 'ACCESSORY', label: 'Accessory' },
  { value: 'CONSUMABLE', label: 'Consumable' },
  { value: 'MATERIAL', label: 'Material' },
]

const rarities = [
  { value: 'COMMON', label: 'Common', color: 'text-gray-400' },
  { value: 'UNCOMMON', label: 'Uncommon', color: 'text-green-400' },
  { value: 'RARE', label: 'Rare', color: 'text-blue-400' },
  { value: 'EPIC', label: 'Epic', color: 'text-purple-400' },
  { value: 'LEGENDARY', label: 'Legendary', color: 'text-orange-400' },
  { value: 'MYTHIC', label: 'Mythic', color: 'text-red-400' },
]

const currencies = [
  { value: 'ARCHON', label: 'Archon', image: '/game-images/currency/archon.png' },
  { value: 'PREMIUM', label: 'Premium', image: '/game-images/currency/premium.png' },
]

export default function CreateListingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [manualItemName, setManualItemName] = useState('')
  const [itemType, setItemType] = useState('WEAPON')
  const [itemRarity, setItemRarity] = useState('COMMON')
  const [isGear, setIsGear] = useState(true)
  const [enhancementLevel, setEnhancementLevel] = useState(0)
  const [selectedEnchantments, setSelectedEnchantments] = useState<SelectedEnchantment[]>([])
  const [priceAmount, setPriceAmount] = useState('')
  const [priceCurrency, setPriceCurrency] = useState('ARCHON')

  // Data
  const [items, setItems] = useState<Item[]>([])
  const [enchantments, setEnchantments] = useState<Enchantment[]>([])
  const [loadingItems, setLoadingItems] = useState(false)
  const [loadingEnchantments, setLoadingEnchantments] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Search
  const [itemSearch, setItemSearch] = useState('')
  const [showItemDropdown, setShowItemDropdown] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin?callbackUrl=/market/create')
    }
  }, [status, router])

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      if (!itemSearch) {
        setItems([])
        return
      }
      setLoadingItems(true)
      try {
        const res = await fetch(`/api/items?search=${encodeURIComponent(itemSearch)}&limit=10`)
        if (res.ok) {
          const data = await res.json()
          // API returns array directly, not { items: [...] }
          setItems(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Error fetching items:', error)
      } finally {
        setLoadingItems(false)
      }
    }

    const timer = setTimeout(fetchItems, 300)
    return () => clearTimeout(timer)
  }, [itemSearch])

  // Fetch enchantments when item type changes
  useEffect(() => {
    const fetchEnchantments = async () => {
      if (!isGear) return
      setLoadingEnchantments(true)
      try {
        const res = await fetch(`/api/enchantments?type=${itemType}`)
        if (res.ok) {
          const data = await res.json()
          setEnchantments(data.enchantments || data || [])
        }
      } catch (error) {
        console.error('Error fetching enchantments:', error)
      } finally {
        setLoadingEnchantments(false)
      }
    }

    fetchEnchantments()
  }, [itemType, isGear])

  const handleSelectItem = (item: Item) => {
    setSelectedItem(item)
    setManualItemName(item.name)
    setItemType(item.type)
    setItemRarity(item.rarity)
    setIsGear(item.isGear)
    setTitle(`Selling ${item.name}`)
    setShowItemDropdown(false)
    setItemSearch('')
  }

  const handleAddEnchantment = (ench: Enchantment) => {
    if (selectedEnchantments.find((e) => e.id === ench.id)) return
    setSelectedEnchantments((prev) => [
      ...prev,
      {
        id: ench.id,
        name: ench.name,
        statKey: ench.statKey,
        value: ench.minValue,
      },
    ])
  }

  const handleRemoveEnchantment = (id: string) => {
    setSelectedEnchantments((prev) => prev.filter((e) => e.id !== id))
  }

  const handleEnchantmentValueChange = (id: string, value: number) => {
    setSelectedEnchantments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, value } : e))
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const itemName = selectedItem?.name || manualItemName
    if (!title || !itemName || !priceAmount) {
      alert('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/market', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: description || null,
          itemId: selectedItem?.id || null,
          itemName,
          itemType,
          itemRarity,
          itemImage: selectedItem?.imageUrl || null,
          isGear,
          enhancementLevel: isGear ? enhancementLevel : 0,
          enchantments: isGear ? selectedEnchantments : [],
          priceAmount: parseInt(priceAmount),
          priceCurrency,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        router.push(`/market/${data.id}`)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create listing')
      }
    } catch (error) {
      console.error('Error creating listing:', error)
      alert('Failed to create listing')
    } finally {
      setSubmitting(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
        <Link href="/" className="hover:text-text-primary">Home</Link>
        <span>&gt;</span>
        <Link href="/market" className="hover:text-text-primary">Trade Market</Link>
        <span>&gt;</span>
        <span className="text-text-primary">Create Listing</span>
      </div>

      <Card>
        <CardHeader className="p-4 border-b border-border-primary">
          <CardTitle className="text-xl">Create New Listing</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary">Item Details</h3>

              {/* Item Search */}
              <div className="relative">
                <label className="block text-sm text-text-secondary mb-1">Search Item (optional)</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <Input
                    placeholder="Search for an item..."
                    value={itemSearch}
                    onChange={(e) => {
                      setItemSearch(e.target.value)
                      setShowItemDropdown(true)
                    }}
                    onFocus={() => setShowItemDropdown(true)}
                    className="pl-10"
                  />
                </div>
                {showItemDropdown && itemSearch && (
                  <div className="absolute z-10 w-full mt-1 bg-bg-secondary border border-border-primary rounded-lg shadow-xl max-h-60 overflow-auto">
                    {loadingItems ? (
                      <div className="p-4 text-center">
                        <Loader2 className="w-5 h-5 animate-spin mx-auto text-text-muted" />
                      </div>
                    ) : items.length === 0 ? (
                      <div className="p-4 text-center text-text-muted text-sm">
                        No items found. You can enter details manually.
                      </div>
                    ) : (
                      items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectItem(item)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-bg-tertiary transition-colors"
                        >
                          {item.imageUrl && (
                            <img src={item.imageUrl} alt="" className="w-10 h-10 object-contain" />
                          )}
                          <div className="text-left">
                            <p className="font-medium text-text-primary">{item.name}</p>
                            <p className="text-xs text-text-muted">{item.type} • {item.rarity}</p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Selected Item Display */}
              {selectedItem && (
                <div className="flex items-center gap-3 p-3 bg-bg-tertiary rounded-lg">
                  {selectedItem.imageUrl && (
                    <img src={selectedItem.imageUrl} alt="" className="w-12 h-12 object-contain" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-text-primary">{selectedItem.name}</p>
                    <p className="text-xs text-text-muted">{selectedItem.type} • {selectedItem.rarity}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedItem(null)
                      setManualItemName('')
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Manual Item Entry */}
              {!selectedItem && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Item Name *</label>
                    <Input
                      placeholder="Enter item name"
                      value={manualItemName}
                      onChange={(e) => setManualItemName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Item Type *</label>
                    <Select value={itemType} onValueChange={setItemType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {itemTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm text-text-secondary mb-1">Rarity *</label>
                    <Select value={itemRarity} onValueChange={setItemRarity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {rarities.map((r) => (
                          <SelectItem key={r.value} value={r.value}>
                            <span className={r.color}>{r.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="isGear"
                      checked={isGear}
                      onChange={(e) => setIsGear(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label htmlFor="isGear" className="text-sm text-text-secondary">
                      This is a gear item (can be enhanced)
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Gear Options */}
            {isGear && (
              <div className="space-y-4 p-4 bg-bg-tertiary rounded-lg">
                <h3 className="font-semibold text-text-primary flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Gear Options
                </h3>

                {/* Enhancement Level */}
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Enhancement Level</label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setEnhancementLevel(Math.max(0, enhancementLevel - 1))}
                      disabled={enhancementLevel <= 0}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-16 text-center text-xl font-bold text-orange-400">
                      +{enhancementLevel}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setEnhancementLevel(Math.min(9, enhancementLevel + 1))}
                      disabled={enhancementLevel >= 9}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Enchantments */}
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Enchantments</label>
                  {loadingEnchantments ? (
                    <Loader2 className="w-5 h-5 animate-spin text-text-muted" />
                  ) : enchantments.length === 0 ? (
                    <p className="text-sm text-text-muted">No enchantments available for this item type</p>
                  ) : (
                    <>
                      {/* Selected Enchantments */}
                      {selectedEnchantments.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {selectedEnchantments.map((ench) => {
                            const enchData = enchantments.find((e) => e.id === ench.id)
                            return (
                              <div
                                key={ench.id}
                                className="flex items-center gap-3 p-2 bg-purple-500/10 border border-purple-500/30 rounded-lg"
                              >
                                <span className="text-sm text-purple-400 flex-1">{ench.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-text-muted">+</span>
                                  <Input
                                    type="number"
                                    min={enchData?.minValue || 1}
                                    max={enchData?.maxValue || 100}
                                    value={ench.value}
                                    onChange={(e) =>
                                      handleEnchantmentValueChange(ench.id, parseInt(e.target.value) || 0)
                                    }
                                    className="w-20 h-8 text-center"
                                  />
                                  <span className="text-xs text-text-muted">{ench.statKey}</span>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveEnchantment(ench.id)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            )
                          })}
                        </div>
                      )}

                      {/* Add Enchantment */}
                      <div className="flex flex-wrap gap-2">
                        {enchantments
                          .filter((e) => !selectedEnchantments.find((se) => se.id === e.id))
                          .map((ench) => (
                            <Button
                              key={ench.id}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddEnchantment(ench)}
                              className="text-xs"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              {ench.name}
                            </Button>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Listing Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary">Listing Details</h3>

              <div>
                <label className="block text-sm text-text-secondary mb-1">Title *</label>
                <Input
                  placeholder="e.g., Selling +9 Legendary Sword"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-1">Description</label>
                <textarea
                  placeholder="Add any additional details about your item..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-24 px-3 py-2 bg-bg-tertiary border border-border-primary rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-primary/50 resize-none"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary">Pricing</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Amount *</label>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    value={priceAmount}
                    onChange={(e) => setPriceAmount(e.target.value)}
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Currency *</label>
                  <Select value={priceCurrency} onValueChange={setPriceCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          <span className="flex items-center gap-2">
                            <img src={c.image} alt="" className="w-4 h-4" />
                            {c.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price Preview */}
              {priceAmount && (
                <div className="flex items-center gap-2 p-3 bg-bg-tertiary rounded-lg">
                  <span className="text-text-muted">Price:</span>
                  <img
                    src={`/game-images/currency/${priceCurrency.toLowerCase()}.png`}
                    alt={priceCurrency}
                    className="w-5 h-5"
                  />
                  <span className="text-xl font-bold text-orange-400">
                    {parseInt(priceAmount || '0').toLocaleString()}
                  </span>
                  <span className="text-text-muted">{priceCurrency}</span>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Link href="/market" className="flex-1">
                <Button type="button" variant="outline" className="w-full gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={submitting}
                className="flex-1 gap-2 bg-orange-500 hover:bg-orange-600"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Listing
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
