import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const configDir = dirname(fileURLToPath(import.meta.url));

const defaultMonorepoRoot = join(configDir, "..", "..");
/** Monorepo scan root; override with `TAILWIND_MONOREPO_ROOT` if layouts differ. */
const monorepoRoot = process.env.TAILWIND_MONOREPO_ROOT ?? defaultMonorepoRoot;

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      base: monorepoRoot,
    },
  },
};

export default config;

export const postcssConfig = config;
