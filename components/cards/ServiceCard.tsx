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
    <article className="group border-rule hover:bg-bg-2 relative border-r border-b px-9 py-10 transition-colors duration-200">
      <div className="mb-[18px] flex items-start justify-between gap-6">
        <div className="text-ink-mute group-hover:text-gold pt-2 font-mono text-[11px] tracking-[0.18em] transition-colors">
          {t("numPrefix")} {service.n}
        </div>
        <h3 className="flex-1 font-serif text-[30px] leading-tight">{service.title}</h3>
      </div>
      <div className="border-rule mb-[18px] flex items-baseline gap-5 border-b border-dashed pb-[18px]">
        <span className="text-ink-dim font-mono text-[11px] tracking-[0.2em] uppercase">
          {service.duration}
        </span>
        <span className="text-gold ml-auto font-serif text-[26px] italic">
          {service.price}
          <span className="text-gold-deep ml-1 font-mono text-[11px] tracking-[0.2em] not-italic">
            {t("lei")}
          </span>
        </span>
      </div>
      <p className="text-ink-dim text-[14.5px] leading-[1.65]">{service.desc}</p>
    </article>
  );
}
