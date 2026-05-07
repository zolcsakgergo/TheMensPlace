import { getTranslations } from "next-intl/server";
import { MdArrowForward } from "react-icons/md";
import { Container, Frame } from "@/components/Primitives";
import { Button } from "@/components/ui/button";
import CmsImage from "@/components/CmsImage";
import type { SanityImage } from "@/sanity/lib/queries";

const META_KEYS = [
  ["yearsValue", "yearsLabel"],
  ["clientsValue", "clientsLabel"],
  ["ratingValue", "ratingLabel"],
] as const;

export default async function Hero({ heroImage }: { heroImage?: SanityImage }) {
  const t = await getTranslations("hero");
  return (
    <section
      className="min-h-screen pt-40 pb-24 flex items-center relative overflow-hidden bg-bg"
      data-screen-label="01 Hero"
    >
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <Container className="relative z-1">
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-20 items-center max-[980px]:grid-cols-1 max-[980px]:gap-10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.4em] text-gold mb-8">
              {t("est")}
            </div>
            <h1 className="font-serif font-normal text-[clamp(64px,8vw,124px)] leading-[0.95] tracking-[-0.02em] mb-8">
              {t("titleLine1")}
              <br />
              {t("titleLine2Pre")}{" "}
              <em className="italic text-gold">{t("titleEm")}</em>.
              <span className="block text-[0.4em] tracking-[0.02em] text-ink-dim italic mt-2">
                {t("titleSmall")}
              </span>
            </h1>
            <p className="text-ink-dim text-[18px] max-w-[460px] leading-[1.7] mb-10">
              {t("lede")}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button asChild>
                <a href="#booking">
                  {t("ctaPrimary")}
                  <MdArrowForward
                    aria-hidden
                    className="text-[1.1em] transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="#services">{t("ctaGhost")}</a>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-rule">
              {META_KEYS.map(([v, l]) => (
                <div key={v}>
                  <div className="font-serif italic text-gold text-[38px] leading-none">
                    {t(`meta.${v}`)}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-dim mt-1.5">
                    {t(`meta.${l}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-3/4 border border-rule-strong bg-bg-2 overflow-hidden">
            <Frame />
            <CmsImage
              image={heroImage}
              label={t("photoLabel")}
              dim={t("photoDim")}
              alt={t("photoAlt")}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
