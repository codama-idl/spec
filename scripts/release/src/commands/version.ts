/**
 * `codama-release version`
 *
 * Apply the pending intent files: bump versions, update CHANGELOG.md per
 * package, regenerate COMPATIBILITY.md, and delete the consumed intent files.
 *
 * This command is intended to be run by CI on `main` (which then opens the
 * "Release" PR), but it's safe to run locally for previewing the diff.
 */

import { unlink } from 'node:fs/promises';
import process from 'node:process';

import { buildReleasePlan } from '../aggregate.js';
import { prependChangelogEntry } from '../changelog.js';
import { regenerateCompatibility } from '../compatibility.js';
import type { ReleaseConfig } from '../config.js';
import { readIntentFiles } from '../intent.js';
import { writeManifestVersion } from '../manifests.js';
import { applyBump } from '../semver-bump.js';

export async function runVersion(config: ReleaseConfig): Promise<void> {
    const intents = await readIntentFiles(config.changesetDir);

    if (intents.length === 0) {
        process.stdout.write('No pending intent files. Nothing to do.\n');
        return;
    }

    const plan = await buildReleasePlan(intents, config);

    if (plan.warnings.length > 0) {
        for (const w of plan.warnings) process.stderr.write(`! ${w}\n`);
    }

    if (plan.packages.size === 0) {
        process.stdout.write('No package bumps to apply. Removing consumed intent files.\n');
        for (const intent of intents) await unlink(intent.filePath);
        await regenerateCompatibility(config);
        return;
    }

    // Bump manifests + write changelog entries.
    for (const release of plan.packages.values()) {
        const pkg = config.packages.get(release.id);
        if (!pkg) continue;
        const next = applyBump(pkg.version, release.bump);
        await writeManifestVersion(pkg.manifestPath, pkg.ecosystem, next);
        await prependChangelogEntry(pkg.dir, next, release.bump, release.contributingIntents);
        // Reflect the new version in our in-memory map for downstream steps.
        pkg.version = next;
        process.stdout.write(`  ${pkg.id}  → ${next}  (${release.bump})\n`);
    }

    await regenerateCompatibility(config);

    // Consume intent files (so re-running version is idempotent).
    for (const intent of intents) await unlink(intent.filePath);

    process.stdout.write('\nDone. Review the diff and commit the changes.\n');
}
