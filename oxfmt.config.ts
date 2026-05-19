const oxfmt = require('oxfmt');
const solanaFmt = require('@solana-config/oxc/oxfmt');

const ignorePatterns = ['**/dist/', 'v[0-9]*/**', 'CHANGELOG.md', 'pnpm-lock.yaml', 'tsup.config.bundled_*.mjs'];

module.exports = oxfmt.defineConfig({
    ...solanaFmt,
    ignorePatterns,
});
