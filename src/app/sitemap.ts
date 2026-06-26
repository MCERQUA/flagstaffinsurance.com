import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/site";
import { getAllPostSlugs } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://flagstaffinsurance.com";
  const staticPages = ["/", "/about", "/contact", "/quote", "/services", "/blog", "/privacy", "/terms"];
  return [
    ...staticPages,
    ...SERVICES.map((s) => `/services/${s.slug}`),
    ...getAllPostSlugs().map((slug) => `/blog/${slug}`),
  ].map((url) => ({
    url: `${base}${url}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: url === "/" ? 1 : 0.7,
  }));
}
