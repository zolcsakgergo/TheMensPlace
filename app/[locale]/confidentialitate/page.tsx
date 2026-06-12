import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/Primitives";
import { BUSINESS } from "@/lib/site";
import { localizedAlternates } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

const linkCls = "text-gold underline-offset-4 hover:underline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localizedAlternates(locale as Locale, "/confidentialitate"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");

  const businessVars = {
    name: BUSINESS.name,
    street: BUSINESS.street,
    postal: BUSINESS.postalCode,
    city: BUSINESS.city,
    country: BUSINESS.countryName,
    phoneDisplay: BUSINESS.phoneDisplay,
  };

  const phoneTag = (chunks: React.ReactNode) => (
    <a href={`tel:${BUSINESS.phone}`} className={linkCls}>
      {chunks}
    </a>
  );
  const meroTag = (chunks: React.ReactNode) => (
    <a
      href="https://mero.ro/p/the-mens-place"
      target="_blank"
      rel="noopener noreferrer"
      className={linkCls}
    >
      {chunks}
    </a>
  );
  const meroPrivTag = (chunks: React.ReactNode) => (
    <a
      href="https://mero.ro/politica-de-confidentialitate"
      target="_blank"
      rel="noopener noreferrer"
      className={linkCls}
    >
      {chunks}
    </a>
  );
  const anspdcpTag = (chunks: React.ReactNode) => (
    <a
      href="https://www.dataprotection.ro"
      target="_blank"
      rel="noopener noreferrer"
      className={linkCls}
    >
      {chunks}
    </a>
  );
  const b = (chunks: React.ReactNode) => <strong className="text-ink">{chunks}</strong>;

  const heading = (k: string) => (
    <h2 className="text-ink mb-3 font-serif text-[24px]">{t(`${k}.h`)}</h2>
  );

  return (
    <>
      <Nav />
      <main className="pt-32">
        <Section tone="bg" className="py-20!">
          <Container className="max-w-190">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <SectionTitle line1={t("titleLine1")} em={t("titleEm")} className="mb-10" />
            <p className="text-ink-mute mb-12 font-mono text-[11px] tracking-[0.22em] uppercase">
              {t("lastUpdatedLabel")} · {t("lastUpdated")}
            </p>

            <div className="text-ink-dim space-y-8 text-[16px] leading-[1.75]">
              <section>
                {heading("s1")}
                <p>{t.rich("s1.body", { ...businessVars, phone: phoneTag })}</p>
              </section>

              <section>
                {heading("s2")}
                <p>{t("s2.p1")}</p>
                <p className="mt-3">{t.rich("s2.p2", { b })}</p>
                <p className="mt-3">{t("s2.p3")}</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>{t.rich("s2.li1", { b })}</li>
                  <li>{t.rich("s2.li2", { b })}</li>
                </ul>
              </section>

              <section>
                {heading("s3")}
                <p>{t("s3.body")}</p>
              </section>

              <section>
                {heading("s4")}
                <p>{t("s4.body")}</p>
              </section>

              <section>
                {heading("s5")}
                <p>{t.rich("s5.body", { mero: meroTag, meroPriv: meroPrivTag })}</p>
              </section>

              <section>
                {heading("s6")}
                <p>{t("s6.body")}</p>
              </section>

              <section>
                {heading("s7")}
                <p>{t("s7.body")}</p>
              </section>

              <section>
                {heading("s8")}
                <p>{t("s8.body")}</p>
              </section>

              <section>
                {heading("s9")}
                <p>{t.rich("s9.p1", { ...businessVars, phone: phoneTag })}</p>
                <p className="mt-3">{t.rich("s9.p2", { anspdcp: anspdcpTag })}</p>
              </section>

              <section>
                {heading("s10")}
                <p>{t("s10.body")}</p>
              </section>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
