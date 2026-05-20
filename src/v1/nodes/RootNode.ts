import { array, attribute, codamaVersion, defineNode, literal, node } from '../../api';

export const rootNode = defineNode('rootNode', {
    docs: [
        'The root of a Codama IDL document.',
        'Pairs a primary program with any number of additional programs and tags the document with the spec version.',
    ],
    attributes: [
        attribute('standard', literal('codama'), {
            docs: ['A literal marker identifying the document as a Codama IDL.'],
        }),
        attribute('version', codamaVersion(), {
            docs: ['The Codama spec version this document conforms to.'],
        }),
        attribute('program', node('programNode'), {
            docs: ['The primary program described by the document.'],
        }),
        attribute('additionalPrograms', array(node('programNode')), {
            docs: ['Additional programs referenced by the primary program.'],
        }),
    ],
});
