/**
 * Repo configuration: where the workspace lives, which packages live in it,
 * and how they're classified (generated vs hand-written, JS vs Rust, …).
 *
 * The release script reads each package's manifest and derives this config
 * automatically — there's no separate config file to keep in sync.
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { parse as parseToml } from 'smol-toml';

export type Ecosystem = 'js' | 'rust';

export interface PackageInfo {
    /** Ecosystem-prefixed identifier used in intent files (e.g. `js::@codama/nodes`). */
    id: string;
    /** Bare package or crate name (e.g. `@codama/nodes`, `codama-nodes`). */
    name: string;
    ecosystem: Ecosystem;
    /** Absolute path to the package directory. */
    dir: string;
    /** Absolute path to `package.json` (JS) or `Cargo.toml` (Rust). */
    manifestPath: string;
    /** Current published version. */
    version: string;
    /** Whether this package is private (not published). */
    private: boolean;
    /** Spec version this package implements (from manifest metadata), if any. */
    specRange?: string;
    /** Whether the package's source is generated from the spec. */
    generated: boolean;
}

export interface ReleaseConfig {
    /** Absolute path to the repo root. */
    repoRoot: string;
    /** Absolute path to the `.changeset` directory holding intent files. */
    changesetDir: string;
    /** Absolute path to `COMPATIBILITY.md`. */
    compatibilityPath: string;
    /** Absolute path to the encoded spec at `spec.json`. */
    specJsonPath: string;
    /** Discovered packages keyed by id (e.g. `js::@codama/nodes`). */
    packages: Map<string, PackageInfo>;
}

export async function loadConfig(repoRoot?: string): Promise<ReleaseConfig> {
    const root = repoRoot ?? findRepoRoot();
    const packages = new Map<string, PackageInfo>();

    for (const dir of await listJsPackageDirs(root)) {
        const info = await readJsPackage(dir);
        packages.set(info.id, info);
    }

    for (const dir of await listRustCrateDirs(root)) {
        const info = await readRustCrate(dir);
        packages.set(info.id, info);
    }

    return {
        repoRoot: root,
        changesetDir: path.join(root, '.changeset'),
        compatibilityPath: path.join(root, 'COMPATIBILITY.md'),
        specJsonPath: path.join(root, 'spec.json'),
        packages,
    };
}

function findRepoRoot(): string {
    // The release script is invoked from the repo root in CI / via pnpm scripts.
    // We trust process.cwd() here; a more robust impl would walk up looking for
    // pnpm-workspace.yaml, but that's overkill for the immediate need.
    return process.cwd();
}

async function listJsPackageDirs(root: string): Promise<string[]> {
    const candidates = [path.join(root, 'spec'), path.join(root, 'js', 'node-types'), path.join(root, 'js', 'nodes')];
    return await filterExisting(candidates);
}

async function listRustCrateDirs(root: string): Promise<string[]> {
    const candidates = [path.join(root, 'rust', 'codama-nodes'), path.join(root, 'rust', 'codama-nodes-derive')];
    return await filterExisting(candidates);
}

async function filterExisting(dirs: string[]): Promise<string[]> {
    const out: string[] = [];
    for (const dir of dirs) {
        try {
            const stat = await (await import('node:fs/promises')).stat(dir);
            if (stat.isDirectory()) out.push(dir);
        } catch {
            // missing directory — skip
        }
    }
    return out;
}

async function readJsPackage(dir: string): Promise<PackageInfo> {
    const manifestPath = path.join(dir, 'package.json');
    const raw = await readFile(manifestPath, 'utf8');
    const manifest = JSON.parse(raw) as JsManifest;
    if (!manifest.name) throw new Error(`package.json at ${manifestPath} has no name`);
    if (!manifest.version && !manifest.private) {
        throw new Error(`package.json at ${manifestPath} has no version`);
    }
    return {
        id: `js::${manifest.name}`,
        name: manifest.name,
        ecosystem: 'js',
        dir,
        manifestPath,
        version: manifest.version ?? '0.0.0',
        private: manifest.private === true,
        specRange: manifest.codama?.spec,
        generated: manifest.codama?.generated === true,
    };
}

async function readRustCrate(dir: string): Promise<PackageInfo> {
    const manifestPath = path.join(dir, 'Cargo.toml');
    const raw = await readFile(manifestPath, 'utf8');
    const manifest = parseToml(raw) as RustManifest;
    const pkg = manifest.package;
    if (!pkg?.name) throw new Error(`Cargo.toml at ${manifestPath} has no [package].name`);
    if (typeof pkg.version !== 'string') {
        throw new Error(
            `Cargo.toml at ${manifestPath} must declare an inline [package].version (workspace inheritance not supported by the release tool)`,
        );
    }
    const codamaMeta = pkg.metadata?.codama;
    return {
        id: `rust::${pkg.name}`,
        name: pkg.name,
        ecosystem: 'rust',
        dir,
        manifestPath,
        version: pkg.version,
        private: pkg.publish === false,
        specRange: typeof codamaMeta?.spec === 'string' ? codamaMeta.spec : undefined,
        generated: codamaMeta?.generated === true,
    };
}

interface JsManifest {
    name?: string;
    version?: string;
    private?: boolean;
    codama?: {
        spec?: string;
        generated?: boolean;
    };
}

interface RustManifest {
    package?: {
        name?: string;
        version?: string;
        publish?: string[] | boolean;
        metadata?: {
            codama?: {
                spec?: unknown;
                generated?: unknown;
            };
        };
    };
}
