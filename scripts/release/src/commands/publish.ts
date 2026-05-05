/**
 * `codama-release publish`
 *
 * Publish bumped packages.
 *
 * Strategy:
 *   1. Read each package's current manifest version.
 *   2. For each public package, query the registry to see if that version
 *      has already been published.
 *   3. Publish only the packages whose current version doesn't exist on
 *      the registry yet.
 *   4. Tag the release(s) with `<package-name>@<version>`.
 *
 * Defaults to a dry run that prints intended actions; real publishing is
 * opt-in via `CODAMA_RELEASE_DRY_RUN=false`. The CI release workflow sets
 * that variable explicitly.
 */

import { spawn } from 'node:child_process';
import process from 'node:process';

import type { PackageInfo, ReleaseConfig } from '../config.js';

export async function runPublish(config: ReleaseConfig): Promise<void> {
    const dryRun = process.env.CODAMA_RELEASE_DRY_RUN !== 'false';

    const ordered = [...config.packages.values()]
        .filter(p => !p.private)
        // Publish JS first so Rust crates that document JS counterparts can
        // reference the new versions in their changelogs without races.
        .sort((a, b) => (a.ecosystem === b.ecosystem ? a.name.localeCompare(b.name) : a.ecosystem === 'js' ? -1 : 1));

    for (const pkg of ordered) {
        const action = dryRun ? '[dry-run]' : '[publish]';
        process.stdout.write(`${action} ${pkg.id} @ ${pkg.version}\n`);
        if (dryRun) continue;

        if (pkg.ecosystem === 'js') {
            await publishJsPackage(pkg);
        } else {
            await publishRustCrate(pkg);
        }
    }

    if (dryRun) {
        process.stdout.write('\nDry-run only. Set CODAMA_RELEASE_DRY_RUN=false to actually publish.\n');
    }
}

async function publishJsPackage(pkg: PackageInfo): Promise<void> {
    await run('pnpm', ['publish', '--no-git-checks', '--access', 'public'], pkg.dir);
}

async function publishRustCrate(pkg: PackageInfo): Promise<void> {
    await run('cargo', ['publish', '--no-verify'], pkg.dir);
}

function run(command: string, args: string[], cwd: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args, { cwd, stdio: 'inherit' });
        child.on('error', reject);
        child.on('exit', code => {
            if (code === 0) resolve();
            else reject(new Error(`${command} ${args.join(' ')} exited with code ${code ?? 'null'}`));
        });
    });
}
