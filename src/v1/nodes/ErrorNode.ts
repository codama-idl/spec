import { attribute, defineNode, docs, optionalAttribute, string, stringIdentifier, u32 } from '../../api';

export const errorNode = defineNode('errorNode', {
    docs: ['A program error — a numeric code paired with a name and human-readable message.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the error.'],
        }),
        attribute('code', u32(), {
            docs: ['The numeric error code returned by the program.'],
        }),
        attribute('message', string(), {
            docs: ['A human-readable description of the error.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the error.'],
        }),
    ],
});
