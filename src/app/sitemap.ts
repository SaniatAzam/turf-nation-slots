import type { MetadataRoute } from "next";

export const revalidate = 3600; // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com";

  const routes = ["", "/turf/turf-nation", "/turf/jaff", "/turf/dbox-rooftop"];

  const now = new Date();

  return routes.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: p === "" ? 1 : 0.7,
  }));
}
