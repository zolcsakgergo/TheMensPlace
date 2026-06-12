"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MdArrowBack, MdArrowForward, MdClose } from "react-icons/md";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CmsImage from "./CmsImage";
import { Frame } from "./Primitives";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/queries";
import { cn } from "@/lib/utils";

type Item = {
  label: string;
  size: "normal" | "tall" | "wide";
  image?: SanityImage;
};

const PER_PAGE = 6;
// Editorial slot rhythm so each page reads consistently:
// tall · normal · wide · normal · normal · normal
const SLOT_SIZES: Item["size"][] = ["tall", "normal", "wide", "normal", "normal", "normal"];

const sizeCls = (size: Item["size"]) =>
  size === "tall" ? "row-span-2" : size === "wide" ? "col-span-2" : "";

const resolveSize = (item: Item, slotIndex: number): Item["size"] =>
  item.size === "normal" ? (SLOT_SIZES[slotIndex] ?? "normal") : item.size;

export default function Gallery({ items }: { items: Item[] }) {
  const t = useTranslations("gallery");
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const start = page * PER_PAGE;
  const pageItems = items.slice(start, start + PER_PAGE);

  const closeModal = useCallback(() => setActiveIndex(null), []);
  const navigate = useCallback(
    (delta: 1 | -1) =>
      setActiveIndex((i) => (i === null ? null : (i + delta + items.length) % items.length)),
    [items.length],
  );

  // Keyboard arrows for prev/next while the modal is open. (Esc + focus
  // trap + scroll lock all come from Radix Dialog.)
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(-1);
      else if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, navigate]);

  // Swipe left/right between images on touch devices.
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    if (items.length > 1 && Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      navigate(dx < 0 ? 1 : -1);
    }
  };

  const active = activeIndex !== null ? items[activeIndex] : null;

  return (
    <>
      <div
        className="grid grid-cols-4 gap-3 max-[980px]:grid-cols-2"
        style={{ gridAutoRows: "220px", gridTemplateRows: "220px 220px" }}
      >
        {pageItems.map((it, i) => {
          const globalIndex = start + i;
          const size = resolveSize(it, i);
          return (
            <button
              key={globalIndex}
              type="button"
              onClick={() => setActiveIndex(globalIndex)}
              aria-label={it.label || `Foto ${globalIndex + 1}`}
              className={cn(
                "bg-bg-3 border-rule group hover:border-gold focus-visible:border-gold relative m-0 cursor-pointer overflow-hidden border p-0 transition-colors duration-200 focus:outline-none",
                sizeCls(size),
              )}
            >
              <CmsImage
                image={it.image}
                label={it.label || `Foto ${globalIndex + 1}`}
                alt={it.label}
              />
              <div className="bg-bg/0 group-hover:bg-bg/25 absolute inset-0 transition-colors duration-300" />
              {it.label && (
                <div className="text-gold pointer-events-none absolute right-3 bottom-3 left-3 font-mono text-[10px] tracking-[0.22em] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  ↗ {it.label}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-8 max-[980px]:gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label={t("prev")}
          >
            <MdArrowBack
              aria-hidden
              className="text-[1.1em] transition-transform duration-200 group-enabled:group-hover:-translate-x-1"
            />
            {t("prev")}
          </Button>
          <span className="text-gold font-mono text-[11px] tracking-[0.32em] uppercase tabular-nums">
            {t("pageOf", { current: page + 1, total: totalPages })}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label={t("next")}
          >
            {t("next")}
            <MdArrowForward
              aria-hidden
              className="text-[1.1em] transition-transform duration-200 group-enabled:group-hover:translate-x-1"
            />
          </Button>
        </div>
      )}

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && closeModal()}>
        {active && activeIndex !== null && (
          <DialogContent onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <DialogTitle className="sr-only">
              {active.label || `Foto ${activeIndex + 1}`}
            </DialogTitle>

            {/* Close */}
            <Button
              variant="icon"
              size="icon"
              onClick={closeModal}
              aria-label={t("close")}
              className="fixed top-6 right-6 z-10"
            >
              <MdClose aria-hidden className="text-[20px]" />
            </Button>

            {items.length > 1 && (
              <>
                <Button
                  variant="icon"
                  size="icon"
                  onClick={() => navigate(-1)}
                  aria-label={t("prev")}
                  className="fixed top-1/2 left-6 z-10 -translate-y-1/2 max-[980px]:top-auto max-[980px]:bottom-6 max-[980px]:left-6 max-[980px]:translate-y-0"
                >
                  <MdArrowBack aria-hidden className="text-[20px]" />
                </Button>
                <Button
                  variant="icon"
                  size="icon"
                  onClick={() => navigate(1)}
                  aria-label={t("next")}
                  className="fixed top-1/2 right-6 z-10 -translate-y-1/2 max-[980px]:top-auto max-[980px]:right-6 max-[980px]:bottom-6 max-[980px]:translate-y-0"
                >
                  <MdArrowForward aria-hidden className="text-[20px]" />
                </Button>
              </>
            )}

            <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
              {active.image?.asset?._ref ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={urlFor(active.image).width(2200).url()}
                  alt={active.label || ""}
                  className="block max-h-[82vh] max-w-[90vw] object-contain"
                />
              ) : (
                <div className="bg-stripes flex h-[70vh] max-h-[800px] w-[60vw] max-w-[800px] items-center justify-center">
                  <div className="text-ink-dim border-ink-mute bg-bg border border-dashed px-4 py-2 font-mono text-[11px] tracking-[0.22em] uppercase">
                    {active.label || `Foto ${activeIndex + 1}`}
                  </div>
                </div>
              )}
              <Frame size={40} offset={-12} />
            </div>

            <div className="pointer-events-none fixed right-0 bottom-8 left-0 flex flex-col items-center gap-2 px-6 max-[980px]:hidden">
              {active.label && (
                <div className="text-ink font-serif text-[18px] italic">{active.label}</div>
              )}
              <div className="text-gold font-mono text-[10px] tracking-[0.32em] uppercase">
                {t("pageOf", { current: activeIndex + 1, total: items.length })}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
