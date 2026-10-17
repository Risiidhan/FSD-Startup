# fsd-starter

Clone-ready Next.js scaffold using Feature-Sliced Design (see `ARCHITECTURE.md`).

## Stack

Next.js 15, React 19, TypeScript (strict), Tailwind CSS 4, shadcn-style UI on Radix, TanStack Query and Table, Zustand, React Hook Form + Zod, Axios, nuqs, next-themes, Sonner, Motion, Vitest + Testing Library.

Tooling: ESLint 9 (flat config, import order, FSD boundaries), Prettier (+ Tailwind class sorting), Husky + lint-staged.

## Getting started

```bash
cp .env.example .env
yarn install
yarn dev
```

## Scripts

| Script                         | What it does                          |
| ------------------------------ | ------------------------------------- |
| `yarn dev` / `build` / `start` | Next.js dev (Turbopack), build, serve |
| `yarn lint` / `lint:fix`       | ESLint                                |
| `yarn check-types`             | `tsc --noEmit`                        |
| `yarn format` / `format:check` | Prettier                              |
| `yarn test` / `test:watch`     | Vitest                                |

Commits run lint-staged (ESLint, Prettier, full `tsc`) through Husky.

## New project checklist

1. Use this repo as a GitHub template and rename `name` in `package.json`.
2. Update `title` in `app/layout.tsx` and the API URL in `.env`.
3. Add shadcn components as needed: `npx shadcn@latest add <component>` (paths are set in `components.json`).
4. Remove anything you don't need.

## Optional add-ons (not included)

Sentry (`@sentry/nextjs`, needs a Sentry account/DSN), Uppy uploads, Google Maps (`@vis.gl/react-google-maps`), charts (`recharts`), auth helpers (`jose`).
