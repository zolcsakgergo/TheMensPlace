import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.name,
    short_name: "Men's Place",
    description: BUSINESS.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0807",
    theme_color: "#d4af64",
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png", purpose: "any" },
    ],
  };
}
