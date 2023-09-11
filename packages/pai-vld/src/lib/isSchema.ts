/** @format */

import { Schema } from '../types/Schema';

export const isSchema = (val: any): val is Schema<any> => {
    return val?.prototype?.isSchema;
};
