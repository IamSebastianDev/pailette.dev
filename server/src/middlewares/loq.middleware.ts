/** @format */

import type { Request, Response, NextFunction } from 'express';
import { environment } from '../../../shared/environment';
export const loq = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { method, originalUrl, query } = req;
        const [url, _] = originalUrl.split('?');

        const { VERBOSE } = process.env;

        if (VERBOSE === 'true' || environment.isDevelopment()) {
            process.stdout.write(
                `\x1b[1m\x1b[36m[${process.env.APP_NAME}]\x1b[0m\x1b[36m [${method}]::${url} ${Object.entries({
                    ...query,
                })
                    .map(([key, value]) => {
                        return `@${key}.${value};`;
                    })
                    .join(' ')}\x1b[0m
`
            );
        }

        next();
    };
};
