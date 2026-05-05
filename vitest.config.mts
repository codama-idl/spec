import { defineConfig } from 'vitest/config';

import { getVitestConfig } from './vitest.config.base.mjs';

/**
 * IDE-only default config so Vitest extensions can pick up something sensible.
 * Per-package configs are the source of truth in CI.
 */
export default defineConfig(getVitestConfig('node'));
