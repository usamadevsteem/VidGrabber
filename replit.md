# SnapFetch — AI-Powered Video Downloader

A modern, premium video downloader platform that lets users paste any social media video URL and instantly download it in multiple formats and qualities.

## Run & Operate

- `pnpm --filter @workspace/snapfetch run dev` — run the frontend (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, TailwindCSS, Framer Motion, wouter, next-themes
- API: Express 5
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for all API contracts)
- `lib/api-client-react/src/generated/` — generated React Query hooks
- `lib/api-zod/src/generated/` — generated Zod validation schemas
- `artifacts/snapfetch/src/` — frontend React app
- `artifacts/api-server/src/routes/download.ts` — video URL analysis + stats endpoints
- `artifacts/api-server/src/routes/blog.ts` — blog post endpoints

## Architecture decisions

- Frontend-only URL detection — platform is detected from URL pattern on the backend to keep frontend clean
- Static blog data — blog posts live in-memory in the route file; easy to migrate to a DB later
- Download formats are generated per-platform — each platform returns realistic quality options
- No actual video extraction in first build — returns structured format metadata; real yt-dlp integration is a clean upgrade path
- dark-first theme with next-themes for light/dark toggle

## Product

SnapFetch supports downloading from YouTube, Facebook, Instagram, TikTok, Twitter/X, Vimeo, and Pinterest. Users paste a URL, the platform is detected automatically, video metadata is analyzed, and download options are presented in multiple qualities (up to 1080p/4K) plus MP3 audio extraction.

## Pages

- `/` — Home with hero downloader, stats, features, how-it-works, platforms, FAQ, blog preview
- `/youtube-downloader`, `/tiktok-downloader`, `/instagram-downloader`, `/facebook-downloader`, `/twitter-downloader`, `/vimeo-downloader`, `/pinterest-downloader` — Platform-specific pages
- `/blog` — Blog listing with category filters
- `/blog/:slug` — Single blog post
- `/about`, `/contact`, `/privacy`, `/terms`, `/dmca` — Info and legal pages

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After any OpenAPI spec change, always re-run `pnpm --filter @workspace/api-spec run codegen` before using updated types
- The `BASE_PATH` env var is required for the Vite build — it's wired by the workflow config
- Do not run `pnpm dev` at workspace root — use workflow restart instead

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
