import { getTranslations } from "next-intl/server";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";
import type { HourEntry } from "./cards/HoursList";

export type ServiceItem = {
  title: string;
  duration?: string;
  price: string;
  desc?: string;
};

type FaqItem = { q: string; a: string };

const HREFLANG: Record<Locale, string> = {
  ro: "ro-RO",
  hu: "hu-HU",
  en: "en",
};

// Day names (RO / HU / EN) → schema.org day name (English).
const DAY_MAP: Record<string, string> = {
  // RO
  Luni: "Monday",
  Marți: "Tuesday",
  "Marţi": "Tuesday",
  Miercuri: "Wednesday",
  Joi: "Thursday",
  Vineri: "Friday",
  Sâmbătă: "Saturday",
  "Sambata": "Saturday",
  Duminică: "Sunday",
  // HU
  Hétfő: "Monday",
  Kedd: "Tuesday",
  Szerda: "Wednesday",
  Csütörtök: "Thursday",
  Péntek: "Friday",
  Szombat: "Saturday",
  Vasárnap: "Sunday",
  // EN
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

function parseTimeRange(time: string): { opens: string; closes: string } | null {
  const parts = time.split(/[—–-]/).map((s) => s.trim());
  if (parts.length !== 2) return null;
  const [opens, closes] = parts;
  if (!/^\d{1,2}:\d{2}$/.test(opens) || !/^\d{1,2}:\d{2}$/.test(closes)) return null;
  return { opens, closes };
}

function buildOffer(item: ServiceItem, locale: Locale) {
  const parts = item.price.split(/[—–-]/).map((s) => s.trim());
  const base = {
    "@type": "Offer",
    priceCurrency: "RON",
    availability: "https://schema.org/InStock",
    itemOffered: {
      "@type": "Service",
      name: item.title,
      ...(item.desc ? { description: item.desc } : {}),
      ...(item.duration ? { serviceOutput: item.duration } : {}),
      inLanguage: HREFLANG[locale],
      provider: { "@id": `${SITE_URL}/#salon` },
    },
  };
  if (parts.length === 2 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1])) {
    return {
      ...base,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "RON",
        minPrice: parts[0],
        maxPrice: parts[1],
      },
    };
  }
  return { ...base, price: parts[0] };
}

export default async function JsonLd({
  locale,
  hours,
  services,
}: {
  locale: Locale;
  hours: HourEntry[];
  services: ServiceItem[];
}) {
  const [tMeta, tFaq] = await Promise.all([
    getTranslations({ locale, namespace: "metadata" }),
    getTranslations({ locale, namespace: "faq" }),
  ]);

  const description = tMeta("description");
  const faqItems = tFaq.raw("items") as FaqItem[];

  const openingHoursSpecification = hours
    .filter((h) => !h.closed)
    .map((h) => {
      const dayOfWeek = DAY_MAP[h.day];
      const range = parseTimeRange(h.time);
      if (!dayOfWeek || !range) return null;
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens: range.opens,
        closes: range.closes,
      };
    })
    .filter(Boolean);

  const inLanguageList = routing.locales.map((l) => HREFLANG[l]);
  const localePathname = locale === routing.defaultLocale ? "/" : `/${locale}`;
  const pageUrl = `${SITE_URL}${localePathname}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    "@id": `${SITE_URL}/#salon`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/logo.png`,
    telephone: BUSINESS.phone,
    priceRange: BUSINESS.priceRange,
    knowsLanguage: ["ro", "hu", "en"],
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    areaServed: { "@type": "City", name: BUSINESS.city },
    openingHoursSpecification,
    makesOffer: services.map((s) => buildOffer(s, locale)),
    sameAs: BUSINESS.social,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}`,
    paymentAccepted: "Cash, Card",
    currenciesAccepted: "RON",
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BUSINESS.name,
    url: SITE_URL,
    inLanguage: inLanguageList,
    publisher: { "@id": `${SITE_URL}/#salon` },
  };

  const webPageData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: tMeta("title"),
    description,
    inLanguage: HREFLANG[locale],
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#salon` },
    primaryImageOfPage: `${SITE_URL}/og-image.png`,
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    inLanguage: HREFLANG[locale],
    mainEntity: faqItems.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageData) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
