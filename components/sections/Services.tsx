import { getTranslations } from "next-intl/server";
import { Container, Section, SectionHead } from "@/components/Primitives";
import ServiceCard, { type Service } from "@/components/cards/ServiceCard";
import PremiumServiceCard from "@/components/cards/PremiumServiceCard";

export default async function Services() {
  const t = await getTranslations("services");
  const items = t.raw("items") as Service[];

  // Featured (premium) service closes the grid as the final full-width row.
  const featured = items.find((s) => s.featured);
  const normals = items.filter((s) => !s.featured);
  const ordered = featured ? [...normals, featured] : items;

  return (
    <Section id="services" screenLabel="03 Services">
      <Container>
        <SectionHead
          eyebrow={t("eyebrow")}
          titleLine1={t("titleLine1")}
          titleEm={t("titleEm")}
          description={t("p")}
        />
        <div className="grid grid-cols-2 max-[980px]:grid-cols-1 border-t border-l border-rule">
          {ordered.map((s) =>
            s.featured ? (
              <PremiumServiceCard key={s.n} service={s} />
            ) : (
              <ServiceCard key={s.n} service={s} />
            ),
          )}
        </div>
      </Container>
    </Section>
  );
}
