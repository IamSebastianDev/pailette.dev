/** @format */

import { Meta } from './Meta';

export type JsonResponse<T> = {
    data: T;
    _meta?: Meta;
};
