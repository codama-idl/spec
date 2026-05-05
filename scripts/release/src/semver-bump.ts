/**
 * Thin wrapper around `semver.inc` that throws on invalid inputs and matches
 * our `BumpLevel` vocabulary.
 */

import semver from 'semver';

import type { BumpLevel } from './intent.js';

export function applyBump(currentVersion: string, bump: BumpLevel): string {
    const next = semver.inc(currentVersion, bump);
    if (!next) {
        throw new Error(`Cannot apply ${bump} bump to invalid version "${currentVersion}"`);
    }
    return next;
}
