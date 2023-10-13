/** @format */

import type { Request, Response } from 'express';
import { øPayload } from '../types/øPayload';
import { PrimitiveParser } from '@pai/core';
export const createPayload = <P extends øPayload<any, any, any, any>>(req: Request, res: Response) => {
    const parser = new PrimitiveParser();
    const { params, query, body } = req;
    const { locals } = res;

    return {
        params: Object.fromEntries(
            Object.entries(params).map(([key, value]) => {
                return [key, parser.parse(value)];
            })
        ),
        query: Object.fromEntries(
            Object.entries(query).map(([key, value]) => {
                return [key, parser.parse(value as string | string[])];
            })
        ),
        body,
        locals,
    } as P;
};
