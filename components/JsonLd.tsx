import { BUSINESS, SITE_URL } from "@/lib/site";
import type { HourEntry } from "./cards/HoursList";

export type ServiceItem = {
  title: string;
  duration?: string;
  price: string;
  desc?: string;
};

const FAQ = [
  {
    q: "Unde se află The Men's Place?",
    a: `${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.countryName}.`,
  },
  {
    q: "Cum pot face o programare?",
    a: "Online prin Mero la https://mero.ro/p/the-mens-place sau telefonic la 0745 319 957.",
  },
  {
    q: "Ce servicii oferiți?",
    a: "Tuns clasic, bărbierit cu briciul, aranjat barbă, tuns băieți, pachet tată-fiu și pachetul premium cu masaj capilar și ritual complet.",
  },
  {
    q: "Care este programul?",
    a: "Luni–Marți 11:00–19:00, Miercuri–Joi 10:00–20:00, Vineri 10:00–21:00, Sâmbătă 09:00–18:00, Duminică închis.",
  },
  {
    q: "Cât costă un tuns?",
    a: "Prețurile încep de la 50 RON pentru aranjat și ajung la 140 RON pentru pachetul premium. Tuns simplu de la 60 RON.",
  },
  {
    q: "Acceptați plata cu cardul?",
    a: "Da, acceptăm plata cu cardul și numerar.",
  },
];

// Romanian → schema.org day name (English).
const DAY_MAP: Record<string, string> = {
  Luni: "Monday",
  Marți: "Tuesday",
  "Marţi": "Tuesday",
  Miercuri: "Wednesday",
  Joi: "Thursday",
  Vineri: "Friday",
  Sâmbătă: "Saturday",
  "Sambata": "Saturday",
  Duminică: "Sunday",
};

// Accepts "10:00 — 20:00" (em dash, en dash, or hyphen).
function parseTimeRange(time: string): { opens: string; closes: string } | null {
  const parts = time.split(/[—–-]/).map((s) => s.trim());
  if (parts.length !== 2) return null;
  const [opens, closes] = parts;
  if (!/^\d{1,2}:\d{2}$/.test(opens) || !/^\d{1,2}:\d{2}$/.test(closes)) return null;
  return { opens, closes };
}

function buildOffer(item: ServiceItem) {
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

export default function JsonLd({
  hours,
  services,
}: {
  hours: HourEntry[];
  services: ServiceItem[];
}) {
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

  const data = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    "@id": `${SITE_URL}/#salon`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    telephone: BUSINESS.phone,
    priceRange: BUSINESS.priceRange,
    knowsLanguage: ["ro", "hu"],
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
    makesOffer: services.map(buildOffer),
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
    inLanguage: "ro-RO",
    publisher: { "@id": `${SITE_URL}/#salon` },
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQ.map((entry) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
