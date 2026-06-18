/**
 * `@codama/spec/v1` — public surface for Codama v1 spec consumers.
 *
 * Re-exports the version-agnostic types and utilities from the meta-model's
 * public barrel, plus the v1-specific accessors (`getSpec`, `getNode`,
 * `getUnion`, `getEnumeration`) and the `SPEC_VERSION` constant.
 *
 * Authoring helpers (`defineNode`, primitives, …) are NOT re-exported.
 */

import type { CategorySpec, EnumerationSpec, NodeSpec, Spec, UnionSpec } from '../api';
import { defineCategory, validate } from '../api';
import { ALL_ENUMERATIONS } from './enumerations';
import { nestedTypeNode } from './nestedUnions';
import { accountNode } from './nodes/AccountNode';
import { constantNode } from './nodes/ConstantNode';
import { ALL_CONTEXTUAL_VALUE_NODE_UNIONS, ALL_CONTEXTUAL_VALUE_NODES } from './nodes/contextualValueNodes';
import { ALL_COUNT_NODE_UNIONS, ALL_COUNT_NODES } from './nodes/countNodes';
import { definedTypeNode } from './nodes/DefinedTypeNode';
import { ALL_DISCRIMINATOR_NODE_UNIONS, ALL_DISCRIMINATOR_NODES } from './nodes/discriminatorNodes';
import { ALL_DISPLAY_NODE_UNIONS, ALL_DISPLAY_NODES } from './nodes/displayNodes';
import { errorNode } from './nodes/ErrorNode';
import { eventNode } from './nodes/EventNode';
import { instructionAccountNode } from './nodes/InstructionAccountNode';
import { instructionArgumentNode } from './nodes/InstructionArgumentNode';
import { instructionByteDeltaNode } from './nodes/InstructionByteDeltaNode';
import { instructionNode } from './nodes/InstructionNode';
import { instructionByteDeltaValueUnion, instructionRemainingAccountsValueUnion } from './nodes/InstructionNodeUnions';
import { instructionRemainingAccountsNode } from './nodes/InstructionRemainingAccountsNode';
import { instructionStatusNode } from './nodes/InstructionStatusNode';
import { ALL_LINK_NODE_UNIONS, ALL_LINK_NODES } from './nodes/linkNodes';
import { pdaNode } from './nodes/PdaNode';
import { ALL_PDA_SEED_NODE_UNIONS, ALL_PDA_SEED_NODES } from './nodes/pdaSeedNodes';
import { programNode } from './nodes/ProgramNode';
import { providedNode } from './nodes/ProvidedNode';
import { rootNode } from './nodes/RootNode';
import { ALL_TYPE_NODE_UNIONS, ALL_TYPE_NODES } from './nodes/typeNodes';
import { ALL_VALUE_NODE_UNIONS, ALL_VALUE_NODES } from './nodes/valueNodes';

export * from '../api/public';

/** The version string of the v1 spec. */
export const SPEC_VERSION = '1.7.0';

const TYPE_CATEGORY = defineCategory('type', {
    docs: ['Type nodes — the building blocks of every value shape.'],
    nestedUnions: [nestedTypeNode],
    nodes: [...ALL_TYPE_NODES],
    unions: [...ALL_TYPE_NODE_UNIONS],
});

const VALUE_CATEGORY = defineCategory('value', {
    docs: ['Value nodes — concrete values whose shape is described by a type node.'],
    nodes: [...ALL_VALUE_NODES],
    unions: [...ALL_VALUE_NODE_UNIONS],
});

const LINK_CATEGORY = defineCategory('link', {
    docs: ['Link nodes — references to other named entities (programs, PDAs, accounts, …).'],
    nodes: [...ALL_LINK_NODES],
    unions: [...ALL_LINK_NODE_UNIONS],
});

const PDA_SEED_CATEGORY = defineCategory('pdaSeed', {
    docs: ['PDA-seed nodes — the constants and variables a program uses to derive PDAs.'],
    nodes: [...ALL_PDA_SEED_NODES],
    unions: [...ALL_PDA_SEED_NODE_UNIONS],
});

const COUNT_CATEGORY = defineCategory('count', {
    docs: ['Count nodes — strategies for sizing a homogeneous collection in serialized form.'],
    nodes: [...ALL_COUNT_NODES],
    unions: [...ALL_COUNT_NODE_UNIONS],
});

const DISCRIMINATOR_CATEGORY = defineCategory('discriminator', {
    docs: ['Discriminator nodes — strategies for distinguishing one account or instruction from another.'],
    nodes: [...ALL_DISCRIMINATOR_NODES],
    unions: [...ALL_DISCRIMINATOR_NODE_UNIONS],
});

const DISPLAY_CATEGORY = defineCategory('display', {
    docs: ['Display nodes — presentation metadata attached to instructions, accounts, fields, and enum variants.'],
    nodes: [...ALL_DISPLAY_NODES],
    unions: [...ALL_DISPLAY_NODE_UNIONS],
});

const CONTEXTUAL_VALUE_CATEGORY = defineCategory('contextualValue', {
    docs: [
        'Contextual-value nodes — references resolved at instruction-build time (account values, argument values, …).',
    ],
    nodes: [...ALL_CONTEXTUAL_VALUE_NODES],
    unions: [...ALL_CONTEXTUAL_VALUE_NODE_UNIONS],
});

const SHARED_CATEGORY = defineCategory('shared', {
    docs: ['Shared enumerations referenced from multiple node categories.'],
    enumerations: [...ALL_ENUMERATIONS],
});

const TOP_LEVEL_CATEGORY = defineCategory('topLevel', {
    docs: ['Top-level nodes and helper unions — the entry points of any Codama IDL.'],
    nodes: [
        accountNode,
        constantNode,
        definedTypeNode,
        errorNode,
        eventNode,
        instructionAccountNode,
        instructionArgumentNode,
        instructionByteDeltaNode,
        instructionNode,
        instructionRemainingAccountsNode,
        instructionStatusNode,
        pdaNode,
        programNode,
        providedNode,
        rootNode,
    ],
    unions: [instructionByteDeltaValueUnion, instructionRemainingAccountsValueUnion],
});

const ALL_CATEGORIES: readonly CategorySpec[] = [
    TYPE_CATEGORY,
    VALUE_CATEGORY,
    LINK_CATEGORY,
    PDA_SEED_CATEGORY,
    COUNT_CATEGORY,
    DISCRIMINATOR_CATEGORY,
    DISPLAY_CATEGORY,
    CONTEXTUAL_VALUE_CATEGORY,
    SHARED_CATEGORY,
    TOP_LEVEL_CATEGORY,
];

let cached: Spec | undefined;

/**
 * Returns the assembled and validated v1 spec. The first call performs
 * validation; subsequent calls return the cached value by reference.
 *
 * Throws an `Error` if the spec is internally inconsistent — refs that don't
 * resolve, duplicate names, naming convention violations, etc.
 */
export function getSpec(): Spec {
    if (cached) return cached;
    const built: Spec = {
        version: SPEC_VERSION,
        categories: ALL_CATEGORIES,
    };
    const errors = validate(built);
    if (errors.length > 0) {
        throw new Error(`Invalid Codama v1 spec:\n${errors.map(e => `  - ${e}`).join('\n')}`);
    }
    cached = built;
    return cached;
}

/** Lookup a single node by its `kind`, or `undefined` if absent. */
export function getNode(kind: string): NodeSpec | undefined {
    for (const c of getSpec().categories) {
        const found = c.nodes.find(n => n.kind === kind);
        if (found) return found;
    }
    return undefined;
}

/** Lookup a single union by its `name`, or `undefined` if absent. */
export function getUnion(name: string): UnionSpec | undefined {
    for (const c of getSpec().categories) {
        const found = c.unions.find(u => u.name === name);
        if (found) return found;
    }
    return undefined;
}

/** Lookup a single enumeration by its `name`, or `undefined` if absent. */
export function getEnumeration(name: string): EnumerationSpec | undefined {
    for (const c of getSpec().categories) {
        const found = c.enumerations.find(e => e.name === name);
        if (found) return found;
    }
    return undefined;
}
