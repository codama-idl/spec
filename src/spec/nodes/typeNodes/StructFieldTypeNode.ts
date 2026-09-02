import {
    attribute,
    defineNode,
    docs,
    enumeration,
    node,
    optionalAttribute,
    stringIdentifier,
    union,
} from '../../../api';
import { examples } from './StructFieldTypeNode.examples';

export const structFieldTypeNode = defineNode('structFieldTypeNode', {
    docs: ['A named field within a struct type.'],
    attributes: [
        attribute('identifier', stringIdentifier(), {
            docs: ['The identifier of the field.'],
        }),
        optionalAttribute('defaultValueStrategy', enumeration('defaultValueStrategy'), {
            docs: [
                'How a configured default value is exposed in generated APIs.',
                'Only relevant when `defaultValue` is set — a strategy without a default value is meaningless. When absent, `optional` is assumed.',
            ],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the field.'],
        }),
        attribute('type', union('typeNode'), {
            docs: ['The type of the field.'],
        }),
        optionalAttribute('defaultValue', union('valueNode'), {
            docs: ['A default value used when the field is omitted by callers.'],
        }),
        optionalAttribute('display', node('structFieldDisplayNode'), {
            docs: ['Display metadata describing how the field is presented.'],
        }),
    ],
    examples,
});
