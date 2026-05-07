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
  <div className={cn("max-w-[1280px] mx-auto px-12 max-[980px]:px-6", className)}>
    {children}
  </div>
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

/* ─────────────────────────────────────────────────────────────────────
   Frame — four gold L-corners, sized + insetted.
   ───────────────────────────────────────────────────────────────────── */
export const Frame = ({
  size = 32,
  offset = 14,
}: {
  size?: number;
  offset?: number;
}) => {
  const base = "absolute border-gold pointer-events-none";
  const sz = { width: size, height: size };
  return (
    <>
      <span className={cn(base, "border-l border-t")} style={{ top: offset, left: offset, ...sz }} />
      <span className={cn(base, "border-r border-t")} style={{ top: offset, right: offset, ...sz }} />
      <span className={cn(base, "border-l border-b")} style={{ bottom: offset, left: offset, ...sz }} />
      <span className={cn(base, "border-r border-b")} style={{ bottom: offset, right: offset, ...sz }} />
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
  <div className="flex items-center justify-center gap-[18px] text-gold my-7">
    <span className="w-20 h-px bg-ornament-line" />
    <span className="w-1.5 h-1.5 bg-gold rotate-45" />
    <span className="inline-flex items-center justify-center w-3.5 h-3.5 text-[14px] text-gold leading-none">
      ✦
    </span>
    <span className="w-1.5 h-1.5 bg-gold rotate-45" />
    <span className="w-20 h-px bg-ornament-line" />
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
      "font-mono text-[11px] tracking-[0.32em] uppercase text-gold inline-flex items-center gap-3.5",
      className,
    )}
  >
    {side !== "right" && <span className="inline-block w-7 h-px bg-gold/70" />}
    <span>{children}</span>
    {side !== "left" && <span className="inline-block w-7 h-px bg-gold/70" />}
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
      "font-serif font-normal leading-[1.05] tracking-[-0.01em] mt-[18px] mb-[14px]",
      size === "lg"
        ? "text-[clamp(48px,6.5vw,88px)]"
        : "text-[clamp(40px,5vw,72px)]",
      className,
    )}
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
  <div className={cn("text-center mb-20", className)}>
    <Eyebrow>{eyebrow}</Eyebrow>
    {ornament && <Ornament />}
    <SectionTitle line1={titleLine1} em={titleEm} line2Pre={titleLine2Pre} />
    {description && (
      <p className="text-ink-dim text-[17px] max-w-[580px] mx-auto leading-[1.65]">
        {description}
      </p>
    )}
  </div>
);
