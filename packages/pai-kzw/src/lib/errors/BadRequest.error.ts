/** @format */

import type { NextFunction, Request, Response } from 'express';

export class BadRequestError extends Error {
    public readonly code: 400 = 400;
    public readonly name = 'HttpBadRequestError';

    constructor(message: string) {
        super(message);
    }

    static intercept(origin?: string) {
        return async (err: Error, req: Request, res: Response, next: NextFunction) => {
            if (!(err instanceof BadRequestError)) return next(err);
            return res.status(err.code).json({
                data: null,
                error: {
                    ...err,
                    message: err.message,
                    cause: err.cause,
                    ...(origin ? { origin } : {}),
                },
            });
        };
    }
}
