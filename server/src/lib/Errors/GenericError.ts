/** @format */

import type { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../../../../shared/HttpStatusCode';

export const handleError = () => {
    return async (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (!(err instanceof Error)) return next(err);
        if (!('reason' in err)) {
            (err as any).reason = err.message;
        }

        if (!('code' in err)) {
            (err as any).code = HttpStatusCode.INTERNAL_SERVER_ERROR;
        }

        res.status((err as any).code).json({ data: null, error: err });
    };
};