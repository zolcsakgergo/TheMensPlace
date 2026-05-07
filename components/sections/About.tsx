import { getTranslations } from "next-intl/server";
import { Container, Eyebrow, Frame, Section } from "@/components/Primitives";
import CmsImage from "@/components/CmsImage";
import type { SanityImage } from "@/sanity/lib/queries";

export default async function About({
  aboutImage,
}: {
  aboutImage?: SanityImage;
}) {
  const t = await getTranslations("about");
  return (
    <Section id="about" tone="bg-2" screenLabel="04 About">
      <Container>
        <div className="grid grid-cols-[1fr_1.2fr] gap-25 items-center max-[980px]:grid-cols-1 max-[980px]:gap-10">
          <div className="aspect-4/5 relative border border-rule-strong bg-bg-3 overflow-hidden">
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
            <h2 className="font-serif font-normal text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.01em] mb-7 mt-4.5">
              {t("titleLine1")}
              <br />
              <em className="italic text-gold">{t("titleEm")}</em>
            </h2>
            <p className="text-ink-dim text-[16.5px] leading-[1.8] mb-5">{t("p1")}</p>
            <div className="font-serif italic text-[22px] text-ink border-l-2 border-gold pl-6 my-8 leading-normal">
              {t("pull")}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
