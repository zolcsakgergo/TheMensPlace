import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import { Container, Eyebrow, Section, SectionTitle } from "@/components/Primitives";
import { BUSINESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description:
    "Cum procesează The Men's Place datele vizitatorilor site-ului în conformitate cu GDPR.",
  alternates: { canonical: "/confidentialitate" },
};

const LAST_UPDATED = "12 mai 2026";

const linkCls = "text-gold underline-offset-4 hover:underline";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pt-32">
        <Section tone="bg" className="!py-20">
          <Container className="max-w-[760px]">
            <Eyebrow>Legal</Eyebrow>
            <SectionTitle line1="Politica de" em="confidențialitate" className="mb-10" />
            <p className="text-ink-mute mb-12 font-mono text-[11px] tracking-[0.22em] uppercase">
              Ultima actualizare · {LAST_UPDATED}
            </p>

            <div className="text-ink-dim space-y-8 text-[16px] leading-[1.75]">
              <section>
                <h2 className="text-ink mb-3 font-serif text-[24px]">1. Operatorul de date</h2>
                <p>
                  {BUSINESS.name}, cu sediul în {BUSINESS.street}, {BUSINESS.postalCode}{" "}
                  {BUSINESS.city}, {BUSINESS.countryName}, telefon{" "}
                  <a href={`tel:${BUSINESS.phone}`} className={linkCls}>
                    {BUSINESS.phoneDisplay}
                  </a>
                  , este operatorul datelor cu caracter personal colectate prin acest site.
                </p>
              </section>

              <section>
                <h2 className="text-ink mb-3 font-serif text-[24px]">2. Ce date colectăm</h2>
                <p>
                  Site-ul nostru nu solicită direct date personale. Nu există formulare de contact,
                  conturi sau coșuri de cumpărături. Programările se efectuează exclusiv prin
                  platforma externă Mero.
                </p>
                <p className="mt-3">Procesăm însă, indirect:</p>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-ink">Date de trafic anonimizate</strong> prin Vercel
                    Analytics: pagină vizitată, țară, tip de dispozitiv, browser, referrer. IP-ul
                    este anonimizat înainte de stocare și nu sunt folosite cookie-uri de urmărire.
                  </li>
                  <li>
                    <strong className="text-ink">Date tehnice strict necesare</strong> (jurnale de
                    server) pentru livrarea site-ului și prevenirea abuzurilor.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-ink mb-3 font-serif text-[24px]">3. Temei legal și scop</h2>
                <p>
                  Prelucrăm aceste date în temeiul interesului nostru legitim (art. 6 alin. 1 lit.
                  f din Regulamentul UE 2016/679 — GDPR), pentru a înțelege cum este folosit
                  site-ul și a-l îmbunătăți. Nu folosim datele pentru profilare, publicitate
                  comportamentală sau decizii automate.
                </p>
              </section>

              <section>
                <h2 className="text-ink mb-3 font-serif text-[24px]">4. Programări prin Mero</h2>
                <p>
                  Când accesați butonul „Programează" sunteți redirecționat către{" "}
                  <a
                    href="https://mero.ro/p/the-mens-place"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkCls}
                  >
                    mero.ro
                  </a>
                  . Mero devine operator independent pentru datele introduse acolo (nume, telefon,
                  oră aleasă). Vă rugăm să consultați{" "}
                  <a
                    href="https://mero.ro/termeni-si-conditii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkCls}
                  >
                    politica lor de confidențialitate
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-ink mb-3 font-serif text-[24px]">5. Procesatori și transfer</h2>
                <p>
                  Site-ul este găzduit de Vercel Inc. (SUA), care procesează date în calitate de
                  persoană împuternicită. Transferurile către SUA sunt protejate prin EU-US Data
                  Privacy Framework. Nu vindem și nu partajăm date cu terți în scopuri comerciale.
                </p>
              </section>

              <section>
                <h2 className="text-ink mb-3 font-serif text-[24px]">6. Perioada de stocare</h2>
                <p>
                  Datele de trafic anonimizate sunt păstrate maximum 12 luni. Jurnalele tehnice se
                  șterg automat după 30 de zile.
                </p>
              </section>

              <section>
                <h2 className="text-ink mb-3 font-serif text-[24px]">7. Drepturile dvs.</h2>
                <p>
                  Conform GDPR aveți dreptul la acces, rectificare, ștergere, restricționarea
                  prelucrării, portabilitate și opoziție. Pentru exercitarea acestora ne puteți
                  contacta la{" "}
                  <a href={`tel:${BUSINESS.phone}`} className={linkCls}>
                    {BUSINESS.phoneDisplay}
                  </a>
                  .
                </p>
                <p className="mt-3">
                  Aveți, de asemenea, dreptul de a depune plângere la Autoritatea Națională de
                  Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP),{" "}
                  <a
                    href="https://www.dataprotection.ro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkCls}
                  >
                    dataprotection.ro
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-ink mb-3 font-serif text-[24px]">8. Modificări</h2>
                <p>
                  Această politică poate fi actualizată. Versiunea curentă este întotdeauna
                  disponibilă pe această pagină, cu data ultimei revizuiri afișată în partea de
                  sus.
                </p>
              </section>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
