/**
 * `codama-release status`
 *
 * Print the pending intent files and the resulting per-package bumps. Useful
 * for contributors verifying their intent files are well-formed before push,
 * and for CI to compute summaries on PRs.
 */

import process from 'node:process';

import { buildReleasePlan } from '../aggregate.js';
import type { ReleaseConfig } from '../config.js';
import { readIntentFiles } from '../intent.js';
import { applyBump } from '../semver-bump.js';

export async function runStatus(config: ReleaseConfig): Promise<void> {
    const intents = await readIntentFiles(config.changesetDir);

    if (intents.length === 0) {
        process.stdout.write('No pending intent files.\n');
        return;
    }

    process.stdout.write(`Found ${intents.length} pending intent file(s):\n`);
    for (const intent of intents) {
        const rel = intent.filePath.replace(`${config.repoRoot}/`, '');
        process.stdout.write(`  - ${rel}\n`);
    }
    process.stdout.write('\n');

    const plan = await buildReleasePlan(intents, config);

    if (plan.warnings.length > 0) {
        process.stdout.write('Warnings:\n');
        for (const w of plan.warnings) process.stdout.write(`  ! ${w}\n`);
        process.stdout.write('\n');
    }

    if (plan.packages.size === 0) {
        process.stdout.write('No package bumps would be applied.\n');
        return;
    }

    process.stdout.write('Resulting bumps:\n');
    const ordered = [...plan.packages.values()].sort((a, b) => a.id.localeCompare(b.id));
    for (const release of ordered) {
        const pkg = config.packages.get(release.id);
        if (!pkg) continue;
        const next = applyBump(pkg.version, release.bump);
        process.stdout.write(`  - ${pkg.id}  ${pkg.version} → ${next}  (${release.bump})\n`);
    }
}
