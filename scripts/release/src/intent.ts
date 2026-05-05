/**
 * Parse and validate intent files in `.changeset/`.
 *
 * Intent file format (changesets-inspired, polyglot):
 *
 *   ---
 *   'js::@codama/nodes': minor
 *   'rust::codama-nodes': minor
 *   ---
 *
 *   Adopt spec 1.7.0 — add `xyz` field on `AccountNode`.
 *
 * Spec auto-propagation shortcut:
 *
 *   ---
 *   spec: minor
 *   ---
 *
 *   Add `xyz` field on `AccountNode`.
 */

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { parse as parseYaml } from 'yaml';

export type BumpLevel = 'major' | 'minor' | 'patch';

export interface IntentFile {
    /** Absolute path to the intent file. */
    filePath: string;
    /** Bumps declared per package id (e.g. `js::@codama/nodes` → `minor`). */
    packageBumps: Map<string, BumpLevel>;
    /** Spec auto-propagation level if declared, else undefined. */
    specBump?: BumpLevel;
    /** Markdown body of the intent file (the changelog entry). */
    body: string;
}

const RESERVED_FILENAMES = new Set(['README.md', 'config.json']);
const VALID_BUMPS: ReadonlySet<BumpLevel> = new Set<BumpLevel>(['major', 'minor', 'patch']);
const ID_PREFIX = /^(js|rust)::/;

export async function readIntentFiles(changesetDir: string): Promise<IntentFile[]> {
    let entries: string[];
    try {
        entries = await readdir(changesetDir);
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
        throw err;
    }

    const intentFiles: IntentFile[] = [];
    for (const entry of entries) {
        if (RESERVED_FILENAMES.has(entry)) continue;
        if (!entry.endsWith('.md')) continue;
        const filePath = path.join(changesetDir, entry);
        const raw = await readFile(filePath, 'utf8');
        intentFiles.push(parseIntent(filePath, raw));
    }

    intentFiles.sort((a, b) => a.filePath.localeCompare(b.filePath));
    return intentFiles;
}

export function parseIntent(filePath: string, source: string): IntentFile {
    const fenced = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source.trimStart());
    if (!fenced) {
        throw new Error(`Intent file ${filePath} is missing YAML frontmatter delimited by ---`);
    }
    const [, frontmatterRaw, bodyRaw] = fenced;
    const frontmatter = parseYaml(frontmatterRaw) as Record<string, unknown> | null;
    if (frontmatter === null || typeof frontmatter !== 'object') {
        throw new Error(`Intent file ${filePath} has empty or invalid frontmatter`);
    }

    const packageBumps = new Map<string, BumpLevel>();
    let specBump: BumpLevel | undefined;

    for (const [key, valueUnknown] of Object.entries(frontmatter)) {
        const value = valueUnknown;
        if (key === 'spec') {
            specBump = parseBump(value, key, filePath);
            continue;
        }
        if (!ID_PREFIX.test(key)) {
            throw new Error(
                `Intent file ${filePath}: package id "${key}" is missing an ecosystem prefix (e.g. "js::@codama/nodes" or "rust::codama-nodes")`,
            );
        }
        packageBumps.set(key, parseBump(value, key, filePath));
    }

    if (packageBumps.size === 0 && specBump === undefined) {
        throw new Error(`Intent file ${filePath} declares no packages and no spec bump`);
    }

    return {
        filePath,
        packageBumps,
        specBump,
        body: bodyRaw.trim(),
    };
}

function parseBump(value: unknown, key: string, filePath: string): BumpLevel {
    if (typeof value !== 'string' || !VALID_BUMPS.has(value as BumpLevel)) {
        throw new Error(
            `Intent file ${filePath}: invalid bump for "${key}" — expected "major" | "minor" | "patch", got ${JSON.stringify(value)}`,
        );
    }
    return value as BumpLevel;
}

const BUMP_RANK: Record<BumpLevel, number> = { patch: 0, minor: 1, major: 2 };

export function maxBump(a: BumpLevel, b: BumpLevel): BumpLevel {
    return BUMP_RANK[a] >= BUMP_RANK[b] ? a : b;
}
