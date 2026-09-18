# The Men's Place

Marketing website for **The Men's Place**, a classic barbershop in Satu Mare, Romania. A single-page, content-driven site with online booking (via [Mero](https://mero.ro/p/the-mens-place)), a headless CMS for editable content, full trilingual support, and SEO/structured-data baked in.

## Stack

- **[Next.js 16](https://nextjs.org/)** — App Router, React 19, TypeScript (strict). Path alias `@/*` → repo root.
- **[Tailwind CSS v4](https://tailwindcss.com/)** — via `@tailwindcss/postcss`; there is no `tailwind.config.*`, config lives in `app/globals.css`.
- **[next-intl](https://next-intl.dev/)** — i18n for Romanian, Hungarian, and English.
- **[Sanity v5](https://www.sanity.io/)** — headless CMS with the Studio embedded at `/studio`.
- **[react-leaflet](https://react-leaflet.js.org/)** — the location map.
- **[Radix UI](https://www.radix-ui.com/)** primitives — dialogs / booking modal.
- Deployed on **Vercel**, with `@vercel/analytics`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

The site renders without any environment variables — copy strings come from `messages/*.json` and content falls back gracefully when Sanity is not configured.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run the built server |
| `npm run lint` | Next.js / ESLint |
| `npm run format` | Format with Prettier (`prettier-plugin-tailwindcss`) |
| `npm run format:check` | Check formatting without writing |


### Environment variables

Copy `.env.local.example` → `.env.local`. All are optional for local development.

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project. If unset, the site uses JSON fallbacks. | — |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity API version | `2024-10-01` |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for sitemap, OG tags, and JSON-LD | `https://themensplace.ro` |

## Architecture

The public site is a single page (`app/[locale]/page.tsx`) that composes section components from `components/sections/*` in a fixed order:

> Hero → MarqueeBar → VideoReveal → Services → About → Team → Gallery → Testimonials → Booking → Location → FAQ → Footer

### Content model: Sanity with translation fallback

`loadContent()` in `app/[locale]/page.tsx` merges two content sources:

1. **Sanity `siteSettings` singleton** (`sanity/schemas/siteSettings.ts`) — editor-managed images, hero video, team portraits, and gallery. Revalidated every 60s. If the project ID is unset or the fetch fails, the query returns `null` silently.
2. **`messages/*.json`** via next-intl — all copy, plus the fallback shape for team / gallery / hours when Sanity is empty or unavailable.

When adding content, decide which layer owns it: structured, editor-managed data (images, team, gallery) → Sanity schema; copy and labels → the `messages/*.json` files. Keep the fallback shapes in sync with the Sanity schema.

### Internationalization

- Locales: **`ro`** (default), **`hu`**, **`en`** — configured in `i18n/routing.ts` with `localePrefix: "as-needed"` (the default locale has no URL prefix).
- Localized pathnames are defined per route (e.g. `/confidentialitate` · `/adatvedelem` · `/privacy`).
- `i18n/request.ts` is wired into `next.config.mjs` via `createNextIntlPlugin`.
- Server components use `getTranslations("namespace")`; structured data is pulled with `t.raw("key")`.
- Translation copy lives in `messages/ro.json`, `messages/hu.json`, `messages/en.json`.

### Sanity Studio

Embedded at `app/studio/[[...tool]]` via `next-sanity`. `sanity.config.ts` restricts the `siteSettings` singleton from being duplicated or deleted and hides it from "New document". Schemas are registered in `sanity/schemas/index.ts`. Visit `/studio` to edit content.

### SEO & structured data

`lib/site.ts` is the single source of truth for `SITE_URL` and the `BUSINESS` identity (address, phone, geo, price range, socials). It feeds:

- `app/[locale]/layout.tsx` — Metadata + Open Graph / Twitter cards
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`
- `app/llms.txt/route.ts` — an LLM-readable summary
- `components/JsonLd.tsx` — LocalBusiness / Service structured data

`lib/seo.ts` builds the per-locale `alternates`/`hreflang` links. **Change business facts in `lib/site.ts`, not in individual files.**

### Map

`components/LocationMap.tsx` is a client wrapper around `LocationMapInner.tsx` (react-leaflet). Shop coordinates are set in `app/[locale]/page.tsx` (`SHOP_COORDS`); the slightly-less-precise `BUSINESS.geo` in `lib/site.ts` is used for structured data.

### Legal pages

`confidentialitate` (privacy policy) and `mentiuni-legale` (legal notices) are localized static route segments under `app/[locale]/`.

## Project layout

```
app/
  [locale]/            # localized routes — home, privacy, legal notice
  studio/              # embedded Sanity Studio
  llms.txt/            # LLM-readable site summary
  sitemap.ts · robots.ts · manifest.ts
components/
  sections/            # page sections, composed in order by page.tsx
  cards/               # barber, service, testimonial, hours cards
  ui/                  # Radix-based primitives (button, dialog)
i18n/                  # next-intl routing + request config
lib/                   # site identity (site.ts), SEO helpers (seo.ts)
messages/              # ro / hu / en translation strings
sanity/                # schemas, queries, client, image helpers
```

## Deployment

Deployed on Vercel. Set `NEXT_PUBLIC_SITE_URL` (and the Sanity variables, if used) in **Project Settings → Environment Variables** so canonical URLs, OG tags, and structured data resolve to the production domain.
