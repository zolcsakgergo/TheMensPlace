import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/Primitives";
import { BUSINESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mențiuni legale",
  description:
    "Informații legale despre operatorul site-ului The Men's Place, conform Legii 365/2002.",
  alternates: { canonical: "/mentiuni-legale" },
};

const LAST_UPDATED = "12 mai 2026";

const linkCls = "text-gold underline-offset-4 hover:underline";

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="border-rule grid grid-cols-[180px_1fr] gap-6 border-b py-4 max-[640px]:grid-cols-1 max-[640px]:gap-1 max-[640px]:py-3">
    <dt className="text-ink-mute font-mono text-[11px] tracking-[0.22em] uppercase">{label}</dt>
    <dd className="text-ink-dim text-[16px] leading-[1.7]">{children}</dd>
  </div>
);

export default function LegalPage() {
  return (
    <>
      <Nav />
      <main className="pt-32">
        <Section tone="bg" className="py-20!">
          <Container className="max-w-190">
            <Eyebrow>Legal</Eyebrow>
            <SectionTitle line1="Mențiuni" em="legale" className="mb-10" />
            <p className="text-ink-mute mb-6 font-mono text-[11px] tracking-[0.22em] uppercase">
              Ultima actualizare · {LAST_UPDATED}
            </p>
            <p className="text-ink-dim mb-12 text-[16px] leading-[1.7]">
              Informații obligatorii conform Legii nr. 365/2002 privind comerțul electronic.
            </p>

            <dl className="m-0">
              <Row label="Denumire">{BUSINESS.legalName}</Row>
              <Row label="Formă juridică">[A SE COMPLETA — ex: SRL, PFA, II]</Row>
              <Row label="CUI / CIF">[A SE COMPLETA]</Row>
              <Row label="Nr. înreg. ORC">[A SE COMPLETA — ex: J30/.../....]</Row>
              <Row label="Sediu social">
                {BUSINESS.street}, {BUSINESS.postalCode} {BUSINESS.city},{" "}
                {BUSINESS.countryName}
              </Row>
              <Row label="Telefon">
                <a href={`tel:${BUSINESS.phone}`} className={linkCls}>
                  {BUSINESS.phoneDisplay}
                </a>
              </Row>
              <Row label="Programări">
                <a
                  href="https://mero.ro/p/the-mens-place"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  mero.ro/p/the-mens-place
                </a>
              </Row>
              <Row label="Găzduire">Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, SUA</Row>
              <Row label="Autoritate de supraveghere">
                <a
                  href="https://anpc.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
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
              <Row label="Soluționare online">
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  Platforma SOL a Comisiei Europene
                </a>
              </Row>
            </dl>

            <p className="text-ink-mute mt-10 text-[14px] leading-[1.7]">
              Contractul de prestare a serviciilor de frizerie se încheie la sediul fizic al
              salonului. Acest site are caracter informativ; nu se efectuează tranzacții online pe
              acest domeniu.
            </p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
