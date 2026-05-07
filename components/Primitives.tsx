"use client";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────
   Container — page-width wrapper with consistent gutters.
   ───────────────────────────────────────────────────────────────────── */
export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("mx-auto max-w-[1280px] px-12 max-[980px]:px-6", className)}>{children}</div>
);

/* ─────────────────────────────────────────────────────────────────────
   Section — consistent vertical rhythm + optional background tier.
   ───────────────────────────────────────────────────────────────────── */
type SectionTone = "bg" | "bg-2";

export const Section = ({
  id,
  tone = "bg",
  className,
  children,
  screenLabel,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: React.ReactNode;
  screenLabel?: string;
}) => (
  <section
    id={id}
    data-screen-label={screenLabel}
    className={cn(
      "relative py-[140px] max-[980px]:py-20",
      tone === "bg" ? "bg-bg" : "bg-bg-2",
      className,
    )}
  >
    {children}
  </section>
);

/* ─────────────────────────────────────────────────────────────────────
   Stripe — striped placeholder for missing imagery.
   ───────────────────────────────────────────────────────────────────── */
export const Stripe = ({ label, dim }: { label: string; dim?: string }) => (
  <div className="text-ink-mute bg-stripes absolute inset-0 flex flex-col items-center justify-center gap-2">
    <div className="bg-bg border-ink-mute text-ink-dim border border-dashed px-3.5 py-2 font-mono text-[10px] tracking-[0.22em] uppercase">
      {label}
    </div>
    {dim && <div className="text-ink-mute font-mono text-[9px] tracking-[0.15em]">{dim}</div>}
  </div>
);

/* ─────────────────────────────────────────────────────────────────────
   Frame — four gold L-corners, sized + insetted.
   ───────────────────────────────────────────────────────────────────── */
export const Frame = ({ size = 32, offset = 14 }: { size?: number; offset?: number }) => {
  const base = "absolute border-gold pointer-events-none";
  const sz = { width: size, height: size };
  return (
    <>
      <span
        className={cn(base, "border-t border-l")}
        style={{ top: offset, left: offset, ...sz }}
      />
      <span
        className={cn(base, "border-t border-r")}
        style={{ top: offset, right: offset, ...sz }}
      />
      <span
        className={cn(base, "border-b border-l")}
        style={{ bottom: offset, left: offset, ...sz }}
      />
      <span
        className={cn(base, "border-r border-b")}
        style={{ bottom: offset, right: offset, ...sz }}
      />
    </>
  );
};

/* ─────────────────────────────────────────────────────────────────────
   Brand — logo + wordmark.
   ───────────────────────────────────────────────────────────────────── */
export const Brand = ({ size = "base" }: { size?: "base" | "lg" }) => {
  const t = useTranslations("brand");
  const markSize = size === "lg" ? 36 : 30;
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 font-serif tracking-[0.05em]",
        size === "lg" ? "text-2xl" : "text-xl",
      )}
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

/* ─────────────────────────────────────────────────────────────────────
   Ornament — gold gradient line · diamond · ✦ · diamond · gradient line.
   ───────────────────────────────────────────────────────────────────── */
export const Ornament = () => (
  <div className="text-gold my-7 flex items-center justify-center gap-[18px]">
    <span className="bg-ornament-line h-px w-20" />
    <span className="bg-gold h-1.5 w-1.5 rotate-45" />
    <span className="text-gold inline-flex h-3.5 w-3.5 items-center justify-center text-[14px] leading-none">
      ✦
    </span>
    <span className="bg-gold h-1.5 w-1.5 rotate-45" />
    <span className="bg-ornament-line h-px w-20" />
  </div>
);

/* ─────────────────────────────────────────────────────────────────────
   Eyebrow — small monospace caps with hairlines on each side.
   ───────────────────────────────────────────────────────────────────── */
export const Eyebrow = ({
  children,
  side = "both",
  className,
}: {
  children: React.ReactNode;
  side?: "both" | "left" | "right";
  className?: string;
}) => (
  <div
    className={cn(
      "text-gold inline-flex items-center gap-3.5 font-mono text-[11px] tracking-[0.32em] uppercase",
      className,
    )}
  >
    {side !== "right" && <span className="bg-gold/70 inline-block h-px w-7" />}
    <span>{children}</span>
    {side !== "left" && <span className="bg-gold/70 inline-block h-px w-7" />}
  </div>
);

/* ─────────────────────────────────────────────────────────────────────
   SectionTitle — serif headline with italic-gold emphasis.
   ───────────────────────────────────────────────────────────────────── */
export const SectionTitle = ({
  line1,
  em,
  line2Pre,
  className,
  size = "default",
}: {
  line1: React.ReactNode;
  em: React.ReactNode;
  line2Pre?: React.ReactNode;
  className?: string;
  size?: "default" | "lg";
}) => (
  <h2
    className={cn(
      "mt-[18px] mb-[14px] font-serif leading-[1.05] font-normal tracking-[-0.01em]",
      size === "lg" ? "text-[clamp(48px,6.5vw,88px)]" : "text-[clamp(40px,5vw,72px)]",
      className,
    )}
  >
    {line2Pre ? (
      <>
        {line1}
        <br />
        {line2Pre} <em className="text-gold italic">{em}</em>
      </>
    ) : (
      <>
        {line1} <em className="text-gold italic">{em}</em>
      </>
    )}
  </h2>
);

/* ─────────────────────────────────────────────────────────────────────
   SectionHead — eyebrow · ornament · title · optional description.
   The recurring section-header pattern, condensed.
   ───────────────────────────────────────────────────────────────────── */
export const SectionHead = ({
  eyebrow,
  titleLine1,
  titleEm,
  titleLine2Pre,
  description,
  ornament = true,
  className,
}: {
  eyebrow: React.ReactNode;
  titleLine1: React.ReactNode;
  titleEm: React.ReactNode;
  titleLine2Pre?: React.ReactNode;
  description?: React.ReactNode;
  ornament?: boolean;
  className?: string;
}) => (
  <div className={cn("mb-20 text-center", className)}>
    <Eyebrow>{eyebrow}</Eyebrow>
    {ornament && <Ornament />}
    <SectionTitle line1={titleLine1} em={titleEm} line2Pre={titleLine2Pre} />
    {description && (
      <p className="text-ink-dim mx-auto max-w-[580px] text-[17px] leading-[1.65]">{description}</p>
    )}
  </div>
);
