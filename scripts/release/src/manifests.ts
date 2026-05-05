/**
 * Manifest editing: bump versions in `package.json` and `Cargo.toml` while
 * preserving formatting as much as possible.
 *
 * For `package.json` we round-trip via JSON.parse/stringify. We standardize
 * on 4-space indentation (matching the repo convention).
 *
 * For `Cargo.toml` we don't round-trip via a TOML serializer (which would
 * reformat the file); instead we surgically replace the `version = "..."`
 * line within the `[package]` section.
 */

import { readFile, writeFile } from 'node:fs/promises';

import type { Ecosystem } from './config.js';

export async function readManifestVersion(manifestPath: string, ecosystem: Ecosystem): Promise<string> {
    const raw = await readFile(manifestPath, 'utf8');
    if (ecosystem === 'js') {
        const parsed = JSON.parse(raw) as { version?: string };
        if (typeof parsed.version !== 'string') {
            throw new Error(`Missing "version" in ${manifestPath}`);
        }
        return parsed.version;
    }
    const match = matchPackageVersion(raw);
    if (!match) throw new Error(`Could not find inline [package].version in ${manifestPath}`);
    return match.version;
}

export async function writeManifestVersion(
    manifestPath: string,
    ecosystem: Ecosystem,
    nextVersion: string,
): Promise<void> {
    const raw = await readFile(manifestPath, 'utf8');
    if (ecosystem === 'js') {
        const parsed = JSON.parse(raw) as Record<string, unknown> & { version?: string };
        parsed.version = nextVersion;
        const serialized = JSON.stringify(parsed, null, 4) + '\n';
        await writeFile(manifestPath, serialized, 'utf8');
        return;
    }
    const replaced = replacePackageVersion(raw, nextVersion);
    if (replaced === null) {
        throw new Error(`Could not find inline [package].version in ${manifestPath}`);
    }
    await writeFile(manifestPath, replaced, 'utf8');
}

interface PackageVersionMatch {
    version: string;
    start: number;
    end: number;
}

/**
 * Find the first `version = "..."` line that follows a `[package]` header
 * (and does not appear under any other section). Returns the version and
 * the slice positions of the version literal (including quotes).
 */
function matchPackageVersion(source: string): PackageVersionMatch | null {
    const lines = source.split('\n');
    let inPackageSection = false;
    let cursor = 0;
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('[')) {
            inPackageSection = trimmed === '[package]';
        } else if (inPackageSection) {
            const m = /^(\s*version\s*=\s*)("[^"]*"|'[^']*')/.exec(line);
            if (m) {
                const literalStart = cursor + m[1].length;
                const literalEnd = literalStart + m[2].length;
                return {
                    version: m[2].slice(1, -1),
                    start: literalStart,
                    end: literalEnd,
                };
            }
        }
        cursor += line.length + 1; // include the newline
    }
    return null;
}

function replacePackageVersion(source: string, nextVersion: string): string | null {
    const match = matchPackageVersion(source);
    if (!match) return null;
    return `${source.slice(0, match.start)}"${nextVersion}"${source.slice(match.end)}`;
}
