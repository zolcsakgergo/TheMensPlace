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
      className="bg-bg relative flex min-h-screen items-center overflow-hidden pt-40 pb-24"
      data-screen-label="01 Hero"
    >
      <div className="bg-hero-glow pointer-events-none absolute inset-0" />
      <Container className="relative z-1">
        <div className="grid grid-cols-[1.1fr_0.9fr] items-center gap-20 max-[980px]:grid-cols-1 max-[980px]:gap-10">
          <div>
            <div className="text-gold mb-8 font-mono text-[11px] tracking-[0.4em]">{t("est")}</div>
            <h1 className="mb-8 font-serif text-[clamp(64px,8vw,124px)] leading-[0.95] font-normal tracking-[-0.02em]">
              {t("titleLine1")}
              <br />
              {t("titleLine2Pre")} <em className="text-gold italic">{t("titleEm")}</em>.
              <span className="text-ink-dim mt-2 block text-[0.4em] tracking-[0.02em] italic">
                {t("titleSmall")}
              </span>
            </h1>
            <p className="text-ink-dim mb-10 max-w-[460px] text-[18px] leading-[1.7]">
              {t("lede")}
            </p>
            <div className="flex flex-wrap items-center gap-4">
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
            <div className="border-rule mt-20 grid grid-cols-3 gap-8 border-t pt-10">
              {META_KEYS.map(([v, l]) => (
                <div key={v}>
                  <div className="text-gold font-serif text-[38px] leading-none italic">
                    {t(`meta.${v}`)}
                  </div>
                  <div className="text-ink-dim mt-1.5 font-mono text-[10px] tracking-[0.22em] uppercase">
                    {t(`meta.${l}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-rule-strong bg-bg-2 relative aspect-3/4 overflow-hidden border">
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
