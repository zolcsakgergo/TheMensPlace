import { routing, type Locale, type AppPathname } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

export const HREFLANG: Record<Locale, string> = {
  ro: "ro-RO",
  hu: "hu-HU",
  en: "en",
};

/**
 * Canonical + hreflang alternates for a localized route. Every page must set
 * this itself — Next.js merges metadata from the layout, so a page without
 * its own `alternates` silently inherits the homepage canonical.
 */
export function localizedAlternates(locale: Locale, href: AppPathname) {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [HREFLANG[l], getPathname({ locale: l, href })]),
  ) as Record<string, string>;
  languages["x-default"] = getPathname({ locale: routing.defaultLocale, href });
  return { canonical: getPathname({ locale, href }), languages };
}
