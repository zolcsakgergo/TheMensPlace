import { client } from "./client";

export type SanityImage = { asset?: { _ref: string }; _type?: string };

export type SanityFile = { asset?: { url?: string; mimeType?: string } };

export type SiteSettings = {
  heroImage?: SanityImage;
  aboutImage?: SanityImage;
  locationImage?: SanityImage;
  heroVideo?: SanityFile;
  team?: { name: string; role?: string; bio?: string; image?: SanityImage }[];
  gallery?: { image: SanityImage; label?: string; size?: "normal" | "tall" | "wide" }[];
  hours?: { day: string; time: string; closed?: boolean }[];
};

const siteSettingsQuery = /* groq */ `*[_type == "siteSettings"][0]{
  heroImage,
  aboutImage,
  locationImage,
  heroVideo{asset->{url, mimeType}},
  team[]{name, role, bio, image},
  gallery[]{label, size, image},
  hours[]{day, time, closed}
}`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!client) return null;
  try {
    return await client.fetch<SiteSettings>(siteSettingsQuery, {}, {
      next: { revalidate: 60 },
    });
  } catch {
    return null;
  }
}
