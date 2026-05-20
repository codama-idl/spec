import { attribute, defineNode, nestedUnion, optionalAttribute, string, u32 } from '../../../api';

export const amountTypeNode = defineNode('amountTypeNode', {
    docs: [
        'Wraps a number type to provide additional context such as decimal places and a unit.',
        'Useful for amounts representing financial values.',
    ],
    attributes: [
        attribute('decimals', u32(), {
            docs: [
                'The number of decimal places the wrapped integer carries.',
                'For example, an integer value of 12345 with 2 decimal places represents 123.45.',
            ],
        }),
        optionalAttribute('unit', string(), {
            docs: ['The unit of the amount — e.g. "USD" or "%".'],
        }),
        attribute('number', nestedUnion('nestedTypeNode', 'numberTypeNode'), {
            docs: ['The number type the amount wraps.'],
        }),
    ],
});
