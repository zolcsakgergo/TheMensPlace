import { Stripe } from "./Primitives";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/queries";

type Props = {
  image?: SanityImage | null;
  alt?: string;
  label: string;
  dim?: string;
  width?: number;
};

export default function CmsImage({ image, alt, label, dim, width = 1200 }: Props) {
  if (!image?.asset?._ref) return <Stripe label={label} dim={dim} />;
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      className="absolute inset-0 w-full h-full object-cover block"
      src={urlFor(image).width(width).url()}
      alt={alt || label}
    />
  );
}
