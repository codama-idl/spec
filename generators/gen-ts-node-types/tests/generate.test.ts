import { describe, expect, it } from 'vitest';

import { type GenerateOptions, validateGenerateOptions } from '../src/generate';
import { microSpec } from './_fixtures';

const spec = microSpec();

function options(overrides: Partial<GenerateOptions> = {}): GenerateOptions {
    return {
        outputDir: '/tmp/unused',
        targetSpecMajor: 1,
        ...overrides,
    };
}

describe('validateGenerateOptions', () => {
    it('accepts valid options with no overrides', () => {
        expect(() => validateGenerateOptions(spec, options())).not.toThrow();
    });

    it('accepts a narrowableDataAttributes set whose keys all resolve in the spec', () => {
        expect(() =>
            validateGenerateOptions(spec, options({ narrowableDataAttributes: new Set(['wrappingTypeNode:endian']) })),
        ).not.toThrow();
    });

    it('accepts a genericParamOrder map whose keys and attributes all resolve', () => {
        expect(() =>
            validateGenerateOptions(spec, options({ genericParamOrder: new Map([['wrappingTypeNode', ['payload']]]) })),
        ).not.toThrow();
    });

    it('throws when targetSpecMajor does not match the spec version', () => {
        expect(() => validateGenerateOptions(spec, options({ targetSpecMajor: 2 }))).toThrow(
            /targetSpecMajor=2.*version "1\.0\.0".*major 1/,
        );
    });

    it('throws on a narrowableDataAttributes key that does not resolve in the spec', () => {
        expect(() =>
            validateGenerateOptions(spec, options({ narrowableDataAttributes: new Set(['ghostTypeNode:format']) })),
        ).toThrow(/narrowableDataAttributes references "ghostTypeNode:format"/);
    });

    it('throws on a genericParamOrder key that names an unknown node kind', () => {
        expect(() =>
            validateGenerateOptions(spec, options({ genericParamOrder: new Map([['ghostTypeNode', ['x']]]) })),
        ).toThrow(/genericParamOrder references unknown node kind "ghostTypeNode"/);
    });

    it('throws when genericParamOrder references an attribute the node does not declare', () => {
        expect(() =>
            validateGenerateOptions(spec, options({ genericParamOrder: new Map([['wrappingTypeNode', ['ghost']]]) })),
        ).toThrow(/genericParamOrder for "wrappingTypeNode" references attribute "ghost"/);
    });

    it('throws on a malformed spec version', () => {
        const broken = { ...spec, version: 'not-a-version' };
        expect(() => validateGenerateOptions(broken, options())).toThrow(
            /unable to parse spec version "not-a-version"/,
        );
    });
});
