import { useTranslations } from "next-intl";
import CmsImage from "@/components/CmsImage";
import { Frame } from "@/components/Primitives";
import type { SanityImage } from "@/sanity/lib/queries";

export type Barber = {
  name: string;
  role: string;
  bio: string;
  image?: SanityImage;
};

export default function BarberCard({ barber }: { barber: Barber }) {
  const t = useTranslations("team");
  return (
    <div className="group flex flex-col">
      <div className="aspect-[4/5] relative bg-bg-2 border border-rule overflow-hidden mb-6 transition-colors duration-300 group-hover:border-gold">
        <Frame />
        <CmsImage
          image={barber.image}
          label={t("photoLabel")}
          dim={t("photoDim")}
          alt={barber.name}
        />
      </div>
      <h3 className="font-serif text-[28px] tracking-[-0.005em]">{barber.name}</h3>
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-gold mt-1.5 mb-3.5">
        {barber.role}
      </div>
      <p className="text-ink-dim text-[14.5px] leading-[1.65]">{barber.bio}</p>
    </div>
  );
}
