const oxlint = require('oxlint');
const solanaConfig = require('@solana-config/oxc/oxlint');

const ignorePatterns = [
    '**/dist/',
    'v[0-9]*/**',
    '.changeset/**',
    'CHANGELOG.md',
    'pnpm-lock.yaml',
    'tsup.config.bundled_*.mjs',
];

module.exports = oxlint.defineConfig({
    extends: [solanaConfig],
    ignorePatterns,
    options: { typeAware: true },
    rules: {
        'sort-keys': 'off',
    },
});
