/** @format */

import type { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../../../../shared/HttpStatusCode';

export class NotFoundError extends Error {
    code: HttpStatusCode = HttpStatusCode.NOT_FOUND;
    name = 'NotFound';
    public reason: string;
    constructor(message: string) {
        super(message);

        this.reason = message;
    }
}

export const handleNotFound = () => {
    return async (err: NotFoundError, req: Request, res: Response, next: NextFunction) => {
        if (!(err instanceof NotFoundError)) return next(err);
        res.status(err.code).json({ data: null, error: err });
    };
};
