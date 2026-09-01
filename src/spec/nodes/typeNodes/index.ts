import { amountTypeNode } from './AmountTypeNode';
import { arrayTypeNode } from './ArrayTypeNode';
import { booleanTypeNode } from './BooleanTypeNode';
import { bytesTypeNode } from './BytesTypeNode';
import { dateTimeTypeNode } from './DateTimeTypeNode';
import { enumTypeNode } from './EnumTypeNode';
import { enumVariantTypeNode } from './EnumVariantTypeNode';
import { mapTypeNode } from './MapTypeNode';
import { numberTypeNode } from './NumberTypeNode';
import { optionTypeNode } from './OptionTypeNode';
import { publicKeyTypeNode } from './PublicKeyTypeNode';
import { remainderOptionTypeNode } from './RemainderOptionTypeNode';
import { setTypeNode } from './SetTypeNode';
import { solAmountTypeNode } from './SolAmountTypeNode';
import { stringTypeNode } from './StringTypeNode';
import { structFieldTypeNode } from './StructFieldTypeNode';
import { structTypeNode } from './StructTypeNode';
import { tupleTypeNode } from './TupleTypeNode';
import { registeredTypeNodeUnion, standaloneTypeNodeUnion, typeNodeUnion } from './TypeNode';
import { zeroableOptionTypeNode } from './ZeroableOptionTypeNode';

export const ALL_TYPE_NODES = [
    amountTypeNode,
    arrayTypeNode,
    booleanTypeNode,
    bytesTypeNode,
    dateTimeTypeNode,
    enumTypeNode,
    enumVariantTypeNode,
    mapTypeNode,
    numberTypeNode,
    optionTypeNode,
    publicKeyTypeNode,
    remainderOptionTypeNode,
    setTypeNode,
    solAmountTypeNode,
    stringTypeNode,
    structFieldTypeNode,
    structTypeNode,
    tupleTypeNode,
    zeroableOptionTypeNode,
] as const;

export const ALL_TYPE_NODE_UNIONS = [standaloneTypeNodeUnion, typeNodeUnion, registeredTypeNodeUnion] as const;
