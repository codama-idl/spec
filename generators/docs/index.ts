/**
 * `docs` generator.
 *
 * Runs the docs generator over the v1 spec, then writes the emitted mdx tree to
 * `v1/docs/` (plain page bodies, relative `.mdx` links, `index` basenames). CI re-runs this and fails if
 * the result differs from what is committed, keeping the docs artifact in lockstep with the spec source.
 */

import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import {
    type BaseFragment,
    createRenderMap,
    deleteDirectory,
    joinPath,
    type Path,
    type RenderMap,
    writeRenderMap,
} from '@codama/fragments';

import { type DocModel, generateDocs } from '../../src/docs';
import { getSpec } from '../../src/v1';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// here = <repo>/generators/docs -> repoRoot is two levels up.
const REPO_ROOT = path.resolve(HERE, '../..');

function getDocsRenderMap(model: DocModel): RenderMap<BaseFragment> {
    const entries: Record<Path, BaseFragment> = {};
    for (const page of model.pages) {
        // core `content` carries no trailing newline; add one when writing the file
        entries[`${page.pathSegments.join('/')}.mdx`] = { content: `${page.content}\n` };
    }
    return createRenderMap(entries);
}

export function generate(): void {
    const model = generateDocs(getSpec());
    const docsMap = getDocsRenderMap(model);

    const outDir = joinPath(REPO_ROOT, 'v1', 'docs');
    deleteDirectory(outDir);
    writeRenderMap(docsMap, outDir);
    process.stdout.write(`wrote ${docsMap.size} docs files to v1/docs\n`);
}
