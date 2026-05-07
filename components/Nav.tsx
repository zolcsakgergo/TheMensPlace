"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Brand } from "./Primitives";

const linkCls =
  "font-mono text-[11px] tracking-[0.22em] uppercase text-ink-dim hover:text-gold transition-colors no-underline";

export default function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[100] flex items-center justify-between border-b border-rule backdrop-blur-md transition-all duration-300 max-[980px]:px-6 max-[980px]:py-4 ${
        scrolled ? "px-12 py-[14px] bg-bg/90" : "px-12 py-[22px] bg-bg/60"
      }`}
    >
      <Brand />
      <ul className="flex gap-9 list-none m-0 p-0 max-[980px]:hidden">
        <li><a href="#services" className={linkCls}>{t("services")}</a></li>
        <li><a href="#about" className={linkCls}>{t("about")}</a></li>
        <li><a href="#team" className={linkCls}>{t("team")}</a></li>
        <li><a href="#gallery" className={linkCls}>{t("gallery")}</a></li>
        <li><a href="#location" className={linkCls}>{t("location")}</a></li>
      </ul>
      <a
        href="#booking"
        className="font-mono text-[11px] tracking-[0.22em] uppercase text-bg bg-gold border border-gold px-5 py-2.5 hover:bg-transparent hover:text-gold transition-all no-underline"
      >
        {t("cta")}
      </a>
    </nav>
  );
}
