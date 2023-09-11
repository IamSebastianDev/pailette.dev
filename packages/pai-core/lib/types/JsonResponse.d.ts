/** @format */

import { _Meta } from './_Meta';

export type JsonResponse<Data extends Record<PropertyKey, unknown>> = {
    data: Data;
    _meta?: _Meta;
};
