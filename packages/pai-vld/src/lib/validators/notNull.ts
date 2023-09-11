/** @format */

import { ValidatorFn } from '../../types/ValidatorFn';
import { ValidationError } from '../error/ValidationError';

/**
 * @throws
 * @description
 * Validator Function to validate a given value to be not `null` or `undefined`. Can be used in a schema or standalone.
 * Throws a `ValidationError` when failing.
 *
 * -----
 *@example
 * ```ts
 * import { notNull, isString, createSchema } from "@pai/vld"";
 *
 * type User = { name: string; }
 * const userSchema = createSchema<User>({
 *   name: [notNull, isString]
 * })
 *
 * userSchema.validate({ name: null }) // return false
 * userSchema.validateOrThrow({ name: null }) // throws a ValidationError
 *
 * const val = notNull(null) // throws a ValidationError
 * ```
 * -----
 *
 * @param { unknown } value - the value to validate
 * @param { string } key - the property key of the entity that is validated
 * @param { Record<PropertyKey, unknown> } entity - the complete entity that is being validated
 * @returns { boolean } true if the property was successfully validated
 */
export const notNull: ValidatorFn = (
    value: unknown,
    key: string = '',
    entity: Record<PropertyKey, unknown> = {}
): boolean => {
    if (value !== null && value !== undefined) return true;

    throw new ValidationError(value, key, entity, 'nonNull');
};
