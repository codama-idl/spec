import { attribute, defineNode, enumeration, i64, union } from '../../../api';

export const postOffsetTypeNode = defineNode('postOffsetTypeNode', {
    docs: [
        'After serialising the wrapped type, advance the cursor by `offset` bytes interpreted via the chosen strategy.',
    ],
    attributes: [
        attribute('offset', i64(), {
            docs: ['The signed byte offset to apply after the wrapped type runs.'],
        }),
        attribute('strategy', enumeration('postOffsetStrategy'), {
            docs: ['How the `offset` value is interpreted.'],
        }),
        attribute('type', union('typeNode'), {
            docs: ['The wrapped type whose serialisation is followed by the offset.'],
        }),
    ],
});
