import { attribute, defineNode, enumeration, string } from '../../../api';

export const bytesValueNode = defineNode('bytesValueNode', {
    docs: ['A concrete bytes value, encoded as text in the chosen encoding.'],
    attributes: [
        attribute('data', string(), {
            docs: ['The bytes encoded as a text string per the `encoding` attribute.'],
        }),
        attribute('encoding', enumeration('BytesEncoding'), {
            docs: ['The encoding used to represent the bytes as text.'],
        }),
    ],
});
