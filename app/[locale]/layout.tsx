import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Mono, Inter, Playfair_Display } from "next/font/google";
import FloatingBook from "@/components/FloatingBook";
import ScrollToTop from "@/components/ScrollToTop";
import TrackOutbound from "@/components/TrackOutbound";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { localizedAlternates } from "@/lib/seo";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

type LayoutParams = { locale: string };

// Self-hosted via next/font: no render-blocking Google Fonts request, no layout shift.
const serif = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const OG_LOCALES: Record<Locale, string> = {
  ro: "ro_RO",
  hu: "hu_HU",
  en: "en_US",
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
  const keywords = t.raw("keywords") as string[];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s · ${BUSINESS.name}`,
    },
    description,
    applicationName: BUSINESS.name,
    keywords,
    authors: [{ name: BUSINESS.name, url: SITE_URL }],
    creator: BUSINESS.name,
    publisher: BUSINESS.name,
    alternates: localizedAlternates(locale, "/"),
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
          url: "/og-image.png",
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
      images: ["/og-image.png"],
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
    <html
      lang={locale}
      data-gold="warm"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          {children}
          <FloatingBook />
          <ScrollToTop />
        </NextIntlClientProvider>
        <Analytics />
        <TrackOutbound />
      </body>
    </html>
  );
}
