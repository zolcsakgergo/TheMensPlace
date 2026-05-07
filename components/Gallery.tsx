"use client";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { MdArrowBack, MdArrowForward, MdClose } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
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
const SLOT_SIZES: Item["size"][] = [
  "tall",
  "normal",
  "wide",
  "normal",
  "normal",
  "normal",
];

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
      setActiveIndex((i) =>
        i === null ? null : (i + delta + items.length) % items.length,
      ),
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
                "relative bg-bg-3 border border-rule overflow-hidden p-0 m-0 cursor-pointer group transition-colors duration-200 hover:border-gold focus:outline-none focus-visible:border-gold",
                sizeCls(size),
              )}
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
          <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-gold tabular-nums">
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

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => !open && closeModal()}
      >
        {active && activeIndex !== null && (
          <DialogContent>
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
                  className="fixed left-6 top-1/2 -translate-y-1/2 z-10 max-[980px]:bottom-6 max-[980px]:left-6 max-[980px]:top-auto max-[980px]:translate-y-0"
                >
                  <MdArrowBack aria-hidden className="text-[20px]" />
                </Button>
                <Button
                  variant="icon"
                  size="icon"
                  onClick={() => navigate(1)}
                  aria-label={t("next")}
                  className="fixed right-6 top-1/2 -translate-y-1/2 z-10 max-[980px]:bottom-6 max-[980px]:right-6 max-[980px]:top-auto max-[980px]:translate-y-0"
                >
                  <MdArrowForward aria-hidden className="text-[20px]" />
                </Button>
              </>
            )}

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
                    {active.label || `Foto ${activeIndex + 1}`}
                  </div>
                </div>
              )}
              <Frame size={40} offset={-12} />
            </div>

            <div className="fixed bottom-8 left-0 right-0 flex flex-col items-center gap-2 pointer-events-none px-6 max-[980px]:hidden">
              {active.label && (
                <div className="font-serif italic text-ink text-[18px]">
                  {active.label}
                </div>
              )}
              <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-gold">
                {t("pageOf", { current: activeIndex + 1, total: items.length })}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
