import { getTranslations } from "next-intl/server";
import { Brand, Container } from "@/components/Primitives";

const NAV_KEYS = ["services", "about", "team", "gallery"] as const;
const SOCIALS = [
  { key: "instagram", href: "https://www.instagram.com/levente.ninacs/" },
  { key: "facebook", href: "https://www.facebook.com/NinacsLevente22/" },
] as const;

const linkCls =
  "text-ink-dim text-[14px] no-underline hover:text-gold transition-colors";

const ColumnHeading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gold mb-5">
    {children}
  </h4>
);

export default async function Footer() {
  const [tFooter, tNav] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
  ]);
  return (
    <footer className="bg-bg-2 border-t border-gold pt-20 pb-10" data-screen-label="10 Footer">
      <Container>
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-14 mb-14 max-[980px]:grid-cols-2 max-[980px]:gap-8">
          <div>
            <Brand size="lg" />
            <p className="text-ink-dim text-[14px] leading-[1.7] mt-4.5 max-w-[320px]">
              {tFooter("tagline")}
            </p>
          </div>

          <div>
            <ColumnHeading>{tFooter("navHeading")}</ColumnHeading>
            <ul className="list-none m-0 p-0 space-y-3">
              {NAV_KEYS.map((k) => (
                <li key={k}>
                  <a href={`#${k}`} className={linkCls}>
                    {tNav(k)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>{tFooter("contactHeading")}</ColumnHeading>
            <ul className="list-none m-0 p-0 space-y-3">
              <li>
                <a href="tel:+40745319957" className={linkCls}>
                  {tFooter("phone")}
                </a>
              </li>
              <li>
                <a href="#location" className={linkCls}>
                  {tFooter("addressShort")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ColumnHeading>{tFooter("followHeading")}</ColumnHeading>
            <ul className="list-none m-0 p-0 space-y-3">
              {SOCIALS.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkCls}
                  >
                    {tFooter(`social.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center pt-8 border-t border-rule font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute">
          <span>{tFooter("copyright")}</span>
          <span>{tFooter("madeWith")}</span>
        </div>
      </Container>
    </footer>
  );
}
