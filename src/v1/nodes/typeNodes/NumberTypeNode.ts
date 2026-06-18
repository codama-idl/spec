import { attribute, defineNode, enumeration, optionalAttribute, union } from '../../../api';

export const numberTypeNode = defineNode('numberTypeNode', {
    docs: ['A numeric type with a fixed wire format and byte order.'],
    attributes: [
        attribute('format', enumeration('numberFormat'), {
            docs: ['The wire format used to serialise the number.'],
        }),
        attribute('endian', enumeration('endianness'), {
            docs: ['The byte order used to serialise the number.'],
        }),
        optionalAttribute('display', union('numberDisplayNode'), {
            docs: ['Display metadata describing how the number is presented.'],
        }),
    ],
});
