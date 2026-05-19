import { attribute, defineNode, nestedUnion } from '../../../api';

export const dateTimeTypeNode = defineNode('dateTimeTypeNode', {
    docs: [
        'A timestamp encoded as a number, typically seconds since the Unix epoch. The wrapped number type determines the byte width.',
    ],
    attributes: [
        attribute('number', nestedUnion('NestedTypeNode', 'numberTypeNode'), {
            docs: ['The numeric type used to serialise the timestamp.'],
        }),
    ],
});
