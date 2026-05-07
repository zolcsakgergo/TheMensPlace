import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { BUSINESS, SITE_URL } from "@/lib/site";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");
  const title = t("title");
  const description = t("description");

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
      canonical: "/",
      languages: { "ro-RO": "/" },
    },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      url: SITE_URL,
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

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
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
