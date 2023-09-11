/** @format */

import type { NextFunction, Request, Response } from 'express';

export class NotAuthorizedError extends Error {
    public readonly code: 401;

    constructor(message: string = 'Not Authorized') {
        super(message);

        this.code = 401;
        this.name = 'HttpNotAuthorizedError';
    }

    static intercept(origin?: string) {
        return async (err: Error, req: Request, res: Response, next: NextFunction) => {
            if (!(err instanceof NotAuthorizedError)) return next(err);
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
