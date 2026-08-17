/**
 * Syncs `SPEC_VERSION` (src/v1/version.ts) with the `version` field of package.json.
 *
 * Run by the release flow (`pnpm release:version`) right after `changeset version`, so the
 * spec version lands in the same commit as the package bump. `pnpm generate` then refreshes
 * the `v1/` artifacts that embed the version. A unit test asserts the two values never drift.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VERSION_FILE = path.join(REPO_ROOT, 'src', 'v1', 'version.ts');

const { version } = JSON.parse(readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8')) as { version: string };
const content = readFileSync(VERSION_FILE, 'utf8');
const updated = content.replace(/SPEC_VERSION = '[^']+'/, `SPEC_VERSION = '${version}'`);
if (!updated.includes(`SPEC_VERSION = '${version}'`)) {
    process.stderr.write(`sync-spec-version: no SPEC_VERSION assignment found in ${VERSION_FILE}\n`);
    process.exit(1);
}
writeFileSync(VERSION_FILE, updated);
process.stdout.write(`synced SPEC_VERSION to ${version}\n`);
