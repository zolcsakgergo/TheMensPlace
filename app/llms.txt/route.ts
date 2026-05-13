import { getTranslations } from "next-intl/server";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

type ServiceMsg = {
  n: string;
  title: string;
  duration: string;
  price: string;
  desc: string;
  featured?: boolean;
};
type HourMsg = { day: string; time: string; closed?: boolean };

const LOCALE_NAME: Record<Locale, string> = {
  ro: "Română",
  hu: "Magyar",
  en: "English",
};

async function localeBlock(locale: Locale) {
  const [tServices, tLocation, tMetadata, tAbout, tFaq] = await Promise.all([
    getTranslations({ locale, namespace: "services" }),
    getTranslations({ locale, namespace: "location" }),
    getTranslations({ locale, namespace: "metadata" }),
    getTranslations({ locale, namespace: "about" }),
    getTranslations({ locale, namespace: "faq" }),
  ]);

  const services = tServices.raw("items") as ServiceMsg[];
  const hours = tLocation.raw("hours") as HourMsg[];
  const faq = tFaq.raw("items") as { q: string; a: string }[];

  const home = `${SITE_URL}${getPathname({ locale, href: "/" })}`;
  const privacy = `${SITE_URL}${getPathname({ locale, href: "/confidentialitate" })}`;
  const legal = `${SITE_URL}${getPathname({ locale, href: "/mentiuni-legale" })}`;

  return `## ${LOCALE_NAME[locale]} · ${tMetadata("title")}

${tMetadata("description")}

- Home: ${home}
- Privacy: ${privacy}
- Legal notice: ${legal}

### About

${tAbout("p1")}

### Hours

${hours.map((h) => `- ${h.day}: ${h.closed ? "closed" : h.time}`).join("\n")}

### Services (RON)

${services
  .map(
    (s) =>
      `- ${s.title} — ${s.duration} · ${s.price} RON${s.featured ? " *(signature)*" : ""}\n  ${s.desc}`,
  )
  .join("\n\n")}

### FAQ

${faq.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}
`;
}

export async function GET() {
  const blocks = await Promise.all(routing.locales.map((l) => localeBlock(l)));

  const body = `# ${BUSINESS.name}

> Classic men's barbershop in ${BUSINESS.city}, Romania. Trilingual site (Romanian, Hungarian, English).

## Contact

- **Phone**: ${BUSINESS.phoneDisplay} (${BUSINESS.phone})
- **Address**: ${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.countryName}
- **Coordinates**: ${BUSINESS.geo.latitude}, ${BUSINESS.geo.longitude}
- **Online booking**: https://mero.ro/p/the-mens-place
- **Instagram**: https://www.instagram.com/levente.ninacs/
- **Facebook**: https://www.facebook.com/NinacsLevente22/

## Available languages

${routing.locales
  .map(
    (l) =>
      `- ${LOCALE_NAME[l]} (${l}): ${SITE_URL}${getPathname({ locale: l, href: "/" })}`,
  )
  .join("\n")}

---

${blocks.join("\n---\n\n")}
---

Source of truth: structured data (JSON-LD BarberShop + FAQPage + WebPage) is
embedded on every locale's home page. Sitemap with hreflang alternates:
${SITE_URL}/sitemap.xml
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
