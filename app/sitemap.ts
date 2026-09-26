import type { MetadataRoute } from "next"

import { SITE } from "@/lib/site"

const LAST_MODIFIED = "2026-09-26"

export const dynamic = "force-static"

const ROUTES: {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/download/", changeFrequency: "weekly", priority: 0.9 },
  { path: "/docs/", changeFrequency: "weekly", priority: 0.8 },
  { path: "/changelog/", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about/", changeFrequency: "monthly", priority: 0.5 },
  { path: "/security/", changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy/", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms/", changeFrequency: "yearly", priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
