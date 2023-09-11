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
 * import { notNull, isType, createSchema } from "@pai/vld"";
 *
 * type User = { jobs: string; }
 * const userSchema = createSchema<User>({
 *   jobs: [notNull, isType({ type: 'string' })]
 * })
 *
 * userSchema.validate({ jobs: 5 }) // return false
 * userSchema.validateOrThrow({ jobs: 5 }) // throws a ValidationError
 *
 * ```
 * -----
 *
 * @param { {type: PrimitiveType | (() => PrimitiveType)} } validatorConfig - a config object to set a type property to check against.
 * @returns { ValidatorFn } a ValidatorFn to validate values for being an `Array of items`
 */

export const isType = (
    validatorConfig: ValidatorConfig<{ type: PrimitiveType | (() => PrimitiveType) }>
): ValidatorFn => {
    const { type } = validatorConfig || {};
    return (value: unknown, key: string = '', entity: Record<PropertyKey, unknown> = {}) => {
        // skip null or undefined values by default
        if (value === null || value === undefined) {
            return true;
        }

        if (type && typeof type === 'function') {
            if (typeof value !== type()) {
                throw new ValidationError(value, key, entity, `Value to be of type ${type()}`);
            }
        }

        if (typeof value !== type) {
            throw new ValidationError(value, key, entity, `Value to be of type ${type}`);
        }

        return true;
    };
};
