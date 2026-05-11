"use client";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { MdCalendarMonth } from "react-icons/md";

const MERO_URL = "https://mero.ro/p/the-mens-place";
const HIDDEN_PATHS = ["/confidentialitate", "/mentiuni-legale"];

export default function FloatingBook() {
  const pathname = usePathname();
  const t = useTranslations("booking");

  if (HIDDEN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }

  return (
    <a
      href={MERO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("ctaGhost")}
      className="bg-gold text-bg border-gold hover:bg-gold-deep hover:border-gold-deep fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 border px-5 py-3 font-mono text-[11px] tracking-[0.22em] uppercase shadow-lg transition-all duration-200 md:hidden"
    >
      <MdCalendarMonth aria-hidden className="text-[1.2em]" />
      {t("floating")}
    </a>
  );
}
