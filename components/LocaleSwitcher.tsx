"use client";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { setLocale } from "@/app/actions/locale";

const OPTIONS = [
  { code: "ro", label: "RO" },
  { code: "hu", label: "HU" },
  { code: "en", label: "EN" },
] as const;

export default function LocaleSwitcher({ className = "" }: { className?: string }) {
  const current = useLocale();
  const [pending, startTransition] = useTransition();

  const onPick = (code: string) => {
    if (code === current || pending) return;
    startTransition(() => {
      setLocale(code);
    });
  };

  return (
    <div
      className={`border-rule text-ink-dim inline-flex items-center border font-mono text-[11px] tracking-[0.22em] uppercase ${className}`}
      role="group"
      aria-label="Language"
    >
      {OPTIONS.map((opt, i) => {
        const active = opt.code === current;
        return (
          <button
            key={opt.code}
            type="button"
            onClick={() => onPick(opt.code)}
            aria-pressed={active}
            disabled={pending}
            className={`px-2.5 py-1.5 transition-colors ${
              i > 0 ? "border-rule border-l" : ""
            } ${active ? "text-gold" : "hover:text-gold"} ${
              pending ? "cursor-wait opacity-60" : ""
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
