import { array, attribute, codamaVersion, defineNode, literal, node } from '../../api';
import { examples } from './RootNode.examples';

export const rootNode = defineNode('rootNode', {
    docs: [
        'The root of a Codama IDL.',
        'Pairs a primary program with any number of additional programs and tags the IDL with the spec version.',
        '',
        '![Diagram](https://github.com/codama-idl/codama/assets/3642397/96c43c75-5925-4b6b-a1e0-8b8c61317cfe)',
    ],
    attributes: [
        attribute('standard', literal('codama'), {
            docs: [
                'A literal marker identifying the JSON object as a Codama IDL.',
                'This allows other communities to fork the Codama standard under a different marker.',
            ],
        }),
        attribute('version', codamaVersion(), {
            docs: ['The Codama spec version this IDL conforms to.'],
        }),
        attribute('program', node('programNode'), {
            docs: ['The primary program described by the IDL.'],
        }),
        attribute('additionalPrograms', array(node('programNode')), {
            docs: ['Additional programs referenced by the primary program.'],
        }),
    ],
    examples,
});
