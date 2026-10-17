# FSD Starter

A [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), structured with Feature-Sliced Design (FSD).

## Tech stack

- Next.js 15 (App Router, Turbopack in dev), React 19, TypeScript
- Tailwind CSS 4, Radix UI, class-variance-authority, Motion, Sonner
- TanStack Query and TanStack Table, Zustand, nuqs, Axios
- React Hook Form + Zod
- Vitest + Testing Library
- ESLint (with `eslint-plugin-boundaries` for FSD rules), Prettier, Husky + lint-staged

## Prerequisites

- Node.js `>=20.9`
- Yarn 1 (`yarn@1.22.22`), via Corepack

If you don't have `yarn` installed:

```bash
corepack enable
```

## Getting Started

Install dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `yarn dev`          | Start the development server (Turbopack)         |
| `yarn build`        | Create a production build                        |
| `yarn start`        | Run the production build                         |
| `yarn lint`         | Run ESLint and report errors                     |
| `yarn lint:fix`     | Run ESLint and auto-fix what it can              |
| `yarn check-types`  | Type-check the project with `tsc --noEmit`       |
| `yarn format`       | Format all files with Prettier                   |
| `yarn format:check` | Check formatting without changing files          |
| `yarn test`         | Run the test suite once (Vitest)                 |
| `yarn test:watch`   | Run Vitest in watch mode                         |

## Before you commit

Run these and fix everything they report:

```bash
yarn lint
yarn check-types
yarn test
```

Husky and lint-staged run checks on commit. If a commit is rejected, fix the reported issues and commit again.

## Project structure

Top-level:

```text
.
├── app/              # Next.js App Router routes, layouts, and route-specific assets
├── public/           # Static assets served at /
├── src/              # Feature-Sliced frontend source
├── middleware.ts     # Next.js middleware
├── instrumentation*.ts, sentry.*.ts # Observability setup
└── ...               # Config files (next, ts, eslint, etc.)
```

Feature-Sliced layers in `src/`:

```text
src/
├── app/        # App composition (providers, global styles)
├── pages_/     # Route-level screens grouped by area (e.g. public/table-order-payment-page.tsx)
├── widgets/    # Page sections composed from features/entities
├── features/   # User-facing actions and flows
├── entities/   # Domain models (one folder per entity)
└── shared/     # Reusable UI, utils, types, and infra
```

`pages_` is named with a trailing underscore so it doesn't clash with Next.js's special `pages` directory.

## How to follow the structure

- Route files and layouts live in `app/`. Follow App Router conventions for new routes.
- Shared primitives (UI, hooks, utils, types, api clients, validations) go in `src/shared/`.
- Domain logic and types belong in `src/entities/<entity>/`.
- Feature work starts in `src/features/`.
- Keep route-level screens in `src/pages_/`.
- Global providers and styles live in `src/app/`.
- Imports should flow top-down (higher layers can import from lower layers, not the reverse).
- Slices must be isolated from each other: do not import across slice boundaries (e.g., one `features/*` slice should not import from another `features/*` slice, and `entities/*` slices should not import from other `entities/*` slices) except for the type-only exception below.
- Exception: TypeScript type-only imports are allowed between `src/entities/*`.
- `src/shared` and `src/app` are segmented by purpose, so cross-folder imports within those two are allowed.
- These import rules are enforced by ESLint (`eslint-plugin-boundaries`), so `yarn lint` will flag violations.
- This structure is adopted incrementally, so you may still see traces of older implementations; prefer aligning new work with the structure above and clean up when touching legacy areas.

## Rules

- Component names use PascalCase.
- Variables use camelCase.
- Component filenames do not need the word `component` (e.g., `AlertComponent` → `Alert`).
- Use lowercase, kebab-case for folders and files (e.g., `/components`, `/assets`, `alert.tsx`, `my-component-name.tsx`).
- Avoid unused or empty files; if you create test-only files, remove them before committing.
- Run `yarn lint` and fix all errors before committing.

## Commit messages

Format: `type: short description` (e.g., `feat: add table order payment page`).

- `feat` – new feature.
- `fix` – bug fix.
- `chore` – maintenance tasks that don’t touch `src` or tests (e.g., dependencies).
- `refactor` – code change with no behavior change (e.g., moving/renaming a file).
- `docs` – documentation updates.
- `style` – formatting changes only.
- `revert` – revert a previous commit.