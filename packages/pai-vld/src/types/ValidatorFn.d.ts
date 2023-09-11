/** @format */

export type ValidatorFn<Value = any, Entity extends Record<PropertyKey, unknown> = any> = (
    value: Value,
    key: string,
    entity: Entity
) => boolean;
