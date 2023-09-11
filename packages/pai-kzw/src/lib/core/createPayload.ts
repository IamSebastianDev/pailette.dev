/** @format */

import type { Request, Response } from 'express';
import { Payload } from '../types/Payload';
import { PrimitiveParser } from '@pai/core';
export const createPayload = <P extends Payload<any, any, any, any>>(req: Request, res: Response) => {
    const parser = new PrimitiveParser();
    const { params, query, body } = req;
    const { locals } = res;

    return {
        params: Object.entries(params).map(([key, value]) => [key, parser.parse(value)]),
        query: Object.entries(query).map(([key, value]) => [key, parser.parse(value as string | string[])]),
        body,
        locals,
    } as P;
};
