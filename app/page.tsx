import { getTranslations } from "next-intl/server";
import { MdArrowForward } from "react-icons/md";
import Nav from "@/components/Nav";
import VideoReveal from "@/components/VideoReveal";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import {
  Brand,
  Container,
  Eyebrow,
  Frame,
  Ornament,
  SectionTitle,
} from "@/components/Primitives";
import CmsImage from "@/components/CmsImage";
import { getSiteSettings, type SanityImage } from "@/sanity/lib/queries";

type ServiceMsg = {
  n: string;
  title: string;
  duration: string;
  price: string;
  desc: string;
  featured?: boolean;
};
type TeamMsg = { name: string; role: string; bio: string };
type GalleryMsg = { label: string; size: "normal" | "tall" | "wide" };
type TestimonialMsg = { text: string; name: string; initial: string };
type HourMsg = { day: string; time: string; closed: boolean };

const sectionPad = "py-[140px] max-[980px]:py-20 relative";

const btnBase =
  "group inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.22em] uppercase px-8 py-[18px] no-underline cursor-pointer border transition-all duration-200";
const btnPrimary =
  `${btnBase} bg-gold text-bg border-gold hover:bg-gold-deep hover:border-gold-deep hover:-translate-y-0.5`;
const btnGhost =
  `${btnBase} bg-transparent text-ink border-rule-strong hover:border-gold hover:text-gold`;

export default async function Page() {
  const [tNav, tHero, tMarq, tServices, tAbout, tTeam, tGallery, tTest, tBooking, tLocation, tFooter] =
    await Promise.all([
      getTranslations("nav"),
      getTranslations("hero"),
      getTranslations("marquee"),
      getTranslations("services"),
      getTranslations("about"),
      getTranslations("team"),
      getTranslations("gallery"),
      getTranslations("testimonials"),
      getTranslations("booking"),
      getTranslations("location"),
      getTranslations("footer"),
    ]);

  const settings = await getSiteSettings();

  const services = tServices.raw("items") as ServiceMsg[];
  const teamFallback = tTeam.raw("items") as TeamMsg[];
  const galleryFallback = tGallery.raw("items") as GalleryMsg[];
  const testimonials = tTest.raw("items") as TestimonialMsg[];
  const hours = tLocation.raw("hours") as HourMsg[];
  const marqueeItems = tMarq.raw("items") as string[];

  const team =
    settings?.team && settings.team.length > 0
      ? settings.team.map((t) => ({
          name: t.name,
          role: t.role || "",
          bio: t.bio || "",
          image: t.image,
        }))
      : teamFallback.map((t) => ({ ...t, image: undefined as SanityImage | undefined }));

  const gallery =
    settings?.gallery && settings.gallery.length > 0
      ? settings.gallery.map((g) => ({
          label: g.label || "",
          size: (g.size || "normal") as "normal" | "tall" | "wide",
          image: g.image,
        }))
      : galleryFallback.map((g) => ({ ...g, image: undefined as SanityImage | undefined }));

  return (
    <>
      <Nav />

      {/* HERO */}
      <section
        className="min-h-screen pt-40 pb-24 flex items-center relative overflow-hidden"
        data-screen-label="01 Hero"
      >
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <Container className="relative z-[1]">
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-20 items-center max-[980px]:grid-cols-1 max-[980px]:gap-10">
            <div>
              <div className="font-mono text-[11px] tracking-[0.4em] text-gold mb-8">
                {tHero("est")}
              </div>
              <h1 className="font-serif font-normal text-[clamp(64px,8vw,124px)] leading-[0.95] tracking-[-0.02em] mb-8">
                {tHero("titleLine1")}
                <br />
                {tHero("titleLine2Pre")}{" "}
                <em className="italic text-gold">{tHero("titleEm")}</em>.
                <span className="block text-[0.4em] tracking-[0.02em] text-ink-dim italic mt-2">
                  {tHero("titleSmall")}
                </span>
              </h1>
              <p className="text-ink-dim text-[18px] max-w-[460px] leading-[1.7] mb-10">
                {tHero("lede")}
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <a href="#booking" className={btnPrimary}>
                  {tHero("ctaPrimary")}
                  <MdArrowForward
                    aria-hidden
                    className="text-[1.1em] transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
                <a href="#services" className={btnGhost}>
                  {tHero("ctaGhost")}
                </a>
              </div>
              <div className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-rule">
                {[
                  ["yearsValue", "yearsLabel"],
                  ["clientsValue", "clientsLabel"],
                  ["ratingValue", "ratingLabel"],
                ].map(([v, l]) => (
                  <div key={v}>
                    <div className="font-serif italic text-gold text-[38px] leading-none">
                      {tHero(`meta.${v}`)}
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-dim mt-1.5">
                      {tHero(`meta.${l}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[3/4] border border-rule-strong bg-bg-2 overflow-hidden">
              <Frame />
              <CmsImage
                image={settings?.heroImage}
                label={tHero("photoLabel")}
                dim={tHero("photoDim")}
                alt={tHero("photoAlt")}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-rule py-[22px] overflow-hidden bg-bg-2">
        <div className="flex gap-16 whitespace-nowrap animate-marquee font-serif italic text-[22px] text-ink-dim">
          {Array.from({ length: 3 })
            .flatMap(() => marqueeItems)
            .map((label, i) => (
              <span key={i}>
                <span className="text-gold">✦ </span>
                {label}
              </span>
            ))}
        </div>
      </div>

      <VideoReveal
        videoSrc={settings?.heroVideo?.asset?.url}
        videoMimeType={settings?.heroVideo?.asset?.mimeType}
      />

      {/* SERVICES */}
      <section className={`${sectionPad} bg-bg`} id="services" data-screen-label="03 Services">
        <Container>
          <div className="text-center mb-20">
            <Eyebrow>{tServices("eyebrow")}</Eyebrow>
            <Ornament />
            <SectionTitle line1={tServices("titleLine1")} em={tServices("titleEm")} />
            <p className="text-ink-dim text-[17px] max-w-[580px] mx-auto leading-[1.65]">
              {tServices("p")}
            </p>
          </div>
          <div className="grid grid-cols-2 max-[980px]:grid-cols-1 border-t border-l border-rule">
            {services.map((s) => (
              <article
                key={s.n}
                className={`group relative px-9 py-10 border-r border-b border-rule transition-colors duration-200 hover:bg-bg-2 ${
                  s.featured ? "bg-featured-tint" : ""
                }`}
              >
                {s.featured && (
                  <div className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.22em] uppercase text-gold">
                    ★ {tServices("featuredBadge")}
                  </div>
                )}
                <div className="flex justify-between items-start gap-6 mb-[18px]">
                  <div className="font-mono text-[11px] tracking-[0.18em] text-ink-mute pt-2 transition-colors group-hover:text-gold">
                    {tServices("numPrefix")} {s.n}
                  </div>
                  <h3 className="font-serif text-[30px] leading-tight flex-1">
                    {s.title}
                  </h3>
                </div>
                <div className="flex items-baseline gap-5 mb-[18px] pb-[18px] border-b border-dashed border-rule">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-dim">
                    {s.duration}
                  </span>
                  <span className="ml-auto font-serif italic text-[26px] text-gold">
                    {s.price}
                    <span className="font-mono not-italic text-[11px] tracking-[0.2em] ml-1 text-gold-deep">
                      {tServices("lei")}
                    </span>
                  </span>
                </div>
                <p className="text-ink-dim text-[14.5px] leading-[1.65]">{s.desc}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ABOUT */}
      <section className={`${sectionPad} bg-bg-2`} id="about" data-screen-label="04 About">
        <Container>
          <div className="grid grid-cols-[1fr_1.2fr] gap-[100px] items-center max-[980px]:grid-cols-1 max-[980px]:gap-10">
            <div className="aspect-[4/5] relative border border-rule-strong bg-bg-3 overflow-hidden">
              <Frame />
              <CmsImage
                image={settings?.aboutImage}
                label={tAbout("photoLabel")}
                dim={tAbout("photoDim")}
                alt={tAbout("photoAlt")}
              />
            </div>
            <div>
              <Eyebrow side="left">{tAbout("eyebrow")}</Eyebrow>
              <h2 className="font-serif font-normal text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-[-0.01em] mb-7 mt-[18px]">
                {tAbout("titleLine1")}
                <br />
                <em className="italic text-gold">{tAbout("titleEm")}</em>
              </h2>
              <p className="text-ink-dim text-[16.5px] leading-[1.8] mb-5">{tAbout("p1")}</p>
              <div className="font-serif italic text-[22px] text-ink border-l-2 border-gold pl-6 my-8 leading-[1.5]">
                {tAbout("pull")}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TEAM */}
      <section className={`${sectionPad} bg-bg`} id="team" data-screen-label="05 Team">
        <Container>
          <div className="text-center mb-20">
            <Eyebrow>{tTeam("eyebrow")}</Eyebrow>
            <Ornament />
            <SectionTitle line1={tTeam("titleLine1")} em={tTeam("titleEm")} />
          </div>
          <div
            className={`grid gap-9 max-[980px]:grid-cols-1 ${
              team.length === 1
                ? "grid-cols-1 max-w-md mx-auto"
                : team.length === 2
                  ? "grid-cols-2 max-w-3xl mx-auto"
                  : "grid-cols-3"
            }`}
          >
            {team.map((b) => (
              <div key={b.name} className="group flex flex-col">
                <div className="aspect-[4/5] relative bg-bg-2 border border-rule overflow-hidden mb-6 transition-colors duration-300 group-hover:border-gold">
                  <Frame />
                  <CmsImage
                    image={b.image}
                    label={tTeam("photoLabel")}
                    dim={tTeam("photoDim")}
                    alt={b.name}
                  />
                </div>
                <h3 className="font-serif text-[28px] tracking-[-0.005em]">{b.name}</h3>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold mt-1.5 mb-3.5">
                  {b.role}
                </div>
                <p className="text-ink-dim text-[14.5px] leading-[1.65]">{b.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* GALLERY */}
      <section className={`${sectionPad} bg-bg-2`} id="gallery" data-screen-label="06 Gallery">
        <Container>
          <div className="text-center mb-20">
            <Eyebrow>{tGallery("eyebrow")}</Eyebrow>
            <Ornament />
            <SectionTitle line1={tGallery("titleLine1")} em={tGallery("titleEm")} />
          </div>
          <Gallery items={gallery} />
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section className={`${sectionPad} bg-bg`} data-screen-label="07 Testimonials">
        <Container>
          <div className="text-center mb-20">
            <Eyebrow>{tTest("eyebrow")}</Eyebrow>
            <Ornament />
            <SectionTitle line1={tTest("titleLine1")} em={tTest("titleEm")} />
          </div>
          <div className="grid grid-cols-3 gap-8 max-[980px]:grid-cols-1">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="relative px-8 py-9 border border-rule bg-bg-2"
              >
                <span
                  aria-hidden
                  className="absolute top-2 left-[22px] font-serif text-[90px] text-gold leading-none opacity-40"
                >
                  &ldquo;
                </span>
                <p className="relative font-serif italic text-[18px] leading-[1.6] text-ink mt-6 mb-7">
                  {t.text}
                </p>
                <div className="flex items-center gap-3.5 pt-[18px] border-t border-rule">
                  <span className="w-10 h-10 rounded-full bg-bg-3 border border-gold inline-flex items-center justify-center font-serif italic text-gold text-[16px]">
                    {t.initial}
                  </span>
                  <div className="text-[14px]">
                    <div className="text-ink">{t.name}</div>
                    <div className="text-gold text-[11px] tracking-[2px] mt-0.5">★ ★ ★ ★ ★</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* BOOKING CTA */}
      <section
        className={`${sectionPad} text-center bg-bg-2 border-y border-rule`}
        id="booking"
        data-screen-label="08 Booking"
      >
        <span aria-hidden className="absolute left-0 right-0 top-2 h-px bg-gold/40" />
        <span aria-hidden className="absolute left-0 right-0 bottom-2 h-px bg-gold/40" />
        <Container>
          <Eyebrow>{tBooking("eyebrow")}</Eyebrow>
          <h2 className="font-serif font-normal text-[clamp(48px,6.5vw,88px)] leading-[1.05] tracking-[-0.01em] my-6">
            {tBooking("titleLine1")}{" "}
            <em className="italic text-gold">{tBooking("titleEm")}</em>
          </h2>
          <p className="text-ink-dim text-[18px] max-w-[520px] mx-auto mb-10">
            {tBooking("p")}
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <a href="tel:+40700000000" className={btnPrimary}>
              {tBooking("ctaPrimary")}
              <MdArrowForward
                aria-hidden
                className="text-[1.1em] transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
            <a
              href="https://mero.ro/p/the-mens-place"
              target="_blank"
              rel="noopener noreferrer"
              className={btnGhost}
            >
              {tBooking("ctaGhost")}
            </a>
          </div>
        </Container>
      </section>

      {/* LOCATION */}
      <section className={`${sectionPad} bg-bg`} id="location" data-screen-label="09 Location">
        <Container>
          <div className="text-center mb-[60px]">
            <Eyebrow>{tLocation("eyebrow")}</Eyebrow>
            <Ornament />
            <SectionTitle line1={tLocation("titleLine1")} em={tLocation("titleEm")} />
          </div>
          <div className="grid grid-cols-[1.2fr_0.8fr] gap-20 max-[980px]:grid-cols-1 max-[980px]:gap-10">
            <div>
              <h3 className="font-mono text-[18px] font-medium tracking-[0.22em] uppercase text-gold mb-5">
                {tLocation("scheduleHeading")}
              </h3>
              <ul className="list-none m-0 p-0 mb-10">
                {hours.map((h, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-baseline py-3.5 border-b border-rule last:border-0 text-[15.5px]"
                  >
                    <span className="font-serif text-[19px]">{h.day}</span>
                    <span
                      className={`font-mono text-[12px] tracking-[0.15em] ${
                        h.closed ? "text-ink-mute" : "text-ink-dim"
                      }`}
                    >
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
              <h3 className="font-mono text-[18px] font-medium tracking-[0.22em] uppercase text-gold mb-5">
                {tLocation("addressHeading")}
              </h3>
              <div className="font-serif italic text-[19px] text-ink leading-[1.5]">
                {tLocation("addressLine1")}
                <br />
                {tLocation("addressLine2")}
                <span className="block font-mono not-italic text-[11px] tracking-[0.22em] uppercase text-gold mt-3">
                  {tLocation("addressCity")}
                </span>
              </div>
            </div>
            <div className="aspect-[3/4] relative border border-rule-strong bg-bg-3 overflow-hidden">
              <Frame />
              <CmsImage
                image={settings?.locationImage}
                label={tLocation("mapLabel")}
                dim={tLocation("mapDim")}
                alt={tLocation("mapAlt")}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer
        className="bg-bg-2 border-t border-gold pt-20 pb-10"
        data-screen-label="10 Footer"
      >
        <Container>
          <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-14 mb-14 max-[980px]:grid-cols-2 max-[980px]:gap-8">
            <div>
              <Brand size="lg" />
              <p className="text-ink-dim text-[14px] leading-[1.7] mt-[18px] max-w-[320px]">
                {tFooter("tagline")}
              </p>
            </div>
            <div>
              <h4 className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gold mb-5">
                {tFooter("navHeading")}
              </h4>
              <ul className="list-none m-0 p-0 space-y-3">
                {[
                  ["#services", tNav("services")],
                  ["#about", tNav("about")],
                  ["#team", tNav("team")],
                  ["#gallery", tNav("gallery")],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-ink-dim text-[14px] no-underline hover:text-gold transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gold mb-5">
                {tFooter("contactHeading")}
              </h4>
              <ul className="list-none m-0 p-0 space-y-3">
                <li>
                  <a
                    href="tel:+40700000000"
                    className="text-ink-dim text-[14px] no-underline hover:text-gold transition-colors"
                  >
                    {tFooter("phone")}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${tFooter("email")}`}
                    className="text-ink-dim text-[14px] no-underline hover:text-gold transition-colors"
                  >
                    {tFooter("email")}
                  </a>
                </li>
                <li>
                  <a
                    href="#location"
                    className="text-ink-dim text-[14px] no-underline hover:text-gold transition-colors"
                  >
                    {tFooter("addressShort")}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[11px] font-medium tracking-[0.22em] uppercase text-gold mb-5">
                {tFooter("followHeading")}
              </h4>
              <ul className="list-none m-0 p-0 space-y-3">
                {(["instagram", "facebook", "tiktok"] as const).map((s) => (
                  <li key={s}>
                    <a
                      href="#"
                      className="text-ink-dim text-[14px] no-underline hover:text-gold transition-colors"
                    >
                      {tFooter(`social.${s}`)}
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

      <Reveal />
    </>
  );
}
