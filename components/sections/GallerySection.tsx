import { getTranslations } from "next-intl/server";
import { Container, Section, SectionHead } from "@/components/Primitives";
import Gallery from "@/components/Gallery";
import type { SanityImage } from "@/sanity/lib/queries";

type GalleryItem = {
  label: string;
  size: "normal" | "tall" | "wide";
  image?: SanityImage;
};

export default async function GallerySection({ items }: { items: GalleryItem[] }) {
  const t = await getTranslations("gallery");
  return (
    <Section id="gallery" tone="bg-2" screenLabel="06 Gallery">
      <Container>
        <SectionHead eyebrow={t("eyebrow")} titleLine1={t("titleLine1")} titleEm={t("titleEm")} />
        <Gallery items={items} />
      </Container>
    </Section>
  );
}
