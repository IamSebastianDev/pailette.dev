/** @format */

import type { NextFunction, Request, Response } from 'express';

export class ForbiddenError extends Error {
    public readonly code: 403 = 403;
    public readonly name = 'HttpForbiddenError';

    constructor(message: string) {
        super(message);
    }

    static intercept(origin?: string) {
        return async (err: Error, req: Request, res: Response, next: NextFunction) => {
            if (!(err instanceof Error)) return next(err);
            return res.status(500).json({
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
