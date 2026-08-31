const oxfmt = require('oxfmt');
const solanaFmt = require('@solana-config/oxc/oxfmt');

const ignorePatterns = [
    '**/dist/',
    // generated artifacts (machine output)
    'spec.json',
    'schema.json',
    'docs/**',
    '.changeset/**',
    'CHANGELOG.md',
    'pnpm-lock.yaml',
    'tsup.config.bundled_*.mjs',
];

module.exports = oxfmt.defineConfig({
    ...solanaFmt,
    ignorePatterns,
});
