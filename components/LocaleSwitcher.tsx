"use client";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const LABEL: Record<Locale, string> = { ro: "RO", hu: "HU", en: "EN" };

export default function LocaleSwitcher({ className = "" }: { className?: string }) {
  const current = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [pending, startTransition] = useTransition();

  const onPick = (next: Locale) => {
    if (next === current || pending) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- params from useParams are valid for the current route
        { pathname, params },
        { locale: next },
      );
    });
  };

  return (
    <div
      className={`border-rule text-ink-dim inline-flex items-center border font-mono text-[11px] tracking-[0.22em] uppercase ${className}`}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((code, i) => {
        const active = code === current;
        return (
          <button
            key={code}
            type="button"
            onClick={() => onPick(code)}
            aria-pressed={active}
            disabled={pending}
            className={`px-2.5 py-1.5 transition-colors ${
              i > 0 ? "border-rule border-l" : ""
            } ${active ? "text-gold" : "hover:text-gold"} ${
              pending ? "cursor-wait opacity-60" : ""
            }`}
          >
            {LABEL[code]}
          </button>
        );
      })}
    </div>
  );
}
