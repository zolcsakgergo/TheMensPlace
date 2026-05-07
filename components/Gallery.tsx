"use client";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { MdArrowBack, MdArrowForward, MdClose } from "react-icons/md";
import CmsImage from "./CmsImage";
import { Frame } from "./Primitives";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/queries";

type Item = {
  label: string;
  size: "normal" | "tall" | "wide";
  image?: SanityImage;
};

const PER_PAGE = 6;
// Repeating layout slots so each page keeps the editorial rhythm:
// tall · normal · wide · normal · normal · normal
const SLOT_SIZES: Item["size"][] = [
  "tall",
  "normal",
  "wide",
  "normal",
  "normal",
  "normal",
];

const sizeCls = (size?: Item["size"]) =>
  size === "tall" ? "row-span-2" : size === "wide" ? "col-span-2" : "";

export default function Gallery({ items }: { items: Item[] }) {
  const t = useTranslations("gallery");
  const [page, setPage] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const start = page * PER_PAGE;
  const pageItems = items.slice(start, start + PER_PAGE);

  const closeModal = useCallback(() => setModalIndex(null), []);
  const prevImage = useCallback(
    () => setModalIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length],
  );
  const nextImage = useCallback(
    () => setModalIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  );

  // Keyboard nav + body scroll lock while modal is open
  useEffect(() => {
    if (modalIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [modalIndex, closeModal, prevImage, nextImage]);

  const active = modalIndex !== null ? items[modalIndex] : null;

  return (
    <>
      <div
        className="grid grid-cols-4 gap-3 max-[980px]:grid-cols-2"
        style={{ gridAutoRows: "220px", gridTemplateRows: "220px 220px" }}
      >
        {pageItems.map((it, i) => {
          const slot = SLOT_SIZES[i] ?? "normal";
          const size = it.size === "normal" ? slot : (it.size ?? slot);
          const globalIndex = start + i;
          return (
            <button
              key={globalIndex}
              type="button"
              onClick={() => setModalIndex(globalIndex)}
              aria-label={it.label || `Foto ${globalIndex + 1}`}
              className={`relative bg-bg-3 border border-rule overflow-hidden p-0 m-0 cursor-pointer group transition-colors duration-200 hover:border-gold focus:outline-none focus-visible:border-gold ${sizeCls(size)}`}
            >
              <CmsImage
                image={it.image}
                label={it.label || `Foto ${globalIndex + 1}`}
                alt={it.label}
              />
              <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/25 transition-colors duration-300" />
              {it.label && (
                <div className="absolute left-3 bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] tracking-[0.22em] uppercase text-gold pointer-events-none">
                  ↗ {it.label}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-8 mt-12 max-[980px]:gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label={t("prev")}
            className="group inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] uppercase px-5 py-3 border border-rule-strong text-ink transition-all duration-200 hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-rule-strong disabled:hover:text-ink"
          >
            <MdArrowBack
              aria-hidden
              className="text-[1.1em] transition-transform duration-200 group-enabled:group-hover:-translate-x-1"
            />
            {t("prev")}
          </button>

          <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-gold tabular-nums">
            {t("pageOf", { current: page + 1, total: totalPages })}
          </span>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label={t("next")}
            className="group inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.22em] uppercase px-5 py-3 border border-rule-strong text-ink transition-all duration-200 hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-rule-strong disabled:hover:text-ink"
          >
            {t("next")}
            <MdArrowForward
              aria-hidden
              className="text-[1.1em] transition-transform duration-200 group-enabled:group-hover:translate-x-1"
            />
          </button>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {active !== null && modalIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.label || `Foto ${modalIndex + 1}`}
          onClick={closeModal}
          className="fixed inset-0 z-[200] bg-bg/95 backdrop-blur-md flex items-center justify-center p-16 max-[980px]:p-6 animate-[fadeIn_0.2s_ease-out]"
        >
          {/* Close */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            aria-label={t("close")}
            className="fixed top-6 right-6 z-10 w-12 h-12 border border-rule-strong text-ink hover:border-gold hover:text-gold transition-colors flex items-center justify-center bg-bg/60"
          >
            <MdClose aria-hidden className="text-[20px]" />
          </button>

          {/* Prev */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label={t("prev")}
              className="fixed left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-rule-strong text-ink hover:border-gold hover:text-gold transition-colors flex items-center justify-center bg-bg/60 max-[980px]:bottom-6 max-[980px]:left-6 max-[980px]:top-auto max-[980px]:translate-y-0"
            >
              <MdArrowBack aria-hidden className="text-[20px]" />
            </button>
          )}

          {/* Next */}
          {items.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label={t("next")}
              className="fixed right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-rule-strong text-ink hover:border-gold hover:text-gold transition-colors flex items-center justify-center bg-bg/60 max-[980px]:bottom-6 max-[980px]:right-6 max-[980px]:top-auto max-[980px]:translate-y-0"
            >
              <MdArrowForward aria-hidden className="text-[20px]" />
            </button>
          )}

          {/* Image with corner frame */}
          <div
            className="relative inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            {active.image?.asset?._ref ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={urlFor(active.image).width(2200).url()}
                alt={active.label || ""}
                className="block max-w-[90vw] max-h-[82vh] object-contain"
              />
            ) : (
              <div className="w-[60vw] h-[70vh] max-w-[800px] max-h-[800px] bg-stripes flex items-center justify-center">
                <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-dim border border-dashed border-ink-mute bg-bg px-4 py-2">
                  {active.label || `Foto ${modalIndex + 1}`}
                </div>
              </div>
            )}
            <Frame size={40} offset={-12} />
          </div>

          {/* Label + counter */}
          <div className="fixed bottom-8 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none px-6 max-[980px]:hidden">
            {active.label && (
              <div className="font-serif italic text-ink text-[18px]">
                {active.label}
              </div>
            )}
            <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-gold">
              {t("pageOf", { current: modalIndex + 1, total: items.length })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
