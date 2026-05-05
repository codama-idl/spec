#!/usr/bin/env tsx
/**
 * `codama-release` — entry point.
 *
 * Subcommands:
 *   status   Print pending intent files and the resulting per-package bumps.
 *   version  Apply intent files: bump versions, update CHANGELOGs and
 *            COMPATIBILITY.md, then delete the consumed intent files.
 *   publish  Publish bumped packages (npm + crates.io).
 *
 * Run from the repo root: `pnpm release <subcommand>`
 * (or `tsx scripts/release/src/index.ts <subcommand>`).
 */

import process from 'node:process';

import { runPublish } from './commands/publish.js';
import { runStatus } from './commands/status.js';
import { runVersion } from './commands/version.js';
import { loadConfig } from './config.js';

const HELP = `codama-release <command>

Commands:
  status         Show pending intent files and the resulting per-package bumps.
  version        Apply intents: bump versions, update CHANGELOG.md and COMPATIBILITY.md.
  publish        Publish bumped packages (npm + crates.io).
  help, --help   Print this help.

Run from the repo root.
`;

async function main(): Promise<void> {
    const [, , rawCommand] = process.argv;
    const command = rawCommand ?? 'help';

    if (command === 'help' || command === '--help' || command === '-h') {
        process.stdout.write(HELP);
        return;
    }

    const config = await loadConfig();

    switch (command) {
        case 'status':
            await runStatus(config);
            break;
        case 'version':
            await runVersion(config);
            break;
        case 'publish':
            await runPublish(config);
            break;
        default:
            process.stderr.write(`Unknown command: ${command}\n\n${HELP}`);
            process.exit(2);
    }
}

main().catch((err: unknown) => {
    if (err instanceof Error) {
        process.stderr.write(`error: ${err.message}\n`);
        if (process.env.DEBUG && err.stack) {
            process.stderr.write(`${err.stack}\n`);
        }
    } else {
        process.stderr.write(`error: ${String(err)}\n`);
    }
    process.exit(1);
});
