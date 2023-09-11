/** @format */

import { ValidatorConfig } from '../../types/ValidatorConfig';
import { ValidatorFn } from '../../types/ValidatorFn';
import { ValidationError } from '../error/ValidationError';

/**
 * @throws
 * @description
 * Creates a Validator Function to validate a given value to be a `Integer`. Can be used in a schema or standalone.
 * Throws a `ValidationError` when failing.
 *
 * -----
 *@example
 * ```ts
 * import { notNull, isInt, createSchema } from "@pai/vld"";
 *
 * type User = { age: number; }
 * const userSchema = createSchema<User>({
 *   age: [notNull, isInt({ min: 21 })]
 * })
 *
 * userSchema.validate({ age: '21' }) // return false
 * userSchema.validateOrThrow({ name: '21 }) // throws a ValidationError
 *
 * const val = isInt({ max: 21 })("0") // throws a ValidationError
 * ```
 * -----
 *
 * @param { {min: number; max: number} } param0 - a config object to set a min, max or both.
 * @returns { ValidatorFn } a ValidatorFn to validate values for being a `Integer`
 */

export const isInt = (validatorConfig?: ValidatorConfig<{ min: number; max: number }>): ValidatorFn => {
    const { min, max } = validatorConfig || {};
    return (value: unknown, key: string = '', entity: Record<PropertyKey, unknown> = {}): boolean => {
        // skip null or undefined values by default
        if (value === null || value === undefined) {
            return true;
        }

        if (!Number.isInteger(value) || typeof value !== 'number') {
            throw new ValidationError(value, key, entity, 'Int');
        }

        if (min && value < min) {
            throw new ValidationError(value, key, entity, `Int < ${min}`);
        }

        if (max && value > max) {
            throw new ValidationError(value, key, entity, `Int > ${max}`);
        }

        return true;
    };
};
