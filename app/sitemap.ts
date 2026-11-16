import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { routing, type Locale, type AppPathname } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { HREFLANG } from "@/lib/seo";

// Bump when page content actually changes; a per-request date teaches Google to ignore it.
const LAST_MODIFIED = new Date("2026-11-16");

function urlFor(locale: Locale, href: AppPathname) {
  return `${SITE_URL}${getPathname({ locale, href })}`;
}

function entries(
  href: AppPathname,
  opts: { changeFrequency: "weekly" | "yearly"; priority: number },
) {
  const languages = Object.fromEntries(routing.locales.map((l) => [HREFLANG[l], urlFor(l, href)]));

  return routing.locales.map((locale) => ({
    url: urlFor(locale, href),
    lastModified: LAST_MODIFIED,
    changeFrequency: opts.changeFrequency,
    priority: locale === routing.defaultLocale ? opts.priority : opts.priority * 0.9,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entries("/", { changeFrequency: "weekly", priority: 1 }),
    ...entries("/confidentialitate", { changeFrequency: "yearly", priority: 0.3 }),
    ...entries("/mentiuni-legale", { changeFrequency: "yearly", priority: 0.3 }),
  ];
}
