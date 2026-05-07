"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Frame } from "./Primitives";

type Props = {
  videoSrc?: string | null;
  videoMimeType?: string | null;
};

export default function VideoReveal({ videoSrc, videoMimeType }: Props) {
  const t = useTranslations("video");
  const videoRef = useRef<HTMLVideoElement>(null);

  const src = videoSrc;
  const type =
    videoMimeType || (src?.endsWith(".webm") ? "video/webm" : src ? "video/mp4" : undefined);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [src]);

  return (
    <section className="bg-bg relative h-screen" data-screen-label="02 Video Reveal">
      <div className="relative h-screen overflow-hidden">
        {/* Frame corners — the visible inset frame */}
        <Frame size={48} offset={32} />

        {/* Inner clipped region matching the corner inset (32px) */}
        <div className="absolute inset-8 overflow-hidden">
          <div className="bg-video-fallback absolute inset-0 flex items-center justify-center">
            <div className="text-ink-dim/70 font-mono text-[10px] tracking-[0.22em] uppercase">
              {t("fallbackLabel")} · {t("fallbackDim")}
            </div>
          </div>
          {src && (
            <video
              key={src}
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLVideoElement).style.display = "none";
              }}
            >
              <source src={src} type={type} />
            </video>
          )}
          <div className="bg-video-overlay pointer-events-none absolute inset-0" />
        </div>

        {/* Text content — outside the clip so it renders above the frame */}
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-12 text-center">
          <div className="text-gold mb-8 inline-flex items-center gap-3.5 font-mono text-[13px] tracking-[0.32em] uppercase [text-shadow:0_1px_3px_rgb(0_0_0/0.65)]">
            <span className="bg-gold/80 inline-block h-px w-9" />
            <span>{t("eyebrow")}</span>
            <span className="bg-gold/80 inline-block h-px w-9" />
          </div>
          <h2 className="mb-7 max-w-[900px] font-serif text-[clamp(48px,7vw,96px)] leading-none font-normal tracking-[-0.01em]">
            {t("titleLine1")}
            <br />
            {t("titleLine2Pre")} <em className="text-gold italic">{t("titleEm")}</em>.
          </h2>
          <p className="text-ink max-w-[560px] font-serif text-[19px] leading-[1.7] italic [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.65)]">
            {t("p")}
          </p>
          <div className="text-gold mt-14 font-serif text-[28px] italic [text-shadow:0_1px_3px_rgb(0_0_0/0.65)]">
            {t("signature")}
          </div>
        </div>
      </div>
    </section>
  );
}
