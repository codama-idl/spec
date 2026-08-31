/**
 * `docs` generator.
 *
 * Runs the docs generator over the spec, then writes the emitted markdown tree to `docs/`
 * (GitHub-flavoured pages, relative `.md` links, `README` landing pages per folder). CI re-runs this
 * and fails if the result differs from what is committed, keeping the docs artifact in lockstep with
 * the spec source. Previous majors' docs live on their own maintenance branches; the root landing
 * page links to them (see `PREVIOUS_MAJOR_DOCS`).
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

import { getSpec } from '../../src/spec';
import { PAGE_EXTENSION } from './constants';
import { generateDocs } from './generateDocs';
import type { DocModel } from './types';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// here = <repo>/generators/docs -> repoRoot is two levels up.
const REPO_ROOT = path.resolve(HERE, '../..');

function getDocsRenderMap(model: DocModel): RenderMap<BaseFragment> {
    const entries: Record<Path, BaseFragment> = {};
    for (const page of model.pages) {
        // core `content` carries no trailing newline; add one when writing the file
        entries[`${page.pathSegments.join('/')}${PAGE_EXTENSION}`] = { content: `${page.content}\n` };
    }
    return createRenderMap(entries);
}

export function generate(): void {
    const model = generateDocs(getSpec());
    const docsMap = getDocsRenderMap(model);

    const outDir = joinPath(REPO_ROOT, 'docs');
    deleteDirectory(outDir);
    writeRenderMap(docsMap, outDir);
    process.stdout.write(`wrote ${docsMap.size} docs files to docs/\n`);
}
