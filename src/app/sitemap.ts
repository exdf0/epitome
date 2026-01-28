import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://epitomecodex.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/items`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/mobs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/classes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/classes/warrior`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/classes/ninja`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/classes/shaman`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/classes/necromancer`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/map`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/builds`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/builds/planner`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/market`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tools/xp-table`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Dynamic pages - Items
  let itemPages: MetadataRoute.Sitemap = []
  try {
    const items = await prisma.item.findMany({
      select: { slug: true, updatedAt: true },
    })
    itemPages = items.map((item) => ({
      url: `${siteUrl}/items/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (e) {
    console.error('Error fetching items for sitemap:', e)
  }

  // Dynamic pages - Mobs
  let mobPages: MetadataRoute.Sitemap = []
  try {
    const mobs = await prisma.mob.findMany({
      select: { slug: true, updatedAt: true },
    })
    mobPages = mobs.map((mob) => ({
      url: `${siteUrl}/mobs/${mob.slug}`,
      lastModified: mob.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (e) {
    console.error('Error fetching mobs for sitemap:', e)
  }

  // Dynamic pages - Builds
  let buildPages: MetadataRoute.Sitemap = []
  try {
    const builds = await prisma.build.findMany({
      where: { isPublished: true },
      select: { id: true, updatedAt: true },
    })
    buildPages = builds.map((build) => ({
      url: `${siteUrl}/builds/${build.id}`,
      lastModified: build.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (e) {
    console.error('Error fetching builds for sitemap:', e)
  }

  // Dynamic pages - Guides
  let guidePages: MetadataRoute.Sitemap = []
  try {
    const guides = await prisma.guide.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    })
    guidePages = guides.map((guide) => ({
      url: `${siteUrl}/guides/${guide.slug}`,
      lastModified: guide.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (e) {
    console.error('Error fetching guides for sitemap:', e)
  }

  return [...staticPages, ...itemPages, ...mobPages, ...buildPages, ...guidePages]
}
