import { getGamesIds } from '@/data/game'
import { MetadataRoute } from 'next'

const games = await getGamesIds();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
        url: 'https://lugx-gaming-univercee.vercel.app/',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
    },
    {
        url: 'https://lugx-gaming-univercee.vercel.app/shop',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    },
    {
        url: 'https://lugx-gaming-univercee.vercel.app/contacts',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    },
    {
        url: 'https://lugx-gaming-univercee.vercel.app/dashboard',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.3,
    },
    ...games.map((game)=>{
        return {
            url: `https://lugx-gaming-univercee.vercel.app/shop/${game.id}`,
            lastModified: new Date(),
            changeFrequency: "daily" as "daily" | "always" | "hourly" | "weekly" | "monthly" | "yearly" | "never" | undefined,
            priority: 0.8,
        }
    })
  ]
}