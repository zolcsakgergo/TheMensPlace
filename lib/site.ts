/**
 * Single source of truth for the public site URL + business identity used
 * by metadata, sitemap, robots, manifest, and JSON-LD structured data.
 *
 * Set NEXT_PUBLIC_SITE_URL in Vercel → Project Settings → Environment
 * Variables once the production domain is wired up. Falls back to the
 * placeholder for local dev.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://themensplace.ro"
).replace(/\/$/, "");

export const BUSINESS = {
  name: "The Men's Place",
  legalName: "L&B IDEAL SRL",
  description:
    "Frizerie clasică în Satu Mare — tuns bărbați, aranjat barbă, ritualuri pentru domni. Programări online prin Mero.",
  phone: "+40745319957",
  phoneDisplay: "0745 319 957",
  email: "",
  street: "Aleea Tărnavei 2, A",
  postalCode: "440207",
  city: "Satu Mare",
  region: "Satu Mare",
  country: "RO",
  countryName: "România",
  geo: { latitude: 47.780561, longitude: 22.8700419 },
  priceRange: "RON 50–160",
  social: [
    "https://www.instagram.com/levente.ninacs/",
    "https://www.facebook.com/NinacsLevente22/",
    "https://mero.ro/p/the-mens-place",
  ],
} as const;
