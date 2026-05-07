import { getTranslations } from "next-intl/server";
import { MdArrowForward } from "react-icons/md";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/Primitives";
import { Button } from "@/components/ui/button";

const MERO_URL = "https://mero.ro/p/the-mens-place";
const PHONE_TEL = "tel:+40745319957";

export default async function Booking() {
  const t = await getTranslations("booking");
  return (
    <Section
      id="booking"
      tone="bg-2"
      screenLabel="08 Booking"
      className="text-center border-y border-rule"
    >
      <span aria-hidden className="absolute inset-x-0 top-2 h-px bg-gold/40" />
      <span aria-hidden className="absolute inset-x-0 bottom-2 h-px bg-gold/40" />
      <Container>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <SectionTitle line1={t("titleLine1")} em={t("titleEm")} size="lg" className="my-6" />
        <p className="text-ink-dim text-[18px] max-w-[520px] mx-auto mb-10">
          {t("p")}
        </p>
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <Button asChild>
            <a href={PHONE_TEL}>
              {t("ctaPrimary")}
              <MdArrowForward
                aria-hidden
                className="text-[1.1em] transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href={MERO_URL} target="_blank" rel="noopener noreferrer">
              {t("ctaGhost")}
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
