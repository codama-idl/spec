/**
 * Spec auto-propagation: turns `spec: <level>` intent declarations into
 * per-package bumps on every package whose source is generated from the
 * spec, plus the spec package itself.
 *
 * The current behaviour propagates to every package marked
 * `codama.generated` in its manifest. A future revision can switch to
 * running the generators against the PR's spec and only marking packages
 * whose output actually changed; the existing behaviour is the upper
 * bound and is always safe.
 */

import type { ReleaseConfig } from './config.js';
import type { BumpLevel, IntentFile } from './intent.js';

export interface PropagatedIntent {
    /** Source intent file that triggered the propagation. */
    source: IntentFile;
    /** Synthesized per-package bumps derived from the spec entry. */
    packageBumps: Map<string, BumpLevel>;
}

// eslint-disable-next-line @typescript-eslint/require-await -- kept async so a future diff-based implementation can introduce I/O without breaking callers.
export async function autoPropagate(intent: IntentFile, config: ReleaseConfig): Promise<PropagatedIntent | null> {
    if (intent.specBump === undefined) return null;

    const targets = new Map<string, BumpLevel>();
    for (const pkg of config.packages.values()) {
        if (!pkg.generated) continue;
        targets.set(pkg.id, intent.specBump);
    }

    // The spec package itself bumps at the declared level — even though it's
    // not "generated" in the sense of having codegen-emitted source, its
    // version *is* the spec version.
    const specPkg = config.packages.get('js::@codama/spec');
    if (specPkg && !targets.has(specPkg.id)) {
        targets.set(specPkg.id, intent.specBump);
    }

    return {
        source: intent,
        packageBumps: targets,
    };
}
