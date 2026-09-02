import { attribute, defineNode, enumeration, optionalAttribute, string, union } from '../../../api';
import { transformsAttribute } from '../transformNodes';
import { examples } from './IntegerTypeNode.examples';

export const integerTypeNode = defineNode('integerTypeNode', {
    docs: ['An integer with a fixed wire format and byte order.'],
    attributes: [
        attribute('format', enumeration('integerFormat'), {
            docs: ['The wire format used to serialise the integer.'],
        }),
        optionalAttribute('endian', enumeration('endianness'), {
            docs: [
                'The byte order used to serialise the integer. Defaults to `le`; byte-oriented formats such as `shortU16` ignore it.',
            ],
        }),
        optionalAttribute('unit', string(), {
            docs: [
                'The unit of measure the integer denotes — e.g. `"slots"` or `"bps"`.',
                'Part of the value semantics: without it, consumers cannot know what quantity the number represents. For scaled quantities, use `fixedPointTypeNode` instead.',
            ],
        }),
        optionalAttribute('display', union('numberDisplayNode'), {
            docs: ['Display metadata describing how the integer is presented.'],
        }),
        transformsAttribute(),
    ],
    examples,
});
