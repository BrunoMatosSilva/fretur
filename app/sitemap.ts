import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { getPostSlugs } from "@/lib/sanity";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostSlugs();
  const now = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/noticias`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${SITE_URL}/noticias/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
