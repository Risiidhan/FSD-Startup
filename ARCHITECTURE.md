# Project Structure

## Top-Level Layout

```
.
├── app/                 # Next.js App Router routes and layouts only
├── public/              # Static assets served at /
├── src/                 # Feature-Sliced frontend source
└── ...                  # Config files (next, ts, eslint, vitest, etc.)
```

## Feature-Sliced Layers in `src/`

```
src/
├── app/        # App composition: providers, global styles
├── pages_/     # Route-level screens grouped by area, e.g. public/checkout-page.tsx
├── widgets/    # Page sections composed from features and entities
├── features/   # User-facing actions and flows
├── entities/   # Domain models, one folder per entity
└── shared/     # Reusable UI, utils, types, and infra
```

| Layer           | What belongs here                                            |
| --------------- | ------------------------------------------------------------ |
| `app/`          | Route files, layouts (App Router conventions)                |
| `src/app/`      | Global providers and styles                                  |
| `src/pages_/`   | Route-level screen components                                |
| `src/widgets/`  | Page sections composed from features/entities                |
| `src/features/` | User-facing actions and flows                                |
| `src/entities/` | Domain logic and types per entity                            |
| `src/shared/`   | UI primitives, hooks, utils, types, api clients, validations |

## Import Rules (enforced by `eslint-plugin-boundaries`)

- **Top-down only**: higher layers may import from lower layers, never the reverse.
- **No cross-slice imports**: a `features/*` slice must not import another `features/*` slice; same for `entities/*` (and `widgets/*`).
- **Exception**: TypeScript `import type` is allowed between `src/entities/*`.
- **`src/shared` and `src/app`** are segmented by purpose; cross-folder imports inside each are allowed.

```
app/ (Next.js) -> src/pages_ -> src/widgets -> src/features -> src/entities -> src/shared
```

## Naming Conventions

| Thing           | Convention            | Example                              |
| --------------- | --------------------- | ------------------------------------ |
| Components      | PascalCase            | `UserCard`, `OrderSummary`           |
| Variables       | camelCase             | `orderId`, `isLoading`               |
| Files           | kebab-case            | `user-card.tsx`, `use-auth.ts`       |
| Folders         | kebab-case            | `/order-summary`, `/shared`          |
| Component files | No `Component` suffix | `Alert.tsx` not `AlertComponent.tsx` |

## Shared UI Component Patterns

### Creating a new input component

1. **Component file** at `src/shared/components/ui/<name>.tsx`
   - `"use client"` directive
   - CVA for variants with `fieldSize: { md, lg }`
   - Extend props with `OmitKeys<ComponentProps<"input">, ...>` and `VariantProps<typeof variant>`
   - `classNames` object prop for sub-element overrides (`{ container, input }`)
   - Use layout components (`Flex`, `Text`) instead of raw `<div>` with inline Tailwind
   - Reference `input.tsx` as the canonical example
2. **Form field wrapper** in `src/shared/components/ui/app-form-fields.tsx`
   - Every input gets a `*Field` export wrapping `FormItem`, `FieldLabel`, `FormControl`, `FormDescription`, `FormMessage`
   - Props use the `FieldProps<ComponentProps<typeof Component>>` pattern
3. **Usage in feature forms**: import the `*Field` from `app-form-fields` and wrap it with `<FormField>` from react-hook-form.

## General Rules

- Avoid unused or empty files; remove test-only files before committing.
- Tests live next to the code as `*.test.ts(x)` and run with Vitest.
- This structure is adopted incrementally. Align new work with it and clean up legacy areas when touching them.
