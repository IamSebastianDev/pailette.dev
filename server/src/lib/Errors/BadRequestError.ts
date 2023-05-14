/** @format */

import type { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../../../../shared/HttpStatusCode';

export class BadRequestError extends Error {
    code: HttpStatusCode = HttpStatusCode.BAD_REQUEST;
    name = 'BadRequestError';
    public reason: string;
    constructor(message: string) {
        super(message);

        this.reason = message;
    }
}

export const handleBadRequest = () => {
    return async (err: BadRequestError, req: Request, res: Response, next: NextFunction) => {
        if (!(err instanceof BadRequestError)) return next(err);
        res.status(err.code).json({ data: null, error: err });
    };
};
