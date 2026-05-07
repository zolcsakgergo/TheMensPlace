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
    <section
      className="relative h-screen bg-bg"
      data-screen-label="02 Video Reveal"
    >
      <div className="relative h-screen overflow-hidden">
        {/* Frame corners — the visible inset frame */}
        <Frame size={48} offset={32} />

        {/* Inner clipped region matching the corner inset (32px) */}
        <div className="absolute inset-8 overflow-hidden">
          <div className="absolute inset-0 bg-video-fallback flex items-center justify-center">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-dim/70">
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
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLVideoElement).style.display = "none";
              }}
            >
              <source src={src} type={type} />
            </video>
          )}
          <div className="absolute inset-0 bg-video-overlay pointer-events-none" />
        </div>

        {/* Text content — outside the clip so it renders above the frame */}
        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-12">
          <div className="font-mono text-[13px] tracking-[0.32em] uppercase text-gold inline-flex items-center gap-3.5 mb-8 [text-shadow:0_1px_3px_rgb(0_0_0/0.65)]">
            <span className="inline-block w-9 h-px bg-gold/80" />
            <span>{t("eyebrow")}</span>
            <span className="inline-block w-9 h-px bg-gold/80" />
          </div>
          <h2 className="font-serif font-normal leading-none tracking-[-0.01em] text-[clamp(48px,7vw,96px)] max-w-[900px] mb-7">
            {t("titleLine1")}
            <br />
            {t("titleLine2Pre")}{" "}
            <em className="italic text-gold">{t("titleEm")}</em>.
          </h2>
          <p className="font-serif italic text-[19px] text-ink max-w-[560px] leading-[1.7] [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.65)]">
            {t("p")}
          </p>
          <div className="mt-14 font-serif italic text-gold text-[28px] [text-shadow:0_1px_3px_rgb(0_0_0/0.65)]">
            {t("signature")}
          </div>
        </div>
      </div>
    </section>
  );
}
