import { attribute, defineNode, docs, optionalAttribute, stringIdentifier, union } from '../../api';
import { examples } from './DefinedTypeNode.examples';

export const definedTypeNode = defineNode('definedTypeNode', {
    docs: [
        'A reusable named type that can be referenced by `definedTypeLinkNode` from elsewhere in the IDL.',
        '',
        '![Diagram](https://github.com/codama-idl/codama/assets/3642397/6049cf77-9a70-4915-8276-dd571d2f8828)',
    ],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the defined type.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the type.'],
        }),
        attribute('type', union('typeNode'), {
            docs: ['The type definition.'],
        }),
    ],
    examples,
});
