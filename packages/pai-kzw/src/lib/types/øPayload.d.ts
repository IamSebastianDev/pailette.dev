/** @format */

import { ParsedParams } from './ParsedParams';
import { ParsedQuery } from './ParsedQuery';

export type øPayload<
    Params extends ParsedParams = {},
    Query extends ParsedQuery = { raw: undefined },
    Body extends Record<PropertyKey, unknown> = {},
    Locals extends Record<PropertyKey, unknown> = {}
> = {
    params?: Params;
    query?: Query;
    body?: Body;
    locals?: Locals;
};
