# Turbo expense manager

[Turborepo](https://turborepo.dev/) monorepo for an expense manager product. Apps and shared packages live under `apps/`, `packages/`, and shared tooling under `tooling/`.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) 9 (`packageManager` is pinned in [package.json](./package.json))

## Quick start

Install dependencies from the repository root:

```sh
pnpm install
```

Start all dev servers:

```sh
pnpm dev
```

Targets **web** (`http://localhost:3000`) and **docs** (`http://localhost:3001`). For a single app, use [filters](https://turborepo.dev/docs/crafting-your-repository/running-tasks#using-filters), for example:

```sh
pnpm exec turbo dev --filter=web
```

## Repository layout

### Apps

| Path        | Description                                       | Dev URL               |
| ----------- | ------------------------------------------------- | --------------------- |
| `apps/web`  | [Next.js](https://nextjs.org/) app (main product) | http://localhost:3000 |
| `apps/docs` | Next.js app (docs / secondary site)               | http://localhost:3001 |

### Packages

| Name / path                | Role                                                                                                                                                                                                                                                      |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@repo/ui` / `packages/ui` | Shared React components, styles (`@repo/ui/styles.css`), `cn` helper (`@repo/ui/cn` via [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)). Build produces `dist/` (TypeScript + Tailwind CSS bundle). |

### Tooling (`tooling/*`)

| Package                   | Role                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `@repo/eslint-config`     | Shared [ESLint](https://eslint.org/) flat configs                                                                         |
| `@repo/typescript-config` | Shared [TypeScript](https://www.typescriptlang.org/) bases                                                                |
| `@repo/prettier-config`   | [Prettier](https://prettier.io/) (import sort, Tailwind class sort, shared `package.json` `"prettier"` field at the root) |
| `@repo/tailwind-config`   | [Tailwind CSS v4](https://tailwindcss.com/) preset, theme, and PostCSS config for apps and the UI package                 |

Apps extend shared TypeScript bases via `@repo/typescript-config` (implemented under `tooling/typescript-config`).

## Scripts (root)

Run from the repo root:

| Script                    | Description                                                     |
| ------------------------- | --------------------------------------------------------------- |
| `pnpm dev`                | `turbo run dev` — all apps that define `dev`                    |
| `pnpm build`              | `turbo run build` — dependency order via `^build`               |
| `pnpm lint`               | `turbo run lint`                                                |
| `pnpm check-types`        | `turbo run check-types`                                         |
| `pnpm format`             | Format the whole tree with Prettier (`.prettierignore` applies) |
| `pnpm format:check`       | Check formatting                                                |
| `pnpm format:turbo`       | Run each package’s `format` script in parallel via Turbo        |
| `pnpm format:turbo:check` | Same for `format:check`                                         |

Each workspace package also defines `format` / `format:check` pointing at the root `.prettierignore`.

## Working with `@repo/ui`

Consumers import compiled artifacts (for example `@repo/ui/button`, `@repo/ui/cn`). After changing sources under `packages/ui`, rebuild:

```sh
pnpm --filter @repo/ui run build:components
pnpm --filter @repo/ui run build:styles
```

Or rely on Turbo: `pnpm build` runs upstream builds first where configured.

## pnpm workspaces

Workspace members are declared in [pnpm-workspace.yaml](./pnpm-workspace.yaml):

- `apps/*`
- `packages/*`
- `tooling/*`

To add a **local** dependency, use the workspace protocol and quote for zsh:

```sh
pnpm add '@repo/ui@workspace:*' --filter=web
```

## Editor setup

The repo includes [`.vscode/settings.json`](./.vscode/settings.json) (format on save with Prettier, ESLint fix on save, flat ESLint) and [`.vscode/extensions.json`](./.vscode/extensions.json) (recommended extensions).

## Remote caching (optional)

[Turborepo remote caching](https://turborepo.dev/docs/core-concepts/remote-caching) is optional. To use Vercel’s remote cache, install the CLI and run `turbo login` / `turbo link` from the root (or `pnpm exec turbo login` if you do not use a global `turbo`).

## Useful links

- [Turborepo — tasks & filtering](https://turborepo.dev/docs/crafting-your-repository/running-tasks)
- [pnpm — workspaces](https://pnpm.io/workspaces)
