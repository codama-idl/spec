import { code, example, type DocExamples } from '../../../api';

export const examples: DocExamples = [
    example(
        'Create a sentinel count node',
        code(
            'typescript',
            `
const node = sentinelCountNode(constantValueNode(integerTypeNode('u8'), integerValueNode('0')));
`,
        ),
    ),
    example(
        'A list of public keys terminated by the default public key',
        code(
            'typescript',
            `
arrayTypeNode(
    publicKeyTypeNode(),
    sentinelCountNode(constantValueNode(publicKeyTypeNode(), publicKeyValueNode('11111111111111111111111111111111'))),
);

// [A, B] => A B 00…00 (32 zero bytes)
`,
        ),
        {
            docs: [
                'The sentinel is as wide as an item, so the only key that can never appear in the list is the all-zero key itself, which programs conventionally use as a null marker. This is also the System Program ID, so the pattern does not suit a list that could legitimately contain it.',
                'A narrower sentinel, such as a single `0xFF` byte, would be ambiguous: about one key in 256 starts with that byte.',
                'The sentinel is required by default, so decoding `A B` without the trailing zero key fails.',
            ],
        },
    ),
    example(
        'TLV extensions terminated by an uninitialised type, followed by unused space',
        [
            code(
                'typescript',
                `
arrayTypeNode(
    definedTypeLinkNode('extension'),
    sentinelCountNode(constantValueNode(integerTypeNode('u16'), integerValueNode('0')), 'omitted'),
);

// 0700 0000 | 0200 0800 0000000000000000 | 0000 | 0000000000
// ImmutableOwner | TransferFeeAmount     | stop | ignored
`,
            ),
            code(
                'jsonc',
                `
{
    "kind": "arrayTypeNode",
    "item": { "kind": "definedTypeLinkNode", "identifier": "extension" },
    "count": {
        "kind": "sentinelCountNode",
        "strategy": "omitted",
        "sentinel": {
            "kind": "constantValueNode",
            "type": { "kind": "integerTypeNode", "format": "u16" },
            "value": { "kind": "integerValueNode", "value": "0" }
        }
    }
}
`,
            ),
        ],
        {
            docs: [
                'Each extension starts with a `u16` type, and a type of `0` marks the end of the initialised region. Anything after it is unused space of any length that the program never writes a terminator for, which is why the sentinel is `omitted`.',
            ],
        },
    ),
    example(
        'Discriminated seeds inside a zero-padded fixed-size slot',
        code(
            'typescript',
            `
arrayTypeNode(
    definedTypeLinkNode('seed'),
    sentinelCountNode(constantValueNode(integerTypeNode('u8'), integerValueNode('0')), 'omitted'),
    { transforms: [fixedSizeTransformNode(32)] },
);
`,
        ),
        {
            docs: [
                'Seeds start with a `u8` discriminator and `0` marks the end of the list. The slot is zero-padded to 32 bytes, so a full slot has no room for a terminator: the sentinel is omitted when encoding and tolerated when decoding.',
            ],
        },
    ),
];
