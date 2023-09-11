/** @format */

import type { NextFunction, Request, Response } from 'express';

export class NotFoundError extends Error {
    public readonly code: 404 = 404;
    public readonly name = 'HttpNotFoundError';

    constructor(message: string = 'Not Found') {
        super(message);
    }

    static intercept(origin?: string) {
        return async (err: Error, req: Request, res: Response, next: NextFunction) => {
            if (!(err instanceof NotFoundError)) return next(err);
            return res.status(err.code).json({
                data: null,
                error: {
                    ...err,
                    message: err.message,
                    ...(origin ? { origin } : {}),
                },
            });
        };
    }
}
