/** @format */

import type { NextFunction, Request, Response } from 'express';

export class GenericError extends Error {
    public readonly code: 500 = 500;
    public readonly name = 'HttpInternalServerError';

    constructor(message: string = 'Internal Server Error') {
        super(message);
    }

    static intercept(origin?: string) {
        return async (err: Error, req: Request, res: Response, next: NextFunction) => {
            if (!(err instanceof Error)) return next(err);
            const code = 'code' in err ? err.code : 500;
            return res.status(<number>code).json({
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
