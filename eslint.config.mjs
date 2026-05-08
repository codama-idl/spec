import solanaConfig from '@solana/eslint-config-solana';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        ignores: [
            '**/dist/**',
            '**/target/**',
            '**/node_modules/**',
            '**/.turbo/**',
            '**/tsup.config.ts',
            // Transient files tsup writes next to its config while bundling
            // it. They appear and disappear during a build and must not be
            // linted, otherwise lint racing with build fails with ENOENT.
            '**/tsup.config.bundled_*.mjs',
            '**/vitest.config.mts',
            'tsup.config.base.ts',
            'vitest.config.base.mts',
            'vitest.config.mts',
            'js/node-types/src/generated/**',
            'js/nodes/src/generated/**',
        ],
    },
    {
        files: ['**/*.ts', '**/*.(c|m)?js'],
        extends: [solanaConfig],
    },
    {
        files: ['generators/**', 'spec/**'],
        rules: {
            'sort-keys-fix/sort-keys-fix': 'off',
            'typescript-sort-keys/interface': 'off',
        },
    },
]);
