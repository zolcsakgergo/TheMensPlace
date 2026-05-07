import { getTranslations } from "next-intl/server";
import { Container, Frame, Section, SectionHead } from "@/components/Primitives";
import LocationMap from "@/components/LocationMap";
import HoursList, { type HourEntry } from "@/components/cards/HoursList";

export default async function Location({
  position,
  hours,
}: {
  position: [number, number];
  hours: HourEntry[];
}) {
  const t = await getTranslations("location");
  return (
    <Section id="location" screenLabel="09 Location">
      <Container>
        <SectionHead
          eyebrow={t("eyebrow")}
          titleLine1={t("titleLine1")}
          titleEm={t("titleEm")}
          className="mb-15"
        />
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-20 max-[980px]:grid-cols-1 max-[980px]:gap-10">
          <div>
            <h3 className="text-gold mb-5 font-mono text-[18px] font-medium tracking-[0.22em] uppercase">
              {t("scheduleHeading")}
            </h3>
            <HoursList hours={hours} />
            <h3 className="text-gold mb-5 font-mono text-[18px] font-medium tracking-[0.22em] uppercase">
              {t("addressHeading")}
            </h3>
            <div className="text-ink font-serif text-[19px] leading-normal italic">
              {t("addressLine1")}
              <span className="text-gold mt-3 block font-mono text-[11px] tracking-[0.22em] uppercase not-italic">
                {t("addressCity")}
              </span>
            </div>
          </div>
          <div className="border-rule-strong bg-bg-3 relative aspect-3/4 overflow-hidden border">
            <Frame />
            <LocationMap
              position={position}
              zoom={16}
              popupTitle={t("mapPopupTitle")}
              popupAddress={t("mapPopupAddress")}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
