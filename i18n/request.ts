import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export const defaultLocale = "ro" as const;
export const locales = ["ro", "hu", "en"] as const;
export type Locale = (typeof locales)[number];
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: Locale = isLocale(fromCookie) ? fromCookie : defaultLocale;
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
