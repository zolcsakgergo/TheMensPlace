import { useTranslations } from "next-intl";

export type Service = {
  n: string;
  title: string;
  duration: string;
  price: string;
  desc: string;
  featured?: boolean;
};

export default function ServiceCard({ service }: { service: Service }) {
  const t = useTranslations("services");
  return (
    <article className="group relative px-9 py-10 border-r border-b border-rule transition-colors duration-200 hover:bg-bg-2">
      <div className="flex justify-between items-start gap-6 mb-[18px]">
        <div className="font-mono text-[11px] tracking-[0.18em] text-ink-mute pt-2 transition-colors group-hover:text-gold">
          {t("numPrefix")} {service.n}
        </div>
        <h3 className="font-serif text-[30px] leading-tight flex-1">{service.title}</h3>
      </div>
      <div className="flex items-baseline gap-5 mb-[18px] pb-[18px] border-b border-dashed border-rule">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-dim">
          {service.duration}
        </span>
        <span className="ml-auto font-serif italic text-[26px] text-gold">
          {service.price}
          <span className="font-mono not-italic text-[11px] tracking-[0.2em] ml-1 text-gold-deep">
            {t("lei")}
          </span>
        </span>
      </div>
      <p className="text-ink-dim text-[14.5px] leading-[1.65]">{service.desc}</p>
    </article>
  );
}
