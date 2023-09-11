/** @format */

import express from 'express';
import { healthController } from './health/health.controller';
import { BadRequestError, GenericError, NotAuthorizedError, NotFoundError } from '@pai/kzw';

export const routes = express
    .Router()
    .use('/health', healthController)
    /**
     * Generic / default error handler should always come last
     */
    .use(
        NotFoundError.intercept(),
        BadRequestError.intercept(),
        GenericError.intercept(),
        NotAuthorizedError.intercept()
    );
