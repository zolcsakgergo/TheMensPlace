import { getTranslations } from "next-intl/server";

const REPEATS = 3;

export default async function MarqueeBar() {
  const t = await getTranslations("marquee");
  const items = t.raw("items") as string[];
  const tripled = Array.from({ length: REPEATS }).flatMap(() => items);
  return (
    <div className="border-rule bg-bg-2 overflow-hidden border-y py-5.5">
      <div className="animate-marquee text-ink-dim flex gap-16 font-serif text-[22px] whitespace-nowrap italic">
        {tripled.map((label, i) => (
          <span key={i}>
            <span className="text-gold">✦</span> {label}
          </span>
        ))}
      </div>
    </div>
  );
}
