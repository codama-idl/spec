import { attribute, defineNode, enumeration, i64, union } from '../../../api';

export const preOffsetTypeNode = defineNode('preOffsetTypeNode', {
    docs: 'Before serialising the wrapped type, advance the cursor by `offset` bytes interpreted via the chosen strategy.',
    attributes: [
        attribute('offset', i64(), {
            docs: 'The signed byte offset to apply before the wrapped type runs.',
        }),
        attribute('strategy', enumeration('PreOffsetStrategy'), {
            docs: 'How the `offset` value is interpreted.',
        }),
        attribute('type', union('TypeNode'), {
            docs: 'The wrapped type whose serialisation is preceded by the offset.',
        }),
    ],
});
