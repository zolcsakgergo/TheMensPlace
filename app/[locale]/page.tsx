import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import VideoReveal from "@/components/VideoReveal";
import Hero from "@/components/sections/Hero";
import MarqueeBar from "@/components/sections/MarqueeBar";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import GallerySection from "@/components/sections/GallerySection";
import Testimonials from "@/components/sections/Testimonials";
import Booking from "@/components/sections/Booking";
import Location from "@/components/sections/Location";
import Footer from "@/components/sections/Footer";
import JsonLd, { type ServiceItem } from "@/components/JsonLd";
import { getSiteSettings, type SanityImage } from "@/sanity/lib/queries";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Barber } from "@/components/cards/BarberCard";
import type { HourEntry } from "@/components/cards/HoursList";

// Aleea Tărnavei 2, A · 440207 Satu Mare, Romania
// Refine via Google Maps right-click → copy lat/lng if needed.
const SHOP_COORDS: [number, number] = [47.78066190377713, 22.870052625965467];

type GalleryItem = {
  label: string;
  size: "normal" | "tall" | "wide";
  image?: SanityImage;
};

type GalleryFallback = { label: string; size: "normal" | "tall" | "wide" };
type TeamFallback = { name: string; role: string; bio: string };

/** Use Sanity content when present, otherwise fall back to translations. */
async function loadContent() {
  const [tTeam, tGallery, tLocation, tServices] = await Promise.all([
    getTranslations("team"),
    getTranslations("gallery"),
    getTranslations("location"),
    getTranslations("services"),
  ]);
  const settings = await getSiteSettings();

  const teamFallback = tTeam.raw("items") as TeamFallback[];
  const galleryFallback = tGallery.raw("items") as GalleryFallback[];
  const hoursFallback = tLocation.raw("hours") as HourEntry[];
  const services = tServices.raw("items") as ServiceItem[];

  const translatedFor = (name: string, i: number) =>
    teamFallback.find((t) => t.name === name) || teamFallback[i];

  const team: Barber[] =
    settings?.team && settings.team.length > 0
      ? settings.team.map((t, i) => {
          const tr = translatedFor(t.name, i);
          return {
            name: t.name,
            role: tr?.role || "",
            bio: tr?.bio || "",
            image: t.image,
          };
        })
      : teamFallback.map((t) => ({ ...t, image: undefined }));

  const gallery: GalleryItem[] =
    settings?.gallery && settings.gallery.length > 0
      ? settings.gallery.map((g) => ({
          label: g.label || "",
          size: (g.size || "normal") as GalleryItem["size"],
          image: g.image,
        }))
      : galleryFallback.map((g) => ({ ...g, image: undefined }));

  const hours: HourEntry[] = hoursFallback;

  return { settings, team, gallery, hours, services };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { settings, team, gallery, hours, services } = await loadContent();

  return (
    <>
      <JsonLd hours={hours} services={services} />
      <Nav />
      <Hero heroImage={settings?.heroImage} />
      <MarqueeBar />
      <VideoReveal
        videoSrc={settings?.heroVideo?.asset?.url}
        videoMimeType={settings?.heroVideo?.asset?.mimeType}
      />
      <Services />
      <About aboutImage={settings?.aboutImage} />
      <Team team={team} />
      <GallerySection items={gallery} />
      <Testimonials />
      <Booking />
      <Location position={SHOP_COORDS} hours={hours} />
      <Footer />
      <Reveal />
    </>
  );
}
