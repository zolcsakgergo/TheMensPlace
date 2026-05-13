import { getTranslations } from "next-intl/server";
import { Brand, Container } from "@/components/Primitives";
import { Link } from "@/i18n/navigation";

const NAV_KEYS = ["services", "about", "team", "gallery"] as const;

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden {...props}>
    <path d="M14.5 8.5h2.25V5.5h-2.25c-1.8 0-3.25 1.45-3.25 3.25V11H9v3h2.25v6.5h3V14H17l.5-3h-3.25V9c0-.28.22-.5.5-.5Z" />
  </svg>
);

const SOCIALS = [
  { key: "instagram", href: "https://www.instagram.com/levente.ninacs/", Icon: InstagramIcon },
  { key: "facebook", href: "https://www.facebook.com/NinacsLevente22/", Icon: FacebookIcon },
] as const;

const linkCls = "text-ink-dim text-[14px] no-underline hover:text-gold transition-colors";

const ColumnHeading = ({ children }: { children: React.ReactNode }) => (
  <h4 className="text-gold mb-5 font-mono text-[11px] font-medium tracking-[0.22em] uppercase">
    {children}
  </h4>
);

export default async function Footer() {
  const [tFooter, tNav] = await Promise.all([getTranslations("footer"), getTranslations("nav")]);
  return (
    <footer className="bg-bg-2 border-gold border-t pt-20 pb-10" data-screen-label="10 Footer">
      <Container>
        <div className="mb-14 grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-14 max-[980px]:grid-cols-2 max-[980px]:gap-8">
          <div>
            <Brand size="lg" />
            <p className="text-ink-dim mt-4.5 max-w-[320px] text-[14px] leading-[1.7]">
              {tFooter("tagline")}
            </p>
          </div>

          <div>
            <ColumnHeading>{tFooter("navHeading")}</ColumnHeading>
            <ul className="m-0 list-none space-y-3 p-0">
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
            <ul className="m-0 list-none space-y-3 p-0">
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
            <ul className="m-0 list-none space-y-3 p-0">
              {SOCIALS.map(({ key, href, Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkCls} inline-flex items-center gap-2.5`}
                  >
                    <Icon className="text-gold h-5 w-5 shrink-0" />
                    <span>{tFooter(`social.${key}`)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-rule text-ink-mute flex flex-wrap items-center justify-between gap-4 border-t pt-8 font-mono text-[10px] tracking-[0.22em] uppercase">
          <span>{tFooter("copyright")}</span>
          <div className="flex gap-6">
            <Link href="/confidentialitate" className="hover:text-gold transition-colors">
              {tFooter("privacy")}
            </Link>
            <Link href="/mentiuni-legale" className="hover:text-gold transition-colors">
              {tFooter("legal")}
            </Link>
          </div>
          <span>{tFooter("madeWith")}</span>
        </div>
      </Container>
    </footer>
  );
}
