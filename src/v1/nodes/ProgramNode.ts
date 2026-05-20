import {
    address,
    array,
    attribute,
    defineNode,
    docs,
    enumeration,
    node,
    optionalAttribute,
    stringIdentifier,
    stringVersion,
} from '../../api';

export const programNode = defineNode('programNode', {
    docs: [
        'A Solana program: its identity, version, accounts, instructions, defined types, PDAs, events, errors, and constants.',
    ],
    attributes: [
        attribute('name', stringIdentifier(), {
            docs: ['The name of the program.'],
        }),
        attribute('publicKey', address(), {
            docs: ['The base58-encoded program ID.'],
        }),
        attribute('version', stringVersion(), {
            docs: ['The version of the program, in semver form.'],
        }),
        optionalAttribute('origin', enumeration('programOrigin'), {
            docs: ['The toolchain that originally generated the program description, if known.'],
        }),
        optionalAttribute('docs', docs(), {
            docs: ['Markdown documentation for the program.'],
        }),
        optionalAttribute('accounts', array(node('accountNode')), {
            docs: ['The accounts owned by the program.'],
        }),
        optionalAttribute('instructions', array(node('instructionNode')), {
            docs: ['The instructions exposed by the program.'],
        }),
        optionalAttribute('definedTypes', array(node('definedTypeNode')), {
            docs: ['The reusable types defined by the program.'],
        }),
        optionalAttribute('pdas', array(node('pdaNode')), {
            docs: ['The PDAs derived by the program.'],
        }),
        optionalAttribute('events', array(node('eventNode')), {
            docs: ['The events emitted by the program.'],
        }),
        optionalAttribute('errors', array(node('errorNode')), {
            docs: ['The errors returned by the program.'],
        }),
        optionalAttribute('constants', array(node('constantNode')), {
            docs: ['The constants exposed by the program.'],
        }),
    ],
});
