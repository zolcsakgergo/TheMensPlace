import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ro", "hu", "en"],
  defaultLocale: "ro",
  localePrefix: "as-needed",
  // No Accept-Language redirect: every visitor and crawler gets the URL they
  // asked for; hreflang + the language switcher handle language choice.
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/confidentialitate": {
      ro: "/confidentialitate",
      hu: "/adatvedelem",
      en: "/privacy",
    },
    "/mentiuni-legale": {
      ro: "/mentiuni-legale",
      hu: "/jogi-nyilatkozat",
      en: "/legal-notice",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
