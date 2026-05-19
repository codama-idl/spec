import solanaConfig from '@solana/eslint-config-solana';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        ignores: [
            '**/dist/**',
            '**/node_modules/**',
            'tsup.config.ts',
            // Transient files tsup writes next to its config while bundling
            // it. They appear and disappear during a build and must not be
            // linted, otherwise lint racing with build fails with ENOENT.
            'tsup.config.bundled_*.mjs',
            'vitest.config.mts',
        ],
    },
    {
        files: ['**/*.ts', '**/*.(c|m)?js'],
        extends: [solanaConfig],
    },
    {
        // The spec source, fixtures, and generators routinely arrange
        // object keys in semantic (not alphabetical) order to match the
        // node-kind ergonomics they expose.
        files: ['src/**', 'tests/**', 'generators/**'],
        rules: {
            'sort-keys-fix/sort-keys-fix': 'off',
            'typescript-sort-keys/interface': 'off',
        },
    },
]);
