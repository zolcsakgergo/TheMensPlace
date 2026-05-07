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
    <article className="group border-rule bg-featured-tint relative col-span-2 overflow-hidden border-r border-b px-12 py-16 max-[980px]:col-span-1 max-[980px]:px-9 max-[980px]:py-12">
      <Frame size={32} offset={20} />
      <span aria-hidden className="bg-gold/50 absolute inset-x-0 top-0 h-px" />
      <span aria-hidden className="bg-gold/50 absolute inset-x-0 bottom-0 h-px" />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="text-gold mb-5 inline-flex items-center gap-3.5 font-mono text-[11px] tracking-[0.32em] uppercase">
          <span className="bg-gold/70 inline-block h-px w-8" />
          <span>★ {t("featuredBadge")}</span>
          <span className="bg-gold/70 inline-block h-px w-8" />
        </div>
        <div className="text-gold-deep mb-3 font-mono text-[10px] tracking-[0.22em] uppercase">
          {t("numPrefix")} {service.n}
        </div>
        <h3 className="font-serif text-[clamp(36px,4.5vw,52px)] leading-[1.05] tracking-[-0.01em]">
          {service.title}
        </h3>
        <Ornament />
        <div className="mb-7 flex items-baseline justify-center gap-8 max-[980px]:gap-5">
          <span className="text-ink-dim font-mono text-[12px] tracking-[0.22em] uppercase">
            {service.duration}
          </span>
          <span className="text-gold font-serif text-[clamp(38px,4.5vw,56px)] leading-none italic">
            {service.price}
            <span className="text-gold-deep ml-1.5 font-mono text-[12px] tracking-[0.22em] not-italic">
              {t("lei")}
            </span>
          </span>
        </div>
        <p className="text-ink mx-auto max-w-xl text-[16px] leading-[1.75]">{service.desc}</p>
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
