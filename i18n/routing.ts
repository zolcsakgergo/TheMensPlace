import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ro", "hu", "en"],
  defaultLocale: "ro",
  localePrefix: "as-needed",
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
