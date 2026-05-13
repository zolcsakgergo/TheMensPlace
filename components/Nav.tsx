"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { MdClose, MdMenu } from "react-icons/md";
import { Brand } from "./Primitives";
import LocaleSwitcher from "./LocaleSwitcher";

const linkCls =
  "font-mono text-[11px] tracking-[0.22em] uppercase text-ink-dim hover:text-gold transition-colors no-underline";

export default function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = [
    { href: "#services", label: t("services") },
    { href: "#about", label: t("about") },
    { href: "#team", label: t("team") },
    { href: "#gallery", label: t("gallery") },
    { href: "#location", label: t("location") },
  ];

  return (
    <>
      <nav
        className={`border-rule fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b backdrop-blur-md transition-all duration-300 max-[980px]:px-6 max-[980px]:py-4 ${
          scrolled ? "bg-bg/90 px-12 py-[14px]" : "bg-bg/60 px-12 py-[22px]"
        }`}
      >
        <Brand />
        <ul className="m-0 flex list-none gap-9 p-0 max-[980px]:hidden">
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} className={linkCls}>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 max-[980px]:hidden">
          <LocaleSwitcher />
          <a
            href="#booking"
            className="text-bg bg-gold border-gold hover:text-gold border px-5 py-2.5 font-mono text-[11px] tracking-[0.22em] uppercase no-underline transition-all hover:bg-transparent"
          >
            {t("cta")}
          </a>
        </div>
        <button
          type="button"
          aria-label={open ? t("menuClose") : t("menuOpen")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="border-rule-strong text-ink hover:border-gold hover:text-gold inline-flex h-11 w-11 items-center justify-center border min-[980px]:hidden"
        >
          {open ? (
            <MdClose aria-hidden className="text-[22px]" />
          ) : (
            <MdMenu aria-hidden className="text-[22px]" />
          )}
        </button>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`bg-bg/95 fixed inset-0 z-[90] flex flex-col items-center justify-center gap-8 backdrop-blur-md transition-opacity duration-200 min-[980px]:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="m-0 flex list-none flex-col items-center gap-7 p-0">
          {items.map((it) => (
            <li key={it.href}>
              <a
                href={it.href}
                onClick={() => setOpen(false)}
                className="text-ink hover:text-gold font-mono text-[13px] tracking-[0.28em] uppercase no-underline transition-colors"
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#booking"
          onClick={() => setOpen(false)}
          className="text-bg bg-gold border-gold border px-6 py-3 font-mono text-[12px] tracking-[0.22em] uppercase no-underline"
        >
          {t("cta")}
        </a>
        <LocaleSwitcher />

      </div>
    </>
  );
}
