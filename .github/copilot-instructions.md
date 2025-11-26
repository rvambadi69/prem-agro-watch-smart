Purpose

This file gives actionable, repository-specific guidance for AI coding agents working on this project.

**Quick Start**
- **Install & run:** `npm i` then `npm run dev` to start the Vite dev server.
- **Build / preview:** `npm run build` and `npm run preview`.
- **Lint:** `npm run lint` (ESLint configured).
-- **Dev server host/port:** configured in `vite.config.ts` as host `::` and port `5173` (LAN-accessible).

**High-level architecture (why it looks like this)**
- **Vite + React + TypeScript:** fast dev server and modern build (`vite`, `typescript`).
- **Routing & layouts:** routes are defined in `src/App.tsx`. Dashboard pages use the `DashboardLayout` wrapper from `src/components/DashboardLayout.tsx`.
- **UI composition:** most UI primitives live under `src/components/ui` (shadcn-ui + Radix wrappers). Keep new UI primitives consistent with that pattern.
- **State & data fetching:** `@tanstack/react-query` is initialized in `src/App.tsx` via `QueryClientProvider` — prefer hooks and react-query patterns for async data.
- **Styling:** Tailwind CSS is used (see `tailwind.config.ts` and `src/index.css`). Use the `cn` helper in `src/lib/utils.ts` to compose classes safely.
- **Path alias:** `@` resolves to `src` (see `vite.config.ts`); use `@/...` imports for project files.

**Where to make changes (common tasks)**
- **Add a new page:**
  1. Create `src/pages/YourPage.tsx` exporting a default React component.
  2. Add a route in `src/App.tsx`. For pages behind the dashboard layout, wrap with `<DashboardLayout>…</DashboardLayout>`.
  3. Update the `navigation` array in `src/components/DashboardLayout.tsx` to add a nav item (name, `href`, icon).
  4. Make sure the new route is placed above the catch-all `*` route (there is a comment in `src/App.tsx`).

- **Add a UI component:** follow the existing pattern in `src/components/ui` — small, focused components that wrap Radix primitives + Tailwind classes.

**Project-specific conventions & examples**
- **Route order matters:** `src/App.tsx` contains a catch-all `*` route; always place new routes above it.
- **Dashboard nav:** `src/components/DashboardLayout.tsx` defines `navigation = [...]`. Use that array to keep navigation and route paths in sync.
- **Class merging:** use the `cn(...inputs)` utility from `src/lib/utils.ts` (it combines `clsx` + `tailwind-merge`).
- **Multiple toasters are used:** the app renders both a custom `Toaster` and `Sonner` (see `src/App.tsx`). Be careful when altering global notification behavior.
- **Icons:** project uses `lucide-react` imports (e.g., `import { Sprout } from 'lucide-react'`).

**Build & debug tips**
-- **Run locally:** `npm run dev` then open `http://localhost:5173` (or your machine IP). Vite hosts on `::` — good for testing from other devices.
- **Lovable integration:** the README and `vite.config.ts` reference `lovable-tagger`. The repo may be connected to Lovable for tagging/auto-commits — avoid removing the plugin unless intentional.
- **No tests found:** there are no test scripts in `package.json`; prefer manual verification in the browser and lint checks.

**Integration points & external dependencies**
- **React Query:** `@tanstack/react-query` used for server state.
- **Radix + shadcn-ui:** UI primitives live under `src/components/ui`.
- **Lovable:** README and `lovable-tagger` indicate external editing/publishing flows via Lovable.

**Files to inspect when you need context**
- `package.json` — scripts and deps
- `vite.config.ts` — dev server and alias (`@`) setup
- `src/App.tsx` — routing & providers (QueryClient, Router)
- `src/components/DashboardLayout.tsx` — main layout and navigation
- `src/components/ui/*` — UI primitives to copy patterns from
- `src/pages/*` — page implementations and examples
- `src/lib/utils.ts` — `cn` utility for class merging

If anything here is unclear or you'd like more examples (e.g., a ready-to-use page template or a new UI component scaffold), tell me which area to expand and I'll iterate.
