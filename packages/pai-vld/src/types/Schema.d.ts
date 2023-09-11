/** @format */

import { SchemaDefinition } from './SchemaDefinition';

export type Schema<Entity extends Record<PropertyKey, unknown>> = {
    _$$: SchemaDefinition<Entity>;
    validate: (object: Entity) => boolean;
    validateOrThrow: (object: Entity) => boolean;
    validateProperty: (key: keyof Entity, value: unknown) => boolean;
};
