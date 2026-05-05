/**
 * Per-package CHANGELOG.md updates.
 *
 * Format follows Keep a Changelog conventions. Each release section is a
 * level-2 heading with the version and ISO date, followed by sub-sections
 * grouping entries by bump level.
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type { BumpLevel, IntentFile } from './intent.js';

const HEADER = `# Changelog

All notable changes to this package are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/) and this
package adheres to [Semantic Versioning](https://semver.org/).

`;

export async function prependChangelogEntry(
    packageDir: string,
    nextVersion: string,
    bump: BumpLevel,
    intents: IntentFile[],
): Promise<void> {
    const file = path.join(packageDir, 'CHANGELOG.md');
    const existing = await readChangelog(file);
    const today = new Date().toISOString().slice(0, 10);

    const heading = `## [${nextVersion}] — ${today}`;
    const bumpLabel = `### ${capitalize(bump)} changes`;
    const lines: string[] = [heading, '', bumpLabel, ''];

    for (const intent of intents) {
        if (intent.body.length > 0) lines.push(formatEntryBullet(intent.body));
    }
    lines.push('');

    const next = `${HEADER}${lines.join('\n')}\n${stripHeader(existing)}`;
    await writeFile(file, next, 'utf8');
}

async function readChangelog(file: string): Promise<string> {
    try {
        return await readFile(file, 'utf8');
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === 'ENOENT') return '';
        throw err;
    }
}

function stripHeader(content: string): string {
    if (!content.startsWith(HEADER)) return content;
    return content.slice(HEADER.length);
}

function formatEntryBullet(body: string): string {
    const firstLine = body.split('\n')[0]?.trim() ?? '';
    const rest = body.split('\n').slice(1).join('\n').trim();
    if (!rest) return `- ${firstLine}`;
    const indented = rest
        .split('\n')
        .map(line => (line.length > 0 ? `  ${line}` : line))
        .join('\n');
    return `- ${firstLine}\n${indented}`;
}

function capitalize(s: string): string {
    if (s.length === 0) return s;
    return s[0].toUpperCase() + s.slice(1);
}
