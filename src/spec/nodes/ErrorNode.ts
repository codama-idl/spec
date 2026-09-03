import { attribute, defineNode, docs, optionalAttribute, stringIdentifier, text, u32 } from '../../api';
import { examples } from './ErrorNode.examples';

export const errorNode = defineNode('errorNode', {
    docs: [
        'A program error — a numeric code paired with a name and human-readable message.',
        '',
        '![Diagram](https://github.com/codama-idl/codama/assets/3642397/0bde98ea-0327-404b-bf38-137d105826b0)',
    ],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the error.'],
        }),
        attribute('code', u32(), {
            docs: ['The numeric error code returned by the program.'],
        }),
        attribute('message', text(), {
            docs: ['A human-readable description of the error.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the error.'],
        }),
    ],
    examples,
});
