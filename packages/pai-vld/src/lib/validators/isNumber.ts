/** @format */

import { ValidatorFn } from '../../types/ValidatorFn';
import { ValidationError } from '../error/ValidationError';

/**
 * @throws
 * @description
 * Validator Function to validate a given value to be of type `number`. Can be used in a schema or standalone.
 * Throws a `ValidationError` when failing.
 *
 * -----
 *@example
 * ```ts
 * import { notNull, isNumber, createSchema } from "@pai/vld"";
 *
 * type User = { age: number; }
 * const userSchema = createSchema<User>({
 *   name: [notNull, isNumber]
 * })
 *
 * userSchema.validate({ age: "0" }) // return false
 * userSchema.validateOrThrow({ age: "0" }) // throws a ValidationError
 *
 * const val = isNumber("0") // throws a ValidationError
 * ```
 * -----
 *
 * @param { unknown } value - the value to validate
 * @param { string } key - the property key of the entity that is validated
 * @param { Record<PropertyKey, unknown> } entity - the complete entity that is being validated
 * @returns { boolean } true if the property was successfully validated
 */

export const isNumber: ValidatorFn = (
    value: unknown,
    key: string = '',
    entity: Record<PropertyKey, unknown> = {}
): boolean => {
    // skip null or undefined values by default
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === 'number') return true;

    throw new ValidationError(value, key, entity, 'type number');
};
