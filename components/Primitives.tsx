"use client";
import { useTranslations } from "next-intl";

export const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`max-w-[1280px] mx-auto px-12 max-[980px]:px-6 ${className}`}>
    {children}
  </div>
);

export const Stripe = ({ label, dim }: { label: string; dim?: string }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink-mute bg-stripes">
    <div className="font-mono text-[10px] tracking-[0.22em] uppercase bg-bg px-3.5 py-2 border border-dashed border-ink-mute text-ink-dim">
      {label}
    </div>
    {dim && (
      <div className="font-mono text-[9px] text-ink-mute tracking-[0.15em]">
        {dim}
      </div>
    )}
  </div>
);

export const Frame = ({ size = 32, offset = 14 }: { size?: number; offset?: number }) => {
  const base = "absolute border-gold pointer-events-none";
  const sz = { width: size, height: size };
  return (
    <>
      <span className={`${base} border-l border-t`} style={{ top: offset, left: offset, ...sz }} />
      <span className={`${base} border-r border-t`} style={{ top: offset, right: offset, ...sz }} />
      <span className={`${base} border-l border-b`} style={{ bottom: offset, left: offset, ...sz }} />
      <span className={`${base} border-r border-b`} style={{ bottom: offset, right: offset, ...sz }} />
    </>
  );
};

export const Brand = ({ size = "base" }: { size?: "base" | "lg" }) => {
  const t = useTranslations("brand");
  const markSize = size === "lg" ? 36 : 30;
  return (
    <div
      className={`flex items-center gap-2.5 font-serif tracking-[0.05em] ${
        size === "lg" ? "text-2xl" : "text-xl"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt={t("name")}
        width={markSize}
        height={markSize}
        className="object-contain"
        style={{ width: markSize, height: markSize }}
      />
      <span>{t("name")}</span>
    </div>
  );
};

export const Ornament = () => (
  <div className="flex items-center justify-center gap-[18px] text-gold my-7">
    <span className="w-20 h-px bg-ornament-line" />
    <span className="w-1.5 h-1.5 bg-gold rotate-45" />
    <span className="text-[14px] tracking-[8px] text-gold leading-none">✦</span>
    <span className="w-1.5 h-1.5 bg-gold rotate-45" />
    <span className="w-20 h-px bg-ornament-line" />
  </div>
);

export const Eyebrow = ({
  children,
  side = "both",
  className = "",
}: {
  children: React.ReactNode;
  side?: "both" | "left" | "right";
  className?: string;
}) => (
  <div
    className={`font-mono text-[11px] tracking-[0.32em] uppercase text-gold inline-flex items-center gap-3.5 ${className}`}
  >
    {side !== "right" && <span className="inline-block w-7 h-px bg-gold/70" />}
    <span>{children}</span>
    {side !== "left" && <span className="inline-block w-7 h-px bg-gold/70" />}
  </div>
);

export const SectionTitle = ({
  line1,
  em,
  line2Pre,
  className = "",
}: {
  line1: React.ReactNode;
  em: React.ReactNode;
  line2Pre?: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={`font-serif font-normal leading-[1.05] tracking-[-0.01em] text-[clamp(40px,5vw,72px)] mt-[18px] mb-[14px] ${className}`}
  >
    {line2Pre ? (
      <>
        {line1}
        <br />
        {line2Pre} <em className="italic text-gold">{em}</em>
      </>
    ) : (
      <>
        {line1} <em className="italic text-gold">{em}</em>
      </>
    )}
  </h2>
);
