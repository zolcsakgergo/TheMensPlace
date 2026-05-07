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
      <div className="bg-bg-2 border-rule group-hover:border-gold relative mb-6 aspect-[4/5] overflow-hidden border transition-colors duration-300">
        <Frame />
        <CmsImage
          image={barber.image}
          label={t("photoLabel")}
          dim={t("photoDim")}
          alt={barber.name}
        />
      </div>
      <h3 className="font-serif text-[28px] tracking-[-0.005em]">{barber.name}</h3>
      <div className="text-gold mt-1.5 mb-3.5 font-mono text-[10px] tracking-[0.22em] uppercase">
        {barber.role}
      </div>
      <p className="text-ink-dim text-[14.5px] leading-[1.65]">{barber.bio}</p>
    </div>
  );
}
