/** @format */

import type { NextFunction, Request, Response } from 'express';
import { handleAsync } from '@iasd/handle-async';
import { Payload } from '../types/Payload';
import { ControllerFunction } from '../types/ControllerFunction';
import { createPayload } from './createPayload';

/**
 *
 * @param controller
 * @returns
 *
 * ```ts
 *
 *
 * export const getUser = createController<P extends Payload>((payload: P, request: Request, response: Response) => {})
 * ```
 */

export const createController = <ResponseData extends Record<PropertyKey, unknown>, P extends Payload>(
    controllerFunction: ControllerFunction<ResponseData, P>
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let _meta;

        if (true) {
            const { originalUrl, ip, hostname, headers } = req;
            _meta = { req: { url: originalUrl, ip, hostname, headers }, timestamp: Date.now() };
        }

        const { result: data, errorValue } = await handleAsync(
            async () => await controllerFunction(createPayload(req, res), req, res)
        );

        if (errorValue || !data) {
            return next(errorValue);
        }

        if (data) {
            return res.json({
                _meta,
                data,
            });
        }
    };
};
