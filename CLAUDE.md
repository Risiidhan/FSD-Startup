# CLAUDE.md

Next.js 15 (App Router) + TypeScript + Tailwind 4 + Feature-Sliced Design. Package manager: **yarn**.

Read `ARCHITECTURE.md` before adding code. Key rules:

- Layers (top to bottom): `app/` -> `src/pages_` -> `src/widgets` -> `src/features` -> `src/entities` -> `src/shared`. Never import upward; never import across slices of the same layer (type-only imports between entities are allowed).
- Files and folders are kebab-case; components are PascalCase with no `Component` suffix.
- Use `Flex` and `Text` from `src/shared/components/ui` instead of raw `<div>`/`<p>` with inline Tailwind.
- New inputs follow the pattern in `ARCHITECTURE.md` (component + `*Field` wrapper in `app-form-fields.tsx`).
- Route files in root `app/` stay thin: they render a screen from `src/pages_`.

Before finishing a task run: `yarn format && yarn check-types && yarn lint && yarn test`.
