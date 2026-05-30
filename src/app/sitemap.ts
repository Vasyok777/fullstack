import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://fullstack-innovation.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/privacy-policy"];

  return routing.locales.flatMap((locale) =>
    pages.map((page) => {
      const base = locale === routing.defaultLocale ? BASE_URL : `${BASE_URL}/${locale}`;
      return {
        url: `${base}${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: page === "" ? (locale === routing.defaultLocale ? 1 : 0.8) : 0.5,
      };
    })
  );
}
