/** @format */

import type { NextFunction, Request, Response } from 'express';
import type { Payload, Service, JsonResponse } from '../types';
import { handleAsync } from '@iasd/handle-async';

export const createService = <T extends Payload, K>(service: Service<T, K>) => {
    const exposeMeta = process.env.NODE_ENV !== 'production';

    const transformObject = <T extends Record<string | number, unknown>>(obj: T) => {
        return Object.entries(obj).map(([key, value]) => {
            return [key, value];
        });
    };

    return async (req: Request, res: Response, next: NextFunction) => {
        const { originalUrl, ip, hostname, params = {}, body = {}, query = {} } = req;
        const payload = Object.fromEntries([
            ...transformObject(params),
            ...transformObject(query),
            ...transformObject(body),
        ]);

        const _meta = { req: { url: originalUrl, ip, hostname }, timestamp: Date.now() };
        const { result: data, errorValue, isOk } = await handleAsync(async () => service(payload as T));

        if (errorValue) return next(errorValue);

        if (isOk() && data) {
            let response: JsonResponse<K> = { data };
            exposeMeta && (response = { ...response, _meta });
            return res.json(response);
        }
    };
};
