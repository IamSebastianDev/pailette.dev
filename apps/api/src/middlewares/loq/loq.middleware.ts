/** @format */

import type { Request, Response, NextFunction } from 'express';
import { LoqInit } from '../../types/LoqInit';

export const loq = ({ verbose, suppress, appName }: LoqInit) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { method, originalUrl, query } = req;
        const [url, _] = originalUrl.split('?');
        const parts = [`\x1b[1m\x1b[36m[${appName}]\x1b[0m\x1b[36m [${method}]::${url}`];

        if (verbose && !suppress) {
            parts.push(
                Object.entries({ ...query })
                    .map(([k, v]) => `@${k}->${v};`)
                    .join(' ')
            );
        }

        parts.push(`\x1b[0m`);

        if (!suppress) {
            console.log(parts.join(''));
        }

        next();
    };
};
