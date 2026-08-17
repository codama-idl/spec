import { describe, expect, it } from 'vitest';

import { code, example } from '../src/api';

describe('examples - dedent', () => {
    it('strips common indentation and preserves relative indent', () => {
        const block = code(
            'typescript',
            `
            foo();
              bar();
        `,
        );
        expect(block.content).toEqual(['foo();', '  bar();']);
    });

    it('preserves internal blank lines as empty entries', () => {
        const block = code(
            'typescript',
            `
            a();

            b();
        `,
        );
        expect(block.content).toEqual(['a();', '', 'b();']);
    });

    it('trims a leading newline and trailing whitespace to a single line', () => {
        const block = code(
            'typescript',
            `
            only();
        `,
        );
        expect(block.content).toEqual(['only();']);
    });

    it('handles a single-line snippet with no surrounding newlines', () => {
        expect(code('typescript', `x();`).content).toEqual(['x();']);
    });
});

describe('examples - CodeBlock', () => {
    it('passes the language through and freezes the block and its content', () => {
        const block = code('rust', `let x = 1;`);
        expect(block.language).toBe('rust');
        expect(Object.isFrozen(block)).toBe(true);
        expect(Object.isFrozen(block.content)).toBe(true);
    });
});

describe('example', () => {
    it('accepts a single code block and omits docs when not provided', () => {
        const ex = example('single', code('typescript', `x();`));
        expect(ex).not.toHaveProperty('docs');
        expect(ex.code).toHaveLength(1);
        expect(Object.isFrozen(ex)).toBe(true);
        expect(Object.isFrozen(ex.code)).toBe(true);
    });

    it('accepts an array of code blocks in order', () => {
        const ex = example('multi', [code('typescript', `ts();`), code('rust', `rs();`)]);
        expect(ex.code.map(block => block.language)).toEqual(['typescript', 'rust']);
    });

    it('carries docs when provided', () => {
        const ex = example('with docs', code('typescript', `x();`), { docs: ['A note.'] });
        expect(ex.docs).toEqual(['A note.']);
    });
});
