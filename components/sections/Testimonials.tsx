import { getTranslations } from "next-intl/server";
import { Container, Section, SectionHead } from "@/components/Primitives";
import TestimonialCard, { type Testimonial } from "@/components/cards/TestimonialCard";

export default async function Testimonials() {
  const t = await getTranslations("testimonials");
  const items = t.raw("items") as Testimonial[];
  return (
    <Section screenLabel="07 Testimonials">
      <Container>
        <SectionHead eyebrow={t("eyebrow")} titleLine1={t("titleLine1")} titleEm={t("titleEm")} />
        <div className="grid grid-cols-3 gap-8 max-[980px]:grid-cols-1">
          {items.map((tm, i) => (
            <TestimonialCard key={i} testimonial={tm} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
