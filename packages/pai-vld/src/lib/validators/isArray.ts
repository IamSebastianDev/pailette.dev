/** @format */

import { ValidatorConfig } from '../../types/ValidatorConfig';
import { ValidatorFn } from '../../types/ValidatorFn';
import { PrimitiveType } from '@pai/core';
import { ValidationError } from '../error/ValidationError';

/**
 * @throws
 * @description
 * Creates a Validator Function to validate a given value to be an `Array` of values. Can be used in a
 * schema or standalone. Can be configured to check the Array for minimum, maximum and item validation.
 * Throws a `ValidationError` when failing.
 *
 * -----
 * @example
 * ```ts
 * import { notNull, isArray, createSchema } from "@pai/vld"";
 *
 * type User = { age: number; }
 * const userSchema = createSchema<User>({
 *   jobs: [notNull, isArray({ min: 1 })]
 * })
 *
 * userSchema.validate({ jobs: '5' }) // return false
 * userSchema.validateOrThrow({ name: 'string' }) // throws a ValidationError
 *
 * const val = isArray({ max: 21 })("0") // throws a ValidationError
 * ```
 * -----
 *
 * @param { {min: number; max: number, items: PrimitiveType | ValidatorFn[]} } validatorConfig - a config object to set a min, max, or both as well as items to be validated.
 * @returns { ValidatorFn } a ValidatorFn to validate values for being an `Array of items`
 */

export const isArray = (
    validatorConfig?: ValidatorConfig<{ min: number; max: number; items: PrimitiveType | ValidatorFn[] }>
): ValidatorFn => {
    const { min, max, items } = validatorConfig || {};
    return (value: unknown, key: string = '', entity: Record<PropertyKey, unknown> = {}) => {
        // skip null or undefined values by default
        if (value === null || value === undefined) {
            return true;
        }

        if (!Array.isArray(value)) {
            throw new ValidationError(value, key, entity, '[]');
        }

        const { length } = value;

        // Validate min length
        if (min && length < min) {
            throw new ValidationError(value, key, entity, `Length > ${min} (MIN)`);
        }

        // Validate max length
        if (max && length > max) {
            throw new ValidationError(value, key, entity, `Length < ${max} (MAX)`);
        }

        // Validate primitive values
        if (items && typeof items === 'string' && !value.every((item) => typeof item === items)) {
            throw new ValidationError(value, key, entity, `Items to be of type ${items}`);
        }

        // Validate ValidatorFns
        if (items && typeof items !== 'string' && Array.isArray(items)) {
            return value.every((entry, index) =>
                items.every((validator) => validator(entry, `${key}[${index}]`, value[index]))
            );
        }

        return true;
    };
};
