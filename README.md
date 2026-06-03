# Next.js App

This repository is now a single root-level Next.js App Router project.

## Stack

- Node.js 20.9+
- pnpm via Corepack
- Next.js
- TypeScript
- Tailwind CSS
- Storybook

## Run Locally

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm storybook
```

Storybook runs on port `6006`.

## Environment

Copy values from [.env.example](/Users/luancosta/Documents/website-poc/.env.example) if you need overrides.

- `SITE_URL` is used for metadata and sitemap generation.
- `DATOCMS_API_TOKEN` and `DATOCMS_ENVIRONMENT` are reserved for the future DatoCMS integration and are not used yet.

## Docker

Start the app with:

```bash
docker compose up --build
```

Stop it with:

```bash
docker compose down
```

## Content

The current app uses local placeholder content so the UI remains functional without a CMS.
DatoCMS is the planned CMS integration point, but no DatoCMS wiring is implemented in this repository yet.
