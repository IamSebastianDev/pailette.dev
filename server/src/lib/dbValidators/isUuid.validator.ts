/** @format */

import { FlotsamValidationError, type ValidatorFunction } from 'flotsamjs/validators';

export const IsUuid = (): ValidatorFunction => {
    return (value: unknown, propName?: string) => {
        if (value === null || value === undefined) {
            return true;
        }

        if (typeof value !== 'string') {
            throw new FlotsamValidationError(`Property ${propName} is not of type 'string'.`);
        }

        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        const result = uuidRegex.test(value);

        if (!result) {
            throw new FlotsamValidationError(`Property ${propName} is not a valid UUID v4.`);
        }

        return true;
    };
};
