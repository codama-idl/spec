import { attribute, defineNode, enumeration, node, optionalAttribute, string } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './FloatTypeNode.examples';

export const floatTypeNode = defineNode('floatTypeNode', {
    docs: [
        'An IEEE-754 floating-point number with a fixed wire format and byte order.',
        'Floating-point numbers are notoriously unsafe for financial values — prefer `fixedPointTypeNode` for those.',
    ],
    attributes: [
        attribute('format', enumeration('floatFormat'), {
            docs: ['The wire format used to serialise the float.'],
        }),
        optionalAttribute('endian', enumeration('endianness'), {
            docs: ['The byte order used to serialise the float. Defaults to `le`.'],
        }),
        optionalAttribute('unit', string(), {
            docs: [
                'The unit of measure the float denotes — e.g. `"USD"`.',
                'Part of the value semantics: without it, consumers cannot know what quantity the number represents.',
            ],
        }),
        optionalAttribute('display', node('unitNumberDisplayNode'), {
            docs: [
                'Display metadata describing how the float is presented.',
                'Only a contextual unit applies: a float already carries its own scale.',
            ],
        }),
        transformsAttribute(),
    ],
    examples,
});
