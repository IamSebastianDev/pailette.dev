/** @format */

import { ValidatorFn } from '../types/ValidatorFn';

export const isValidator = (value: unknown): value is ValidatorFn<any, any> => {
    return value !== undefined && value !== null && typeof value === 'function';
};
