import { attribute, defineNode, enumeration } from '../../../api';

export const numberTypeNode = defineNode('numberTypeNode', {
    docs: ['A numeric type with a fixed wire format and byte order.'],
    attributes: [
        attribute('format', enumeration('NumberFormat'), {
            docs: ['The wire format used to serialise the number.'],
        }),
        attribute('endian', enumeration('Endianness'), {
            docs: ['The byte order used to serialise the number.'],
        }),
    ],
});
