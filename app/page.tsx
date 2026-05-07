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
import { getSiteSettings, type SanityImage } from "@/sanity/lib/queries";
import { getTranslations } from "next-intl/server";
import type { Barber } from "@/components/cards/BarberCard";

// Aleea Tărnavei 2, A · 440207 Satu Mare, Romania
// Refine via Google Maps right-click → copy lat/lng if needed.
const SHOP_COORDS: [number, number] = [47.7836, 22.8755];

type GalleryItem = {
  label: string;
  size: "normal" | "tall" | "wide";
  image?: SanityImage;
};

type GalleryFallback = { label: string; size: "normal" | "tall" | "wide" };
type TeamFallback = { name: string; role: string; bio: string };

/** Use Sanity content when present, otherwise fall back to translations. */
async function loadContent() {
  const [tTeam, tGallery] = await Promise.all([
    getTranslations("team"),
    getTranslations("gallery"),
  ]);
  const settings = await getSiteSettings();

  const teamFallback = tTeam.raw("items") as TeamFallback[];
  const galleryFallback = tGallery.raw("items") as GalleryFallback[];

  const team: Barber[] =
    settings?.team && settings.team.length > 0
      ? settings.team.map((t) => ({
          name: t.name,
          role: t.role || "",
          bio: t.bio || "",
          image: t.image,
        }))
      : teamFallback.map((t) => ({ ...t, image: undefined }));

  const gallery: GalleryItem[] =
    settings?.gallery && settings.gallery.length > 0
      ? settings.gallery.map((g) => ({
          label: g.label || "",
          size: (g.size || "normal") as GalleryItem["size"],
          image: g.image,
        }))
      : galleryFallback.map((g) => ({ ...g, image: undefined }));

  return { settings, team, gallery };
}

export default async function Page() {
  const { settings, team, gallery } = await loadContent();

  return (
    <>
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
      <Location position={SHOP_COORDS} />
      <Footer />
      <Reveal />
    </>
  );
}
