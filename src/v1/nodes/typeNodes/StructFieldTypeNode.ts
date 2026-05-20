import { attribute, defineNode, docs, enumeration, optionalAttribute, stringIdentifier, union } from '../../../api';

export const structFieldTypeNode = defineNode('structFieldTypeNode', {
    docs: ['A named field within a struct type.'],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the field.'],
        }),
        optionalAttribute('defaultValueStrategy', enumeration('defaultValueStrategy'), {
            docs: ['How a configured default value is exposed in generated APIs. Required when `defaultValue` is set.'],
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
    ],
});
