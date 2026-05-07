import { useTranslations } from "next-intl";
import { MdArrowForward } from "react-icons/md";
import { Frame, Ornament } from "@/components/Primitives";
import { Button } from "@/components/ui/button";
import type { Service } from "./ServiceCard";

/**
 * The "semnătura casei" service — full-width showcase that closes the
 * services grid. Larger typography, frame corners, and a CTA built in.
 */
export default function PremiumServiceCard({ service }: { service: Service }) {
  const t = useTranslations("services");
  const tHero = useTranslations("hero");
  return (
    <article className="group relative col-span-2 max-[980px]:col-span-1 px-12 py-16 max-[980px]:px-9 max-[980px]:py-12 border-r border-b border-rule bg-featured-tint overflow-hidden">
      <Frame size={32} offset={20} />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gold/50" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gold/50" />

      <div className="text-center max-w-2xl mx-auto relative">
        <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-gold inline-flex items-center gap-3.5 mb-5">
          <span className="inline-block w-8 h-px bg-gold/70" />
          <span>★ {t("featuredBadge")}</span>
          <span className="inline-block w-8 h-px bg-gold/70" />
        </div>
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold-deep mb-3">
          {t("numPrefix")} {service.n}
        </div>
        <h3 className="font-serif text-[clamp(36px,4.5vw,52px)] leading-[1.05] tracking-[-0.01em]">
          {service.title}
        </h3>
        <Ornament />
        <div className="flex items-baseline justify-center gap-8 mb-7 max-[980px]:gap-5">
          <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-ink-dim">
            {service.duration}
          </span>
          <span className="font-serif italic text-[clamp(38px,4.5vw,56px)] text-gold leading-none">
            {service.price}
            <span className="font-mono not-italic text-[12px] tracking-[0.22em] ml-1.5 text-gold-deep">
              {t("lei")}
            </span>
          </span>
        </div>
        <p className="text-ink text-[16px] leading-[1.75] max-w-xl mx-auto">
          {service.desc}
        </p>
        <div className="mt-9">
          <Button asChild>
            <a href="#booking">
              {tHero("ctaPrimary")}
              <MdArrowForward
                aria-hidden
                className="text-[1.1em] transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
