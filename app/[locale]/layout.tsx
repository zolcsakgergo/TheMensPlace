import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import FloatingBook from "@/components/FloatingBook";
import ScrollToTop from "@/components/ScrollToTop";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

type LayoutParams = { locale: string };

const OG_LOCALES: Record<Locale, string> = {
  ro: "ro_RO",
  hu: "hu_HU",
  en: "en_US",
};

const HREFLANG: Record<Locale, string> = {
  ro: "ro-RO",
  hu: "hu-HU",
  en: "en",
};

function localePath(locale: Locale, suffix = "") {
  const base = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${base}${suffix}` || "/";
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LayoutParams>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) return {};
  const locale = raw as Locale;

  const t = await getTranslations({ locale, namespace: "metadata" });
  const title = t("title");
  const description = t("description");

  const languages = Object.fromEntries(
    routing.locales.map((l) => [HREFLANG[l], localePath(l)]),
  ) as Record<string, string>;
  languages["x-default"] = localePath(routing.defaultLocale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s · ${BUSINESS.name}`,
    },
    description,
    applicationName: BUSINESS.name,
    keywords: [
      "frizerie Satu Mare",
      "barbershop Satu Mare",
      "tuns bărbați Satu Mare",
      "bărbierit Satu Mare",
      "aranjat barbă Satu Mare",
      "frizer Satu Mare",
      "The Men's Place",
      "Levente Ninacs",
      "Aleea Tărnavei",
    ],
    authors: [{ name: BUSINESS.name, url: SITE_URL }],
    creator: BUSINESS.name,
    publisher: BUSINESS.name,
    alternates: {
      canonical: localePath(locale),
      languages,
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
      url: `${SITE_URL}${localePath(locale)}`,
      siteName: BUSINESS.name,
      title,
      description,
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: `${BUSINESS.name} — ${BUSINESS.city}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
    category: "barber",
    formatDetection: { telephone: true, email: true, address: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0807",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale: raw } = await params;
  if (!hasLocale(routing.locales, raw)) notFound();
  const locale = raw as Locale;
  setRequestLocale(locale);

  return (
    <html lang={locale} data-gold="warm">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider>
          {children}
          <FloatingBook />
          <ScrollToTop />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
