/** @format */

import { MaybeArray } from './MaybeArray';
import { ValidatorFn } from './ValidatorFn';

export type SchemaDefinition<Entity extends Record<PropertyKey, unknown>> = {
    [Key in keyof Entity]?: Entity[Key] extends Record<PropertyKey, unknown>
        ? SchemaDefinition<Entity[Key]>
        : MaybeArray<ValidatorFn<Entity[Key], Entity>>;
};
