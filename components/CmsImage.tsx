import { Stripe } from "./Primitives";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/queries";

type Props = {
  image?: SanityImage | null;
  alt?: string;
  label: string;
  dim?: string;
  width?: number;
  sizes?: string;
  /** Above-the-fold image (LCP): load eagerly with high priority. */
  priority?: boolean;
};

const WIDTHS = [400, 600, 800, 1200, 1600];

export default function CmsImage({
  image,
  alt,
  label,
  dim,
  width = 1200,
  sizes = "100vw",
  priority = false,
}: Props) {
  if (!image?.asset?._ref) return <Stripe label={label} dim={dim} />;
  // auto("format") lets the Sanity CDN serve AVIF/WebP to browsers that accept it.
  const src = (w: number) => urlFor(image).width(w).auto("format").url();
  const srcSet = WIDTHS.filter((w) => w <= width)
    .map((w) => `${src(w)} ${w}w`)
    .join(", ");
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      className="absolute inset-0 block h-full w-full object-cover"
      src={src(width)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt || label}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
