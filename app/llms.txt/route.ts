import { getTranslations } from "next-intl/server";
import { BUSINESS, SITE_URL } from "@/lib/site";

type ServiceMsg = {
  n: string;
  title: string;
  duration: string;
  price: string;
  desc: string;
  featured?: boolean;
};
type HourMsg = { day: string; time: string; closed?: boolean };

/**
 * /llms.txt — emerging convention for AI assistants (ChatGPT browse,
 * Perplexity, Claude, etc.) to fetch a curated, structured summary of the
 * site. Markdown body, plain-text response.
 *
 * https://llmstxt.org/
 */
export async function GET() {
  const [tServices, tLocation, tMetadata, tAbout] = await Promise.all([
    getTranslations("services"),
    getTranslations("location"),
    getTranslations("metadata"),
    getTranslations("about"),
  ]);

  const services = tServices.raw("items") as ServiceMsg[];
  const hours = tLocation.raw("hours") as HourMsg[];

  const body = `# ${BUSINESS.name}

> ${tMetadata("description")}

## Despre / About

${tAbout("p1")}

A classic men's barber shop in ${BUSINESS.city}, Romania, founded by Levente Ninacs.
Specializes in classic haircuts, straight-razor shaves, beard grooming, and
premium grooming rituals. Bilingual service (Romanian + Hungarian region).

## Contact

- **Phone**: ${BUSINESS.phoneDisplay} (${BUSINESS.phone})
- **Address**: ${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.countryName}
- **Coordinates**: ${BUSINESS.geo.latitude}, ${BUSINESS.geo.longitude}
- **Website**: ${SITE_URL}
- **Online booking**: https://mero.ro/p/the-mens-place

## Program / Opening hours

${hours.map((h) => `- **${h.day}**: ${h.closed ? "Închis (closed)" : h.time}`).join("\n")}

## Servicii / Services (prices in RON)

${services
  .map(
    (s) =>
      `- **${s.title}** — ${s.duration} · ${s.price} RON${s.featured ? " *(signature)*" : ""}\n  ${s.desc}`,
  )
  .join("\n\n")}

## Profile sociale / Social

- Instagram: https://www.instagram.com/levente.ninacs/
- Facebook: https://www.facebook.com/NinacsLevente22/
- Mero (booking): https://mero.ro/p/the-mens-place

## Cuvinte cheie / Keywords

frizerie Satu Mare, barbershop Satu Mare, tuns bărbați Satu Mare,
bărbierit cu briciul, aranjat barbă, frizer Satu Mare, The Men's Place,
Levente Ninacs, Aleea Tărnavei, Satu Mare grooming.

---

Source of truth: structured data (JSON-LD HairSalon) is embedded in
${SITE_URL}/. Hours and services are kept in sync with the live site.
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
