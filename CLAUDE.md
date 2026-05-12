# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server
- `npm run build` — production build
- `npm run start` — run built server
- `npm run lint` — Next.js / ESLint
- `npm run format` / `npm run format:check` — Prettier (with `prettier-plugin-tailwindcss`)

There is no test runner configured.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript strict). Path alias `@/*` → repo root.
- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.*`; config lives in `app/globals.css`).
- **next-intl** for i18n (see below).
- **Sanity v5** as headless CMS, embedded Studio at `/studio`.
- **react-leaflet** for the location map.
- Deployed on Vercel; uses `@vercel/analytics`.

## Architecture

This is a single-page marketing site for "The Men's Place" barbershop in Satu Mare, Romania. The whole public site is rendered by `app/page.tsx`, which composes section components from `components/sections/*` in a fixed order (Hero → MarqueeBar → VideoReveal → Services → About → Team → Gallery → Testimonials → Booking → Location → Footer).

### Content model: Sanity-with-translation-fallback

`app/page.tsx` calls `loadContent()`, which merges two content sources:

1. **Sanity `siteSettings` singleton** (`sanity/schemas/siteSettings.ts`, queried via `sanity/lib/queries.ts::getSiteSettings`) — provides editable images, hero video, team, gallery, hours. Revalidated every 60s. If `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset or the fetch fails, `getSiteSettings` returns `null` silently.
2. **`messages/ro.json`** via `next-intl` — provides all copy and acts as fallback for team/gallery/hours when Sanity is empty or unavailable.

When adding or changing site content, decide which layer owns it: structured editor-managed data (images, team, hours) → Sanity schema; copy/labels → `messages/ro.json`. The page wires both together — keep the fallback shape in sync with the Sanity shape.

### i18n

`i18n/request.ts` is wired into `next.config.mjs` via `createNextIntlPlugin`. Locale is hardcoded to `ro` (single locale today). Server components use `getTranslations("namespace")`; raw structured data is pulled with `t.raw("key")` (see `loadContent`).

### Sanity Studio

Embedded at `app/studio/[[...tool]]` using `next-sanity`. `sanity.config.ts` restricts the `siteSettings` singleton from being duplicated/deleted and hides it from "New document". Schema registration goes through `sanity/schemas/index.ts`.

Sanity env vars (see `.env.local.example`):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (defaults to `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` (defaults to `2024-10-01`)

### SEO / metadata

`lib/site.ts` is the single source of truth for `SITE_URL` and the `BUSINESS` identity (address, phone, geo, socials, price range). It is consumed by `app/layout.tsx` (Metadata + OG), `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, and `components/JsonLd.tsx` (LocalBusiness/Service structured data). Change business facts here, not in individual files.

`NEXT_PUBLIC_SITE_URL` must be set in Vercel for canonical URLs in production.

### Legal pages

`app/confidentialitate` and `app/mentiuni-legale` are static route segments (privacy policy and legal notices, in Romanian).

### Map component

`components/LocationMap.tsx` is the client wrapper around `LocationMapInner.tsx` (react-leaflet). Shop coordinates are hardcoded in `app/page.tsx` (`SHOP_COORDS`) — the `BUSINESS.geo` in `lib/site.ts` is the slightly-less-precise value used for structured data.
