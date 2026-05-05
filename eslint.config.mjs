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
        files: ['scripts/**', 'generators/**', 'spec/**'],
        rules: {
            'sort-keys-fix/sort-keys-fix': 'off',
            'typescript-sort-keys/interface': 'off',
        },
    },
]);
