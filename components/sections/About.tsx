import { getTranslations } from "next-intl/server";
import { Container, Eyebrow, Frame, Section } from "@/components/Primitives";
import CmsImage from "@/components/CmsImage";
import type { SanityImage } from "@/sanity/lib/queries";

export default async function About({ aboutImage }: { aboutImage?: SanityImage }) {
  const t = await getTranslations("about");
  return (
    <Section id="about" tone="bg-2" screenLabel="04 About">
      <Container>
        <div className="grid grid-cols-[1fr_1.2fr] items-center gap-25 max-[980px]:grid-cols-1 max-[980px]:gap-10">
          <div className="border-rule-strong bg-bg-3 relative aspect-4/5 overflow-hidden border">
            <Frame />
            <CmsImage
              image={aboutImage}
              label={t("photoLabel")}
              dim={t("photoDim")}
              alt={t("photoAlt")}
            />
          </div>
          <div>
            <Eyebrow side="left">{t("eyebrow")}</Eyebrow>
            <h2 className="mt-4.5 mb-7 font-serif text-[clamp(40px,5vw,64px)] leading-[1.05] font-normal tracking-[-0.01em]">
              {t("titleLine1")}
              <br />
              <em className="text-gold italic">{t("titleEm")}</em>
            </h2>
            <p className="text-ink-dim mb-5 text-[16.5px] leading-[1.8]">{t("p1")}</p>
            <div className="text-ink border-gold my-8 border-l-2 pl-6 font-serif text-[22px] leading-normal italic">
              {t("pull")}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
