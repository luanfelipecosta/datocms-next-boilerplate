# Frontend + CMS Workspace

This repo is a minimal two-app workspace:

- `frontend/` - Next.js App Router app
- `cms/` - Payload CMS app

## Stack

- Node.js 20.9+
- pnpm
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Storybook
- React Query
- Payload CMS

## Install

This machine does not have `pnpm` installed yet. Enable it through Corepack first:

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
```

## Local Dev

Run both apps from the workspace root:

```bash
pnpm dev
```

Or run them individually:

```bash
pnpm --filter frontend dev
pnpm --filter cms dev
```

Frontend defaults to `http://localhost:3000`.
CMS defaults to `http://localhost:3001`.
Open the CMS admin at `http://localhost:3001/admin`.

## Docker

The repo includes a simple `docker-compose.yml` that runs both apps with persistent CMS storage.

```bash
docker compose up --build
```

The CMS stores its SQLite database in `cms/.payload/payload.db` through a Docker volume.

## VPS Notes

- Use the same Compose file on a VPS.
- Put a reverse proxy in front of the two apps.
- Keep `PAYLOAD_SECRET`, `DATABASE_URL`, and the public site URLs in environment variables.
- The CMS uses SQLite by default, so you do not need a separate database container for the initial setup.

## Environment Variables

### `frontend`

- `PAYLOAD_PUBLIC_SERVER_URL` - base URL for the CMS API, for example `http://localhost:3001`
- `SITE_URL` - public site URL used for sitemap and robots generation

### `cms`

- `DATABASE_URL` - SQLite connection string, for example `file:./.payload/payload.db`
- `PAYLOAD_SECRET` - long random secret for Payload
- `SERVER_URL` - public CMS URL, for example `http://localhost:3001`
- `FRONTEND_URL` - public frontend URL, for CORS and preview flows

## Content Flow

The first real integration path is:

1. create a post in Payload
2. fetch it from the frontend via the thin API layer in `frontend/lib/api/payload.ts`
3. render it on `/blog` and `/blog/[slug]`
