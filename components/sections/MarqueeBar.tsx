import { getTranslations } from "next-intl/server";

const REPEATS = 3;

export default async function MarqueeBar() {
  const t = await getTranslations("marquee");
  const items = t.raw("items") as string[];
  const tripled = Array.from({ length: REPEATS }).flatMap(() => items);
  return (
    <div className="border-y border-rule py-5.5 overflow-hidden bg-bg-2">
      <div className="flex gap-16 whitespace-nowrap animate-marquee font-serif italic text-[22px] text-ink-dim">
        {tripled.map((label, i) => (
          <span key={i}>
            <span className="text-gold">✦</span> {label}
          </span>
        ))}
      </div>
    </div>
  );
}
