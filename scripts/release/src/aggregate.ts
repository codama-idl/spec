/**
 * Aggregate intent files into a per-package release plan.
 */

import { autoPropagate } from './auto-propagate.js';
import type { ReleaseConfig } from './config.js';
import type { BumpLevel, IntentFile } from './intent.js';
import { maxBump } from './intent.js';

export interface PackageRelease {
    /** Package id (e.g. `js::@codama/nodes`). */
    id: string;
    /** Highest declared bump across all intent files affecting this package. */
    bump: BumpLevel;
    /** Intent files that contributed to this package's release entry. */
    contributingIntents: IntentFile[];
}

export interface ReleasePlan {
    /** Per-package release entries, keyed by id. */
    packages: Map<string, PackageRelease>;
    /** All intent files that fed into the plan. */
    intents: IntentFile[];
    /** Warnings emitted during aggregation (non-fatal). */
    warnings: string[];
}

export async function buildReleasePlan(intents: IntentFile[], config: ReleaseConfig): Promise<ReleasePlan> {
    const packages = new Map<string, PackageRelease>();
    const warnings: string[] = [];

    const recordBump = (id: string, bump: BumpLevel, source: IntentFile): void => {
        if (!config.packages.has(id)) {
            warnings.push(
                `Intent file ${source.filePath} targets unknown package "${id}". This package isn't part of the workspace; the entry will be ignored.`,
            );
            return;
        }
        const existing = packages.get(id);
        if (existing) {
            existing.bump = maxBump(existing.bump, bump);
            if (!existing.contributingIntents.includes(source)) {
                existing.contributingIntents.push(source);
            }
        } else {
            packages.set(id, { id, bump, contributingIntents: [source] });
        }
    };

    for (const intent of intents) {
        for (const [id, bump] of intent.packageBumps) {
            recordBump(id, bump, intent);
        }

        const propagated = await autoPropagate(intent, config);
        if (propagated) {
            for (const [id, bump] of propagated.packageBumps) {
                recordBump(id, bump, intent);
            }
        }
    }

    return { packages, intents, warnings };
}
