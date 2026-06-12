import { getTranslations } from "next-intl/server";
import { Container, Section, SectionHead } from "@/components/Primitives";

type FaqItem = { q: string; a: string };

export default async function Faq() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  return (
    <Section tone="bg-2" screenLabel="10 FAQ">
      <Container className="max-w-190">
        <SectionHead eyebrow={t("eyebrow")} titleLine1={t("titleLine1")} titleEm={t("titleEm")} />
        <dl className="m-0">
          {items.map((item, i) => (
            <div key={i} className="border-rule border-b py-7 first:border-t">
              <dt className="text-ink font-serif text-[22px] leading-snug">{item.q}</dt>
              <dd className="text-ink-dim m-0 mt-3 text-[16px] leading-[1.7]">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
