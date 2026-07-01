# The Men's Place

Marketing website for **The Men's Place**, a classic barbershop in Satu Mare, Romania.

A single-page, content-driven site in three languages (Romanian, Hungarian, English) with online booking, an editable CMS for images and team, and SEO/structured data built in.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4**
- **next-intl** — RO / HU / EN
- **Sanity** — headless CMS, Studio embedded at `/studio`
- **react-leaflet** — location map
- Deployed on **Vercel**

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

The site runs without any configuration — text comes from `messages/*.json` and content falls back gracefully when the CMS isn't connected.

To enable the CMS, copy `.env.local.example` → `.env.local` and add your Sanity project details, then edit content at `/studio`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the built server |
| `npm run lint` | Lint |
| `npm run format` | Format with Prettier |

## How it works

The home page is composed of section components (hero, services, team, gallery, booking, location, and more). Content comes from two places:

- **Sanity CMS** — editable images, hero video, team, and gallery.
- **`messages/*.json`** — all copy and translations, plus fallbacks when the CMS is empty.

Business details (address, phone, hours) live in one place — `lib/site.ts` — and feed the metadata, sitemap, and structured data.
