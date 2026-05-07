import type { Metadata, Viewport } from "next";
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import Studio from "./Studio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "The Men's Place — Studio",
};

export const viewport: Viewport = {
  ...(studioViewport as Viewport),
};

export default function StudioPage() {
  return <Studio />;
}
