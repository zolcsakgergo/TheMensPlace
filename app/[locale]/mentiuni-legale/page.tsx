import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/Primitives";
import { BUSINESS } from "@/lib/site";

const linkCls = "text-gold underline-offset-4 hover:underline";

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="border-rule grid grid-cols-[180px_1fr] gap-6 border-b py-4 max-[640px]:grid-cols-1 max-[640px]:gap-1 max-[640px]:py-3">
    <dt className="text-ink-mute font-mono text-[11px] tracking-[0.22em] uppercase">{label}</dt>
    <dd className="text-ink-dim text-[16px] leading-[1.7]">{children}</dd>
  </div>
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");

  return (
    <>
      <Nav />
      <main className="pt-32">
        <Section tone="bg" className="py-20!">
          <Container className="max-w-190">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <SectionTitle line1={t("titleLine1")} em={t("titleEm")} className="mb-10" />
            <p className="text-ink-mute mb-6 font-mono text-[11px] tracking-[0.22em] uppercase">
              {t("lastUpdatedLabel")} · {t("lastUpdated")}
            </p>
            <p className="text-ink-dim mb-12 text-[16px] leading-[1.7]">{t("intro")}</p>

            <dl className="m-0">
              <Row label={t("rows.name")}>{BUSINESS.legalName}</Row>
              <Row label={t("rows.form")}>{t("values.form")}</Row>
              <Row label={t("rows.cui")}>{t("values.cui")}</Row>
              <Row label={t("rows.orc")}>{t("values.orc")}</Row>
              <Row label={t("rows.address")}>
                {BUSINESS.street}, {BUSINESS.postalCode} {BUSINESS.city}, {BUSINESS.countryName}
              </Row>
              <Row label={t("rows.phone")}>
                <a href={`tel:${BUSINESS.phone}`} className={linkCls}>
                  {BUSINESS.phoneDisplay}
                </a>
              </Row>
              <Row label={t("rows.booking")}>
                <a
                  href="https://mero.ro/p/the-mens-place"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  mero.ro/p/the-mens-place
                </a>
              </Row>
              <Row label={t("rows.hosting")}>{t("values.hosting")}</Row>
              <Row label={t("rows.supervisor")}>
                <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className={linkCls}>
                  ANPC — anpc.ro
                </a>{" "}
                ·{" "}
                <a
                  href="https://www.dataprotection.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  ANSPDCP — dataprotection.ro
                </a>
              </Row>
              <Row label={t("rows.online")}>
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  {t("values.online")}
                </a>
              </Row>
            </dl>

            <p className="text-ink-mute mt-10 text-[14px] leading-[1.7]">{t("footnote")}</p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
